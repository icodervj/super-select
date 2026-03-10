import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../index";
import type { Option } from "../types";
import "../styles/base.css";

const baseOptions: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const groupedOptions: Option[] = [
  { label: "Alaska", value: "ak", group: "USA" },
  { label: "California", value: "ca", group: "USA" },
  { label: "Ontario", value: "on", group: "Canada" },
  { label: "Quebec", value: "qc", group: "Canada" },
];

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);
    return <Select options={baseOptions} value={value} onChange={setValue} />;
  },
};

export const Async: Story = {
  render: () => {
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
  },
};

export const Grouped: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);
    return (
      <Select options={groupedOptions} value={value} onChange={setValue} />
    );
  },
};

export const Tagging: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);
    return (
      <Select
        options={baseOptions}
        value={value}
        onChange={setValue}
        taggable
      />
    );
  },
};

export const Virtualized: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);
    const options = Array.from({ length: 500 }, (_, i) => ({
      label: `Item ${i}`,
      value: i,
    }));
    return <Select options={options} value={value} onChange={setValue} />;
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);
    return (
      <Select
        options={baseOptions}
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

export const Headless: Story = {
  render: () => {
    const [value, setValue] = useState<Option | null>(null);
    return (
      <div>
        <Select
          options={baseOptions}
          value={value}
          onChange={setValue}
          classNames={{
            container: "headless-container",
            control: "headless-control",
            dropdown: "headless-dropdown",
            option: "headless-option",
          }}
        />
      </div>
    );
  },
};

