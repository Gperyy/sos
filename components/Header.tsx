import React, { useState, useEffect } from "react";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import { useLang, useSetLang } from "./ui";
import type { TabType } from "./ui";

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navItemsData: { tr: string; en: string; tab: TabType }[] = [
  { tr: "Hakkında", en: "About", tab: "about" },
  { tr: "Semin'in Uçağı", en: "Semin's Aircraft", tab: "aircraft" },
  { tr: "Etkinlik Takvimi", en: "Events", tab: "events" },
  { tr: "Medya", en: "Media", tab: "media" },
  { tr: "Semin ile Uç", en: "Fly with Semin", tab: "fly" },
];

// Mobil menü perdesi: eğik kenar sağdan sola süpürür; kapalıyken tamamen ekran dışında
const MENU_OPEN = "polygon(0% 0%, 160% 0%, 130% 100%, -30% 100%)";
const MENU_CLOSED = "polygon(130% 0%, 160% 0%, 130% 100%, 100% 100%)";

// Header — MAYIS (orijinal) hali, Lexend.
const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const language = useLang();
  const setLanguage = useSetLang();

  useEffect(() => {
    // Not: lenis.stop() kullanılmaz — html'e overflow:hidden verip yapışkan header'ı bozuyor.
    // Menü paneli data-lenis-prevent ile kendi içinde kaydırılır.
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: TabType) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => setLanguage(language === "tr" ? "en" : "tr");

  const navItems = navItemsData.map((item) => ({
    name: language === "tr" ? item.tr : item.en,
    tab: item.tab,
  }));

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100 font-['Lexend']">
      <div className="relative z-50 bg-white flex h-full grow flex-col max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            className="group flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C]"
            onClick={() => onTabChange("home")}
            aria-label={language === "tr" ? "Semin Öztürk Şener — ana sayfa" : "Semin Öztürk Şener — home"}
          >
            {/* Logodaki uçak figürü (SVG'den ayrılmış) */}
            <img
              src="/images/logo/semin-ucak.svg"
              alt=""
              aria-hidden="true"
              className="h-11 w-auto transition-transform duration-300 group-hover:-rotate-6 group-hover:-translate-y-0.5"
            />
            <h2 className="text-[#181210] text-xl font-black italic uppercase tracking-normal pr-1">
              Semin Öztürk Şener
            </h2>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`text-sm font-bold italic uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C] ${
                  activeTab === item.tab ? "text-[#E02F3C]" : "text-[#181210] hover:text-[#E02F3C]"
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className={`bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-6 py-2 rounded skew-x-[-10deg] font-black italic text-sm uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(224,47,60,0.4)] hover:shadow-[0_0_25px_rgba(224,47,60,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                activeTab === "contact" ? "ring-2 ring-white" : ""
              }`}
            >
              <span className="block skew-x-[10deg]">{language === "tr" ? "İletişim" : "Contact"}</span>
            </button>
            <button
              onClick={toggleLanguage}
              className="text-sm font-black uppercase tracking-wide text-[#181210] hover:text-[#E02F3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C] border border-gray-200 px-3 py-1.5 rounded"
              aria-label={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
            >
              {language === "tr" ? "EN" : "TR"}
            </button>
          </nav>

          {/* Hamburger: eğik çizgiler açılınca X'e dönüşür */}
          <button
            className="lg:hidden relative w-11 h-11 -mr-1 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              language === "tr"
                ? mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"
                : mobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            <span className="relative block w-7 h-5 skew-x-[-12deg]" aria-hidden="true">
              <span className={`absolute right-0 h-[3px] bg-[#181210] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${mobileMenuOpen ? "top-1/2 -translate-y-1/2 w-full rotate-45 !bg-[#E02F3C]" : "top-0 w-full"}`}></span>
              <span className={`absolute right-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#E02F3C] transition-all duration-300 ${mobileMenuOpen ? "w-0 opacity-0" : "w-2/3"}`}></span>
              <span className={`absolute right-0 h-[3px] bg-[#181210] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${mobileMenuOpen ? "top-1/2 -translate-y-1/2 w-full -rotate-45 !bg-[#E02F3C]" : "bottom-0 w-5/6"}`}></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobil menü: önce kırmızı, ardından açık zeminli eğik perde süpürür; başlıklar sırayla kayarak gelir */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 z-40 lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-[#E02F3C] transition-[clip-path] duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]"
          style={{ clipPath: mobileMenuOpen ? MENU_OPEN : MENU_CLOSED }}
        ></div>
        <nav
          data-lenis-prevent
          className={`absolute inset-0 bg-background-light text-[#181210] flex flex-col overflow-y-auto transition-[clip-path] duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${mobileMenuOpen ? "delay-100" : ""}`}
          style={{ clipPath: mobileMenuOpen ? MENU_OPEN : MENU_CLOSED }}
        >
          {/* Arkada dev, soluk uçak figürü */}
          <img
            src="/images/logo/semin-ucak.svg"
            alt=""
            aria-hidden="true"
            className={`absolute -right-16 bottom-24 w-72 opacity-[0.08] pointer-events-none transition-transform duration-[1200ms] ease-out ${mobileMenuOpen ? "translate-x-0 -rotate-12" : "translate-x-24 rotate-0"}`}
          />

          <div className="relative flex-1 flex flex-col justify-center px-7 py-10 gap-1">
            {navItems.map((item, i) => {
              const active = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  style={{ transitionDelay: mobileMenuOpen ? `${220 + i * 60}ms` : "0ms" }}
                  className={`group flex items-center gap-4 py-3 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                >
                  <span className={`h-7 w-1.5 bg-[#E02F3C] skew-x-[-15deg] transition-all duration-300 ${active ? "opacity-100" : "opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0"}`}></span>
                  <span className={`text-[2rem] leading-tight font-black italic uppercase tracking-tight transition-colors ${active ? "text-[#E02F3C]" : "text-[#181210] group-hover:text-[#E02F3C]"}`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            style={{ transitionDelay: mobileMenuOpen ? `${220 + navItems.length * 60}ms` : "0ms" }}
            className={`relative px-7 pb-8 flex flex-col gap-6 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <button
              onClick={() => handleNavClick("contact")}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="group w-full flex items-center justify-between bg-[#E02F3C] text-white px-6 py-4 font-black italic text-lg uppercase tracking-wider skew-x-[-8deg] shadow-[0_0_25px_rgba(224,47,60,0.45)]"
            >
              <span className="skew-x-[8deg]">{language === "tr" ? "İletişim" : "Contact"}</span>
              <ArrowRight className="w-5 h-5 skew-x-[8deg] transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 text-[#181210]/55">
                <a href="https://www.facebook.com/profile.php?id=100057655285696" target="_blank" rel="noopener noreferrer" tabIndex={mobileMenuOpen ? 0 : -1} className="hover:text-[#E02F3C] transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/semin.ozturk/" target="_blank" rel="noopener noreferrer" tabIndex={mobileMenuOpen ? 0 : -1} className="hover:text-[#E02F3C] transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <button
                onClick={toggleLanguage}
                tabIndex={mobileMenuOpen ? 0 : -1}
                className="text-sm font-black uppercase tracking-wide text-[#181210] hover:text-[#E02F3C] border border-[#181210]/15 px-3 py-1.5 transition-colors"
                aria-label={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
              >
                {language === "tr" ? "EN" : "TR"}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
