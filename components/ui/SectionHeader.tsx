import React from "react";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

// Ortak başlık — Mayıs kimliği: kırmızı skew çubuk + Lexend black italic başlık.
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  eyebrow,
  subtitle,
  light = false,
  className = "mb-14",
}) => {
  return (
    <div className={className} data-reveal>
      <div className="flex items-center gap-4">
        <div className="reveal-bar h-10 w-2 flex-shrink-0 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
        <div>
          {eyebrow && (
            <span className="block text-[#E02F3C] text-xs font-black italic uppercase tracking-widest mb-1">
              {eyebrow}
            </span>
          )}
          <h2
            className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase ${
              light ? "text-white" : "text-[#181210]"
            }`}
          >
            {title}
          </h2>
        </div>
      </div>
      {subtitle && (
        <p className={`mt-5 text-lg font-medium max-w-2xl ${light ? "text-gray-400" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
