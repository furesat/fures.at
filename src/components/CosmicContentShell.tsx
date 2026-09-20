import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useTheme } from "../contexts/ThemeContext";

type CosmicContentShellProps = {
  children: ReactNode;
};

type CosmicPayload = Record<string, string | number | boolean>;

export function CosmicContentShell({ children }: CosmicContentShellProps) {
  const theme = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const pointerFrame = useRef<number | null>(null);
  const scrollFrame = useRef<number | null>(null);

  const post = useCallback((type: string, payload: CosmicPayload = {}) => {
    frameRef.current?.contentWindow?.postMessage(
      { source: "fures-site", type, ...payload },
      "*",
    );
  }, []);

  const syncScroll = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const rootTop = window.scrollY + root.getBoundingClientRect().top;
    const travel = Math.max(window.innerHeight, root.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, (window.scrollY - rootTop) / travel));

    post("scroll", { depth: progress * 1.35 });
  }, [post]);

  useEffect(() => {
    post("theme", { light: theme === "light" });
  }, [post, theme]);

  useEffect(() => {
    const onScroll = () => {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = requestAnimationFrame(() => {
        scrollFrame.current = null;
        syncScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    syncScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    };
  }, [syncScroll]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.source !== "fures-cosmic" || event.data?.type !== "ready") return;
      post("theme", { light: theme === "light" });
      syncScroll();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [post, syncScroll, theme]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);

      const x = event.clientX / Math.max(1, window.innerWidth);
      const y = event.clientY / Math.max(1, window.innerHeight);

      pointerFrame.current = requestAnimationFrame(() => {
        pointerFrame.current = null;
        post("pointer", { x, y });
      });
    },
    [post],
  );

  const handleDoubleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as Element | null;
      if (
        target?.closest(
          "a,button,input,textarea,select,label,[role='button'],[contenteditable='true']",
        )
      ) {
        return;
      }

      event.preventDefault();
      post("pulse", {
        x: event.clientX / Math.max(1, window.innerWidth),
        y: 1 - event.clientY / Math.max(1, window.innerHeight),
      });
    },
    [post],
  );

  return (
    <div
      ref={rootRef}
      className="cosmic-site-shell"
      onPointerMove={handlePointerMove}
      onDoubleClick={handleDoubleClick}
    >
      <div className="cosmic-site-sticky" aria-hidden="true">
        <iframe
          ref={frameRef}
          className="cosmic-site-frame"
          src="/cosmic-background.html"
          title="Animated cosmic background"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => {
            post("theme", { light: theme === "light" });
            syncScroll();
          }}
        />
      </div>

      <div className="cosmic-site-content">{children}</div>
    </div>
  );
}
