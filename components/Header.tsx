import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-md border-b border-gray-100 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="layout-container flex h-full grow flex-col max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 text-primary group cursor-pointer">
            <div className="size-8 text-primary group-hover:drop-shadow-[0_0_10px_rgba(255,84,46,0.8)] transition-all duration-300">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
              </svg>
            </div>
            <h2 className="text-[#181210] dark:text-white text-xl font-black italic uppercase tracking-tighter transform skew-x-[-10deg]">
              Semin Öztürk Şener
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["About", "Gallery", "Events", "Sponsors"].map((item) => (
              <a
                key={item}
                className="text-[#181210] dark:text-white hover:text-[#FF542E] dark:hover:text-[#FF542E] text-sm font-bold italic uppercase tracking-wide transition-colors"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
            <button className="bg-[#FF542E] hover:bg-[#ff6b4a] text-white px-6 py-2 rounded skew-x-[-10deg] font-black italic text-sm uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,84,46,0.4)] hover:shadow-[0_0_25px_rgba(255,84,46,0.6)]">
              <span className="block skew-x-[10deg]">Contact</span>
            </button>
          </nav>
          <button className="md:hidden text-[#181210] dark:text-white">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;