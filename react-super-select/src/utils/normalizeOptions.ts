import type { Option } from "../types";

export const normalizeText = (value: string): string => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

export const normalizeOptions = (options: Option[]) => {
  const groups: { label: string; options: Option[] }[] = [];
  const groupIndex = new Map<string, number>();
  const ungrouped: Option[] = [];

  for (let i = 0; i < options.length; i += 1) {
    const option = options[i];
    if (option.group) {
      const key = option.group;
      const idx = groupIndex.get(key);
      if (idx === undefined) {
        groupIndex.set(key, groups.length);
        groups.push({ label: key, options: [option] });
      } else {
        groups[idx].options.push(option);
      }
    } else {
      ungrouped.push(option);
    }
  }

  return { groups, ungrouped };
};

