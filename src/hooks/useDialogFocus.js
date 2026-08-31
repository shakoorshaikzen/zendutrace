import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Focus management for a modal dialog: moves focus inside on open, keeps Tab
 * cycling within it, and hands focus back to whatever opened it on close.
 *
 * The dialogs already declare aria-modal="true". Without this the claim is
 * false — focus stays behind the overlay and Tab walks into the page the
 * dialog says is inert. Give the container tabIndex={-1} so it can hold focus
 * when it has no focusable children yet.
 *
 * Escape stays with the window-level handler in App.jsx; there is no point
 * duplicating it here, because the one case that would justify it — focus
 * sitting on a native <video controls> — dispatches no key events to the page
 * at all, so no DOM listener anywhere can see them.
 */
export default function useDialogFocus(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const previous = document.activeElement;
    const visible = () =>
      Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length,
      );

    (visible()[0] || node).focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const items = visible();
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const head = items[0];
      const tail = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === head || !node.contains(active))) {
        e.preventDefault();
        tail.focus();
      } else if (!e.shiftKey && active === tail) {
        e.preventDefault();
        head.focus();
      }
    };

    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('keydown', onKey);
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [ref]);
}
