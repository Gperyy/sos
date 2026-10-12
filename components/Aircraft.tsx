import React from "react";
import { Plane, Settings, Gauge, Wind } from "lucide-react";
import { useNav, useLang, useT, pick } from "./ui";
import type { Tx } from "./ui";
import HorizontalGallery from "./ui/HorizontalGallery";
import { useLightbox } from "./ui/Lightbox";

// Fotoğraflar eski siteden (seminozturk.com — Semin'in Uçağı), bölüm sırasıyla: /public/images/ucak
const yeniMeneksePhotos: { src: string; alt: Tx }[] = [
  { src: "/images/ucak/yeni-menekse-1.jpg", alt: { tr: "Yeni Menekşe pistte", en: "Yeni Menekşe on the runway" } },
  { src: "/images/ucak/yeni-menekse-2.jpg", alt: { tr: "Yeni Menekşe önden görünüm", en: "Yeni Menekşe, front view" } },
  {
    src: "/images/ucak/yeni-menekse-gopro-1.jpg",
    alt: { tr: "Yeni Menekşe uçuşta — kamera kaydı", en: "Yeni Menekşe in flight — onboard camera footage" },
  },
  {
    src: "/images/ucak/yeni-menekse-gopro-2.jpg",
    alt: {
      tr: "Semin Öztürk Şener ters uçuşta — kamera kaydı",
      en: "Semin Öztürk Şener in inverted flight — onboard camera footage",
    },
  },
];
const morMeneksePhotos: { src: string; alt: Tx }[] = [
  { src: "/images/ucak/mor-menekse-1.jpg", alt: { tr: "Mor Menekşe duman izleriyle", en: "Mor Menekşe with smoke trails" } },
  {
    src: "/images/ucak/ali-ismet-ozturk-mor-menekse.jpg",
    alt: { tr: "Ali İsmet Öztürk ve Mor Menekşe", en: "Ali Ismet Öztürk and Mor Menekşe" },
  },
  {
    src: "/images/ucak/ali-ismet-ozturk-video-kapak.jpg",
    alt: { tr: "Ali İsmet Öztürk kokpitte", en: "Ali Ismet Öztürk in the cockpit" },
  },
  { src: "/images/ucak/gosteri-1.jpg", alt: { tr: "Gün batımında gösteri", en: "Display at sunset" } },
  { src: "/images/ucak/gosteri-2.jpg", alt: { tr: "Mor Menekşe alçak geçiş", en: "Mor Menekşe low pass" } },
  { src: "/images/ucak/gosteri-3.jpg", alt: { tr: "İstanbul Park'ta gösteri", en: "Display at Istanbul Park" } },
  { src: "/images/ucak/gosteri-4.jpg", alt: { tr: "Ali İsmet Öztürk Mor Menekşe ile", en: "Ali Ismet Öztürk with Mor Menekşe" } },
  {
    src: "/images/ucak/mor-menekse-2.jpg",
    alt: { tr: "Mor Menekşe — M.K. Atatürk yazılı kanatlar", en: "Mor Menekşe — wings inscribed “M.K. Atatürk”" },
  },
  { src: "/images/ucak/ali-ismet-ozturk-1.jpg", alt: { tr: "Ali İsmet Öztürk", en: "Ali Ismet Öztürk" } },
  { src: "/images/ucak/ali-ismet-ozturk-2.jpg", alt: { tr: "Ali İsmet Öztürk kokpitte", en: "Ali Ismet Öztürk in the cockpit" } },
];
const pittsPhotos: { src: string; alt: Tx }[] = [
  {
    src: "/images/ucak/pitts-1.jpg",
    alt: { tr: "Semin Öztürk Şener Pitts S-2B kokpitinde", en: "Semin Öztürk Şener in the cockpit of the Pitts S-2B" },
  },
];

