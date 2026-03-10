import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  active = true
) => {
  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      if (event.target instanceof Node && el.contains(event.target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, active]);
};

