import React from "react";
import { Mail } from "lucide-react";
import ScrollStatement from "./ui/ScrollStatement";
import { useLightbox } from "./ui/Lightbox";

// Semin ile Uç — ŞU ANKİ düzen + MAYIS font (Lexend) & renk.
// Adım metinleri eski siteden (seminozturk.com — Semin Öztürk ile uçmak ister misin) birebir alınmıştır.
const steps = [
  { n: "01", title: "Randevu Al", text: "Pazartesi hariç her gün uçuş imkanı var. Uçmak istediğiniz tarih ve saati semin.ozturk@acromach.com mail adresine bildiriyorsunuz, ona göre planlama yapıyoruz." },
  { n: "02", title: "Uç", text: "Akrobasi Tanıtım Uçuşları'nı S.H.M.'de yani Sivrihisar Havacılık Merkezi'nde yapıyoruz. (Ankara’ya yaklaşık 100 km mesafedeyiz)." },
  { n: "03", title: "Anını Al", text: "Uçuşlar 12 / 15 dakika kadar oluyor ve bir kamera ile ses / görüntü olarak kaydediliyor. Uçuştan sonra kayıt USB formatında size veriliyor ve yanında Akrobasi Sertifikası takdim ediliyor." },
];

const facts = [
  { label: "Konum", value: "Sivrihisar Havacılık Merkezi", sub: "Ankara'ya ~100 km" },
  { label: "Süre", value: "12 – 15 dakika", sub: "Pazartesi hariç her gün" },
  { label: "Kayıt", value: "Video + USB", sub: "Uçuş sonrası teslim" },
  { label: "Sertifika", value: "Akrobasi Sertifikası", sub: "Uçuş sonrası takdim" },
];

// Eski siteden: akrobasi tanıtım uçuşu fotoğrafları
const flyPhotos = [
  { src: "/images/ucus/akrobasi-tanitim-1.jpg", alt: "Akrobasi tanıtım uçuşu misafirleri Semin'in uçağının önünde" },
  { src: "/images/ucus/akrobasi-tanitim-2.jpg", alt: "Akrobasi tanıtım uçuşu misafirleri uçakla" },
];

const FlyWithSemin: React.FC = () => {
  const { open, lightbox } = useLightbox(flyPhotos);
  return (
    <>
      <section id="fly" className="py-24 bg-background-light font-['Lexend']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          {/* Mayıs başlık */}
          <div className="flex items-center gap-4 mb-4" data-reveal>
            <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-[#181210]">Semin ile Uç</h2>
          </div>
          {/* Başlık solda, tanıtım uçuşu fotoğrafları sağda eğik kolaj */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-5" data-reveal>
              <h3 className="text-2xl md:text-3xl font-black italic uppercase text-[#181210] leading-tight">
                Semin Öztürk Şener ile Uçmak İster Misiniz?
              </h3>
              <p className="text-gray-500 text-lg font-medium mt-3">Birlikte dünyayı ters düz etmek üzere…</p>
              <div className="mt-6 h-2 w-24 bg-[#E02F3C] skew-x-[-30deg]" aria-hidden="true"></div>
            </div>
            <div className="lg:col-span-7">
              {/* Kırpmasız: fotoğraflar kendi oranında, beyaz kenarlı ve hafif açılı iki baskı gibi */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 items-start">
                {flyPhotos.map((ph, i) => (
                  // Belirme animasyonu dışta (transform'u sıfırlar), açı içteki düğmede
                  <div key={ph.src} data-reveal data-reveal-delay={String(i + 1)} className={i % 2 ? "mt-10 md:mt-16" : ""}>
                    <button
                      onClick={() => open(i)}
                      className={`block w-full bg-white p-2 md:p-3 shadow-xl transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 ${
                        i % 2 ? "rotate-2" : "-rotate-2"
                      }`}
                      aria-label={`${ph.alt} — büyüt`}
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
                <h3 className="text-xl font-black italic uppercase text-[#181210] mb-3">{s.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          {lightbox}
        </div>
      </section>

      {/* Sabitlenen ifade: ekran durur, satırlar zıt yönlere akar, kırmızı şeritler süpürür */}
      <ScrollStatement
        video="/videos/hero.mp4"
        lines={["Birlikte dünyayı", "ters düz edelim"]}
        mobileLines={["Birlikte", "dünyayı", "ters düz", "edelim"]}
      />

      <section className="py-24 bg-background-light font-['Lexend']">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bilgiler */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal>
              {facts.map((f, i) => (
                <div key={i} className="bg-white p-6 border border-gray-100 shadow-sm">
                  <span className="block text-gray-400 text-xs font-black italic uppercase tracking-widest mb-1">{f.label}</span>
                  <span className="block text-[#181210] font-black italic uppercase">{f.value}</span>
                  <span className="block text-gray-500 text-sm font-medium mt-1">{f.sub}</span>
                </div>
              ))}
            </div>

            {/* Rezervasyon — Mayıs kırmızı */}
            <div className="lg:col-span-1" data-reveal data-reveal-delay="2">
              <div className="bg-[#E02F3C] p-8 h-full flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(224,47,60,0.4)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black italic uppercase text-white leading-tight mb-3">
                    Birlikte Dünyayı Ters Düz Edelim
                  </h3>
                  <p className="text-white/80 font-medium leading-relaxed">Tarihinizi iletin, gerisini biz planlayalım.</p>
                </div>
                <a
                  href="mailto:semin.ozturk@acromach.com"
                  className="relative z-10 mt-8 inline-flex items-center justify-center gap-2 bg-white text-[#E02F3C] px-6 py-4 font-black italic uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-5 h-5" /> Randevu Talep Et
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlyWithSemin;
