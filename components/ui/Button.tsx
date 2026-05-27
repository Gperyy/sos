import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  skewed?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  skewed = true,
  icon,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-3 font-black italic uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E02F3C] overflow-hidden";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#E02F3C] hover:bg-[#FF4D5A] text-white shadow-[0_0_20px_rgba(224,47,60,0.4)] hover:shadow-[0_0_30px_rgba(224,47,60,0.6)] hover:-translate-y-0.5",
    secondary:
      "bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 hover:border-[#E02F3C]/50 text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    ghost:
      "bg-transparent hover:bg-gray-100 text-[#181210] hover:text-[#E02F3C]",
    outline:
      "bg-transparent border-2 border-[#E02F3C] text-[#E02F3C] hover:bg-[#E02F3C] hover:text-white",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-lg",
  };

  const skewClass = skewed ? "skew-x-[-10deg]" : "";
  const innerSkewClass = skewed ? "skew-x-[10deg]" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${skewClass} ${className}`}
      {...props}
    >
      {/* Shimmer effect for primary */}
      {variant === "primary" && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
      )}
      <span className={`flex items-center gap-2 ${innerSkewClass}`}>
        {icon}
        {children}
      </span>
    </button>
  );
};

export default Button;
