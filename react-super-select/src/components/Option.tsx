import React, { useCallback } from "react";
import type { ClassNames, Option as OptionType } from "../types";

export type OptionProps = {
  option: OptionType;
  isSelected: boolean;
  isActive: boolean;
  onSelect: (option: OptionType) => void;
  classNames?: ClassNames;
  id?: string;
  showCheckboxes?: boolean;
};

const Option: React.FC<OptionProps> = ({
  option,
  isSelected,
  isActive,
  onSelect,
  classNames,
  id,
  showCheckboxes,
}) => {
  const classes = [
    "rss-option",
    classNames?.option,
    isActive ? "rss-option--active" : "",
    isActive ? classNames?.optionActive : "",
    isSelected ? "rss-option--selected" : "",
    isSelected ? classNames?.optionSelected : "",
    option.disabled ? "rss-option--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = useCallback(() => {
    if (!option.disabled) onSelect(option);
  }, [onSelect, option]);

  return (
    <div
      id={id}
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled}
      className={classes}
      onClick={handleClick}
      data-value={String(option.value)}
    >
      {showCheckboxes ? (
        <span className="rss-option__checkbox" aria-hidden="true">
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            tabIndex={-1}
            disabled={option.disabled}
            data-testid="rss-option-checkbox"
          />
        </span>
      ) : null}
      {option.label}
    </div>
  );
};

export default React.memo(Option);
