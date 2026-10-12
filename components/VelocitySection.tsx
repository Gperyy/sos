import React, { useRef, useState } from "react";
import { useScrollProgress, scrollToProgress, clamp01 } from "./ui/useScrollProgress";
import { useLang, useT, pick } from "./ui";
import type { Tx } from "./ui";

interface CareerMoment {
  year: string;
  title: Tx;
  description: Tx;
  // Görseli değiştirmek için: /public/images içine koyup "/images/dosya.jpg" yazın.
  thumbnail: string;
}

const careerMoments: CareerMoment[] = [
  {
    year: "2003",
    title: { tr: "İlk Akrobasi Uçuşu", en: "First Aerobatic Flight" },
    description: {
      tr: "Babası Milli Akrobasi Pilotu Ali İsmet Öztürk ile birlikte ilk akrobasi uçuşu — bir ömürlük tutkunun başlangıcı.",
      en: "Her first aerobatic flight, alongside her father, national aerobatic pilot Ali Ismet Öztürk — the start of a lifelong passion.",
    },
    thumbnail: "/images/kariyer-2003.jpg",
  },
  {
    year: "2012",
    title: { tr: "İlk Yalnız Akrobasi", en: "First Solo Aerobatics" },
    description: {
      tr: "Pitts S-2B uçağıyla bu tip uçakta ilk yalnız uçan Türk kadın pilotu oldu.",
      en: "Became the first Turkish female pilot to fly the Pitts S-2B solo.",
    },
    thumbnail: "/images/kariyer-2012.jpg",
  },
  {
    year: "2015",
    title: { tr: "İlk Profesyonel Gösteri", en: "First Professional Display" },
    description: {
      tr: "SHG Airshow'da ilk profesyonel hava gösterisini yaparak Türkiye'nin ilk profesyonel kadın akrobasi pilotu olarak tarihe geçti.",
      en: "Made history as Türkiye's first professional female aerobatic pilot with her first professional display at SHG Airshow.",
    },
    thumbnail: "/images/kariyer-2015.jpg",
  },
  {
    year: "2016",
    title: { tr: "İlk Helikopter Lisansı", en: "First Helicopter License" },
    description: {
      tr: "PPL(H) ile Türkiye'nin ilk sivil kadın helikopter pilotu unvanını aldı.",
      en: "Earned her PPL(H), becoming Türkiye's first civilian female helicopter pilot.",
    },
    thumbnail: "/images/kariyer-2016.jpg",
  },
  {
    year: "2018",
    title: { tr: "İlk Uluslararası Gösteri", en: "First International Display" },
    description: {
      tr: "Romanya'daki AEROMANIA'da ilk yurtdışı gösterisini yaparak Türk bayrağını gururla temsil etti.",
      en: "Flew her first display abroad at AEROMANIA in Romania, proudly representing the Turkish flag.",
    },
    thumbnail: "/images/kariyer-2018.jpg",
  },
  {
    year: "2020",
    title: { tr: "Uluslararası Tanıtım", en: "On the World Stage" },
    description: {
      tr: "Unilever'in yedi ülkede yayınlanan reklam filmlerinde yer alarak dünya sahnesinde boy gösterdi.",
      en: "Appeared in Unilever commercials aired in seven countries, stepping onto the world stage.",
    },
    thumbnail: "/images/kariyer-2020.jpg",
  },
  {
    year: "2022",
    title: { tr: "İki Milyon Seyirci", en: "Two Million Spectators" },
    description: {
      tr: "İzmir'in kurtuluşunun 100. yılında İzmir Körfezi'nde iki milyon kişiye gösteri yaptı; babasından 'Mor Menekşe'yi devraldı.",
      en: "Performed for two million people over the Gulf of Izmir on the 100th anniversary of Izmir's liberation, and took over 'Mor Menekşe' from her father.",
    },
    thumbnail: "/images/kariyer-2022.jpg",
  },
  {
    year: "2023",
    title: { tr: "Yeni Menekşe ile Avrupa", en: "Europe with Yeni Menekşe" },
    description: {
      tr: "Yenilenen 'Yeni Menekşe' ile Almanya'daki Flugtage Bautzen'de uluslararası sahneye çıkarak ülkemizi temsil etti.",
      en: "Took the renewed 'Yeni Menekşe' to the international stage at Flugtage Bautzen in Germany, representing Türkiye.",
    },
    thumbnail: "/images/kariyer-2023.jpg",
  },
];

const N = careerMoments.length;
const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden";
};

