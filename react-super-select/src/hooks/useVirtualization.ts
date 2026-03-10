import { useMemo } from "react";

export const useVirtualization = (optionsLength: number) => {
  return useMemo(() => {
    const enabled = optionsLength > 200;
    const itemSize = 36;
    const maxHeight = 240;
    const height = enabled
      ? Math.min(optionsLength * itemSize, maxHeight)
      : undefined;
    return { enabled, itemSize, height };
  }, [optionsLength]);
};

