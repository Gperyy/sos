import React, { useRef } from "react";
import { useScrollProgress } from "./useScrollProgress";

interface ScrollStatementProps {
  /** Masaüstü satırları (her satır ortada tam okunur, satırlar zıt yönde kayar) */
  lines: string[];
  /** Dar ekranda daha kısa satırlar */
  mobileLines?: string[];
  /** Arka plan videosu ya da görseli */
  video?: string;
  image?: string;
}

// [başlangıç vw, bitiş vw] — kırmızı eğik bloklar farklı hız ve yönde süpürür
const bars = [
  { cls: "top-[12%] h-[9vh] w-[55vw]", from: -130, to: 150 },
  { cls: "bottom-[10%] h-[11vh] w-[45vw]", from: 140, to: -170 },
  { cls: "top-[50%] h-[3vh] w-[24vw]", from: -80, to: 230 },
];

/**
 * Sabitlenen ifade anı: ekran durur, kaydırdıkça dev italik satırlar zıt yönlere akar
 * (ortada tam okunur), kırmızı eğik bloklar arkadan süpürür, arka plan yavaşça yaklaşır.
 */
const ScrollStatement: React.FC<ScrollStatementProps> = ({ lines, mobileLines, video, image }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ref = useScrollProgress<HTMLElement>((p) => {
    if (bgRef.current) bgRef.current.style.transform = `scale(${1.3 - p * 0.25})`;
    // p=0.5'te her satır tam ortada; tek satırlar sola, çift satırlar sağa akar
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const dir = i % 2 ? 1 : -1;
      el.style.transform = `translate3d(calc(${50 + dir * (p - 0.5) * 50}vw - 50%), 0, 0)`;
    });
    bars.forEach((b, i) => {
      const el = barRefs.current[i];
      if (el) el.style.transform = `translate3d(${b.from + (b.to - b.from) * p}vw, 0, 0) skewX(-20deg)`;
    });
  });

  const lineCls =
    "block w-max whitespace-nowrap text-white font-black italic uppercase leading-[1.05] tracking-tight pr-[0.12em] will-change-transform [text-shadow:0_6px_40px_rgba(0,0,0,0.65)]";
  const desktop = lines;
  const mobile = mobileLines ?? lines;

  return (
    <section ref={ref} className="relative bg-black" style={{ height: "210vh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
          {video ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.3]" src={video} />
          ) : image ? (
            <img src={image} alt="" className="w-full h-full object-cover brightness-[0.3]" />
          ) : null}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>

        {bars.map((b, i) => (
          <div
            key={i}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className={`absolute left-0 bg-[#E02F3C] will-change-transform ${b.cls}`}
            aria-hidden="true"
          ></div>
        ))}

        <h2 className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10">
          <span className="sr-only">{desktop.join(" ")}</span>
          <span className="hidden md:block" aria-hidden="true">
            {desktop.map((l, i) => (
              <span
                key={l}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`${lineCls} text-[7.5vw]`}
              >
                {l}
              </span>
            ))}
          </span>
          <span className="md:hidden" aria-hidden="true">
            {mobile.map((l, i) => (
              <span
                key={l}
                ref={(el) => {
                  lineRefs.current[desktop.length + i] = el;
                }}
                className={`${lineCls} text-[14vw]`}
              >
                {l}
              </span>
            ))}
          </span>
        </h2>
      </div>
    </section>
  );
};

export default ScrollStatement;
