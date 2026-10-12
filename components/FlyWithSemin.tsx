import React from "react";
import { Mail, ArrowRight } from "lucide-react";
import ScrollStatement from "./ui/ScrollStatement";
import { useLightbox } from "./ui/Lightbox";
import { useNav, useLang, useT, pick } from "./ui";
import type { Tx } from "./ui";

// Semin ile Uç — ŞU ANKİ düzen + MAYIS font (Lexend) & renk.
// Adım metinleri eski siteden (seminozturk.com — Semin Öztürk ile uçmak ister misin) birebir alınmıştır.
const steps: { n: string; title: Tx; text: Tx }[] = [
  {
    n: "01",
    title: { tr: "Randevu Al", en: "Book a Flight" },
    text: {
      tr: "Pazartesi hariç her gün uçuş imkanı var. Uçmak istediğiniz tarih ve saati semin.ozturk@acromach.com mail adresine bildiriyorsunuz, ona göre planlama yapıyoruz.",
      en: "Flights are available every day except Monday. Email your preferred date and time to semin.ozturk@acromach.com and we’ll plan your flight accordingly.",
    },
  },
  {
    n: "02",
    title: { tr: "Uç", en: "Fly" },
    text: {
      tr: "Akrobasi Tanıtım Uçuşları'nı S.H.M.'de yani Sivrihisar Havacılık Merkezi'nde yapıyoruz. (Ankara’ya yaklaşık 100 km mesafedeyiz).",
      en: "Aerobatic Experience Flights take place at S.H.M., the Sivrihisar Aviation Center (about 100 km from Ankara).",
    },
  },
  {
    n: "03",
    title: { tr: "Anını Al", en: "Keep the Memory" },
    text: {
      tr: "Uçuşlar 12 / 15 dakika kadar oluyor ve bir kamera ile ses / görüntü olarak kaydediliyor. Uçuştan sonra kayıt USB formatında size veriliyor ve yanında Akrobasi Sertifikası takdim ediliyor.",
      en: "Flights last around 12–15 minutes and are recorded on camera with sound and video. After landing, you receive the recording on a USB drive, along with your Aerobatics Certificate.",
    },
  },
];

const facts: { label: Tx; value: Tx; sub: Tx }[] = [
  {
    label: { tr: "Konum", en: "Location" },
    value: { tr: "Sivrihisar Havacılık Merkezi", en: "Sivrihisar Aviation Center" },
    sub: { tr: "Ankara'ya ~100 km", en: "~100 km from Ankara" },
  },
  {
    label: { tr: "Süre", en: "Duration" },
    value: { tr: "12 – 15 dakika", en: "12 – 15 minutes" },
    sub: { tr: "Pazartesi hariç her gün", en: "Every day except Monday" },
  },
  {
    label: { tr: "Kayıt", en: "Recording" },
    value: { tr: "Video + USB", en: "Video + USB" },
    sub: { tr: "Uçuş sonrası teslim", en: "Handed over after the flight" },
  },
  {
    label: { tr: "Sertifika", en: "Certificate" },
    value: { tr: "Akrobasi Sertifikası", en: "Aerobatics Certificate" },
    sub: { tr: "Uçuş sonrası takdim", en: "Presented after the flight" },
  },
];

// Eski siteden: akrobasi tanıtım uçuşu fotoğrafları
const flyPhotos: { src: string; alt: Tx }[] = [
  {
    src: "/images/ucus/akrobasi-tanitim-1.jpg",
    alt: {
      tr: "Akrobasi tanıtım uçuşu misafirleri Semin'in uçağının önünde",
      en: "Aerobatic experience flight guests in front of Semin’s aircraft",
    },
  },
  {
    src: "/images/ucus/akrobasi-tanitim-2.jpg",
    alt: { tr: "Akrobasi tanıtım uçuşu misafirleri uçakla", en: "Aerobatic experience flight guests with the aircraft" },
  },
];

