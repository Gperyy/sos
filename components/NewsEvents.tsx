import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader, useNav } from "./ui";
import { splitEvents, formatDate } from "./data/events";
import type { EventData } from "./data/events";

// Veriler: components/data/events.ts — sıradaki etkinlik tarihe göre otomatik seçilir.

const EventRow: React.FC<{ event: EventData; first: boolean; onClick: () => void; delay: number }> = ({ event, first, onClick, delay }) => {
  const d = formatDate(event);
  return (
    <li data-reveal data-reveal-delay={String(Math.min(delay, 5))}>
      <button
        onClick={onClick}
        className={`group w-full text-left flex items-center gap-6 py-6 border-ink/10 ${first ? "" : "border-t"}`}
      >
        <span className="font-black italic text-ink text-2xl leading-none tabular-nums w-20 flex-shrink-0">
          {d.day}
          <span className="block text-ink/45 text-[10px] tracking-[0.2em] uppercase mt-1.5 font-sans">{d.month}</span>
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-ink font-medium group-hover:text-primary transition-colors">{event.title}</span>
          <span className="block text-ink/50 text-sm font-light mt-0.5">{event.location}</span>
        </span>
        <ArrowRight className="w-5 h-5 text-ink/25 group-hover:text-ink group-hover:translate-x-1 transition-all flex-shrink-0" />
      </button>
    </li>
  );
};

const ListLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mt-10 mb-2">
    <span className="h-px w-8 bg-primary"></span>
    <span className="text-ink/50 text-[11px] tracking-[0.3em] uppercase">{children}</span>
  </div>
);

// Ana sayfada ölçülü blok: orta boy afiş + bilgi + en fazla 2 satırlık liste
const NewsEvents: React.FC = () => {
  const go = useNav();
  const scrollToEvents = () => go("events");
  const { upcoming, past } = splitEvents();
  const [featured, ...moreUpcoming] = upcoming;
  const fd = featured ? formatDate(featured) : undefined;
  const nextList = moreUpcoming.slice(0, 2);
  // Yaklaşan liste kısaysa son etkinliklerle tamamla
  const recentList = past.slice(0, Math.max(0, 2 - nextList.length));

  return (
    <section id="upcoming-events" className="py-20 md:py-28 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-12 flex-wrap">
          <SectionHeader eyebrow="Takvim" title="Yaklaşan Etkinlikler" className="" />
          <button
            onClick={scrollToEvents}
            className="group inline-flex items-center gap-2 text-ink/60 hover:text-ink text-[12px] tracking-[0.18em] uppercase font-medium transition-colors"
          >
            Tüm Takvim <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-14 items-start">
          {/* Sıradaki etkinliğin afişi — orta boy */}
          <div className="w-2/3 max-w-[300px] md:w-full">
            {featured ? (
              <button onClick={scrollToEvents} className="group block w-full text-left" aria-label={`${featured.title} — takvimde gör`}>
                <div data-reveal-img className="relative aspect-[3/4] overflow-hidden bg-ink/5">
                  {featured.poster ? (
                    <img src={featured.poster} alt={`${featured.title} afişi`} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-ink/25 text-[11px] tracking-[0.35em] uppercase">Afiş</span>
                    </div>
                  )}
                </div>
              </button>
            ) : (
              <p className="font-black italic uppercase text-ink text-2xl" data-reveal>Yeni etkinlikler yakında duyurulacak.</p>
            )}
          </div>

          {/* Bilgi + kısa liste */}
          <div className="flex flex-col md:pt-2">
            {featured && fd && (
              <div data-reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-primary"></span>
                  <span className="text-ink/50 text-[11px] tracking-[0.3em] uppercase">
                    {fd.day} {fd.month} {fd.year}
                    {featured.time ? ` · Saat ${featured.time}` : ""}
                  </span>
                </div>
                <h3 lang={featured.lang} className="font-black italic uppercase text-ink text-2xl md:text-4xl mt-4 leading-[1.05]">{featured.title}</h3>
                <p className="text-ink/55 font-light mt-3">{featured.location}</p>
                {featured.website && (
                  <a
                    href={featured.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-ink/60 hover:text-ink text-[12px] tracking-[0.18em] uppercase font-medium transition-colors"
                  >
                    Web Sitesi <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            {nextList.length > 0 && (
              <>
                <ListLabel>Ardından</ListLabel>
                <ul>
                  {nextList.map((e, i) => (
                    <EventRow key={e.id} event={e} first={i === 0} onClick={scrollToEvents} delay={i + 1} />
                  ))}
                </ul>
              </>
            )}
            {recentList.length > 0 && (
              <>
                <ListLabel>Son Etkinlikler</ListLabel>
                <ul>
                  {recentList.map((e, i) => (
                    <EventRow key={e.id} event={e} first={i === 0} onClick={scrollToEvents} delay={i + 1} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
