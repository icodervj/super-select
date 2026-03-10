import React, { useState } from "react";
import { MultiSelect } from "../index";
import type { Option } from "../types";
import "../styles/base.css";

const options: Option[] = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Gamma", value: "c" },
];

export const MultiSelectExample = () => {
  const [value, setValue] = useState<Option[]>([]);
  return (
    <MultiSelect options={options} value={value} onChange={setValue} clearable />
  );
};