const FlyWithSemin: React.FC = () => {
  const lang = useLang();
  const t = useT();
  const photos = flyPhotos.map((ph) => ({ src: ph.src, alt: pick(ph.alt, lang) }));
  const { open, lightbox } = useLightbox(photos);
  const go = useNav();
  return (
    <>
      <section id="fly" className="py-24 bg-background-light font-['Lexend']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          {/* Mayıs başlık */}
          <div className="flex items-center gap-4 mb-4" data-reveal>
            <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-[#181210]">{t("Semin ile Uç", "Fly with Semin")}</h2>
          </div>
          {/* Başlık solda, tanıtım uçuşu fotoğrafları sağda eğik kolaj */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-5" data-reveal>
              <h3 className="text-2xl md:text-3xl font-black italic uppercase text-[#181210] leading-tight">
                {t("Semin Öztürk Şener ile Uçmak İster Misiniz?", "Would You Like to Fly with Semin Öztürk Şener?")}
              </h3>
              <p className="text-gray-500 text-lg font-medium mt-3">
                {t("Birlikte dünyayı ters düz etmek üzere…", "Ready to turn the world upside down together…")}
              </p>
              <div className="mt-6 h-2 w-24 bg-[#E02F3C] skew-x-[-30deg]" aria-hidden="true"></div>
            </div>
            <div className="lg:col-span-7">
              {/* Kırpmasız: fotoğraflar kendi oranında, beyaz kenarlı ve hafif açılı iki baskı gibi */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 items-start">
                {photos.map((ph, i) => (
                  // Belirme animasyonu dışta (transform'u sıfırlar), açı içteki düğmede
                  <div key={ph.src} data-reveal data-reveal-delay={String(i + 1)} className={i % 2 ? "mt-10 md:mt-16" : ""}>
                    <button
                      onClick={() => open(i)}
                      className={`block w-full bg-white p-2 md:p-3 shadow-xl transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 ${
                        i % 2 ? "rotate-2" : "-rotate-2"
                      }`}
                      aria-label={`${ph.alt} — ${t("büyüt", "enlarge")}`}
                    >
                      <img src={ph.src} alt={ph.alt} loading="lazy" className="block w-full h-auto" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Adımlar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} data-reveal data-reveal-delay={String(i + 1)} className="relative bg-white p-8 border-l-4 border-[#E02F3C] shadow-lg">
                <span className="absolute top-4 right-5 text-6xl font-black italic text-[#E02F3C]/10 select-none">{s.n}</span>
                <h3 className="text-xl font-black italic uppercase text-[#181210] mb-3">{pick(s.title, lang)}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{pick(s.text, lang)}</p>
              </div>
            ))}
          </div>

          {lightbox}
        </div>
      </section>

      {/* Sabitlenen ifade: ekran durur, satırlar zıt yönlere akar, kırmızı şeritler süpürür */}
      <ScrollStatement
        video="/videos/tanitim-ucusu.mp4"
        lines={t(["Birlikte dünyayı", "ters düz edelim"], ["Turn the world", "upside down"])}
        mobileLines={t(["Birlikte", "dünyayı", "ters düz", "edelim"], ["Turn", "the world", "upside", "down"])}
      />

      <section className="py-24 bg-background-light font-['Lexend']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bilgiler */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal>
              {facts.map((f, i) => (
                <div key={i} className="bg-white p-6 border border-gray-100 shadow-sm">
                  <span className="block text-gray-400 text-xs font-black italic uppercase tracking-widest mb-1">{pick(f.label, lang)}</span>
                  <span className="block text-[#181210] font-black italic uppercase">{pick(f.value, lang)}</span>
                  <span className="block text-gray-500 text-sm font-medium mt-1">{pick(f.sub, lang)}</span>
                </div>
              ))}
            </div>

            {/* Rezervasyon — Mayıs kırmızı */}
            <div className="lg:col-span-1" data-reveal data-reveal-delay="2">
              <div className="bg-[#E02F3C] p-8 h-full flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(224,47,60,0.4)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black italic uppercase text-white leading-tight mb-3">
                    {t("Birlikte Dünyayı Ters Düz Edelim", "Let’s Turn the World Upside Down Together")}
                  </h3>
                </div>
                {/* İletişim sayfasına götürür */}
                {/* Hover: koyu eğik panel soldan süpürür, yazı beyazlar, zarf sağa kayar ve ok gelir */}
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="group/btn relative z-10 mt-8 overflow-hidden inline-flex items-center justify-center bg-white text-[#E02F3C] px-6 py-4 font-black italic uppercase tracking-wider shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] focus-visible:-translate-y-1 active:translate-y-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-[20%] w-[140%] bg-[#181210] -skew-x-[20deg] -translate-x-[110%] group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]"
                  ></span>
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover/btn:text-white group-focus-visible/btn:text-white">
                    <Mail className="w-5 h-5 transition-transform duration-500 group-hover/btn:-rotate-12 group-hover/btn:scale-110" />
                    {t("Randevu Talep Et", "Request a Booking")}
                    <span className="inline-flex overflow-hidden max-w-0 opacity-0 group-hover/btn:max-w-[2rem] group-hover/btn:opacity-100 group-focus-visible/btn:max-w-[2rem] group-focus-visible/btn:opacity-100 transition-all duration-500">
                      <ArrowRight className="w-5 h-5 ml-1 -translate-x-3 group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0 transition-transform duration-500 text-[#E02F3C]" />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlyWithSemin;
