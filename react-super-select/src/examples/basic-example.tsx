import React, { useState } from "react";
import { Select } from "../index";
import type { Option } from "../types";
import "../styles/base.css";

const options: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

export const BasicExample = () => {
  const [value, setValue] = useState<Option | null>(null);
  return <Select options={options} value={value} onChange={setValue} />;
};

