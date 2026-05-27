import React from "react";
import { Newspaper, Globe, BookOpen, Plane } from "lucide-react";

const Media: React.FC = () => {
  const pressClippings = [
    { id: 1, source: "Sözcü", title: "Gökyüzünün Kraliçesi", type: "Gazete" },
    { id: 2, source: "The Guardian", title: "Photo of the Day", type: "Uluslararası" },
    { id: 3, source: "ECNS", title: "First Female Pilot", type: "Uluslararası" },
    { id: 4, source: "Akşam Gazetesi", title: "Başarı Yurtdışına Taştı", type: "Gazete" },
    { id: 5, source: "Telegraph", title: "Feature Article", type: "Uluslararası" },
    { id: 6, source: "Milliyet", title: "Başarı Hikayesi", type: "Gazete" },
    { id: 7, source: "Air News Times", title: "Interview", type: "Dergi" }
  ];

  return (
    <section id="media" className="py-24 bg-surface-dark">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_#E02F3C]"></div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
            Medya
          </h2>
        </div>

        {/* Press Clippings */}
        <div className="mb-12">
          <h3 className="text-2xl font-black italic text-white uppercase mb-8">Basın Kupürleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pressClippings.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 p-6 hover:border-[#E02F3C]/50 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-3">
                  {item.type === "Uluslararası" ? (
                    <Globe className="w-4 h-4 text-[#E02F3C]" />
                  ) : item.type === "Dergi" ? (
                    <BookOpen className="w-4 h-4 text-[#E02F3C]" />
                  ) : (
                    <Newspaper className="w-4 h-4 text-[#E02F3C]" />
                  )}
                  <span className="text-[#E02F3C] text-xs font-black italic uppercase">
                    {item.type}
                  </span>
                </div>
                <h4 className="text-white font-black italic uppercase mb-1 group-hover:text-[#E02F3C] transition-colors">
                  {item.source}
                </h4>
                <p className="text-gray-400 text-sm font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-black italic text-white uppercase mb-8">Videolar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-4">
              <div className="aspect-video bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <Plane className="w-16 h-16 text-[#E02F3C] mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Akrobasi Gösterileri</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4">
              <div className="aspect-video bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <Plane className="w-16 h-16 text-[#E02F3C] mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Tanıtım Videoları</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;
