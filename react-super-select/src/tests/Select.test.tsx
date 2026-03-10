import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "../index";
import type { Option } from "../types";

const options: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

describe("Select", () => {
  it("selects an option on click", () => {
    const onChange = jest.fn();
    render(<Select options={options} value={null} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Banana"));

    expect(onChange).toHaveBeenCalledWith(options[1]);
  });

  it("clears selection", () => {
    const onChange = jest.fn();
    render(
      <Select
        options={options}
        value={options[0]}
        onChange={onChange}
        clearable
      />
    );

    const clear = screen.getByLabelText("Clear selection");
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("sets aria attributes", () => {
    render(<Select options={options} value={null} onChange={() => {}} />);
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("uses virtualization for large lists", () => {
    const large = Array.from({ length: 250 }, (_, i) => ({
      label: `Item ${i}`,
      value: i,
    }));

    render(<Select options={large} value={null} onChange={() => {}} />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    expect(screen.getByTestId("virtual-list")).toBeInTheDocument();
  });
});

