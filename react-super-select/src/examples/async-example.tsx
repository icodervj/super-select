import React, { useState } from "react";
import { Select } from "../index";
import type { Option } from "../types";
import "../styles/base.css";

export const AsyncExample = () => {
  const [value, setValue] = useState<Option | null>(null);

  return (
    <Select
      options={[]}
      value={value}
      onChange={setValue}
      loadOptions={async (input) => {
        return [
          { label: `Result ${input} A`, value: `${input}-a` },
          { label: `Result ${input} B`, value: `${input}-b` },
        ];
      }}
    />
  );
};

