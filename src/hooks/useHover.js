import { useState } from 'react';

// Tiny reusable hover hook for merging style-hover behavior.
// Usage: const [hovered, hoverProps] = useHover();
// <div style={{...base, ...(hovered ? hoverStyle : {})}} {...hoverProps} />
export function useHover() {
  const [hovered, setHovered] = useState(false);
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return [hovered, hoverProps];
}
