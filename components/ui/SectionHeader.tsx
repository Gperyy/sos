import React from "react";

interface SectionHeaderProps {
  title: string;
  gradient?: boolean;
  gradientColors?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  gradient = false,
  gradientColors = "from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-4 mb-16 ${className}`}>
      <div
        className={`h-10 w-2 transform skew-x-[-15deg] shadow-lg ${
          gradient
            ? `bg-gradient-to-b ${gradientColors}`
            : "bg-[#E02F3C] shadow-[0_0_15px_rgba(224,47,60,0.5)]"
        }`}
      />
      <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-[#181210]">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
