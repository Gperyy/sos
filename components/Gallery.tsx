import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";

const IG_URL = "https://www.instagram.com/semin.ozturk/";
const IG_HANDLE = "@semin.ozturk";

// Instagram'daki seçili fotoğraf gönderileri (@semin.ozturk). Fotoğraflar: /public/images/instagram/<kod>.jpg
// Karelere tıklayınca gönderi Instagram'da açılır. Güncellemek için: fotoğrafı klasöre koyup listeye ekleyin
// (aspect = genişlik / yükseklik). Az ama büyük: masaüstünde 2×2, mobilde kaydırılan tek sıra; kırpma yok.
const posts: { code: string; alt: string; aspect: number }[] = [
  { code: "DXmEkpMDEJG", alt: "Dünya Pilotlar Günümüz Kutlu Olsun", aspect: 1461 / 1066 },
  { code: "DVQRpfrjB-j", alt: "Dynon Avionics 2026 yılında Yeni Menekşe ile gökyüzünde", aspect: 980 / 1226 },
  { code: "DOqpejdjK06", alt: "Kokpitten pist görünümü", aspect: 952 / 1269 },
  { code: "DPq-TS_jJsi", alt: "Gökyüzünde dumandan kalp", aspect: 1255 / 952 },
];
const rows = [posts.slice(0, 2), posts.slice(2, 4)];

const PostLink: React.FC<{ p: (typeof posts)[number]; className?: string; style?: React.CSSProperties; delay?: number }> = ({ p, className = "", style, delay }) => (
  <a
    href={`https://www.instagram.com/p/${p.code}/`}
    target="_blank"
    rel="noopener noreferrer"
    data-reveal-img
    data-reveal-delay={delay ? String(delay) : undefined}
    style={style}
    className={`group relative block overflow-hidden bg-ink/5 ${className}`}
    aria-label={`${p.alt} — Instagram'da gör`}
  >
    <img src={`/images/instagram/${p.code}.jpg`} alt={p.alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-105" />
    <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-colors">
      <Instagram className="w-8 h-8 text-paper opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </a>
);

const Gallery: React.FC = () => {
  return (
    <section className="py-28 md:py-36 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <div className="flex items-center gap-4" data-reveal>
            <div className="reveal-bar h-10 w-2 flex-shrink-0 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
            <h2 lang="en" className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-[#E02F3C] pr-1">Instagram</h2>
          </div>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-ink/60 hover:text-ink text-[12px] tracking-[0.18em] uppercase font-medium transition-colors"
          >
            <Instagram className="w-4 h-4" /> <span lang="en">{IG_HANDLE}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Masaüstü: 2×2, her satırdaki iki fotoğraf aynı yükseklikte, kırpılmadan */}
        <div className="hidden md:flex flex-col gap-5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-5 items-start">
              {row.map((p, i) => (
                <PostLink key={p.code} p={p} delay={i + 1} style={{ flex: `${p.aspect} 1 0%` }} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobil: parmakla kaydırılan tek sıra; yandaki fotoğrafın ucu görünür */}
        <div className="md:hidden -mx-6 px-6 flex gap-4 items-center overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.map((p) => (
            <PostLink
              key={p.code}
              p={p}
              className="flex-shrink-0 snap-center"
              style={{ width: `min(84vw, ${Math.round(400 * p.aspect)}px)` }}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-[#c91f2b] text-white px-8 py-4 text-[12px] tracking-[0.18em] uppercase font-semibold transition-colors"
          >
            <Instagram className="w-4 h-4" /> Instagram'da Takip Et
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
