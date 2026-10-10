import React, { useCallback, useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  alt: string;
}

type LenisLike = { stop: () => void; start: () => void };
const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/**
 * Sayfa içi fotoğraf görüntüleyici. Kullanım:
 *   const { open, lightbox } = useLightbox(photos);
 *   <button onClick={() => open(i)}>…</button>  …  {lightbox}
 * Esc kapatır, ← → gezinir; açıkken sayfa kaydırması durur.
 */
export function useLightbox(photos: LightboxPhoto[], { captions = true }: { captions?: boolean } = {}) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [index, close, step]);

  const current = index === null ? null : photos[index];
  const lightbox = current ? (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={close}
    >
      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        className="max-w-[92vw] max-h-[80vh] object-contain bg-white shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-0 inset-x-0 p-5 md:p-8 flex items-end justify-between gap-6 pointer-events-none">
        <p className="text-white font-black italic uppercase text-sm md:text-base">{captions ? current.alt : ""}</p>
        <span className="text-white/50 font-black italic tabular-nums text-sm">
          {String((index ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
      </div>
      <button
        onClick={close}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center text-white hover:text-[#E02F3C] transition-colors"
        aria-label="Kapat"
      >
        <X className="w-7 h-7" />
      </button>
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#E02F3C] text-white transition-colors skew-x-[-10deg]"
            aria-label="Önceki fotoğraf"
          >
            <ArrowLeft className="w-5 h-5 skew-x-[10deg]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#E02F3C] text-white transition-colors skew-x-[-10deg]"
            aria-label="Sonraki fotoğraf"
          >
            <ArrowRight className="w-5 h-5 skew-x-[10deg]" />
          </button>
        </>
      )}
    </div>
  ) : null;

  return { open: setIndex as (i: number) => void, lightbox };
}
