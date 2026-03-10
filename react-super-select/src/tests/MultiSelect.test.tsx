import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MultiSelect } from "../index";
import type { Option } from "../types";

const options: Option[] = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Gamma", value: "c" },
];

describe("MultiSelect", () => {
  it("selects multiple options", () => {
    const onChange = jest.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Alpha"));
    fireEvent.click(screen.getByText("Beta"));

    expect(onChange).toHaveBeenCalledWith([options[0]]);
    expect(onChange).toHaveBeenCalledWith([options[0], options[1]]);
  });

  it("removes tag on backspace", () => {
    const onChange = jest.fn();
    render(
      <MultiSelect options={options} value={[options[0]]} onChange={onChange} />
    );

    const combobox = screen.getByRole("combobox");
    fireEvent.keyDown(combobox, { key: "Backspace" });
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("respects max selections", () => {
    const onChange = jest.fn();
    render(
      <MultiSelect
        options={options}
        value={[options[0]]}
        onChange={onChange}
        maxSelections={1}
      />
    );

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Beta"));
    expect(onChange).not.toHaveBeenCalledWith([options[0], options[1]]);
  });
});

