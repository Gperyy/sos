import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type TabType = "home" | "about" | "aircraft" | "events" | "media" | "fly" | "contact" | "sponsors";
type Language = "tr" | "en";

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navItemsData: { tr: string; en: string; tab: TabType }[] = [
  { tr: "Hakkında", en: "About", tab: "about" },
  { tr: "Semin'in Uçağı", en: "Aircraft", tab: "aircraft" },
  { tr: "Etkinlik Takvimi", en: "Events", tab: "events" },
  { tr: "Galeri", en: "Gallery", tab: "media" },
  { tr: "Semin ile Uç", en: "Fly with Semin", tab: "fly" },
];

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("tr");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: TabType) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "tr" ? "en" : "tr");
  };

  const navItems = navItemsData.map(item => ({
    name: language === "tr" ? item.tr : item.en,
    tab: item.tab
  }));

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100"
    >
      <div className="layout-container flex h-full grow flex-col max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 text-primary group cursor-pointer overflow-visible"
            onClick={() => onTabChange("home")}
          >
            <div className="size-8 text-primary group-hover:drop-shadow-[0_0_10px_rgba(224,47,60,0.8)] transition-all duration-300">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
              </svg>
            </div>
            <h2 className="text-[#181210] text-xl font-black italic uppercase tracking-normal pr-1">
              SEMİN ÖZTÜRK ŞENER
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`text-sm font-bold italic uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C] ${
                  activeTab === item.tab
                    ? "text-[#E02F3C]"
                    : "text-[#181210] hover:text-[#E02F3C]"
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
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-sm font-black uppercase tracking-wide text-[#181210] hover:text-[#E02F3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C] border border-gray-200 px-3 py-1.5 rounded"
              aria-label={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
            >
              {language === "tr" ? "EN" : "TR"}
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#181210] p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 ">
              <div className="flex items-center gap-4">
                <span className="text-lg font-black italic uppercase text-[#181210]">
                  {language === "tr" ? "Menü" : "Menu"}
                </span>
                {/* Language Toggle - Mobile */}
                <button
                  onClick={toggleLanguage}
                  className="text-sm font-black uppercase tracking-wide text-[#181210] hover:text-[#E02F3C] transition-colors border border-gray-200 px-2 py-1 rounded"
                >
                  {language === "tr" ? "EN" : "TR"}
                </button>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#181210] hover:text-[#E02F3C] transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Items */}
            <div className="flex-1 overflow-y-auto py-6">
              {navItems.map((item, index) => (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`w-full text-left px-6 py-4 text-lg font-bold italic uppercase tracking-wide transition-all transform ${
                    activeTab === item.tab
                      ? "text-[#E02F3C] bg-[#E02F3C]/5 border-l-4 border-[#E02F3C]"
                      : "text-[#181210] hover:text-[#E02F3C] hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              {/* Contact Button */}
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-6 py-4 font-black italic text-lg uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(224,47,60,0.4)]"
              >
                {language === "tr" ? "İletişim" : "Contact"}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
