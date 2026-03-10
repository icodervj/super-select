import React, { useCallback } from "react";
import type { ClassNames, Option } from "../types";

export type TagProps = {
  option: Option;
  onRemove: (option: Option) => void;
  classNames?: ClassNames;
  disabled?: boolean;
};

const Tag: React.FC<TagProps> = ({ option, onRemove, classNames, disabled }) => {
  const handleRemove = useCallback(() => onRemove(option), [onRemove, option]);

  return (
    <span
      className={["rss-tag", classNames?.tag].filter(Boolean).join(" ")}
      data-value={String(option.value)}
    >
      {option.label}
      <button
        type="button"
        className={["rss-tag__remove", classNames?.tagRemove]
          .filter(Boolean)
          .join(" ")}
        onClick={handleRemove}
        aria-label={`Remove ${option.label}`}
        disabled={disabled}
      >
        ×
      </button>
    </span>
  );
};

export default React.memo(Tag);

