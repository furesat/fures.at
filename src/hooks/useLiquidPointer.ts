import { useCallback, useRef, type CSSProperties, type PointerEvent } from "react";

/**
 * Tracks pointer position over an element and writes the relative
 * position into CSS custom properties (--lg-x, --lg-y, --rx, --ry).
 *
 * Pair with `.liquid-glass-card .liquid-spotlight` or
 * `.liquid-capsule .liquid-ripple` for a soft light that follows the cursor.
 */
export function useLiquidPointer<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--lg-x", `${x}%`);
    el.style.setProperty("--lg-y", `${y}%`);
    el.style.setProperty("--rx", `${x}%`);
    el.style.setProperty("--ry", `${y}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--lg-x", "50%");
    el.style.setProperty("--lg-y", "50%");
    el.style.setProperty("--rx", "50%");
    el.style.setProperty("--ry", "50%");
  }, []);

  const initialStyle: CSSProperties = {
    ["--lg-x" as string]: "50%",
    ["--lg-y" as string]: "50%",
    ["--rx" as string]: "50%",
    ["--ry" as string]: "50%",
  };

  return { ref, onPointerMove, onPointerLeave, initialStyle } as const;
}
