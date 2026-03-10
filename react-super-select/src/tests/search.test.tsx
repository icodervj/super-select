import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "../index";
import type { Option } from "../types";

const options: Option[] = [
  { label: "Apple", value: "a" },
  { label: "Apricot", value: "b" },
  { label: "Banana", value: "c" },
];

describe("Search", () => {
  it("filters options by search text", () => {
    render(<Select options={options} value={null} onChange={() => {}} />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "ap" } });

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Apricot")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("loads async options", async () => {
    jest.useFakeTimers();

    const loadOptions = jest.fn(async (input: string) => {
      return [{ label: `Result ${input}`, value: input }];
    });

    render(
      <Select
        options={[]}
        value={null}
        onChange={() => {}}
        loadOptions={loadOptions}
      />
    );

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "X" } });

    await act(async () => {
      jest.advanceTimersByTime(260);
      await Promise.resolve();
    });

    expect(loadOptions).toHaveBeenCalledWith("X");
    expect(await screen.findByText("Result X")).toBeInTheDocument();

    jest.useRealTimers();
  });
});

