import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface CareerMoment {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  stat1: { label: string; value: string };
  thumbnail: string;
}

const careerMoments: CareerMoment[] = [
  {
    year: "2003",
    title: "Ilk Akrobasi Uçuşu",
    subtitle: "12 Yaşında",
    description: "Henüz 12 yaşındayken babası Milli Akrobasi Pilotu Ali Ismet Öztürk ile birlikte ilk akrobasi uçuşunu gerçekleştirdi.",
    stat1: { label: "Yaş", value: "12" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCep27MNuV87esgp6oW8Cne9fUCHig30RstxATgpC_d3SDbczijT53asF55uOi81V_qlmQloTHVp3PD8ERv-VqrX4I5rLiIneOXorOPQQyxiqOHtBufnt0fNIcOxL_NZo7AW_OGbsvU3voJsdMQz0ctsZcG1gcekt_r5hsWVzrqVSC4NaMdzMA0VpPbKEvn-EnqEF1buCSVR4DYn7qRxDSA6ZiAWUJWmrk4riRbXQZ6w2YmE96PFmzmBRMLG5vl-FOzVu8bM9e3MCE",
  },
  {
    year: "2012",
    title: "Ilk Yalnız Akrobasi",
    subtitle: "Pitts S-2B",
    description: "21 yaşında Pitts S-2B uçağıyla ilk yalnız akrobasi uçuşunu gerçekleştirdi. Bu uçakla ilk yalnız uçan Türk Kadın Pilotu unvanını aldı.",
    stat1: { label: "Uçak", value: "Pitts S-2B" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjZuhQAMCGeFPaP6MgWTzURvLn0G3mICZKIseY9pkVS66unLagoggn6pvcSZcNPw8PueI7wy5oOYvHGOOEauR4iEojc4vLelLyZCYTuBLYIS6VQBcKyTxRtIbMz5RBPybU-h2BGaOMyVQyBnwYk-gPDTNb3Aq3cD0xXgK9dZFZ3NvZJEOKjYQ3XoYrlm0Cxriuk6ZE9Jg24LtgzuqFenluM06JCOMLcqPXPX6XCt-ento4-ROE1MHPzoMbdOvLYgViF_t3By1Por0",
  },
  {
    year: "2015",
    title: "Ilk Profesyonel Gösteri",
    subtitle: "SHG Airshow 2015",
    description: "19 Eylül 2015'te Sivrihisar Havacılık Merkezi'nde ilk profesyonel hava gösterisini gerçekleştirdi. Türkiye'nin ilk profesyonel kadın akrobasi pilotu olarak tarihe geçti.",
    stat1: { label: "Organizasyon", value: "SHG Airshow" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCep27MNuV87esgp6oW8Cne9fUCHig30RstxATgpC_d3SDbczijT53asF55uOi81V_qlmQloTHVp3PD8ERv-VqrX4I5rLiIneOXorOPQQyxiqOHtBufnt0fNIcOxL_NZo7AW_OGbsvU3voJsdMQz0ctsZcG1gcekt_r5hsWVzrqVSC4NaMdzMA0VpPbKEvn-EnqEF1buCSVR4DYn7qRxDSA6ZiAWUJWmrk4riRbXQZ6w2YmE96PFmzmBRMLG5vl-FOzVu8bM9e3MCE",
  },
  {
    year: "2016",
    title: "Ilk Helikopter Lisansı",
    subtitle: "PPL(H)",
    description: "TUSAŞ Uçuş Okulu'nda PPL(H) Özel Helikopter Pilot Yetiştirme Kursu'nu başarıyla tamamlayarak Türkiye'nin Ilk Sivil Kadın Helikopter Pilotu oldu.",
    stat1: { label: "Lisans", value: "PPL(H)" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7Ans-iU27VuxDrqzgX9EhyAqLyJQGUh57BScRvEHc9W6B7yC4BhZXlRcUELioVISLrhMK4sBlGCNxEYR0qrUua8sqvQN5NWGF-AP6P_Qa3K1489kj_Z6ggpbYarwIRS7VRHxwyOWMtQ7ygEyeXCB4lyLMkRgpY7IoBnzqd-zE-0er7rOlBncWW1GA4oS2uWzBpxZzvPGkZum-s9L92Gbc4UYUVeuuYtHnnd39WD7jGXm8LIOjw79BseBnMfR-dYLgIKKsWdm8VE",
  },
  {
    year: "2017",
    title: "MD-500 Lisansı",
    subtitle: "Helikopter Tip Sertifikası",
    description: "Ingiltere'deki Advance Helicopter Uçuş Okulu sınavını geçerek Türkiye'nin ilk MD-500 lisansına sahip kadın helikopter pilotu oldu.",
    stat1: { label: "Lisans", value: "MD-500" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjZuhQAMCGeFPaP6MgWTzURvLn0G3mICZKIseY9pkVS66unLagoggn6pvcSZcNPw8PueI7wy5oOYvHGOOEauR4iEojc4vLelLyZCYTuBLYIS6VQBcKyTxRtIbMz5RBPybU-h2BGaOMyVQyBnwYk-gPDTNb3Aq3cD0xXgK9dZFZ3NvZJEOKjYQ3XoYrlm0Cxriuk6ZE9Jg24LtgzuqFenluM06JCOMLcqPXPX6XCt-ento4-ROE1MHPzoMbdOvLYgViF_t3By1Por0",
  },
  {
    year: "2018",
    title: "Ilk Uluslararası Gösteri",
    subtitle: "AEROMANIA - Romanya",
    description: "Romanya'da düzenlenen AEROMANIA 2018'de ilk yurtdışı gösterisini gerçekleştirdi. Romanya Büyükelçisi'nin de katıldığı etkinlikte Türk bayrağını gururla temsil etti.",
    stat1: { label: "Organizasyon", value: "AEROMANIA" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjZuhQAMCGeFPaP6MgWTzURvLn0G3mICZKIseY9pkVS66unLagoggn6pvcSZcNPw8PueI7wy5oOYvHGOOEauR4iEojc4vLelLyZCYTuBLYIS6VQBcKyTxRtIbMz5RBPybU-h2BGaOMyVQyBnwYk-gPDTNb3Aq3cD0xXgK9dZFZ3NvZJEOKjYQ3XoYrlm0Cxriuk6ZE9Jg24LtgzuqFenluM06JCOMLcqPXPX6XCt-ento4-ROE1MHPzoMbdOvLYgViF_t3By1Por0",
  },
  {
    year: "2020",
    title: "Uluslararası Tanıtım",
    subtitle: "Unilever Reklam Filmleri",
    description: "Unilever'in Arjantin, Filipinler, Malezya, Meksika, Uruguay, Tayland ve Türkiye'yi içeren reklam filmlerinde yer aldı. 7 ülkede yayınlanan kampanyayla dünya sahnesinde boy gösterdi.",
    stat1: { label: "Ülke", value: "7" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCep27MNuV87esgp6oW8Cne9fUCHig30RstxATgpC_d3SDbczijT53asF55uOi81V_qlmQloTHVp3PD8ERv-VqrX4I5rLiIneOXorOPQQyxiqOHtBufnt0fNIcOxL_NZo7AW_OGbsvU3voJsdMQz0ctsZcG1gcekt_r5hsWVzrqVSC4NaMdzMA0VpPbKEvn-EnqEF1buCSVR4DYn7qRxDSA6ZiAWUJWmrk4riRbXQZ6w2YmE96PFmzmBRMLG5vl-FOzVu8bM9e3MCE",
  },
  {
    year: "2022",
    title: "Rekor Seyirci",
    subtitle: "Izmir 100. Yıl",
    description: "Izmir'in düşman işgalinden kurtuluşunun 100. yılı kutlamalarında Izmir Körfezi'nde 2 milyon seyircinin önünde unutulmaz bir gösteri sergiledi. Aynı yıl babasından 'Mor Menekşe'yi devraldı.",
    stat1: { label: "Seyirci", value: "2 Milyon" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7Ans-iU27VuxDrqzgX9EhyAqLyJQGUh57BScRvEHc9W6B7yC4BhZXlRcUELioVISLrhMK4sBlGCNxEYR0qrUua8sqvQN5NWGF-AP6P_Qa3K1489kj_Z6ggpbYarwIRS7VRHxwyOWMtQ7ygEyeXCB4lyLMkRgpY7IoBnzqd-zE-0er7rOlBncWW1GA4oS2uWzBpxZzvPGkZum-s9L92Gbc4UYUVeuuYtHnnd39WD7jGXm8LIOjw79BseBnMfR-dYLgIKKsWdm8VE",
  },
  {
    year: "2023",
    title: "Yeni Menekşe ile Avrupa",
    subtitle: "Flugtage Bautzen - Almanya",
    description: "Babasından devraldığı ve yenilenen 'Yeni Menekşe' ile Almanya'da Flugtage Bautzen'de uluslararası sahneye çıktı. Türkiye'yi Avrupa'da başarıyla temsil etti.",
    stat1: { label: "Organizasyon", value: "Flugtage Bautzen" },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCep27MNuV87esgp6oW8Cne9fUCHig30RstxATgpC_d3SDbczijT53asF55uOi81V_qlmQloTHVp3PD8ERv-VqrX4I5rLiIneOXorOPQQyxiqOHtBufnt0fNIcOxL_NZo7AW_OGbsvU3voJsdMQz0ctsZcG1gcekt_r5hsWVzrqVSC4NaMdzMA0VpPbKEvn-EnqEF1buCSVR4DYn7qRxDSA6ZiAWUJWmrk4riRbXQZ6w2YmE96PFmzmBRMLG5vl-FOzVu8bM9e3MCE",
  },
];

const VelocitySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (index < 0) index = careerMoments.length - 1;
    if (index >= careerMoments.length) index = 0;
    setActiveIndex(index);

    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < careerMoments.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

  const current = careerMoments[activeIndex];

  return (
    <section
      id="performance-video"
      className="w-full bg-surface-dark py-32 relative overflow-hidden"
      style={{ clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)" }}
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E02F3C]/10 to-transparent transform skew-x-[-20deg]"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute top-20 left-10 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[12rem] font-black italic uppercase text-white tracking-tighter">
          VELOCITY
        </span>
      </div>

      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Sol Taraf - Dinamik İçerik */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-10 bg-[#E02F3C] shadow-[0_0_10px_#E02F3C]"></span>
              <h2 className="text-[#E02F3C] font-black uppercase tracking-[0.2em] text-sm italic">
                Kariyer Yolculuğu
              </h2>
            </div>

            {/* Animated Content */}
            <div key={activeIndex} className="animate-fade-in h-[340px] flex flex-col">
              <div className="mb-2">
                <span className="text-[#E02F3C] font-black italic text-5xl md:text-6xl">
                  {current.year}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black italic text-white mb-2 leading-[0.9] uppercase drop-shadow-lg">
                {current.title}
              </h3>
              <p className="text-gray-400 text-xl md:text-2xl font-bold italic uppercase mb-6">
                {current.subtitle}
              </p>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light flex-grow">
                {current.description}
              </p>

              {/* Stats */}
              <div className="inline-flex items-center gap-4 p-4 bg-white/5 border border-white/10">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    {current.stat1.label}
                  </p>
                  <p className="font-black italic text-xl uppercase text-[#E02F3C]">
                    {current.stat1.value}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Video Carousel */}
          <div className="w-full lg:w-1/2 relative">
            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between pointer-events-none px-2">
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-[#E02F3C] text-white transition-all duration-300 pointer-events-auto backdrop-blur-sm"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-[#E02F3C] text-white transition-all duration-300 pointer-events-auto backdrop-blur-sm"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Video Container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {careerMoments.map((moment, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-center relative group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-2 border-white/10">
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-20">
                      <div className="w-20 h-20 bg-[#E02F3C]/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(224,47,60,0.6)] transform group-hover:scale-110 transition-transform duration-300 border-4 border-white/10">
                        <Play className="text-white w-10 h-10 fill-white" />
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    <img
                      src={moment.thumbnail}
                      alt={moment.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Bottom Gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-6">
              {careerMoments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-[#E02F3C] w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`${index + 1}. slayt`}
                />
              ))}
            </div>

            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VelocitySection;
