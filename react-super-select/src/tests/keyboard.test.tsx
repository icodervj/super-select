import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "../index";
import type { Option } from "../types";

const options: Option[] = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
  { label: "Three", value: 3 },
];

describe("Keyboard navigation", () => {
  it("selects highlighted option with Enter", () => {
    const onChange = jest.fn();
    render(<Select options={options} value={null} onChange={onChange} />);

    const combobox = screen.getByRole("combobox");
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "Enter" });

    expect(onChange).toHaveBeenCalled();
  });

  it("closes on Escape", () => {
    render(<Select options={options} value={null} onChange={() => {}} />);
    const combobox = screen.getByRole("combobox");
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "Escape" });

    const dropdown = screen.queryByRole("listbox");
    expect(dropdown).not.toBeInTheDocument();
  });
});

