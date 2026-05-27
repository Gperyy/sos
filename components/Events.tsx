import React from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

interface Event {
  id: number;
  date: string;
  day: string;
  month: string;
  title: string;
  location: string;
  description?: string;
  isHighlighted?: boolean;
  website?: string;
}

const upcomingEvents: Event[] = [
  { id: 1, date: "13-14 Haziran 2026", day: "13-14", month: "Haz", title: "RC Model Festivali", location: "Sivrihisar Havacılık Merkezi", description: "Model uçak ve drone tutkunlarını bir araya getiren festival." },
  { id: 2, date: "27 Haziran 2026", day: "27", month: "Haz", title: "Kulüp Balosu", location: "Sivrihisar", description: "Yıllık geleneksel kulüp balosu." },
  { id: 3, date: "28 Haziran 2026", day: "28", month: "Haz", title: "Uçmayan Köy Kalmasın", location: "Sivrihisar", description: "Çocuklara havacılık sevgisini aşılayan sosyal sorumluluk projesi." },
  { id: 4, date: "17-23 Ağustos 2026", day: "17-23", month: "Ağu", title: "ASINFURA 2", location: "Sivrihisar Havacılık Merkezi", description: "Uluslararası akrobasi eğitim kampı." },
  { id: 5, date: "29-30 Ağustos 2026", day: "29-30", month: "Ağu", title: "Zafer Bayramı & Havacılık Haftası", location: "Sivrihisar", description: "30 Ağustos Zafer Bayramı ve Türk Havacılık Haftası kutlamaları, uçurtma şenliği." },
  { id: 6, date: "19-20 Eylül 2026", day: "19-20", month: "Eyl", title: "SHG Airshow 2026", location: "Sivrihisar Hava Gösterileri", description: "Türkiye'nin en büyük hava gösterisi organizasyonu. Binlerce seyirci, düzinelerce pilot ve unutulmaz anlar.", isHighlighted: true, website: "https://shgairshow.com" },
  { id: 7, date: "2 Ekim 2026", day: "02", month: "Eki", title: "Geleneksel Cumhuriyet Fotoğrafı", location: "Sivrihisar", description: "29 Ekim Cumhuriyet Bayramı için geleneksel toplu fotoğraf çekimi." },
  { id: 8, date: "10 Kasım 2026", day: "10", month: "Kas", title: "ATA'ya Saygı Uçuşu", location: "Sivrihisar", description: "Ulu Önder Mustafa Kemal Atatürk'ü anma uçuşu." },
];

const Events: React.FC = () => {
  return (
    <section id="events" className="py-24 bg-background-light">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_#E02F3C]"></div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-[#181210]">
            Etkinlik Takvimi
          </h2>
        </div>

        {/* Main Title */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-black italic text-[#E02F3C] uppercase leading-tight">
            2026 Semin Öztürk Şener Akrobasi Gösterileri
          </h3>
        </div>

        {/* Full Calendar Section */}
        <div id="full-calendar" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white p-6 shadow-lg transition-all hover:shadow-xl border-l-4 ${
                event.isHighlighted
                  ? "border-[#E02F3C] bg-gradient-to-r from-[#E02F3C]/5 to-transparent"
                  : "border-gray-200 hover:border-[#E02F3C]"
              }`}
            >
              <div className="flex gap-4">
                <div className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 transform skew-x-[-10deg] ${
                  event.isHighlighted
                    ? "bg-[#E02F3C] shadow-[0_0_20px_rgba(224,47,60,0.4)]"
                    : "bg-gray-100"
                }`}>
                  <span className={`font-black text-lg italic skew-x-[10deg] ${event.isHighlighted ? "text-white" : "text-[#E02F3C]"}`}>
                    {event.day}
                  </span>
                  <span className={`text-xs font-bold uppercase skew-x-[10deg] ${event.isHighlighted ? "text-white/80" : "text-gray-500"}`}>
                    {event.month}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className={`text-xl font-black italic uppercase mb-1 ${event.isHighlighted ? "text-[#E02F3C]" : "text-[#181210]"}`}>
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin className="w-3 h-3 text-[#E02F3C]" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  {event.description && (
                    <p className="text-gray-600 text-sm font-medium mb-3">
                      {event.description}
                    </p>
                  )}
                  {event.isHighlighted && event.website && (
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#E02F3C] text-white px-4 py-2 font-black italic uppercase text-sm hover:bg-[#ff4d5a] transition-colors"
                    >
                      Web Sitesi <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
