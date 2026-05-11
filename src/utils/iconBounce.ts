const BOUNCE_CLASS = "dock-bounce-once";

export function bounceElement(el: Element | null | undefined) {
  if (!el) return;
  if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
  el.classList.remove(BOUNCE_CLASS);
  // Force a reflow so the animation restarts on rapid re-clicks.
  void el.getBoundingClientRect();
  el.classList.add(BOUNCE_CLASS);
  const clear = () => el.classList.remove(BOUNCE_CLASS);
  el.addEventListener("animationend", clear, { once: true });
  el.addEventListener("animationcancel", clear, { once: true });
}

export function bounceIconsIn(host: Element | null | undefined) {
  if (!host) return;
  const explicit = host.querySelectorAll<Element>("[data-dock-icon]");
  if (explicit.length > 0) {
    explicit.forEach((el) => bounceElement(el));
    return;
  }
  host.querySelectorAll<Element>("svg").forEach((el) => bounceElement(el));
}
