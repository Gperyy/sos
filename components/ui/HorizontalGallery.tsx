import React, { useEffect, useRef, useState } from "react";
import { useScrollProgress, prefersReducedMotion } from "./useScrollProgress";
import { useLightbox } from "./Lightbox";
import type { LightboxPhoto } from "./Lightbox";

interface HorizontalGalleryProps {
  photos: LightboxPhoto[];
  /** Sahnenin arkasındaki dev yazı */
  backdrop?: string;
}

// Fotoğraf yükseklikleri ve dikey hizaları sırayla değişir → dergi gibi ritim
const SCROLL_RATIO = 0.65;

const heights = ["h-[58svh]", "h-[42svh]", "h-[50svh]", "h-[38svh]", "h-[54svh]"];
const aligns = ["self-center", "self-start mt-[14svh]", "self-end mb-[16svh]", "self-center", "self-start mt-[20svh]"];

/**
 * Sabitlenen yatay galeri: ekran durur, aşağı kaydırdıkça fotoğraflar sola akar.
 * Arkada dev yazı ters yönde yavaşça kayar; altta ilerleme çubuğu.
 * Fotoğrafa tıklayınca sayfa içi görüntüleyici açılır.
 */
const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ photos, backdrop }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const [height, setHeight] = useState("300vh");
  const { open, lightbox } = useLightbox(photos, { captions: false });

  // Şeridin kaydırılacak mesafesini ölç (fotoğraflar yüklendikçe genişlik değişir)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      distance.current = Math.max(0, track.scrollWidth - window.innerWidth);
      // Şerit kaydırmadan biraz hızlı akar: kaydırma mesafesi yatay mesafenin %65'i
      setHeight(`${window.innerHeight + distance.current * SCROLL_RATIO}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const ref = useScrollProgress<HTMLElement>((p) => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${-p * distance.current}px, 0, 0)`;
    if (backRef.current) backRef.current.style.transform = `translate3d(${p * 20 - 10}vw, 0, 0)`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
  });

  const items = photos.map((ph, i) => (
    <button
      key={ph.src}
      onClick={() => open(i)}
      className={`group relative flex-shrink-0 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] ${heights[i % heights.length]} ${
        aligns[i % aligns.length]
      }`}
      aria-label={`${ph.alt} — büyüt`}
    >
      <img src={ph.src} alt={ph.alt} loading="lazy" className="h-full w-auto max-w-none block transition-transform duration-[1200ms] group-hover:scale-105" />
    </button>
  ));

  // Hareket azaltma: sabitleme yok, elle yatay kaydırılan şerit
  if (prefersReducedMotion()) {
    return (
      <div className="overflow-x-auto py-10">
        <div className="flex gap-6 px-6 sm:px-9 h-[50svh] items-stretch">{items}</div>
        {lightbox}
      </div>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {backdrop && (
          <div
            ref={backRef}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center font-black italic uppercase leading-none tracking-tighter text-white/[0.05] text-[22vw] select-none pointer-events-none will-change-transform"
            aria-hidden="true"
          >
            {backdrop}
          </div>
        )}
        <div ref={trackRef} className="relative h-full flex items-stretch gap-6 md:gap-10 pl-6 sm:pl-[8vw] pr-[8vw] w-max will-change-transform">
          {items}
        </div>
        <div className="absolute bottom-6 left-6 right-6 sm:left-9 sm:right-9 h-px bg-white/15">
          <div ref={barRef} className="absolute inset-0 bg-[#E02F3C] origin-left" style={{ transform: "scaleX(0)" }}></div>
        </div>
      </div>
      {lightbox}
    </section>
  );
};

export default HorizontalGallery;
