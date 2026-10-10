import { useEffect, useRef } from "react";

/**
 * Sabitlenen (sticky) bir bölümün kaydırma ilerlemesini 0→1 olarak her karede bildirir.
 * Bölüm yüksekliği > ekran olmalı; içindeki sahne `sticky top-0 h-screen` olur.
 * Callback React render'ı tetiklemeden stilleri doğrudan yazmak içindir (60fps).
 */
export function useScrollProgress<T extends HTMLElement>(onProgress: (p: number) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      cb.current(p);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}

/** Bölümün belirli bir ilerleme noktasına (0→1) kaydırır. */
export function scrollToProgress(el: HTMLElement | null, p: number) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const y = top + (el.offsetHeight - window.innerHeight) * p;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: { duration?: number }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