/* ------------------------------------------------------------------ */
/* Kariyer sahnesi: kaydırdıkça fotoğraflar derinlikten kameraya uçar  */
/* ------------------------------------------------------------------ */
const CareerFlight: React.FC = () => {
  const lang = useLang();
  const tx = useT(); // `t` aşağıda animasyon ilerlemesi için kullanılıyor
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const yearRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const ref = useScrollProgress<HTMLElement>((p) => {
    const pos = p * N; // 0 → N
    photoRefs.current.forEach((el, i) => {
      if (!el) return;
      // 0 = bu anın tam ortası; son fotoğraf uçup gitmez, sahnede kalır
      const t = i === N - 1 ? Math.min(0, pos - i - 0.5) : pos - i - 0.5;
      let scale: number, opacity: number;
      if (t < 0) {
        // derinlikten yaklaşır
        const a = clamp01((t + 1.3) / 1.3);
        scale = 0.2 + a * 0.8;
        opacity = clamp01((t + 1.3) / 0.45);
      } else {
        // kameraya çarpıp geçer
        scale = 1 + t * 1.1;
        opacity = clamp01(1 - t * 1.8);
      }
      const dir = i % 2 ? 1 : -1;
      const x = dir * -t * 16; // vw — gelen fotoğraf yandan görünsün
      const y = -t * 10; // vh
      el.style.opacity = String(opacity);
      el.style.zIndex = String(Math.round((t + 3) * 10));
      el.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${scale}) rotate(${dir * t * 3}deg)`;
      el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
    });

    if (yearRef.current) yearRef.current.style.transform = `translate3d(${-((pos % 1) - 0.5) * 8}vw, 0, 0)`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

    const idx = Math.min(N - 1, Math.max(0, Math.floor(pos)));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  });

  const current = careerMoments[active];

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: `${N * 80 + 100}vh` }} aria-label={tx("Kariyer dönüm noktaları", "Career milestones")}>
      <div className="career-stage sticky top-0 h-[100svh] overflow-hidden text-white">
        {/* Arkada dev, soluk yıl */}
        <div
          ref={yearRef}
          className="hidden md:block absolute -right-[4vw] bottom-[8vh] font-black italic text-[30vw] leading-none tracking-[0.08em] pr-[0.1em] text-white/[0.07] select-none pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          {current.year}
        </div>

        {/* Uçan fotoğraflar */}
        {/* Mobil: fotoğraf yazıyla aynı sol kenarda (--pad), genişliği ekran yüksekliğine göre sınırlı (--pw) */}
        <div className="absolute inset-0 flex items-start md:items-center justify-start md:justify-end pl-[var(--pad)] pt-[var(--top)] md:pl-0 md:pt-0 md:pr-[10vw]">
          <div className="relative w-[var(--pw)] md:w-[42vw] max-w-[620px] aspect-[4/3]">
            {careerMoments.map((m, i) => (
              <div
                key={i}
                ref={(el) => { photoRefs.current[i] = el; }}
                className="absolute inset-0 bg-[#18181b] will-change-transform shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                style={{ opacity: 0 }}
              >
                {/* Link ölürse kırık ikon yerine koyu kutu kalsın */}
                <img src={m.thumbnail} alt={pick(m.title, lang)} className="w-full h-full object-cover" onError={hideBroken} />
                <span className="absolute -bottom-3 left-0 md:left-4 bg-[#E02F3C] text-white font-black italic text-sm px-3 py-1 skew-x-[-10deg]">
                  <span className="block skew-x-[10deg]">{m.year}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metin */}
        {/* Mobil: metin her zaman fotoğrafın hemen altından başlar (ekran boyu ne olursa olsun çakışmaz) */}
        <div className="absolute inset-x-0 top-[calc(var(--top)_+_var(--pw)_*_0.75_+_40px)] md:top-1/2 md:-translate-y-1/2 z-[60] pointer-events-none">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
            <div key={active} className="max-w-[min(440px,100%)] md:max-w-[34vw]">
              <span className="slam-in block font-black italic text-[#E02F3C] text-6xl md:text-8xl leading-[0.85] tracking-[0.04em] pr-[0.08em]">
                {current.year}
              </span>
              <h3 className="slam-in slam-in-2 font-black italic uppercase text-2xl md:text-4xl mt-4 leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
                {pick(current.title, lang)}
              </h3>
              <p className="slam-in slam-in-3 text-white/70 text-base md:text-lg font-medium leading-relaxed mt-3 [text-shadow:0_2px_16px_rgba(0,0,0,0.9)]">
                {pick(current.description, lang)}
              </p>
              {/* Mobil: dev soluk yıl metnin altında, arada sabit boşlukla; kısa ekranlarda yer olmadığı için gizli (masaüstünde sağ altta) */}
              <span
                className="md:hidden block [@media(max-height:760px)]:hidden mt-6 font-black italic text-[30vw] leading-none tracking-[0.08em] text-white/[0.07] select-none"
                aria-hidden="true"
              >
                {current.year}
              </span>
            </div>
          </div>
        </div>

        {/* Yıl çizelgesi */}
        <div className="absolute bottom-0 inset-x-0 z-[80] bg-gradient-to-t from-black/80 to-transparent pt-10 pb-6">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
            <div className="relative h-px bg-white/15">
              <div ref={barRef} className="absolute inset-0 bg-[#E02F3C] origin-left" style={{ transform: "scaleX(0)" }}></div>
            </div>
            <div className="grid mt-3" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
              {careerMoments.map((m, i) => (
                <button
                  key={i}
                  onClick={() => scrollToProgress(ref.current, (i + 0.5) / N)}
                  className={`text-left font-black italic tabular-nums text-xs md:text-sm transition-colors ${
                    i === active ? "text-[#E02F3C]" : "text-white/35 hover:text-white/70"
                  }`}
                  aria-label={`${m.year} — ${pick(m.title, lang)}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  {m.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sahne tamamen kullanıcının kaydırmasıyla ilerler (kendiliğinden oynamaz); bu yüzden
// "hareketi azalt" açık telefonlarda da animasyonlu sahne gösterilir.
const VelocitySection: React.FC = () => {
  const t = useT();
  return (
    <div id="performance-video">
      <div className="bg-ink pt-16 md:pt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
          {/* Sade, tek satır başlık — sahnenin önünde baskın durmasın */}
          <div className="flex items-center gap-3" data-reveal>
            <div className="reveal-bar h-6 w-1.5 flex-shrink-0 bg-[#E02F3C] transform skew-x-[-15deg]"></div>
            <h2 className="whitespace-nowrap text-white/80 text-lg md:text-2xl font-black italic uppercase tracking-tight">
              {t("Kariyer Yolculuğu", "Career Journey")}
            </h2>
          </div>
        </div>
      </div>
      <CareerFlight />
    </div>
  );
};

export default VelocitySection;
