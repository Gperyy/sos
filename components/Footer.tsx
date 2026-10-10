import React from "react";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { useNav } from "./ui";

// Sponsorlar — logolar ve bağlantılar eski siteden (seminozturk.com) alınmıştır, aynı sırayla.
// Logo dosyaları: /public/images/sponsorlar
const sponsors: { name: string; logo?: string; url?: string }[] = [
  { name: "MSO Hava ve Uzay Müzesi", logo: "/images/sponsorlar/mso-muze.png", url: "http://msomuseum.com/" },
  { name: "Airflow Performance", logo: "/images/sponsorlar/airflow-performance.jpg", url: "https://airflowperformance.com/" },
  { name: "Sivrihisar Havacılık Merkezi", logo: "/images/sponsorlar/shm.png", url: "http://shm.aero/" },
  { name: "Barry Mounts", logo: "/images/sponsorlar/barry-mounts.jpg" },
  { name: "Lycoming", logo: "/images/sponsorlar/lycoming.png", url: "https://www.lycoming.com/" },
  { name: "Mach Aviation", logo: "/images/sponsorlar/mach-aviation.png", url: "http://www.mach.aero/" },
  { name: "Acromach Sky Dancer", logo: "/images/sponsorlar/sky-dancer-acromach.png", url: "http://acromach.com/" },
  { name: "MSO Müze Dükkanı", logo: "/images/sponsorlar/mso-dukkan.png", url: "http://shop.msomuseum.com/" },
  { name: "BŞK Tarım Ürünleri", logo: "/images/sponsorlar/bsk.png" },
  { name: "Lycon", logo: "/images/sponsorlar/lycon.webp", url: "https://lycon.com/" },
  { name: "Dynon Avionics", logo: "/images/sponsorlar/dynon.png", url: "https://dynonavionics.com/" },
  { name: "Ofis Tekin", logo: "/images/sponsorlar/ofis-tekin.png", url: "https://www.ofistekin.com/" },
  { name: "Goodyear", logo: "/images/sponsorlar/goodyear.png", url: "https://www.goodyear.eu/tr_tr/consumer.html" },
  { name: "Trig Avionics", logo: "/images/sponsorlar/trig.png", url: "https://trig-avionics.com/" },
  { name: "Hooker Harness", logo: "/images/sponsorlar/hooker-harness.jpg", url: "https://www.hookerharness.com/" },
];

const Footer: React.FC = () => {
  const go = useNav();
  const goFly = () => go("fly");

  return (
    <>
      {/* Destekçilerimiz — ŞU ANKİ hali */}
      <section id="sponsors" className="bg-paper py-20 border-t border-ink/10 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-ink/45 text-[11px] tracking-[0.35em] uppercase">Destekçilerimiz</span>
            <span className="flex-1 h-px bg-ink/10"></span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 items-center">
            {sponsors.map((s, i) => {
              const inner = s.logo ? (
                <img src={s.logo} alt={s.name} className="max-h-10 max-w-[70%] object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-500" loading="lazy" />
              ) : (
                <span className="text-ink/30 text-[11px] tracking-[0.2em] uppercase hover:text-ink/60 transition-colors">{s.name}</span>
              );
              return s.url ? (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-16">{inner}</a>
              ) : (
                <div key={i} className="flex items-center justify-center h-16">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA + Footer — MAYIS (orijinal) hali, Lexend */}
      <div className="font-['Lexend']">
        <section className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(224,47,60,0.03)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10" data-reveal>
            <div className="bg-[#E02F3C] rounded-none transform -skew-x-2 p-10 md:p-20 text-center relative overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-80"></div>
              <div className="relative z-10 max-w-2xl mx-auto transform skew-x-2">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-10 italic uppercase tracking-tighter">
                  Dünyayı Ters Düz Etmek İster Misiniz?
                </h2>
                {/* Hover: koyu eğik panel soldan süpürür, yazı beyazlar, ok kayarak gelir */}
                <button
                  type="button"
                  onClick={goFly}
                  className="group/cta relative overflow-hidden bg-white text-[#E02F3C] px-12 py-5 font-black uppercase italic tracking-wide text-lg shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] focus-visible:-translate-y-1 active:translate-y-0 active:shadow-lg"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-[20%] w-[140%] bg-[#181210] -skew-x-[20deg] -translate-x-[110%] group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]"
                  ></span>
                  <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover/cta:text-white group-focus-visible/cta:text-white">
                    Hemen İletişime Geç
                    <span className="inline-flex overflow-hidden max-w-0 opacity-0 group-hover/cta:max-w-[2rem] group-hover/cta:opacity-100 group-focus-visible/cta:max-w-[2rem] group-focus-visible/cta:opacity-100 transition-all duration-500">
                      <ArrowRight className="w-5 h-5 ml-3 -translate-x-3 group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0 transition-transform duration-500 text-[#E02F3C]" />
                    </span>
                  </span>
                </button>
                <p className="text-white/60 text-sm mt-6 font-medium">
                  Akrobasi tanıtım uçuşları Sivrihisar Havacılık Merkezi'nde gerçekleştirilmektedir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[#23130F] border-t border-white/10 py-16 relative">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3 text-white">
                  <div className="size-8 text-[#FF542E] animate-pulse">
                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                    </svg>
                  </div>
                  <span className="font-black italic text-2xl tracking-tighter uppercase text-white">
                    SEMİN ÖZTÜRK ŞENER
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">© 2026 Tüm hakları saklıdır.</p>
              </div>
              <div className="flex gap-8">
                <a href="https://www.facebook.com/Semin-Öztürk-Acromach-Airshows-1519078525081107/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/semin.ozturk/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/semin_acromach" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]" aria-label="Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
