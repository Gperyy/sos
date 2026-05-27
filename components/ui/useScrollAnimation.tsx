import React, { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Animated Section wrapper component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-down" | "fade-in" | "slide-left" | "slide-right" | "scale";
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const animations: Record<string, { initial: string; visible: string }> = {
    "fade-up": {
      initial: "opacity-0 translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    "fade-down": {
      initial: "opacity-0 -translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    "fade-in": {
      initial: "opacity-0",
      visible: "opacity-100",
    },
    "slide-left": {
      initial: "opacity-0 translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
    "slide-right": {
      initial: "opacity-0 -translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
    scale: {
      initial: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
  };

  const { initial, visible } = animations[animation];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visible : initial
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default useScrollAnimation;
