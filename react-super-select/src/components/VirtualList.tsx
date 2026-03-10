import React, { useCallback } from "react";
import { FixedSizeList as List } from "react-window";

export type VirtualListProps = {
  items: React.ReactNode[];
  itemSize: number;
  height: number;
  width?: number | string;
};

const VirtualList: React.FC<VirtualListProps> = ({
  items,
  itemSize,
  height,
  width = "100%",
}) => {
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      return <div style={style}>{items[index]}</div>;
    },
    [items]
  );

  return (
    <div data-testid="virtual-list" data-virtualized="true">
      <List height={height} itemCount={items.length} itemSize={itemSize} width={width}>
        {Row}
      </List>
    </div>
  );
};

export default React.memo(VirtualList);

