import React from "react";
import { PlayCircle, Clock, Trophy, Plane, ChevronsDown } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <>
      <section
        className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10"></div>
          <div className="absolute inset-0 z-10 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-110 motion-safe:animate-pulse-slow"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7aaNXOmrG9xQV29jsclwXWXY9lnVLd1RKX9iq43a0M-dr5b9-EVdAEJgu-rGNlMoImgGpOHBOSZCJcbPCiD-_iQBBwrUbo-aSYCbiAQ8hfSISS3CA60TgJifeptOOW2Yyq3jQlPyi6O4z-liKf43Pg89fuR0LgVZaDu6Retn3Emmtp5c5yFofSzgdt03JeCAQaY-0swMeoDza0Gb4qoitKgL9oCm3GcaRSvlcn4L53FZjVPwSuZKA-D5FS1i-lbzNfRWaXXAdv-o")',
            }}
          ></div>
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

        <div className="layout-container relative z-20 w-full max-w-[1280px] px-4 sm:px-8 flex flex-col justify-center h-full">
          <div className="max-w-4xl flex flex-col gap-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1 w-16 bg-[#FF542E] skew-x-[-20deg] shadow-[0_0_10px_#ff542e]"></span>
              <span className="text-[#FF542E] font-black italic tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(255,84,46,0.6)]">
                Professional Aerobatic Pilot
              </span>
            </div>
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-black italic leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
              Semin
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                Öztürk Şener
              </span>
            </h1>
            <h2 className="text-gray-100 text-lg md:text-2xl font-bold italic max-w-2xl mt-4 leading-relaxed drop-shadow-lg">
              Turkey's First Professional Female Aerobatic Pilot.
              <br className="hidden md:block" />
              <span className="text-[#FF542E]">Defying gravity</span>, inspiring
              generations.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <button className="group relative flex items-center justify-center gap-3 bg-[#FF542E] hover:bg-[#ff6b4a] text-white px-10 py-5 font-black text-lg italic uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,84,46,0.6)] skew-x-[-10deg] overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <PlayCircle className="skew-x-[10deg]" />
                <span className="skew-x-[10deg]">Watch Performance</span>
              </button>
              <button className="group flex items-center justify-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 hover:border-[#FF542E]/50 text-white px-10 py-5 font-bold text-lg italic uppercase tracking-wider transition-all skew-x-[-10deg] shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <span className="skew-x-[10deg]">Upcoming Shows</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce z-20">
          <span className="text-xs font-black italic uppercase tracking-widest text-glow">
            Scroll
          </span>
          <ChevronsDown className="text-[#FF542E] w-8 h-8 drop-shadow-[0_0_10px_#ff542e]" />
        </div>
      </section>

      {/* Stats Block */}
      <div className="relative z-30 -mt-24 w-full max-w-[1200px] mx-auto px-4">
        <div className="bg-surface-dark/95 backdrop-blur-xl border border-white/10 relative transform skew-x-[-3deg] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF542E] to-transparent opacity-50"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 transform skew-x-[3deg]">
            <div className="p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors duration-300">
              <Clock className="text-[#FF542E] w-12 h-12 mb-2 drop-shadow-[0_0_15px_rgba(255,84,46,0.6)]" />
              <p className="text-white text-5xl font-black italic tracking-tighter mb-1 text-glow">
                2,500+
              </p>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">
                Flight Hours
              </p>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors duration-300">
              <Trophy className="text-[#FF542E] w-12 h-12 mb-2 drop-shadow-[0_0_15px_rgba(255,84,46,0.6)]" />
              <p className="text-white text-5xl font-black italic tracking-tighter mb-1 text-glow">
                150+
              </p>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">
                Shows Completed
              </p>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors duration-300">
              <Plane className="text-[#FF542E] w-12 h-12 mb-2 drop-shadow-[0_0_15px_rgba(255,84,46,0.6)]" />
              <p className="text-white text-5xl font-black italic tracking-tighter mb-1 text-glow">
                Pitts S-2B
              </p>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">
                Aircraft Type
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;