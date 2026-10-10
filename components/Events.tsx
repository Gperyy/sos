import React from "react";
import { ExternalLink, MapPin, Clock } from "lucide-react";
import { splitEvents, formatDate } from "./data/events";
import type { EventData } from "./data/events";

// Etkinlik Takvimi — ŞU ANKİ düzen + MAYIS font (Lexend) & renk/buton (kırmızı skew/glow).
// Veriler: components/data/events.ts (yaklaşan/geçmiş tarihe göre otomatik ayrılır).

// Afiş varsa tıklayınca tam boy açılır
const PosterFrame: React.FC<{ poster?: string; alt: string; className?: string }> = ({ poster, alt, className = "" }) => (
  <div data-reveal-img className={`relative overflow-hidden bg-black/5 border border-black/10 ${className}`}>
    {poster ? (
      <a href={poster} target="_blank" rel="noopener noreferrer" aria-label={`${alt} afişini tam boy aç`}>
        <img src={poster} alt={`${alt} afişi`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
      </a>
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(224,47,60,0.1),transparent_60%)]">
        <span className="text-black/20 text-[11px] font-black italic tracking-[0.3em] uppercase">Poster</span>
      </div>
    )}
  </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-10">
    <span className="text-[#E02F3C] text-xs font-black italic tracking-[0.3em] uppercase">{children}</span>
    <span className="flex-1 h-px bg-gray-200"></span>
  </div>
);

const EventCard: React.FC<{ event: EventData; past?: boolean }> = ({ event, past }) => {
  const d = formatDate(event);
  return (
    <article className="group" data-reveal>
      <PosterFrame poster={event.poster} alt={event.title} className="aspect-[3/4]" />
      <div className="mt-5">
        <span className={`text-xs font-black italic tracking-wider uppercase ${past ? "text-gray-400" : "text-[#E02F3C]"}`}>
          {d.day} {d.month} {d.year}
        </span>
        <h4 lang={event.lang} className="text-xl md:text-2xl font-black italic uppercase text-[#181210] mt-1.5 leading-tight">{event.title}</h4>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#E02F3C]" /> {event.location}
        </div>
      </div>
    </article>
  );
};

const Events: React.FC = () => {
  const { upcoming, past } = splitEvents();
  const [featured, ...moreUpcoming] = upcoming;
  const fd = featured ? formatDate(featured) : undefined;
  const pastWithPoster = past.filter((e) => e.poster);

  return (
    <section id="events" className="py-24 bg-background-light font-['Lexend']">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Mayıs başlık */}
        <div className="flex items-center gap-4 mb-4" data-reveal>
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-[#181210]">Etkinlik Takvimi</h2>
        </div>
        <p className="text-gray-500 text-lg font-medium mb-14 max-w-2xl" data-reveal>
          2026 Semin Öztürk Şener Akrobasi Gösterileri
        </p>

        {/* Sıradaki etkinlik */}
        {featured && fd ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20 items-center">
            <div className="lg:col-span-5 group">
              <PosterFrame poster={featured.poster} alt={featured.title} className="aspect-[3/4]" />
            </div>
            <div className="lg:col-span-7" data-reveal>
              <span className="inline-block bg-[#E02F3C] text-white text-xs font-black italic uppercase tracking-wider px-4 py-1.5 skew-x-[-10deg] shadow-[0_0_15px_rgba(224,47,60,0.5)] mb-5">
                <span className="block skew-x-[10deg]">Sıradaki Etkinlik · {fd.day} {fd.month} {fd.year}</span>
              </span>
              <h3 lang={featured.lang} className="text-4xl md:text-5xl font-black italic uppercase text-[#181210] leading-none">{featured.title}</h3>
              {featured.description && (
                <p className="text-gray-600 text-lg font-medium leading-relaxed mt-6 max-w-xl">{featured.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-sm mt-5 font-medium">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E02F3C]" /> {featured.location}
                </span>
                {featured.time && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#E02F3C]" /> Saat {featured.time}
                  </span>
                )}
              </div>
              {featured.website && (
                <a
                  href={featured.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-8 py-4 font-black italic text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(224,47,60,0.5)] hover:shadow-[0_0_30px_rgba(224,47,60,0.7)] skew-x-[-10deg]"
                >
                  <span className="flex items-center gap-2 skew-x-[10deg]">Web Sitesi <ExternalLink className="w-4 h-4" /></span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <p className="mb-20 text-[#181210] text-2xl font-black italic uppercase" data-reveal>
            Yeni etkinlikler yakında duyurulacak.
          </p>
        )}

        {/* Diğer yaklaşan etkinlikler */}
        {moreUpcoming.length > 0 && (
          <div className="mb-20">
            <SubHeading>Yaklaşan Etkinlikler</SubHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {moreUpcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}

        {/* Geçmiş etkinlikler — en yeni önce; yalnızca afişi olanlar gösterilir */}
        {pastWithPoster.length > 0 && (
          <>
            <SubHeading>Geçmiş Etkinlikler</SubHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {pastWithPoster.map((e) => (
                <EventCard key={e.id} event={e} past />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Events;
