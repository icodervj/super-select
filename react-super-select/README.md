# react-super-select

A lightweight, accessible, highly customizable React select and multi-select component library designed natively for React with optional headless mode, Bootstrap compatibility, and virtualized lists.

## Installation

```bash
npm install react-super-select
```

or

```bash
yarn add react-super-select
```

## Usage

### Single Select

```tsx
import React, { useState } from "react";
import { Select } from "react-super-select";
import "react-super-select/styles/base.css";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

export const Example = () => {
  const [value, setValue] = useState(null);
  return <Select options={options} value={value} onChange={setValue} />;
};
```

### Multi Select

```tsx
import React, { useState } from "react";
import { MultiSelect } from "react-super-select";
import "react-super-select/styles/base.css";

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Gamma", value: "c" },
];

export const Example = () => {
  const [value, setValue] = useState([]);
  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={setValue}
      clearable
      searchable
    />
  );
};
```

### Async Search

```tsx
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
```

## Styling Guide

The library supports three styling modes:

1. Headless: import no CSS and provide all styles yourself.
2. Default Theme: import the minimal base styles.
3. Bootstrap Theme: import Bootstrap-compatible styles.

```tsx
import "react-super-select/styles/base.css"; // default theme
// or
import "react-super-select/styles/bootstrap.css"; // bootstrap theme
```

### Class Overrides

Use the `classNames` prop to override classes per element.

```tsx
<Select
  options={options}
  value={value}
  onChange={setValue}
  classNames={{
    container: "my-container",
    control: "my-control",
    dropdown: "my-dropdown",
    option: "my-option",
  }}
/>
```

## Accessibility Guide

This library follows the WAI-ARIA combobox pattern:

- Container: `role="combobox"`
- Dropdown: `role="listbox"`
- Option: `role="option"`
- Multi-select listbox: `aria-multiselectable="true"`
- Selected options: `aria-selected="true"`

Keyboard interactions:

- ArrowDown: next option
- ArrowUp: previous option
- Enter: select
- Escape: close dropdown
- Backspace: remove last tag (multi)
- Tab: exit

## API Documentation

### `Select`

Props:

- `options: Option[]`
- `value: Option | null`
- `onChange: (value: Option | null) => void`
- `searchable?: boolean`
- `clearable?: boolean`
- `disabled?: boolean`
- `searchType?: "startsWith" | "contains" | "fuzzy"`
- `classNames?: ClassNames`
- `components?: CustomComponents`
- `portal?: boolean | HTMLElement`
- `taggable?: boolean`
- `onCreateOption?: (input: string) => Option`
- `loadOptions?: (input: string) => Promise<Option[]>`
- `debounceMs?: number`

### `MultiSelect`

Props:

- All `Select` props
- `value: Option[]`
- `onChange: (value: Option[]) => void`
- `maxSelections?: number`

### `Option` type

```ts
type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
  meta?: Record<string, any>;
};
```

### `ClassNames`

```ts
type ClassNames = {
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
```

### `CustomComponents`

```ts
type CustomComponents = {
  Option?: React.ComponentType;
  Tag?: React.ComponentType;
  Dropdown?: React.ComponentType;
  SearchInput?: React.ComponentType;
};
```

## Performance Benchmarks

- Core bundle target: under 8kb gzipped
- Full bundle target: under 18kb gzipped
- First render target: under 20ms
- Dropdown open target: under 10ms

Internal optimizations include memoized components, virtualization for large lists (over 200 options), and debounced search input (250ms).

## SSR Support

The components are safe for Next.js, Remix, and Astro. All browser-only APIs are accessed in effects.

## License

MIT

