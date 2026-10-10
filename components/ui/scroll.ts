// Lenis varsa onunla, yoksa native ile akıcı kaydırma. Sticky header için offset.
const HEADER_OFFSET = -80;

type LenisLike = { scrollTo: (target: HTMLElement | number, opts?: { offset?: number }) => void };

const getLenis = (): LenisLike | undefined => (window as unknown as { __lenis?: LenisLike }).__lenis;

export function scrollToEl(target: string | HTMLElement | null, offset = HEADER_OFFSET) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset });
  else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
