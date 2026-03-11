import type React from "react";

export type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  meta?: Record<string, any>;
};

export type SearchType = "startsWith" | "contains" | "fuzzy";

export type ClassNames = {
  container?: string;
  control?: string;
  input?: string;
  dropdown?: string;
  option?: string;
  optionActive?: string;
  optionSelected?: string;
  tag?: string;
  tagRemove?: string;
  placeholder?: string;
};

export type CustomComponents = {
  Option?: React.ComponentType<any>;
  Tag?: React.ComponentType<any>;
  Dropdown?: React.ComponentType<any>;
  SearchInput?: React.ComponentType<any>;
};

export type BaseSelectProps = {
  options: Option[];
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  showCheckboxes?: boolean;
  searchType?: SearchType;
  classNames?: ClassNames;
  components?: CustomComponents;
  portal?: boolean | HTMLElement;
  maxSelections?: number;
  taggable?: boolean;
  onCreateOption?: (input: string) => Option;
  loadOptions?: (input: string) => Promise<Option[]>;
  debounceMs?: number;
  id?: string;
  name?: string;
};

export type SelectProps = BaseSelectProps & {
  value: Option | null;
  onChange: (value: Option | null) => void;
};

export type MultiSelectProps = BaseSelectProps & {
  value: Option[];
  onChange: (value: Option[]) => void;
  multiple?: true;
};

export type FlattenedItem =
  | { type: "group"; label: string }
  | { type: "option"; option: Option };

export type SelectState = {
  isOpen: boolean;
  inputValue: string;
  highlightedIndex: number;
};
