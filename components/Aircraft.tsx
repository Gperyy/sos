import React from "react";
import { Plane, Settings, Gauge, Wind } from "lucide-react";
import { useNav } from "./ui";
import HorizontalGallery from "./ui/HorizontalGallery";
import { useLightbox } from "./ui/Lightbox";

// Fotoğraflar eski siteden (seminozturk.com — Semin'in Uçağı), bölüm sırasıyla: /public/images/ucak
const yeniMeneksePhotos = [
  { src: "/images/ucak/yeni-menekse-1.jpg", alt: "Yeni Menekşe pistte" },
  { src: "/images/ucak/yeni-menekse-2.jpg", alt: "Yeni Menekşe önden görünüm" },
  { src: "/images/ucak/yeni-menekse-gopro-1.jpg", alt: "Yeni Menekşe uçuşta — kamera kaydı" },
  { src: "/images/ucak/yeni-menekse-gopro-2.jpg", alt: "Semin Öztürk Şener ters uçuşta — kamera kaydı" },
];
const morMeneksePhotos = [
  { src: "/images/ucak/mor-menekse-1.jpg", alt: "Mor Menekşe duman izleriyle" },
  { src: "/images/ucak/ali-ismet-ozturk-mor-menekse.jpg", alt: "Ali İsmet Öztürk ve Mor Menekşe" },
  { src: "/images/ucak/ali-ismet-ozturk-video-kapak.jpg", alt: "Ali İsmet Öztürk kokpitte" },
  { src: "/images/ucak/gosteri-1.jpg", alt: "Gün batımında gösteri" },
  { src: "/images/ucak/gosteri-2.jpg", alt: "Mor Menekşe alçak geçiş" },
  { src: "/images/ucak/gosteri-3.jpg", alt: "İstanbul Park'ta gösteri" },
  { src: "/images/ucak/gosteri-4.jpg", alt: "Ali İsmet Öztürk Mor Menekşe ile" },
  { src: "/images/ucak/mor-menekse-2.jpg", alt: "Mor Menekşe — M.K. Atatürk yazılı kanatlar" },
  { src: "/images/ucak/ali-ismet-ozturk-1.jpg", alt: "Ali İsmet Öztürk" },
  { src: "/images/ucak/ali-ismet-ozturk-2.jpg", alt: "Ali İsmet Öztürk kokpitte" },
];
const pittsPhotos = [
  { src: "/images/ucak/pitts-1.jpg", alt: "Semin Öztürk Şener Pitts S-2B kokpitinde" },
];

