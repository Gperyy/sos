import React from "react";
import { PlayCircle, ChevronsDown } from "lucide-react";
import { scrollToEl, useNav, useT } from "./ui";

// Hero — MAYIS (orijinal) hali.
const Hero: React.FC = () => {
  const go = useNav();
  const t = useT();

  return (
    <section className="relative w-full min-h-[100svh] md:min-h-[600px] md:h-[90vh] flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0" data-parallax="0.35">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform scale-110 motion-safe:animate-pulse-slow"
          src="/videos/hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10"></div>
      </div>

      {/* Uçuşan metinler */}
      <div className="absolute top-[15%] right-[5%] z-10 transform rotate-12 select-none pointer-events-none opacity-20 mix-blend-overlay">
        <span className="text-9xl font-black italic text-stroke">6.5G</span>
      </div>
      <div className="absolute bottom-[20%] left-[5%] z-10 transform -rotate-6 select-none pointer-events-none opacity-20 mix-blend-overlay">
        <span className="text-8xl font-black italic text-stroke">
          300<span className="text-4xl">KM/H</span>
        </span>
      </div>

      <div className="relative z-20 w-full max-w-[1280px] px-4 sm:px-8 flex flex-col justify-start md:h-full pt-12 pb-40 md:pb-0 overflow-visible" data-parallax="0.15" data-parallax-fade>
        <div className="max-w-4xl flex flex-col gap-6 animate-fade-in-up overflow-visible">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-1 w-16 bg-[#E02F3C] skew-x-[-20deg] shadow-[0_0_10px_#E02F3C]"></span>
            <span className="text-[#E02F3C] font-black italic tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(224,47,60,0.6)]">
              {t("Profesyonel Akrobasi Pilotu", "Professional Aerobatic Pilot")}
            </span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black italic leading-[1.2] tracking-widest md:tracking-wider uppercase drop-shadow-2xl pr-6 md:pr-4 overflow-visible">
            {/* Normal yazım: `uppercase` dile göre büyütür (TR: SEMİN, EN: SEMIN) */}
            Semin<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 pr-2">Öztürk</span><br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 pr-6 md:pr-4"> Şener</span>
          </h1>
          <h2 className="text-gray-100 text-lg md:text-2xl font-bold italic max-w-2xl mt-4 leading-relaxed drop-shadow-lg">
            {t("Türkiye'nin İlk Profesyonel Kadın Akrobasi Pilotu", "Türkiye's First Professional Female Aerobatic Pilot")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <button
              type="button"
              onClick={() => go("fly")}
              className="group relative flex items-center justify-center gap-2 sm:gap-3 bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-4 sm:px-10 py-5 font-black text-[13px] min-[380px]:text-sm sm:text-lg italic uppercase tracking-wide sm:tracking-wider transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(224,47,60,0.6)] skew-x-[-10deg] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <PlayCircle className="skew-x-[10deg] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
              {/* Tek satır, ortalı (mobilde yazı küçülür) */}
              <span className="skew-x-[10deg] whitespace-nowrap">{t("Semin'le Dünyayı Ters Düz Edin", "Turn Your World Upside Down")}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToEl("upcoming-events")}
              className="group flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 hover:border-[#E02F3C]/50 text-white px-4 sm:px-10 py-5 font-bold text-[13px] min-[380px]:text-sm sm:text-lg italic uppercase tracking-wide sm:tracking-wider transition-all skew-x-[-10deg] shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="skew-x-[10deg]">{t("Etkinlik Programı", "Event Schedule")}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce z-20">
        <span className="text-xs font-black italic uppercase tracking-widest text-glow">{t("Kaydır", "Scroll")}</span>
        <ChevronsDown className="text-[#E02F3C] w-8 h-8 drop-shadow-[0_0_10px_#E02F3C]" />
      </div>
    </section>
  );
};

export default Hero;
