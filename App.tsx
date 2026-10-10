import React, { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsEvents from "./components/NewsEvents";
import VelocitySection from "./components/VelocitySection";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import About from "./components/About";
import Aircraft from "./components/Aircraft";
import Events from "./components/Events";
import Media from "./components/Media";
import FlyWithSemin from "./components/FlyWithSemin";
import Contact from "./components/Contact";
import { NavContext } from "./components/ui";
import type { TabType } from "./components/ui";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // Sekme değiştir + yeni sayfanın başına anında dön
  const navigate = useCallback((tab: TabType) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0 });
    });
  }, []);

  // Leclerc tarzı akıcı/ataletli kaydırma (reduced-motion'da devre dışı)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Slow motion parallax: [data-parallax="hız"] öğeler kaydırmadan daha yavaş akar,
  // [data-parallax-fade] olanlar ekrandan çıkarken yavaşça solar.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        const speed = parseFloat(el.dataset.parallax || "0.2");
        const delta = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-delta * speed).toFixed(1)}px, 0)`;
        if (el.hasAttribute("data-parallax-fade")) {
          el.style.opacity = String(Math.max(0, 1 - Math.max(0, -delta) / (vh * 0.6)));
        }
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      els.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
      });
    };
  }, [activeTab]);

  // Scroll ile belirme (reveal). IntersectionObserver kullanılmıyor: Chrome, öğenin kendi
  // clip-path'ini hesaba katıyor ve tamamen kırpılmış [data-reveal-img] hiç "görünür" sayılmıyordu.
  // Bunun yerine konum kontrolü yapılır. Sayfaya sonradan eklenen öğeler (sekme değişimi,
  // geliştirmede anlık yenileme) MutationObserver ile yakalanır.
  useEffect(() => {
    const SEL = "[data-reveal]:not(.reveal-in), [data-reveal-img]:not(.reveal-in)";
    const pending = new Set<Element>();
    let ticking = false;

    const check = () => {
      ticking = false;
      const limit = window.innerHeight * 0.92;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) {
          el.classList.add("reveal-in");
          pending.delete(el);
        }
      });
    };
    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    const register = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SEL)) pending.add(root);
      root.querySelectorAll(SEL).forEach((el) => pending.add(el));
      schedule();
    };

    register(document);
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => n instanceof Element && register(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      mo.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <About />;
      case "aircraft":
        return <Aircraft />;
      case "events":
        return <Events />;
      case "media":
        return <Media />;
      case "fly":
        return <FlyWithSemin />;
      case "contact":
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <NewsEvents />
            <VelocitySection />
            <Gallery />
          </>
        );
    }
  };

  return (
    <NavContext.Provider value={navigate}>
      <div className="relative flex min-h-screen w-full flex-col font-sans">
        <Header activeTab={activeTab} onTabChange={navigate} />
        <main className="flex-grow">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </NavContext.Provider>
  );
};

export default App;
