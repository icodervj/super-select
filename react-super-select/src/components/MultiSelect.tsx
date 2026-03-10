import React, { useCallback, useMemo, useRef, useState } from "react";
import type { CustomComponents, MultiSelectProps, Option } from "../types";
import { normalizeOptions } from "../utils/normalizeOptions";
import { useClickOutside } from "../hooks/useClickOutside";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useSelectState } from "../hooks/useSelectState";
import { useVirtualization } from "../hooks/useVirtualization";
import DefaultDropdown from "./Dropdown";
import DefaultOption from "./Option";
import DefaultSearchInput from "./SearchInput";
import DefaultTag from "./Tag";
import VirtualList from "./VirtualList";

const noop = () => {};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchable = true,
  clearable = false,
  disabled = false,
  searchType = "contains",
  classNames,
  components,
  portal,
  maxSelections,
  taggable = false,
  onCreateOption,
  loadOptions,
  debounceMs = 250,
  id,
  name,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [createdOptions, setCreatedOptions] = useState<Option[]>([]);

  const {
    isOpen,
    open,
    close,
    inputValue,
    setInputValue,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    isLoading,
  } = useSelectState({
    options,
    searchable,
    searchType,
    loadOptions,
    debounceMs,
    extraOptions: createdOptions,
  });

  const handleOpen = useCallback(() => {
    if (searchable) setInputValue("");
    open();
  }, [open, searchable, setInputValue]);

  const handleToggle = useCallback(() => {
    if (isOpen) close();
    else handleOpen();
  }, [isOpen, close, handleOpen]);

  const { enabled: virtualized, itemSize, height } = useVirtualization(
    filteredOptions.length
  );

  useClickOutside(containerRef, close, isOpen);

  const maxReached =
    typeof maxSelections === "number" && value.length >= maxSelections;

  const isSelected = useCallback(
    (option: Option) => value.some((v) => v.value === option.value),
    [value]
  );

  const createOption = useCallback(
    (input: string) => {
      const option = onCreateOption
        ? onCreateOption(input)
        : { label: input, value: input };
      setCreatedOptions((prev) => [option, ...prev]);
      onChange([...value, option]);
      setInputValue("");
      close();
    },
    [onCreateOption, onChange, value, setInputValue, close]
  );

  const handleSelect = useCallback(
    (option: Option) => {
      if (option.disabled) return;
      if (isSelected(option)) {
        onChange(value.filter((v) => v.value !== option.value));
        return;
      }
      if (maxReached) return;
      onChange([...value, option]);
      setInputValue("");
    },
    [isSelected, maxReached, onChange, setInputValue, value]
  );

  const handleRemove = useCallback(
    (option: Option) => {
      onChange(value.filter((v) => v.value !== option.value));
    },
    [onChange, value]
  );

  const handleClear = useCallback(() => {
    onChange([]);
    setInputValue("");
    close();
  }, [onChange, setInputValue, close]);

  const onSelectHighlighted = useCallback(() => {
    const option = filteredOptions[highlightedIndex];
    if (option) {
      handleSelect(option);
      return;
    }
    if (taggable && inputValue.trim() && !maxReached) {
      createOption(inputValue.trim());
    }
  }, [
    filteredOptions,
    highlightedIndex,
    handleSelect,
    taggable,
    inputValue,
    createOption,
    maxReached,
  ]);

  const handleBackspace = useCallback(() => {
    if (inputValue) return;
    if (value.length === 0) return;
    const last = value[value.length - 1];
    handleRemove(last);
  }, [inputValue, value, handleRemove]);

  const onKeyDown = useKeyboardNavigation({
    isOpen,
    open: handleOpen,
    close,
    optionsLength: filteredOptions.length,
    highlightedIndex,
    setHighlightedIndex,
    onSelect: onSelectHighlighted,
    onBackspace: handleBackspace,
  });

  const listboxId = React.useId();
  const optionIdBase = `${listboxId}-option`;
  const activeDescendant =
    highlightedIndex >= 0 ? `${optionIdBase}-${highlightedIndex}` : undefined;

  const { groups, ungrouped } = useMemo(
    () => normalizeOptions(filteredOptions),
    [filteredOptions]
  );

  const OptionComponent =
    (components?.Option as CustomComponents["Option"]) || DefaultOption;
  const DropdownComponent =
    (components?.Dropdown as CustomComponents["Dropdown"]) || DefaultDropdown;
  const SearchInputComponent =
    (components?.SearchInput as CustomComponents["SearchInput"]) ||
    DefaultSearchInput;
  const TagComponent =
    (components?.Tag as CustomComponents["Tag"]) || DefaultTag;

  const optionNodes = useMemo(() => {
    let optionIndex = -1;
    const items: React.ReactNode[] = [];

    for (let i = 0; i < ungrouped.length; i += 1) {
      optionIndex += 1;
      const option = ungrouped[i];
      items.push(
        <OptionComponent
          key={`opt-${String(option.value)}`}
          id={`${optionIdBase}-${optionIndex}`}
          option={option}
          isSelected={isSelected(option)}
          isActive={highlightedIndex === optionIndex}
          onSelect={handleSelect}
          classNames={classNames}
        />
      );
    }

    for (let g = 0; g < groups.length; g += 1) {
      const group = groups[g];
      items.push(
        <div key={`group-${group.label}`} className="rss-group">
          {group.label}
        </div>
      );
      for (let o = 0; o < group.options.length; o += 1) {
        optionIndex += 1;
        const option = group.options[o];
        items.push(
          <OptionComponent
            key={`opt-${String(option.value)}`}
            id={`${optionIdBase}-${optionIndex}`}
            option={option}
            isSelected={isSelected(option)}
            isActive={highlightedIndex === optionIndex}
            onSelect={handleSelect}
            classNames={classNames}
          />
        );
      }
    }

    if (items.length === 0 && !isLoading) {
      items.push(
        <div key="empty" className="rss-empty">
          No options
        </div>
      );
    }

    if (isLoading) {
      items.push(
        <div key="loading" className="rss-loading">
          Loading...
        </div>
      );
    }

    return items;
  }, [
    ungrouped,
    groups,
    OptionComponent,
    optionIdBase,
    highlightedIndex,
    handleSelect,
    classNames,
    isSelected,
    isLoading,
  ]);

  const controlClasses = [
    "rss-control",
    classNames?.control,
    disabled ? "rss-control--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "rss-container",
    classNames?.container,
    disabled ? "rss-container--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-activedescendant={activeDescendant}
      aria-disabled={disabled}
      onKeyDown={disabled ? noop : onKeyDown}
    >
      <div
        className={controlClasses}
        onClick={disabled ? undefined : handleToggle}
      >
        <div className="rss-tags">
          {value.map((option) => (
            <TagComponent
              key={String(option.value)}
              option={option}
              onRemove={handleRemove}
              classNames={classNames}
              disabled={disabled}
            />
          ))}
          {searchable ? (
            <SearchInputComponent
              value={inputValue}
              onChange={disabled ? noop : setInputValue}
              placeholder={value.length === 0 ? placeholder : ""}
              classNames={classNames}
              disabled={disabled}
            />
          ) : null}
        </div>
        {clearable && value.length > 0 && !disabled ? (
          <button
            type="button"
            className="rss-clear"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            ×
          </button>
        ) : null}
        <span className="rss-caret" aria-hidden="true">
          ▾
        </span>
        {name && value.length > 0
          ? value.map((v) => (
              <input
                key={String(v.value)}
                type="hidden"
                name={name}
                value={String(v.value)}
              />
            ))
          : null}
        {id ? (
          <input
            type="hidden"
            name={id}
            value={value.map((v) => v.value).join(",")}
          />
        ) : null}
      </div>

      <DropdownComponent
        id={listboxId}
        isOpen={isOpen}
        classNames={classNames}
        portal={portal}
        anchorRef={containerRef}
        multi
      >
        {virtualized && height ? (
          <VirtualList items={optionNodes} itemSize={itemSize} height={height} />
        ) : (
          optionNodes
        )}
      </DropdownComponent>
    </div>
  );
};

export default React.memo(MultiSelect);
