import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Option, SearchType } from "../types";
import { debounce } from "../utils/debounce";
import { filterOptions } from "../utils/filterOptions";

type Params = {
  options: Option[];
  searchable?: boolean;
  searchType?: SearchType;
  loadOptions?: (input: string) => Promise<Option[]>;
  debounceMs?: number;
  extraOptions?: Option[];
};

export const useSelectState = ({
  options,
  searchable = true,
  searchType,
  loadOptions,
  debounceMs = 250,
  extraOptions = [],
}: Params) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [asyncOptions, setAsyncOptions] = useState<Option[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const baseOptions = asyncOptions ?? options;
  const mergedOptions = useMemo(() => {
    if (!extraOptions.length) return baseOptions;
    return [...extraOptions, ...baseOptions];
  }, [baseOptions, extraOptions]);

  const filteredOptions = useMemo(() => {
    if (!searchable) return mergedOptions;
    return filterOptions(mergedOptions, inputValue, searchType);
  }, [mergedOptions, inputValue, searchType, searchable]);

  useEffect(() => {
    if (!loadOptions) return;

    const handler = debounce(async (value: string) => {
      setIsLoading(true);
      try {
        const result = await loadOptions(value);
        if (mountedRef.current) setAsyncOptions(result);
      } finally {
        if (mountedRef.current) setIsLoading(false);
      }
    }, debounceMs);

    handler(inputValue);
    return () => handler.cancel();
  }, [inputValue, loadOptions, debounceMs]);

  useEffect(() => {
    if (highlightedIndex >= filteredOptions.length) {
      setHighlightedIndex(0);
    }
  }, [filteredOptions.length, highlightedIndex]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    inputValue,
    setInputValue,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    isLoading,
  };
};

