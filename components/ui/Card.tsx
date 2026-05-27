import React from "react";

type CardVariant = "achievement" | "info" | "default";

interface CardProps {
  variant?: CardVariant;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  variant = "default",
  title,
  icon,
  children,
  className = "",
  animate = false,
  delay = 0,
}) => {
  const baseStyles =
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

  const variants: Record<CardVariant, string> = {
    achievement:
      "bg-white p-8 border-l-4 border-[#E02F3C] shadow-lg",
    info: "flex items-start gap-4",
    default:
      "bg-white p-6 shadow-lg border border-gray-100",
  };

  const animationStyle = animate
    ? {
        animationDelay: `${delay}ms`,
        opacity: 0,
        animation: "fadeInUp 0.6s ease-out forwards",
      }
    : {};

  if (variant === "info") {
    return (
      <div className={`${variants[variant]} ${className}`} style={animationStyle}>
        {icon && (
          <div className="bg-[#E02F3C]/10 p-3 flex-shrink-0">
            <div className="text-[#E02F3C]">{icon}</div>
          </div>
        )}
        <div>
          {title && (
            <h4 className="text-[#181210] font-black italic uppercase mb-1">
              {title}
            </h4>
          )}
          <div className="text-gray-600 font-medium">
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "achievement") {
    return (
      <div
        className={`${baseStyles} ${variants[variant]} ${className}`}
        style={animationStyle}
      >
        {title && (
          <h4 className="text-[#E02F3C] font-black italic text-2xl uppercase mb-2">
            {title}
          </h4>
        )}
        <div className="text-gray-600 font-medium">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={animationStyle}
    >
      {title && (
        <h4 className="text-[#181210] font-black italic uppercase mb-3">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};

export default Card;
