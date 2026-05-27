import React, { useEffect, useState, useRef, useCallback } from "react";

interface ParallaxOptions {
  speed?: number; // 0.1 = slow, 1 = normal scroll speed
  direction?: "up" | "down";
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = "up", disabled = false } = options;
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const scrolled = window.scrollY;
    const rate = direction === "up" ? -speed : speed;

    // Only apply parallax when element is in viewport
    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
      setOffset(scrolled * rate);
    }
  }, [speed, direction, disabled]);

  useEffect(() => {
    if (disabled) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, disabled]);

  return { ref, offset, style: { transform: `translateY(${offset}px)` } };
};

// Parallax wrapper component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.3,
  direction = "up",
  className = "",
}) => {
  const { ref, style } = useParallax({ speed, direction: direction as "up" | "down" });

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, willChange: "transform" }}
    >
      {children}
    </div>
  );
};

// Mouse parallax for floating elements
interface MouseParallaxOptions {
  strength?: number;
  disabled?: boolean;
}

export const useMouseParallax = (options: MouseParallaxOptions = {}) => {
  const { strength = 0.02, disabled = false } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * strength;
      const y = (e.clientY - centerY) * strength;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, disabled]);

  return {
    ref,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: "transform 0.1s ease-out",
    },
  };
};

export default useParallax;
