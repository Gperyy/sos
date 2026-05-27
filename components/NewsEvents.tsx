import React from "react";
import { MapPin, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import { EventItem } from "../types";

interface ExtendedEventItem extends EventItem {
  isHighlighted?: boolean;
  website?: string;
}

const eventItems: ExtendedEventItem[] = [
  { id: 1, day: "13-14", month: "Haz", title: "RC Model Festivali", location: "Sivrihisar", action: "Detaylar" },
  { id: 2, day: "27", month: "Haz", title: "Kulüp Balosu", location: "Sivrihisar", action: "Detaylar" },
  { id: 3, day: "28", month: "Haz", title: "Uçmayan Köy Kalmasın", location: "Sivrihisar", action: "Detaylar" },
  { id: 4, day: "17-23", month: "Ağu", title: "ASINFURA 2", location: "Sivrihisar", action: "Detaylar" },
  { id: 5, day: "29-30", month: "Ağu", title: "Zafer Bayramı & Havacılık Haftası", location: "Sivrihisar", action: "Detaylar" },
  { id: 6, day: "19-20", month: "Eyl", title: "SHG Airshow 2026", location: "Sivrihisar Hava Gösterileri", action: "Web Sitesi", isHighlighted: true, website: "https://shgairshow.com" },
  { id: 7, day: "02", month: "Eki", title: "Geleneksel Cumhuriyet Fotoğrafı", location: "Sivrihisar", action: "Detaylar" },
  { id: 8, day: "10", month: "Kas", title: "ATA'ya Saygı Uçuşu", location: "Sivrihisar", action: "Detaylar" },
];

const NewsEvents: React.FC = () => {
  return (
    <div className="bg-background-light py-24">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-12 relative items-start">
        {/* SHG Airshow 2026 Section */}
        <div className="flex-grow w-full md:w-2/3 flex flex-col">
          <div className="flex items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_#E02F3C]"></div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#181210]">
                SHG Airshow 2026
              </h2>
            </div>
          </div>

          <div className="bg-white shadow-xl overflow-hidden border border-gray-100 flex-1">
            <div
              className="relative h-64 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjZuhQAMCGeFPaP6MgWTzURvLn0G3mICZKIseY9pkVS66unLagoggn6pvcSZcNPw8PueI7wy5oOYvHGOOEauR4iEojc4vLelLyZCYTuBLYIS6VQBcKyTxRtIbMz5RBPybU-h2BGaOMyVQyBnwYk-gPDTNb3Aq3cD0xXgK9dZFZ3NvZJEOKjYQ3XoYrlm0Cxriuk6ZE9Jg24LtgzuqFenluM06JCOMLcqPXPX6XCt-ento4-ROE1MHPzoMbdOvLYgViF_t3By1Por0")`,
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <span className="absolute top-4 right-4 bg-[#E02F3C] text-white text-xs font-black italic px-4 py-2 shadow-lg transform skew-x-[-15deg]">
                <span className="block skew-x-[15deg]">19-20 EYLÜL</span>
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black italic text-[#181210] uppercase mb-3">
                Sivrihisar Hava Gösterileri
              </h3>
              <a
                href="https://shgairshow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E02F3C] transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#E02F3C]" />
                <span className="font-medium text-sm">Sivrihisar Havacılık Merkezi</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div id="upcoming-events" className="w-full md:w-1/3 min-w-[280px]">
          <div className="h-[60px]"></div>
          <div className="bg-white shadow-xl border-l-4 border-[#E02F3C] px-5 pt-5 pb-4 relative h-[376px] flex flex-col">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 italic">
              Gelecek Etkinlikler
            </h3>
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {eventItems.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="flex gap-3 group cursor-pointer relative"
                >
                  {/* Date Box - Angled corner */}
                  <div
                    className={`flex flex-col items-center justify-center w-14 h-14 flex-shrink-0 transition-all ${
                      event.isHighlighted
                        ? "bg-[#E02F3C]"
                        : "bg-gray-100"
                    }`}
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)" }}
                  >
                    <span className={`font-black text-lg italic ${event.isHighlighted ? "text-white" : "text-[#E02F3C]"}`}>
                      {event.day}
                    </span>
                    <span className={`text-[9px] font-bold uppercase ${event.isHighlighted ? "text-white/80" : "text-gray-500"}`}>
                      {event.month}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-black italic text-sm uppercase leading-tight transition-colors ${
                      event.isHighlighted
                        ? "text-[#181210]"
                        : "text-[#181210] group-hover:text-[#E02F3C]"
                    }`}>
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1 font-medium">
                      <MapPin className="w-3 h-3 text-[#E02F3C]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const eventsSection = document.getElementById("events");
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="block w-full text-center mt-3 py-3 bg-gray-100 hover:bg-[#E02F3C] hover:text-white text-xs font-black italic uppercase tracking-widest transition-all text-[#181210]"
            >
              Tüm Takvimi Gör
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;
