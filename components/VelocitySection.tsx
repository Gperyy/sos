import React, { useRef, useState } from "react";
import { SectionHeader } from "./ui";
import { useScrollProgress, scrollToProgress, clamp01, prefersReducedMotion } from "./ui/useScrollProgress";

interface CareerMoment {
  year: string;
  title: string;
  description: string;
  // Görseli değiştirmek için: /public/images içine koyup "/images/dosya.jpg" yazın.
  thumbnail: string;
}

const careerMoments: CareerMoment[] = [
  { year: "2003", title: "İlk Akrobasi Uçuşu", description: "Babası Milli Akrobasi Pilotu Ali İsmet Öztürk ile birlikte ilk akrobasi uçuşu — bir ömürlük tutkunun başlangıcı.", thumbnail: "/images/kariyer-2003.jpg" },
  { year: "2012", title: "İlk Yalnız Akrobasi", description: "Pitts S-2B uçağıyla bu tip uçakta ilk yalnız uçan Türk kadın pilotu oldu.", thumbnail: "/images/kariyer-2012.jpg" },
  { year: "2015", title: "İlk Profesyonel Gösteri", description: "SHG Airshow'da ilk profesyonel hava gösterisini yaparak Türkiye'nin ilk profesyonel kadın akrobasi pilotu olarak tarihe geçti.", thumbnail: "/images/kariyer-2015.jpg" },
  { year: "2016", title: "İlk Helikopter Lisansı", description: "PPL(H) ile Türkiye'nin ilk sivil kadın helikopter pilotu unvanını aldı.", thumbnail: "/images/kariyer-2016.jpg" },
  { year: "2018", title: "İlk Uluslararası Gösteri", description: "Romanya'daki AEROMANIA'da ilk yurtdışı gösterisini yaparak Türk bayrağını gururla temsil etti.", thumbnail: "/images/kariyer-2018.jpg" },
  { year: "2020", title: "Uluslararası Tanıtım", description: "Unilever'in yedi ülkede yayınlanan reklam filmlerinde yer alarak dünya sahnesinde boy gösterdi.", thumbnail: "/images/kariyer-2020.jpg" },
  { year: "2022", title: "İki Milyon Seyirci", description: "İzmir'in kurtuluşunun 100. yılında İzmir Körfezi'nde iki milyon kişiye gösteri yaptı; babasından 'Mor Menekşe'yi devraldı.", thumbnail: "/images/kariyer-2022.jpg" },
  { year: "2023", title: "Yeni Menekşe ile Avrupa", description: "Yenilenen 'Yeni Menekşe' ile Almanya'daki Flugtage Bautzen'de uluslararası sahneye çıkarak ülkemizi temsil etti.", thumbnail: "/images/kariyer-2023.jpg" },
];

const N = careerMoments.length;
const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden";
};

/* ------------------------------------------------------------------ */
/* Kariyer sahnesi: kaydırdıkça fotoğraflar derinlikten kameraya uçar  */
/* ------------------------------------------------------------------ */
const CareerFlight: React.FC = () => {
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
    <section ref={ref} className="relative bg-ink" style={{ height: `${N * 80 + 100}vh` }} aria-label="Kariyer dönüm noktaları">
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        {/* Arkada dev, soluk yıl */}
        <div
          ref={yearRef}
          className="absolute -right-[4vw] bottom-[14vh] md:bottom-[8vh] font-black italic text-[38vw] md:text-[30vw] leading-none tracking-tighter text-white/[0.07] select-none pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          {current.year}
        </div>

        {/* Uçan fotoğraflar */}
        <div className="absolute inset-0 flex items-start md:items-center justify-center md:justify-end pt-[16vh] md:pt-0 md:pr-[10vw]">
          <div className="relative w-[78vw] md:w-[42vw] max-w-[620px] aspect-[4/3]">
            {careerMoments.map((m, i) => (
              <div
                key={i}
                ref={(el) => { photoRefs.current[i] = el; }}
                className="absolute inset-0 bg-[#18181b] will-change-transform shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                style={{ opacity: 0 }}
              >
                {/* Link ölürse kırık ikon yerine koyu kutu kalsın */}
                <img src={m.thumbnail} alt={m.title} className="w-full h-full object-cover" onError={hideBroken} />
                <span className="absolute -bottom-3 left-4 bg-[#E02F3C] text-white font-black italic text-sm px-3 py-1 skew-x-[-10deg]">
                  <span className="block skew-x-[10deg]">{m.year}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metin */}
        <div className="absolute inset-x-0 bottom-[17vh] md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-[60] pointer-events-none">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
            <div key={active} className="max-w-[min(440px,100%)] md:max-w-[34vw]">
              <span className="slam-in block font-black italic text-[#E02F3C] text-6xl md:text-8xl leading-[0.85] tracking-tighter">
                {current.year}
              </span>
              <h3 className="slam-in slam-in-2 font-black italic uppercase text-2xl md:text-4xl mt-4 leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
                {current.title}
              </h3>
              <p className="slam-in slam-in-3 text-white/70 text-base md:text-lg font-medium leading-relaxed mt-3 [text-shadow:0_2px_16px_rgba(0,0,0,0.9)]">
                {current.description}
              </p>
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
                  aria-label={`${m.year} — ${m.title}`}
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

/* Hareket azaltma tercihinde: sade, sabit liste */
const CareerStatic: React.FC = () => (
  <section className="bg-ink py-24">
    <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
      <SectionHeader light title="Kariyer Yolculuğu" />
      <div className="grid gap-12 md:grid-cols-2">
        {careerMoments.map((m) => (
          <article key={m.year}>
            <img src={m.thumbnail} alt={m.title} className="w-full aspect-[3/2] object-cover bg-[#18181b]" loading="lazy" onError={hideBroken} />
            <span className="block font-black italic text-[#E02F3C] text-4xl mt-5">{m.year}</span>
            <h3 className="font-black italic uppercase text-white text-xl mt-2">{m.title}</h3>
            <p className="text-white/60 mt-2">{m.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const VelocitySection: React.FC = () => {
  if (prefersReducedMotion()) return <CareerStatic />;
  return (
    <div id="performance-video">
      <div className="bg-ink pt-16 md:pt-20">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
          {/* Sade, tek satır başlık — sahnenin önünde baskın durmasın */}
          <div className="flex items-center gap-3" data-reveal>
            <div className="reveal-bar h-6 w-1.5 flex-shrink-0 bg-[#E02F3C] transform skew-x-[-15deg]"></div>
            <h2 className="whitespace-nowrap text-white/80 text-lg md:text-2xl font-black italic uppercase tracking-tight">
              Kariyer Yolculuğu
            </h2>
          </div>
        </div>
      </div>
      <CareerFlight />
    </div>
  );
};

export default VelocitySection;
