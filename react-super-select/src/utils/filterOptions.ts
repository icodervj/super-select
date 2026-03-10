import type { Option, SearchType } from "../types";
import { normalizeText } from "./normalizeOptions";

const fuzzyMatch = (text: string, query: string): boolean => {
  if (!query) return true;
  let t = 0;
  let q = 0;
  while (t < text.length && q < query.length) {
    if (text[t] === query[q]) q += 1;
    t += 1;
  }
  return q === query.length;
};

export const filterOptions = (
  options: Option[],
  query: string,
  searchType: SearchType = "contains"
): Option[] => {
  const normQuery = normalizeText(query);
  if (!normQuery) return options;

  return options.filter((option) => {
    const label = normalizeText(option.label);
    if (searchType === "startsWith") {
      return label.startsWith(normQuery);
    }
    if (searchType === "fuzzy") {
      return fuzzyMatch(label, normQuery);
    }
    return label.includes(normQuery);
  });
};

