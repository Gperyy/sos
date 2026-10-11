import React from "react";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { useNav } from "./ui";

// Sponsorlar — logolar ve bağlantılar eski siteden (seminozturk.com) alınmıştır.
// Logo dosyaları: /public/images/sponsorlar — arka planları temizlenmiş (saydam PNG/SVG), kırpılmış.
// Üç sıra: ilk sıra büyük ana destekçiler, diğer iki sıra küçük. h = masaüstündeki logo yüksekliği (px);
// logoların biçimi farklı olduğundan (arma, yazı, dikey) her biri gözle eşit ağırlıkta görünecek şekilde ayarlı.
type Sponsor = { name: string; logo: string; url?: string; h: number };
const sponsorRows: Sponsor[][] = [
  [
    { name: "MSO Hava ve Uzay Müzesi", logo: "/images/sponsorlar/mso-muze.png", url: "http://msomuseum.com/", h: 160 },
    { name: "Sivrihisar Havacılık Merkezi", logo: "/images/sponsorlar/shm.png", url: "http://shm.aero/", h: 120 },
    { name: "Mach Aviation", logo: "/images/sponsorlar/mach-aviation.png", url: "http://www.mach.aero/", h: 84 },
    { name: "Acromach Sky Dancer", logo: "/images/sponsorlar/sky-dancer-acromach.png", url: "http://acromach.com/", h: 124 },
    { name: "MSO Müze Dükkanı", logo: "/images/sponsorlar/mso-dukkan.png", url: "http://shop.msomuseum.com/", h: 56 },
  ],
  [
    { name: "Airflow Performance", logo: "/images/sponsorlar/airflow-performance.png", url: "https://airflowperformance.com/", h: 46 },
    { name: "Barry Controls", logo: "/images/sponsorlar/barry-controls.png", h: 48 },
    { name: "BŞK Tarım Ürünleri", logo: "/images/sponsorlar/bsk.png", h: 33 },
    { name: "Dynon Avionics", logo: "/images/sponsorlar/dynon.png", url: "https://dynonavionics.com/", h: 50 },
    { name: "Goodyear", logo: "/images/sponsorlar/goodyear.png", url: "https://www.goodyear.eu/tr_tr/consumer.html", h: 32 },
    { name: "Hooker Harness", logo: "/images/sponsorlar/hooker-harness.png", url: "https://www.hookerharness.com/", h: 38 },
  ],
  [
    { name: "Lycoming", logo: "/images/sponsorlar/lycoming.png", url: "https://www.lycoming.com/", h: 26 },
    { name: "Lycon", logo: "/images/sponsorlar/lycon.png", url: "https://lycon.com/", h: 62 },
    { name: "Ofis Tekin", logo: "/images/sponsorlar/ofis-tekin.svg", url: "https://www.ofistekin.com/", h: 36 },
    { name: "Trig Avionics", logo: "/images/sponsorlar/trig.png", url: "https://trig-avionics.com/", h: 56 },
  ],
];

// Mobilde logolar %60 boyutta; yükseklik CSS değişkeniyle (--h) verilir.
// Logolar her zaman krem zeminde ve kendi renklerinde gösterilir.
const SponsorLogo: React.FC<{ s: Sponsor }> = ({ s }) => {
  const img = (
    <img
      src={s.logo}
      alt={s.name}
      loading="lazy"
      style={{ ["--h" as string]: `${s.h}px` }}
      className="block w-auto max-w-full h-[calc(var(--h)*0.6)] md:h-[var(--h)] object-contain transition-transform duration-500 hover:scale-105"
    />
  );
  return s.url ? (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
      {img}
    </a>
  ) : (
    <div className="flex items-center justify-center">{img}</div>
  );
};

const Footer: React.FC<{ dark?: boolean; showSponsors?: boolean }> = ({ dark = false, showSponsors = false }) => {
  const go = useNav();
  const goFly = () => go("fly");

  return (
    <>
      {/* Destekçiler — başlıksız logo alanı; yalnızca ana sayfada */}
      {showSponsors && (
        <section id="sponsors" aria-label="Destekçiler" className="bg-paper border-t border-ink/10 py-16 md:py-20 scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
            <div className="flex flex-col gap-10 md:gap-12">
              {sponsorRows.map((row, ri) => (
                <div
                  key={ri}
                  className={`flex flex-wrap items-center gap-x-10 gap-y-8 ${
                    ri === 2 ? "justify-center md:gap-x-[9%]" : "justify-center md:justify-around"
                  }`}
                >
                  {row.map((s) => (
                    <SponsorLogo key={s.name} s={s} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA + Footer — MAYIS (orijinal) hali, Lexend */}
      <div className="font-['Lexend']">
        {/* Zemin sayfaya uyar (krem ya da koyu) — üstteki logo alanıyla kesintisiz */}
        <section className={`${dark ? "bg-surface-dark" : "bg-paper"} pt-4 pb-24 md:pb-28 relative overflow-hidden`}>
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
                  className="group/cta relative overflow-hidden whitespace-nowrap bg-white text-[#E02F3C] px-7 sm:px-12 py-5 font-black uppercase italic tracking-wide text-base sm:text-lg shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] focus-visible:-translate-y-1 active:translate-y-0 active:shadow-lg"
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
                  {/* Mobilde: 1) Akrobasi tanıtım uçuşları 2) Sivrihisar Havacılık Merkezi'nde 3) gerçekleştirilmektedir. */}
                  Akrobasi tanıtım uçuşları<br className="md:hidden" /> <span className="whitespace-nowrap">Sivrihisar Havacılık Merkezi'nde</span>
                  <br className="md:hidden" /> gerçekleştirilmektedir.
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
                  {/* Header'daki uçak figürü */}
                  <img src="/images/logo/semin-ucak.svg" alt="" aria-hidden="true" className="h-10 w-auto" />
                  <span className="font-black italic text-2xl tracking-tighter uppercase text-white">
                    SEMİN ÖZTÜRK ŞENER
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">© 2026 Tüm hakları saklıdır.</p>
              </div>
              <div className="flex gap-8">
                <a href="https://www.facebook.com/profile.php?id=100057655285696" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/semin.ozturk/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF542E] transition-colors transform hover:scale-110 hover:drop-shadow-[0_0_10px_#ff542e]" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
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
