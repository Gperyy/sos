import React from "react";
import { PlayCircle, Clock, Trophy, Plane, ChevronsDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <>
      <section
        className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover transform scale-110 motion-safe:animate-pulse-slow"
            src="/images/deneme-act.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10"></div>
        </div>

        {/* Floating Text Elements */}
        <div className="absolute top-[15%] right-[5%] z-10 transform rotate-12 select-none pointer-events-none opacity-20 mix-blend-overlay">
          <span className="text-9xl font-black italic text-stroke">6.5G</span>
        </div>
        <div className="absolute bottom-[20%] left-[5%] z-10 transform -rotate-6 select-none pointer-events-none opacity-20 mix-blend-overlay">
          <span className="text-8xl font-black italic text-stroke">
            300<span className="text-4xl">KM/H</span>
          </span>
        </div>

        <div className="layout-container relative z-20 w-full max-w-[1280px] px-4 sm:px-8 flex flex-col justify-start h-full pt-12 overflow-visible">
          <div className="max-w-4xl flex flex-col gap-6 animate-fade-in-up overflow-visible">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1 w-16 bg-[#E02F3C] skew-x-[-20deg] shadow-[0_0_10px_#E02F3C]"></span>
              <span className="text-[#E02F3C] font-black italic tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(224,47,60,0.6)]">
                Professional Aerobatic Pilot
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black italic leading-[1.2] tracking-widest md:tracking-wider uppercase drop-shadow-2xl pr-6 md:pr-4 overflow-visible">
              SEMİN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 pr-2">ÖZTÜRK</span><br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 pr-6 md:pr-4"> ŞENER</span>
            </h1>
            <h2 className="text-gray-100 text-lg md:text-2xl font-bold italic max-w-2xl mt-4 leading-relaxed drop-shadow-lg">
              Turkey's First Professional Female Aerobatic Pilot.
              <br className="hidden md:block" />
              <span className="text-[#E02F3C]">Defying gravity</span>, inspiring
              generations.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <button className="group relative flex items-center justify-center gap-3 bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-10 py-5 font-black text-lg italic uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(224,47,60,0.6)] skew-x-[-10deg] overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <PlayCircle className="skew-x-[10deg]" />
                <span className="skew-x-[10deg]">Watch Performance</span>
              </button>
              <button className="group flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 hover:border-[#E02F3C]/50 text-white px-10 py-5 font-bold text-lg italic uppercase tracking-wider transition-all skew-x-[-10deg] shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <span className="skew-x-[10deg]">Upcoming Shows</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce z-20">
          <span className="text-xs font-black italic uppercase tracking-widest text-glow">
            Scroll
          </span>
          <ChevronsDown className="text-[#E02F3C] w-8 h-8 drop-shadow-[0_0_10px_#E02F3C]" />
        </div>
      </section>
    </>
  );
};

export default Hero;