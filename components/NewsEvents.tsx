import React from "react";
import { ArrowRight, MapPin, ChevronRight, ArrowRight as ArrowRightAlt } from "lucide-react";
import { NewsItem, EventItem } from "../types";

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "Oct 15, 2023",
    title: "Sivrihisar Air Show Recap",
    description: "Thousands gathered to witness the breathtaking maneuvers performed over the historic Sivrihisar Aviation Center.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjZuhQAMCGeFPaP6MgWTzURvLn0G3mICZKIseY9pkVS66unLagoggn6pvcSZcNPw8PueI7wy5oOYvHGOOEauR4iEojc4vLelLyZCYTuBLYIS6VQBcKyTxRtIbMz5RBPybU-h2BGaOMyVQyBnwYk-gPDTNb3Aq3cD0xXgK9dZFZ3NvZJEOKjYQ3XoYrlm0Cxriuk6ZE9Jg24LtgzuqFenluM06JCOMLcqPXPX6XCt-ento4-ROE1MHPzoMbdOvLYgViF_t3By1Por0",
    isNew: true
  },
  {
    id: 2,
    date: "Sep 28, 2023",
    title: "Season Prep: Behind Scenes",
    description: "An exclusive look into the rigorous training regimen and mechanical preparations for the upcoming championship series.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7Ans-iU27VuxDrqzgX9EhyAqLyJQGUh57BScRvEHc9W6B7yC4BhZXlRcUELioVISLrhMK4sBlGCNxEYR0qrUua8sqvQN5NWGF-AP6P_Qa3K1489kj_Z6ggpbYarwIRS7VRHxwyOWMtQ7ygEyeXCB4lyLMkRgpY7IoBnzqd-zE-0er7rOlBncWW1GA4oS2uWzBpxZzvPGkZum-s9L92Gbc4UYUVeuuYtHnnd39WD7jGXm8LIOjw79BseBnMfR-dYLgIKKsWdm8VE"
  }
];

const eventItems: EventItem[] = [
  { id: 1, day: "12", month: "Nov", title: "Dubai Airshow", location: "Dubai, UAE", action: "Get Tickets" },
  { id: 2, day: "05", month: "Apr", title: "Eurasia Airshow", location: "Antalya, Turkey", action: "Notify Me" },
  { id: 3, day: "19", month: "May", title: "Samsun Fest", location: "Samsun, Turkey", action: "Details" }
];

const NewsEvents: React.FC = () => {
  return (
    <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8 py-24 flex flex-col md:flex-row gap-16 relative">
      {/* Background Decor */}
      <div className="absolute top-40 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent transform rotate-12"></div>
      </div>

      {/* News Section */}
      <div className="flex-grow w-full md:w-2/3">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-2 bg-[#FF542E] transform skew-x-[-15deg] shadow-[0_0_15px_#ff542e]"></div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#181210] dark:text-white">
              Latest News
            </h2>
          </div>
          <a
            href="#archive"
            className="text-[#FF542E] hover:text-[#ff6b4a] font-bold italic text-sm flex items-center gap-1 group transition-all"
          >
            View Archive
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col group cursor-pointer bg-white dark:bg-surface-dark rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/5 relative"
            >
              <div
                className="relative h-64 overflow-hidden"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${item.image}")` }}
                ></div>
                {item.isNew && (
                  <span className="absolute top-0 right-0 z-20 bg-[#FF542E] text-white text-xs font-black italic px-4 py-2 shadow-lg transform translate-x-2 -translate-y-1 skew-x-[-15deg]">
                    <span className="block skew-x-[15deg]">NEW</span>
                  </span>
                )}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  {item.isNew ? (
                    <span className="size-2 rounded-full bg-[#FF542E] animate-pulse"></span>
                  ) : null}
                  <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                    {item.date}
                  </div>
                </div>
                <h3 className="text-2xl font-black italic mb-4 text-[#181210] dark:text-white leading-none group-hover:text-[#FF542E] transition-colors uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {item.description}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[#FF542E] text-sm font-black italic uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More <ArrowRightAlt className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="w-full md:w-1/3 min-w-[320px]">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-10 w-2 bg-[#FF542E] transform skew-x-[-15deg] shadow-[0_0_15px_#ff542e]"></div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#181210] dark:text-white">
            Events
          </h2>
        </div>
        <div className="bg-white dark:bg-surface-dark shadow-xl border-l-4 border-[#FF542E] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent"></div>
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8 italic">
            Upcoming Airshows
          </h3>
          <div className="space-y-8">
            {eventItems.map((event) => (
              <div key={event.id} className="flex gap-5 group cursor-pointer relative z-10">
                <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-black/40 w-20 h-20 transform skew-x-[-10deg] border border-gray-200 dark:border-white/10 group-hover:border-[#FF542E] group-hover:shadow-[0_0_15px_rgba(255,84,46,0.3)] transition-all">
                  <span className="text-[#FF542E] font-black text-2xl skew-x-[10deg] italic">
                    {event.day}
                  </span>
                  <span className="text-gray-500 text-xs font-bold uppercase skew-x-[10deg]">
                    {event.month}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-[#181210] dark:text-white font-black italic text-xl uppercase leading-none group-hover:text-[#FF542E] transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
                    <MapPin className="w-3 h-3 text-[#FF542E]" />
                    <span>{event.location}</span>
                  </div>
                  <button className="mt-3 text-xs font-bold text-[#FF542E] uppercase tracking-wide flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                    {event.action} <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#calendar"
            className="block w-full text-center mt-10 py-4 bg-gray-100 dark:bg-white/5 hover:bg-[#FF542E] hover:text-white rounded-sm text-sm font-black italic uppercase tracking-wider transition-all"
          >
            View Full Calendar
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;