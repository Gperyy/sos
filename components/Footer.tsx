import React from "react";
import { Plane, Fan, Zap, Watch, Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <>
      <section className="bg-white dark:bg-black py-24 border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(224,47,60,0.03)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
        <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="mb-24">
            <p className="text-center text-gray-400 text-sm font-black uppercase tracking-[0.3em] mb-12 italic">
              Official Partners
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-2xl font-black text-gray-800 dark:text-gray-200 italic tracking-tighter hover:text-[#E02F3C] transition-colors cursor-pointer">
                <Plane className="w-10 h-10" /> SKY AVIATION
              </div>
              <div className="flex items-center gap-2 text-2xl font-black text-gray-800 dark:text-gray-200 italic tracking-tighter hover:text-[#E02F3C] transition-colors cursor-pointer">
                <Fan className="w-10 h-10" /> AERO TECH
              </div>
              <div className="flex items-center gap-2 text-2xl font-black text-gray-800 dark:text-gray-200 italic tracking-tighter hover:text-[#E02F3C] transition-colors cursor-pointer">
                <Zap className="w-10 h-10" /> POWER FUEL
              </div>
              <div className="flex items-center gap-2 text-2xl font-black text-gray-800 dark:text-gray-200 italic tracking-tighter hover:text-[#E02F3C] transition-colors cursor-pointer">
                <Watch className="w-10 h-10" /> TIMEKEEPER
              </div>
            </div>
          </div>

          <div className="bg-surface-dark rounded-none transform -skew-x-2 p-10 md:p-20 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5 group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#E02F3C]/20 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#E02F3C] via-[#FF4D5A] to-[#E02F3C]"></div>
            <div className="relative z-10 max-w-2xl mx-auto transform skew-x-2">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic uppercase tracking-tighter text-glow">
                Join The Squadron
              </h2>
              <p className="text-gray-400 mb-10 text-lg font-medium">
                Subscribe to receive exclusive updates on airshow schedules,
                behind-the-scenes content, and team news directly to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  className="flex-grow px-8 py-4 bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#E02F3C] focus:ring-1 focus:ring-[#E02F3C] focus:bg-white/10 transition-all font-bold italic"
                  placeholder="Enter your email address"
                />
                <button
                  type="button"
                  className="bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-10 py-4 font-black uppercase italic tracking-wide transition-all shadow-[0_0_20px_rgba(224,47,60,0.5)] hover:shadow-[0_0_30px_rgba(224,47,60,0.8)] whitespace-nowrap transform hover:-translate-y-1"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-600 text-xs mt-6 font-bold uppercase tracking-wide">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-surface-dark border-t border-white/10 py-16 relative">
        <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="size-8 text-[#FF542E] animate-pulse">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                  </svg>
                </div>
                <span className="font-black italic text-2xl tracking-tighter uppercase">
                  SEMİN ÖZTÜRK ŞENER
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                © 2026 All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]"
              >
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]"
              >
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;