// Uçak — MAYIS tasarım/renk; başlık fontu ŞU ANKİ (Anton = font-black italic).
// Metinler eski siteden (seminozturk.com — Semin'in Uçağı) birebir alınmıştır.
// Kırpılmamış fotoğraf; arkasında kaydırılmış ince kırmızı çerçeve (flip: çerçeve diğer yöne)
const FramedPhoto: React.FC<{ src: string; alt: string; onOpen: () => void; flip?: boolean }> = ({ src, alt, onOpen, flip }) => {
  const t = useT();
  return (
    <div className="relative" data-reveal>
      <div
        className={`absolute inset-0 border-2 border-[#E02F3C] ${flip ? "-translate-x-3 translate-y-3 md:-translate-x-4 md:translate-y-4" : "translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"}`}
        aria-hidden="true"
      ></div>
      <button onClick={onOpen} className="group relative block w-full overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.5)]" aria-label={`${alt} — ${t("büyüt", "enlarge")}`}>
        <img src={src} alt={alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
      </button>
    </div>
  );
};

const Aircraft: React.FC = () => {
  const go = useNav();
  const lang = useLang();
  const t = useT();
  const localize = (photos: { src: string; alt: Tx }[]) => photos.map((ph) => ({ src: ph.src, alt: pick(ph.alt, lang) }));
  const yeniPhotos = localize(yeniMeneksePhotos);
  const morPhotos = localize(morMeneksePhotos);
  const pittsPhoto = localize(pittsPhotos);
  const yeni = useLightbox(yeniPhotos);
  const pitts = useLightbox(pittsPhoto);
  return (
    <section id="aircraft" className="py-24 bg-surface-dark">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Başlık */}
        <div className="flex items-center gap-4 mb-16" data-reveal>
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
          <h2 className="font-black italic text-4xl md:text-6xl uppercase text-white">{t("Uçağım", "My Aircraft")}</h2>
        </div>

        <div className="mb-12" data-reveal data-reveal-delay="1">
          <h3 className="font-black italic text-4xl md:text-6xl text-[#E02F3C] uppercase leading-none">Yeni Menekşe</h3>
        </div>

        {/* Teknik bilgi kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Gauge className="w-6 h-6 text-[#E02F3C]" />, t: t("Güç", "Power"), d: t("400 HP gücünde motor", "400 HP engine") },
            { icon: <Wind className="w-6 h-6 text-[#E02F3C]" />, t: t("Hız", "Speed"), d: t("400 km/saat'i aşan hız", "Speeds exceeding 400 km/h") },
            { icon: <Plane className="w-6 h-6 text-[#E02F3C]" />, t: t("Pervane", "Propeller"), d: t("Kompozit 3 pal pervanesi", "Composite three-blade propeller") },
            { icon: <Settings className="w-6 h-6 text-[#E02F3C]" />, t: t("Dayanıklılık", "Strength"), d: t("+/-10 G'ye dayanıklı", "Stressed for +/-10 G") },
          ].map((c, i) => (
            <div key={i} data-reveal data-reveal-delay={String(i + 1)} className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                {c.icon}
                <h4 className="font-black italic text-xl uppercase text-white">{c.t}</h4>
              </div>
              <p className="text-gray-300 font-medium">{c.d}</p>
            </div>
          ))}
        </div>

        {/* Yeni Menekşe — dergi düzeni: fotoğraflar ilgili metnin yanında, kırpılmadan; arkada kaydırılmış ince kırmızı çerçeve */}
        <div className="space-y-16 md:space-y-20 mb-16">
          {/* Teknik Özellikler + pistteki fotoğraf */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6" data-reveal>
              <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white">{t("Teknik Özellikler", "Technical Specifications")}</h4>
              <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              {t(
                <>
                  <p>
                    400 HP gücünde bir motorla donatılan bu uçak, havada kaldığı süre içinde bir bilgisayar yardımı ile sürekli kontrol edilmekte ve herhangi bir anormal durumda pilotu anında haberdar etmektedir.
                  </p>
                  <p>
                    Kompozit bir üretimle yapılan üç pal’li pervanesi sadece akrobasi için dizayn edilmiştir. Bu mükemmel gösteri uçağı zaman zaman 400 km/saat’i aşan bir hızla gösterisini yaparken saatte 38 galon (yaklaşık 152 litre) yakıt ve 45 galon (yaklaşık 180 litre) duman yağı harcamaktadır.
                  </p>
                </>,
                <>
                  <p>
                    Powered by a 400 HP engine, the aircraft is continuously monitored by an onboard computer throughout the flight, which instantly alerts the pilot to any abnormal condition.
                  </p>
                  <p>
                    Its composite three-blade propeller is designed exclusively for aerobatics. Performing its displays at speeds that at times exceed 400 km/h, this superb display aircraft burns 38 gallons (about 152 liters) of fuel and 45 gallons (about 180 liters) of smoke oil per hour.
                  </p>
                </>
              )}
              </div>
            </div>
            <div className="lg:col-span-5">
              <FramedPhoto {...yeniPhotos[0]} onOpen={() => yeni.open(0)} />
            </div>
          </div>

          {/* Önden görünüm + Uçağın Hikayesi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FramedPhoto {...yeniPhotos[1]} onOpen={() => yeni.open(1)} flip />
            </div>
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2" data-reveal>
              <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white">{t("Uçağın Hikayesi", "The Aircraft’s Story")}</h4>
              <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              {t(
                <>
                  <p>
                    Dünyanın en gelişmiş akrobasi uçaklarından biri olan "Yeni Menekşe" tamamen akrobasi için geliştirilmiş, sipariş üzerine yapılmış Pitts tabanlı ancak ondan çok üstün özel üretim bir uçaktır. 2003 yılında Türkiye’nin ilk Profesyonel Milli Akrobasi Pilotu Ali İsmet Öztürk ve ekibi tarafından üretilmiştir ve “Mor Menekşe” adını almıştır. İmalatı bir yıl süren bu uçak ile daha önce yapılan manevralar görsel boyutta zenginleştirilerek “Airshow” kalitesi ve uçuş emniyeti yükseltilmiştir. Yüksek yer çekimi yüklemelerine karşı dizayn edilen bu özel gösteri makinası +/-10 G’ye dayanıklı olduğu gibi, uçuşu gerçekleştiren pilotun bu yüklemeler karşısında en az seviyede yorulmasını sağlayacak tüm özelliklere sahiptir.
                  </p>
                  <p className="border-l-4 border-[#E02F3C] pl-4 italic">
                    13 Eylül 2021 tarihinde SHG Airshow'da Profesyonel Akrobasi'den jübilesini yapan Ali İsmet Öztürk'ten sonra "Efsanevi Mor Menekşe" Mak Teknik'in özverili çalışmaları ile kapsamlı bir bakımdan geçti ve dış görünüşü değişti. Mor Menekşe artık "Yeni Menekşe" olarak Semin Öztürk Şener ile göklerde yeni serüvenlerine devam ediyor.
                  </p>
                </>,
                <>
                  <p>
                    One of the most advanced aerobatic aircraft in the world, “Yeni Menekşe” is a custom-built aircraft developed purely for aerobatics: based on the Pitts, yet far superior to it. It was built in 2003 by Ali Ismet Öztürk, Türkiye’s first Professional National Aerobatic Pilot, and his team, and was named “Mor Menekşe” (Purple Violet). A year in the making, the aircraft brought new visual drama to established maneuvers, raising both airshow quality and flight safety. Designed to withstand high G-loads, this special display machine is stressed to +/-10 G and has every feature needed to keep pilot fatigue to a minimum under those loads.
                  </p>
                  <p className="border-l-4 border-[#E02F3C] pl-4 italic">
                    After Ali Ismet Öztürk’s farewell to professional aerobatics at the SHG Airshow on 13 September 2021, the “Legendary Mor Menekşe” underwent a comprehensive overhaul thanks to the dedicated work of Mak Teknik, emerging with a new look. Now known as “Yeni Menekşe” (New Violet), it continues its adventures in the skies with Semin Öztürk Şener.
                  </p>
                </>
              )}
              </div>
            </div>
          </div>

          {/* İki geniş uçuş karesi yan yana */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <FramedPhoto {...yeniPhotos[2]} onOpen={() => yeni.open(2)} />
            <FramedPhoto {...yeniPhotos[3]} onOpen={() => yeni.open(3)} flip />
          </div>
        </div>
        {yeni.lightbox}

        {/* Ali İsmet Öztürk */}
        <div className="mt-16 pt-16 border-t border-white/10" data-reveal>
          <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white mb-8">{t("Ali İsmet Öztürk ve Mor Menekşe", "Ali Ismet Öztürk and Mor Menekşe")}</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-300 leading-relaxed font-medium">
            {t(
              <>
                <div className="space-y-4">
                  <p>
                    Türkiye'nin ilk Profesyonel Milli Akrobasi Pilotu Ali İsmet Öztürk 2013 yılına kadar 22 ayrı ülkede uçarak, 500’den fazla Airshow organizasyonuna katıldı, 859 gösteri uçuşunu hatasız ve arızasız bitirerek 25 milyondan fazla seyirciye ulaştı. Bu süreç içinde 150.000 km yol kat etti. Her bir yıl icin, 400’den fazla antreman uçuşu yaptı.
                  </p>
                  <p>
                    2005 yılında İngiliz Sivil Havacılık otoritesi tarafından kendisine en üst kategoride “Display Authorisation” (gösteri yetkisi) sertifikası verildi. Her sene düzenlenen EAC ’’European Airshow Consul’’ ise, 2006 yılında “Sponsorunu En İyi Tanıtan Airshow Pilotu” ödülünü Ali İsmet Öztürk’e verdi. Avrupa’daki bir çok airshow organizasyonunda “Best Solo Display” seçildi.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    Uçuşa başladıktan sonra geçen 34 sene boyunca sadece profesyonel havacılıkla iştigal eden ve Türkiye’de sivil havacılık dalında bir çok ’ilk’e imza atan Ali İsmet Öztürk, Ticari Helikopter ve Uçak Pilot lisanslarına, çok motorlu helikopter ve uçak uçuş sertifikasına, uçuş öğretmeni ve alet uçuşu sertifikalarına sahip Türk Havacısı konumunda. Öztürk, aynı zamanda Uçak ve Helikopter bakım teknisyeni lisansına sahip. 50’den fazla değişik hava aracında uçuş tecrübesi olan Ali İsmet Öztürk’ün toplam uçuşu 5500 saatin üzerinde.
                  </p>
                  <p>
                    Halen, Sivrihisar Havacılık Merkezinde uçan Ali ismet Öztürk, bütün tecrübesini Türk Gençleriyle paylaşmaya adamıştır.
                  </p>
                </div>
              </>,
              <>
                <div className="space-y-4">
                  <p>
                    Ali Ismet Öztürk, Türkiye’s first Professional National Aerobatic Pilot, flew in 22 different countries up to 2013, took part in more than 500 airshows and completed 859 display flights without a single error or technical failure, reaching more than 25 million spectators. Over that time Öztürk travelled 150,000 km and flew more than 400 training flights every year.
                  </p>
                  <p>
                    In 2005, the UK Civil Aviation Authority granted Öztürk a Display Authorisation in the highest category. In 2006, the annual EAC (European Airshow Council) presented Ali Ismet Öztürk with its award for the “Airshow Pilot Who Best Promotes Their Sponsor”. Öztürk was also named “Best Solo Display” at many airshows across Europe.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    In the 34 years since first taking to the air, Ali Ismet Öztürk has worked exclusively in professional aviation and achieved many “firsts” in Turkish civil aviation. A Turkish aviator holding commercial helicopter and airplane pilot licenses, multi-engine helicopter and airplane ratings, and flight instructor and instrument ratings, Öztürk is also a licensed aircraft and helicopter maintenance technician. With experience on more than 50 different aircraft types, Ali Ismet Öztürk has logged over 5,500 flight hours in total.
                  </p>
                  <p>
                    Still flying at the Sivrihisar Aviation Center today, Ali Ismet Öztürk is devoted to sharing a lifetime of experience with the young people of Türkiye.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mor Menekşe fotoğrafları — sabitlenen yatay şerit (data-reveal dışında: transform sticky'yi bozar) */}
      <div className="mt-12">
        <HorizontalGallery photos={morPhotos} backdrop="Mor Menekşe" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Pitts + CTA */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white mb-10" data-reveal>
            {t("Semin Öztürk Şener ile Akrobasi Tanıtım Uçuşları", "Aerobatic Experience Flights with Semin Öztürk Şener")}
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 relative pb-6">
              {/* Kırpmasız: fotoğraf kendi oranında */}
              <button onClick={() => pitts.open(0)} data-reveal-img className="group relative block w-full overflow-hidden" aria-label={`${pittsPhoto[0].alt} — ${t("büyüt", "enlarge")}`}>
                <img src={pittsPhoto[0].src} alt={pittsPhoto[0].alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
                <span className="absolute top-4 left-4 bg-[#E02F3C] text-white text-[11px] font-black italic uppercase tracking-wider px-3 py-1.5 skew-x-[-10deg]">
                  <span lang="en" className="block skew-x-[10deg]">Pitts S-2B</span>
                </span>
              </button>
              <div className="absolute left-[6%] bottom-0 h-3 w-28 bg-[#E02F3C] skew-x-[-20deg]" aria-hidden="true"></div>
            </div>
            <div className="lg:col-span-5" data-reveal data-reveal-delay="2">
              <h5 lang="en" className="font-black italic text-xl uppercase text-[#E02F3C] mb-4">Pitts Special S-2B</h5>
              <p className="text-gray-300 leading-relaxed font-medium">
                {t(
                  "Semin Öztürk Şener ile yapılan Akrobasi Tanıtım Uçuşları'nda kullanılan Pitts Special S-2B, Lycoming 360 hp motora sahiptir. Akrobasi için üstün kullanım özellikleri vardır. Aviat’ın en popüler modeli olan S-2B en gelişmiş manevraları yapabilmek için özel olarak tasarlanmıştır. Tasarımı ve çift kanat yapısı ile akrobasiye çok uygundur.",
                  "The Pitts Special S-2B used for Aerobatic Experience Flights with Semin Öztürk Şener is powered by a 360 hp Lycoming engine and offers outstanding handling for aerobatics. Aviat’s most popular model, the S-2B was purpose-built to perform the most advanced maneuvers, and its design and biplane configuration make it ideal for aerobatics."
                )}
              </p>
              <a
                href="#fly"
                onClick={(e) => {
                  e.preventDefault();
                  go("fly");
                }}
                className="mt-8 inline-block text-center bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-8 py-5 font-black italic text-base uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(224,47,60,0.5)] hover:shadow-[0_0_30px_rgba(224,47,60,0.7)] skew-x-[-10deg]"
              >
                <span className="block skew-x-[10deg]">
                  {t(
                    "Semin Öztürk Şener'le Dünyayı Ters Düz Etmek için tıklayın!",
                    "Click to Turn the World Upside Down with Semin Öztürk Şener!"
                  )}
                </span>
              </a>
            </div>
          </div>
          {pitts.lightbox}
        </div>
      </div>
    </section>
  );
};

export default Aircraft;
