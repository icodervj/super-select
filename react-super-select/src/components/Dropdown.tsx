import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { ClassNames } from "../types";

export type DropdownProps = {
  id?: string;
  isOpen: boolean;
  children: React.ReactNode;
  classNames?: ClassNames;
  portal?: boolean | HTMLElement;
  anchorRef?: React.RefObject<HTMLElement>;
  multi?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  id,
  isOpen,
  children,
  classNames,
  portal,
  anchorRef,
  multi,
}) => {
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (!portal || !isOpen) return;
    if (typeof window === "undefined") return;
    const anchor = anchorRef?.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setStyle({
      position: "absolute",
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      zIndex: 9999,
    });
  }, [portal, isOpen, anchorRef]);

  const dropdown = (
    <div
      id={id}
      role="listbox"
      aria-multiselectable={multi || undefined}
      className={["rss-dropdown", classNames?.dropdown].filter(Boolean).join(" ")}
      style={style}
      data-open={isOpen}
    >
      {children}
    </div>
  );

  const portalContainer = useMemo(() => {
    if (!portal) return null;
    if (typeof document === "undefined") return null;
    if (portal instanceof HTMLElement) return portal;
    return document.body;
  }, [portal]);

  if (!isOpen) return null;

  if (portalContainer) return createPortal(dropdown, portalContainer);

  return dropdown;
};

export default React.memo(Dropdown);

