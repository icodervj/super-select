import { useCallback } from "react";

type Params = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  optionsLength: number;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  onSelect: () => void;
  onBackspace?: () => void;
};

export const useKeyboardNavigation = ({
  isOpen,
  open,
  close,
  optionsLength,
  highlightedIndex,
  setHighlightedIndex,
  onSelect,
  onBackspace,
}: Params) => {
  return useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (optionsLength === 0) return;
        if (!isOpen) {
          open();
          setHighlightedIndex(0);
          return;
        }
        const next = (highlightedIndex + 1) % optionsLength;
        setHighlightedIndex(next);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (optionsLength === 0) return;
        if (!isOpen) {
          open();
          setHighlightedIndex(optionsLength - 1);
          return;
        }
        const prev = (highlightedIndex - 1 + optionsLength) % optionsLength;
        setHighlightedIndex(prev);
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (isOpen) onSelect();
        else open();
      } else if (event.key === "Escape") {
        if (isOpen) {
          event.preventDefault();
          close();
        }
      } else if (event.key === "Backspace") {
        if (onBackspace) onBackspace();
      } else if (event.key === "Tab") {
        close();
      }
    },
    [
      isOpen,
      open,
      close,
      optionsLength,
      highlightedIndex,
      setHighlightedIndex,
      onSelect,
      onBackspace,
    ]
  );
};
