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
import { NavContext, ErrorBoundary } from "./components/ui";
import type { TabType } from "./components/ui";

// Her sekmenin kendi adresi: yenileyince aynı sayfa açılır, geri/ileri tuşları sekmeler arasında çalışır.
const PATHS: Record<TabType, string> = {
  home: "/",
  about: "/hakkinda",
  aircraft: "/semin-in-ucagi",
  events: "/etkinlik-takvimi",
  media: "/medya",
  fly: "/semin-ile-uc",
  contact: "/iletisim",
};
const TITLES: Record<TabType, string> = {
  home: "",
  about: "Hakkında",
  aircraft: "Semin'in Uçağı",
  events: "Etkinlik Takvimi",
  media: "Medya",
  fly: "Semin ile Uç",
  contact: "İletişim",
};
const BASE_TITLE = "Semin Öztürk Şener";
const tabFromPath = (path: string): TabType => {
  const clean = path.replace(/\/+$/, "") || "/";
  const hit = (Object.keys(PATHS) as TabType[]).find((t) => PATHS[t] === clean);
  return hit ?? "home";
};

type LenisLike = { scrollTo: (y: number, o?: { immediate?: boolean; force?: boolean }) => void };
const scrollToY = (y: number) => {
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo({ top: y });
};

// Kaydırma konumunu geri yükle: sayfa (görseller yüklendikçe) yeterince uzayana kadar en fazla ~2 sn dener.
// rAF yerine zamanlayıcı: arka plandaki sekmede de çalışır.
const restoreScroll = (y: number) => {
  const start = performance.now();
  const tick = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (!y || max >= y || performance.now() - start > 2000) {
      scrollToY(Math.max(0, Math.min(y, max)));
      return;
    }
    window.setTimeout(tick, 50);
  };
  window.setTimeout(tick, 0);
};

type HistState = { tab?: TabType; key?: string };
const newKey = () => Math.random().toString(36).slice(2, 10);
const readY = (key?: string) => {
  if (!key) return 0;
  try {
    return Number(sessionStorage.getItem(`scroll:${key}`)) || 0;
  } catch {
    return 0;
  }
};
const writeY = (key: string | undefined, y: number) => {
  if (!key) return;
  try {
    sessionStorage.setItem(`scroll:${key}`, String(Math.round(y)));
  } catch {
    /* gizli sekme vb. — konum kaydedilemezse sorun değil */
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(() => tabFromPath(window.location.pathname));

  // Kaydırmayı tarayıcı yerine biz geri yükleriz (Lenis ve sonradan yüklenen görseller yüzünden).
  // Her geçmiş kaydının bir anahtarı var; konumu kaydırdıkça sessionStorage'a yazılır (yenilemede kalır).
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const st = history.state as HistState | null;
    const key = st?.key ?? newKey();
    if (!st?.key) history.replaceState({ tab: activeTab, key }, "");
    restoreScroll(readY(key));

    let t: number | undefined;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => writeY((history.state as HistState | null)?.key, window.scrollY), 150);
    };
    const onPop = (e: PopStateEvent) => {
      const s2 = e.state as HistState | null;
      setActiveTab(s2?.tab ?? tabFromPath(window.location.pathname));
      restoreScroll(readY(s2?.key));
    };
    // Yenileme / sayfadan çıkış: son konumu hemen yaz
    const saveNow = () => writeY((history.state as HistState | null)?.key, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    window.addEventListener("pagehide", saveNow);
    window.addEventListener("beforeunload", saveNow);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pagehide", saveNow);
      window.removeEventListener("beforeunload", saveNow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sekme başlığı
  useEffect(() => {
    document.title = TITLES[activeTab] ? `${TITLES[activeTab]} | ${BASE_TITLE}` : `${BASE_TITLE} - Profesyonel Akrobasi Pilotu`;
  }, [activeTab]);

  // Sekme değiştir: adres çubuğuna yaz (geçmişe ekle) + yeni sayfanın başına anında dön
  const navigate = useCallback((tab: TabType) => {
    const current = tabFromPath(window.location.pathname);
    if (tab !== current) {
      // Ayrılırken bulunduğumuz konumu kaydet: geri dönünce aynı yerden devam
      writeY((history.state as HistState | null)?.key, window.scrollY);
      history.pushState({ tab, key: newKey() }, "", PATHS[tab]);
    }
    setActiveTab(tab);
    requestAnimationFrame(() => scrollToY(0));
  }, []);

  // Leclerc tarzı akıcı/ataletli kaydırma (reduced-motion'da devre dışı)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis kurulamazsa (eski tarayıcı vb.) normal kaydırmayla devam: site çalışmaya devam etsin
    let lenis: Lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
    } catch (err) {
      console.error("[Lenis]", err);
      return;
    }

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
        {/* Her bölüm ayrı sınırda: birindeki hata diğerlerini (ve tüm sayfayı) götürmez */}
        <ErrorBoundary>
          <Header activeTab={activeTab} onTabChange={navigate} />
        </ErrorBoundary>
        <main className="flex-grow">
          <ErrorBoundary key={activeTab}>{renderContent()}</ErrorBoundary>
        </main>
        {/* Sponsorlar yalnızca ana sayfada. Koyu biten sayfalarda kapanış bloğu da koyu: ani geçiş olmasın */}
        <ErrorBoundary>
          <Footer dark={activeTab === "aircraft" || activeTab === "media"} showSponsors={activeTab === "home"} />
        </ErrorBoundary>
      </div>
    </NavContext.Provider>
  );
};

export default App;
