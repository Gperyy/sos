import React from "react";
import { Gauge, RotateCw, Play } from "lucide-react";

const VelocitySection: React.FC = () => {
  return (
    <section
      className="w-full bg-surface-dark py-32 relative overflow-hidden"
      style={{ clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)" }}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF542E]/10 to-transparent transform skew-x-[-20deg]"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-10 left-10 opacity-5 select-none pointer-events-none">
        <span className="text-[10rem] font-black italic uppercase text-white tracking-tighter">
          Velocity
        </span>
      </div>
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-10 bg-[#FF542E] shadow-[0_0_10px_#ff542e]"></span>
              <h2 className="text-[#FF542E] font-black uppercase tracking-[0.2em] text-sm italic shadow-[#FF542E]/20">
                Precision & Passion
              </h2>
            </div>
            <h3 className="text-5xl md:text-6xl font-black italic text-white mb-8 leading-[0.9] uppercase drop-shadow-lg">
              Mastering The Sky <br />
              <span className="text-gray-500 text-4xl md:text-5xl">
                In The Pitts S-2B
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light">
              Experience the thrill of{" "}
              <strong className="text-white font-bold">+6G maneuvers</strong> and
              split-second precision. Semin brings art to the skies, pushing the
              boundaries of what is possible in aerobatic aviation.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6 text-white group p-4 border border-transparent hover:border-[#FF542E]/30 rounded-lg transition-all bg-white/5 hover:bg-white/10">
                <div className="bg-[#FF542E]/20 p-3 rounded-full text-[#FF542E] shadow-[0_0_15px_rgba(255,84,46,0.3)] group-hover:scale-110 transition-transform">
                  <Gauge className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-black italic text-xl uppercase">
                    High Speed Precision
                  </p>
                  <p className="text-sm text-gray-400 font-medium">
                    Reaching speeds over 300 km/h
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-white group p-4 border border-transparent hover:border-[#FF542E]/30 rounded-lg transition-all bg-white/5 hover:bg-white/10">
                <div className="bg-[#FF542E]/20 p-3 rounded-full text-[#FF542E] shadow-[0_0_15px_rgba(255,84,46,0.3)] group-hover:scale-110 transition-transform">
                  <RotateCw className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-black italic text-xl uppercase">
                    Extreme Maneuverability
                  </p>
                  <p className="text-sm text-gray-400 font-medium">
                    Roll rate of 270 degrees per second
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="transform skew-y-3 hover:skew-y-0 transition-transform duration-500 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-2 border-white/10 relative group bg-black">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-20 cursor-pointer">
                <div className="w-24 h-24 bg-[#FF542E]/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(255,84,46,0.6)] transform group-hover:scale-110 transition-transform duration-300 border-4 border-white/10 backdrop-blur-sm">
                  <Play className="text-white w-12 h-12 fill-white" />
                </div>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCep27MNuV87esgp6oW8Cne9fUCHig30RstxATgpC_d3SDbczijT53asF55uOi81V_qlmQloTHVp3PD8ERv-VqrX4I5rLiIneOXorOPQQyxiqOHtBufnt0fNIcOxL_NZo7AW_OGbsvU3voJsdMQz0ctsZcG1gcekt_r5hsWVzrqVSC4NaMdzMA0VpPbKEvn-EnqEF1buCSVR4DYn7qRxDSA6ZiAWUJWmrk4riRbXQZ6w2YmE96PFmzmBRMLG5vl-FOzVu8bM9e3MCE"
                alt="Close up of Pitts S-2B biplane engine and propeller with smoke system active"
                className="w-full h-auto object-cover aspect-video transform scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#FF542E]/30 rounded-xl -z-10 transform skew-y-3 translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VelocitySection;