// Uçak — MAYIS tasarım/renk; başlık fontu ŞU ANKİ (Anton = font-black italic).
// Metinler eski siteden (seminozturk.com — Semin'in Uçağı) birebir alınmıştır.
// Kırpılmamış fotoğraf; arkasında kaydırılmış ince kırmızı çerçeve (flip: çerçeve diğer yöne)
const FramedPhoto: React.FC<{ src: string; alt: string; onOpen: () => void; flip?: boolean }> = ({ src, alt, onOpen, flip }) => (
  <div className="relative" data-reveal>
    <div
      className={`absolute inset-0 border-2 border-[#E02F3C] ${flip ? "-translate-x-3 translate-y-3 md:-translate-x-4 md:translate-y-4" : "translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"}`}
      aria-hidden="true"
    ></div>
    <button onClick={onOpen} className="group relative block w-full overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.5)]" aria-label={`${alt} — büyüt`}>
      <img src={src} alt={alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
    </button>
  </div>
);

const Aircraft: React.FC = () => {
  const go = useNav();
  const yeni = useLightbox(yeniMeneksePhotos);
  const pitts = useLightbox(pittsPhotos);
  return (
    <section id="aircraft" className="py-24 bg-surface-dark">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Başlık */}
        <div className="flex items-center gap-4 mb-16" data-reveal>
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
          <h2 className="font-black italic text-4xl md:text-6xl uppercase text-white">Uçağım</h2>
        </div>

        <div className="mb-12" data-reveal data-reveal-delay="1">
          <h3 className="font-black italic text-4xl md:text-6xl text-[#E02F3C] uppercase leading-none">Yeni Menekşe</h3>
        </div>

        {/* Teknik bilgi kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Gauge className="w-6 h-6 text-[#E02F3C]" />, t: "Güç", d: "400 HP gücünde motor" },
            { icon: <Wind className="w-6 h-6 text-[#E02F3C]" />, t: "Hız", d: "400 km/saat'i aşan hız" },
            { icon: <Plane className="w-6 h-6 text-[#E02F3C]" />, t: "Pervane", d: "Kompozit 3 pal pervanesi" },
            { icon: <Settings className="w-6 h-6 text-[#E02F3C]" />, t: "Dayanıklılık", d: "+/-10 G'ye dayanıklı" },
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
              <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white">Teknik Özellikler</h4>
              <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                  400 HP gücünde bir motorla donatılan bu uçak, havada kaldığı süre içinde bir bilgisayar yardımı ile sürekli kontrol edilmekte ve herhangi bir anormal durumda pilotu anında haberdar etmektedir.
                </p>
                <p>
                  Kompozit bir üretimle yapılan üç pal’li pervanesi sadece akrobasi için dizayn edilmiştir. Bu mükemmel gösteri uçağı zaman zaman 400 km/saat’i aşan bir hızla gösterisini yaparken saatte 38 galon (yaklaşık 152 litre) yakıt ve 45 galon (yaklaşık 180 litre) duman yağı harcamaktadır.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <FramedPhoto {...yeniMeneksePhotos[0]} onOpen={() => yeni.open(0)} />
            </div>
          </div>

          {/* Önden görünüm + Uçağın Hikayesi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FramedPhoto {...yeniMeneksePhotos[1]} onOpen={() => yeni.open(1)} flip />
            </div>
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2" data-reveal>
              <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white">Uçağın Hikayesi</h4>
              <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                  Dünyanın en gelişmiş akrobasi uçaklarından biri olan "Yeni Menekşe" tamamen akrobasi için geliştirilmiş, sipariş üzerine yapılmış Pitts tabanlı ancak ondan çok üstün özel üretim bir uçaktır. 2003 yılında Türkiye’nin ilk Profesyonel Milli Akrobasi Pilotu Ali İsmet Öztürk ve ekibi tarafından üretilmiştir ve “Mor Menekşe” adını almıştır. İmalatı bir yıl süren bu uçak ile daha önce yapılan manevralar görsel boyutta zenginleştirilerek “Airshow” kalitesi ve uçuş emniyeti yükseltilmiştir. Yüksek yer çekimi yüklemelerine karşı dizayn edilen bu özel gösteri makinası +/-10 G’ye dayanıklı olduğu gibi, uçuşu gerçekleştiren pilotun bu yüklemeler karşısında en az seviyede yorulmasını sağlayacak tüm özelliklere sahiptir.
                </p>
                <p className="border-l-4 border-[#E02F3C] pl-4 italic">
                  13 Eylül 2021 tarihinde SHG Airshow'da Profesyonel Akrobasi'den jübilesini yapan Ali İsmet Öztürk'ten sonra "Efsanevi Mor Menekşe" Mak Teknik'in özverili çalışmaları ile kapsamlı bir bakımdan geçti ve dış görünüşü değişti. Mor Menekşe artık "Yeni Menekşe" olarak Semin Öztürk Şener ile göklerde yeni serüvenlerine devam ediyor.
                </p>
              </div>
            </div>
          </div>

          {/* İki geniş uçuş karesi yan yana */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <FramedPhoto {...yeniMeneksePhotos[2]} onOpen={() => yeni.open(2)} />
            <FramedPhoto {...yeniMeneksePhotos[3]} onOpen={() => yeni.open(3)} flip />
          </div>
        </div>
        {yeni.lightbox}

        {/* Ali İsmet Öztürk */}
        <div className="mt-16 pt-16 border-t border-white/10" data-reveal>
          <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white mb-8">Ali İsmet Öztürk ve Mor Menekşe</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-300 leading-relaxed font-medium">
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
                Halen, Sivrihisar Havacılık Merkezinde uçan Ali ismet Öztürk, bütün tecrübesini Türk Gençleriyle paylaşmaya adamıştır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mor Menekşe fotoğrafları — sabitlenen yatay şerit (data-reveal dışında: transform sticky'yi bozar) */}
      <div className="mt-12">
        <HorizontalGallery photos={morMeneksePhotos} backdrop="Mor Menekşe" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Pitts + CTA */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <h4 className="font-black italic text-2xl md:text-3xl uppercase text-white mb-10" data-reveal>Semin Öztürk Şener ile Akrobasi Tanıtım Uçuşları</h4>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 relative pb-6">
              {/* Kırpmasız: fotoğraf kendi oranında */}
              <button onClick={() => pitts.open(0)} data-reveal-img className="group relative block w-full overflow-hidden" aria-label={`${pittsPhotos[0].alt} — büyüt`}>
                <img src={pittsPhotos[0].src} alt={pittsPhotos[0].alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
                <span className="absolute top-4 left-4 bg-[#E02F3C] text-white text-[11px] font-black italic uppercase tracking-wider px-3 py-1.5 skew-x-[-10deg]">
                  <span lang="en" className="block skew-x-[10deg]">Pitts S-2B</span>
                </span>
              </button>
              <div className="absolute left-[6%] bottom-0 h-3 w-28 bg-[#E02F3C] skew-x-[-20deg]" aria-hidden="true"></div>
            </div>
            <div className="lg:col-span-5" data-reveal data-reveal-delay="2">
              <h5 lang="en" className="font-black italic text-xl uppercase text-[#E02F3C] mb-4">Pitts Special S-2B</h5>
              <p className="text-gray-300 leading-relaxed font-medium">
                Semin Öztürk Şener ile yapılan Akrobasi Tanıtım Uçuşları'nda kullanılan Pitts Special S-2B, Lycoming 360 hp motora sahiptir. Akrobasi için üstün kullanım özellikleri vardır. Aviat’ın en popüler modeli olan S-2B en gelişmiş manevraları yapabilmek için özel olarak tasarlanmıştır. Tasarımı ve çift kanat yapısı ile akrobasiye çok uygundur.
              </p>
              <a
                href="#fly"
                onClick={(e) => {
                  e.preventDefault();
                  go("fly");
                }}
                className="mt-8 inline-block text-center bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-8 py-5 font-black italic text-base uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(224,47,60,0.5)] hover:shadow-[0_0_30px_rgba(224,47,60,0.7)] skew-x-[-10deg]"
              >
                <span className="block skew-x-[10deg]">Semin Öztürk Şener'le Dünyayı Ters Düz Etmek için tıklayın!</span>
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
