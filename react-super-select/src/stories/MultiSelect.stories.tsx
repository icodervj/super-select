import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "../index";
import type { Option } from "../types";
import "../styles/base.css";

const options: Option[] = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Gamma", value: "c" },
  { label: "Delta", value: "d" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "MultiSelect",
  component: MultiSelect,
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Multi: Story = {
  render: () => {
    const [value, setValue] = useState<Option[]>([]);
    return <MultiSelect options={options} value={value} onChange={setValue} />;
  },
};

export const Tagging: Story = {
  render: () => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        taggable
      />
    );
  },
};

export const Virtualized: Story = {
  render: () => {
    const [value, setValue] = useState<Option[]>([]);
    const large = Array.from({ length: 500 }, (_, i) => ({
      label: `Item ${i}`,
      value: i,
    }));
    return <MultiSelect options={large} value={value} onChange={setValue} />;
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState<Option[]>([]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        classNames={{
          container: "demo-container",
          control: "demo-control",
          dropdown: "demo-dropdown",
          option: "demo-option",
        }}
      />
    );
  },
};

