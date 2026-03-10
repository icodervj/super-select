import React from "react";
import type { ClassNames } from "../types";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  classNames?: ClassNames;
  disabled?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  classNames,
  disabled,
}) => {
  return (
    <input
      className={["rss-input", classNames?.input].filter(Boolean).join(" ")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-autocomplete="list"
    />
  );
};

export default React.memo(SearchInput);

