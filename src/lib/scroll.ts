/**
 * Smoothly scroll to an element by id WITHOUT changing the URL hash.
 *
 * The app uses HashRouter, so a plain `<a href="#some-id">` would be read as a route
 * ("/some-id") and land on the 404 page. Use this on a button's onClick instead.
 * If the target is a <details> element, it is opened first so its content is visible.
 */
export function scrollToId(id: string, opts: { focus?: boolean } = {}): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.tagName === "DETAILS") (el as HTMLDetailsElement).open = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (opts.focus) {
    // Make non-interactive targets focusable so keyboard focus follows the scroll.
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    (el as HTMLElement).focus({ preventScroll: true });
  }
}
