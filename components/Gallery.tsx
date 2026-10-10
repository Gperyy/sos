import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./ui";

const IG_URL = "https://www.instagram.com/semin.ozturk/";
const IG_HANDLE = "@semin.ozturk";

// Instagram'daki son fotoğraf gönderileri (@semin.ozturk). Fotoğraflar: /public/images/instagram/<kod>.jpg
// Karelere tıklayınca gönderi Instagram'da açılır. Güncellemek için: fotoğrafı klasöre koyup listeye ekleyin
// (aspect = genişlik / yükseklik). Satırlar 3'lü; satırdaki fotoğraflar aynı yükseklikte, kırpılmadan dizilir.
const posts: { code: string; alt: string; aspect: number }[] = [
  { code: "DXmEkpMDEJG", alt: "Dünya Pilotlar Günümüz Kutlu Olsun", aspect: 1461 / 1066 },
  { code: "DVQRpfrjB-j", alt: "Dynon Avionics 2026 yılında Yeni Menekşe ile gökyüzünde", aspect: 980 / 1226 },
  { code: "DPq-TS_jJsi", alt: "Gökyüzünde dumandan kalp", aspect: 1255 / 952 },
  { code: "DOqpejdjK06", alt: "Kokpitten pist görünümü", aspect: 952 / 1269 },
  { code: "DLSA6S8sVCE", alt: "Vecihi XIV & Maysa & Pars", aspect: 1008 / 1200 },
  { code: "DG-VqyWMCIg", alt: "En güzel pazarımız", aspect: 1 },
];
const rows = [posts.slice(0, 3), posts.slice(3, 6)];

const Gallery: React.FC = () => {
  return (
    <section className="py-28 md:py-36 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <SectionHeader eyebrow="Instagram" title="Gökyüzünden Kareler" className="" />
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-ink/60 hover:text-ink text-[12px] tracking-[0.18em] uppercase font-medium transition-colors"
          >
            <Instagram className="w-4 h-4" /> {IG_HANDLE}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-2 md:gap-4 items-start">
              {row.map((p, i) => (
                <a
                  key={p.code}
                  href={`https://www.instagram.com/p/${p.code}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal-img
                  data-reveal-delay={String(i + 1)}
                  style={{ flex: `${p.aspect} 1 0%` }}
                  className="group relative block overflow-hidden bg-ink/5"
                  aria-label={`${p.alt} — Instagram'da gör`}
                >
                  <img src={`/images/instagram/${p.code}.jpg`} alt={p.alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/40 transition-colors">
                    <Instagram className="w-7 h-7 text-paper opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
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
