import React, { useState } from "react";
import { Play } from "lucide-react";
import { useLightbox } from "./ui/Lightbox";
import { useLang, useT, pick } from "./ui";
import type { Lang, Tx } from "./ui";

// Medya — ŞU ANKİ düzen + MAYIS font (Lexend) & renk.
// Basın kupürleri eski siteden (seminozturk.com — Medya) alınmıştır, aynı sırayla.
// Görseller: /public/images/basin — karta tıklayınca kupür tam boy açılır.
interface Clipping {
  source: string;
  title?: string;
  /** Türkçe manşetin İngilizce karşılığı (yalnızca açıklama metninde kullanılır; manşet aslı gibi kalır) */
  titleEn?: string;
  image: string;
  /** genişlik / yükseklik — satırda eşit yükseklik, kırpmasız yerleşim için */
  aspect: number;
}

// Dört satır, satırda 2 kupür — büyük ve küçük oranlar eşleştirildi, satır yükseklikleri birbirine yakın.
const C = {
  sozcu: { source: "Sözcü", title: "Gökyüzünün Kraliçesi", titleEn: "Queen of the Skies", image: "/images/basin/sozcu-gokyuzunun-kralicesi.png", aspect: 929 / 485 },
  milliyet: { source: "Milliyet", title: "Göklerin Sultanı", titleEn: "Sultan of the Skies", image: "/images/basin/milliyet.png", aspect: 929 / 1498 },
  aksam: { source: "Akşam Gazetesi", title: "Başarı Yurtdışına Taştı", titleEn: "Success Goes Abroad", image: "/images/basin/aksam-basari-yurtdisina-tasti.png", aspect: 930 / 529 },
  telegraph1: { source: "Telegraph", title: "Pictures of the Day: 7 July 2019", image: "/images/basin/telegraph-7-jul-2019.png", aspect: 930 / 1099 },
  guardian: { source: "The Guardian", title: "Photo of the day", image: "/images/basin/the-guardian-photo-of-the-day.png", aspect: 930 / 649 },
  ecns: { source: "ECNS", title: "First female pilot", image: "/images/basin/ecns-first-female-pilot.png", aspect: 929 / 829 },
  telegraph2: { source: "Telegraph", image: "/images/basin/telegraph-2.png", aspect: 929 / 649 },
  ant: { source: "Air News Times", title: "Semin Öztürk: Havacılık Aşkına Tutuldum", titleEn: "Semin Öztürk: I Fell in Love with Aviation", image: "/images/basin/air-news-times.png", aspect: 930 / 749 },
} satisfies Record<string, Clipping>;
const pressRows: Clipping[][] = [
  [C.sozcu, C.milliyet],
  [C.telegraph1, C.aksam],
  [C.guardian, C.ecns],
  [C.ant, C.telegraph2],
];
const pressPhotos = (lang: Lang) =>
  pressRows.flat().map((c) => {
    const title = c.title ? ` — ${c.title}${lang === "en" && c.titleEn ? ` (${c.titleEn})` : ""}` : "";
    return { src: c.image, alt: `${c.source}${title} ${lang === "en" ? "press clipping" : "basın kupürü"}` };
  });

// Kupürler: yazısız; her satırda aynı yükseklikte, kırpılmadan (flex-grow = oran).
// Dosyalar şeffaf PNG — eski sitede beyaz sayfada durdukları gibi görünsünler diye arkaları tam kendi boyunda beyaz.
const PressClippings: React.FC = () => {
  const lang = useLang();
  const t = useT();
  const photos = pressPhotos(lang);
  const { open, lightbox } = useLightbox(photos, { captions: false });
  let idx = 0;
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6 mb-24">
        {pressRows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-1 gap-4 md:flex md:gap-6 md:items-start">
            {row.map((c) => {
              const i = idx++;
              return (
                <button
                  key={c.image}
                  onClick={() => open(i)}
                  data-reveal-img
                  data-reveal-delay={String((i % 2) + 1)}
                  style={{ flex: `${c.aspect} 1 0%` }}
                  className="group block overflow-hidden bg-white"
                  aria-label={`${photos[i].alt} — ${t("büyüt", "enlarge")}`}
                >
                  <img src={c.image} alt={photos[i].alt} loading="lazy" className="block w-full h-auto transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {lightbox}
    </>
  );
};

// Fotoğraflar eski sitenin galerisinden: /public/images/galeri
const galleryPhotos: { src: string; alt: Tx }[] = [
  { src: "/images/galeri/01-izmir-airshow.jpg", alt: { tr: "İzmir Körfezi'nde gösteri", en: "Air show over the Gulf of Izmir" } },
  { src: "/images/galeri/02-cumhuriyet-fotografi.jpg", alt: { tr: "Cumhuriyet fotoğrafı — ay yıldız", en: "Republic Day photo — crescent and star" } },
  { src: "/images/galeri/03-yeni-menekse.jpg", alt: { tr: "Yeni Menekşe", en: "Yeni Menekşe" } },
  { src: "/images/galeri/04-muze-duvari.jpg", alt: { tr: "Müze duvarındaki akrobasi fotoğrafı", en: "Aerobatics photo on the museum wall" } },
  { src: "/images/galeri/05-airact.jpg", alt: { tr: "AirACT logolu uçak", en: "Aircraft with the AirACT logo" } },
  { src: "/images/galeri/06-seyirciler-arasinda.jpg", alt: { tr: "Semin seyirciler arasında", en: "Semin among the spectators" } },
  { src: "/images/galeri/07-gosteri-alani.jpg", alt: { tr: "Gösteri alanında Yeni Menekşe", en: "Yeni Menekşe at the show grounds" } },
  { src: "/images/galeri/08-tutima-academy-ilk-ucus.jpg", alt: { tr: "Tutima Academy'de ilk uçuş", en: "First flight at Tutima Academy" } },
  { src: "/images/galeri/09-ustten-gorunum.jpg", alt: { tr: "Semin'in uçağı üstten", en: "Semin's aircraft from above" } },
  { src: "/images/galeri/10-piper-cub.jpg", alt: { tr: "Piper Cub uçağı", en: "Piper Cub aircraft" } },
  { src: "/images/galeri/11-cekim.jpg", alt: { tr: "Reklam çekimi", en: "Commercial shoot" } },
  { src: "/images/galeri/12-helikopter.jpg", alt: { tr: "Helikopter ile", en: "With a helicopter" } },
  { src: "/images/galeri/13-pitts-duman.jpg", alt: { tr: "Pitts duman izleriyle", en: "Pitts with smoke trails" } },
  { src: "/images/galeri/14-kanat-ustu.jpg", alt: { tr: "Kanat üstünden uçuş", en: "Flight seen from above the wing" } },
  { src: "/images/galeri/15-drone-ustten.jpg", alt: { tr: "Drone ile üstten çekim", en: "Aerial drone shot" } },
];

// Mozaik: 5'li gruplar — her grupta 1 büyük + 4 küçük kare, büyük kare sırayla sol/sağ
const PhotoMosaic: React.FC<{ photos: { src: string; alt: string }[] }> = ({ photos }) => {
  const t = useT();
  const { open, lightbox } = useLightbox(photos, { captions: false });
  const groups: { src: string; alt: string; idx: number }[][] = [];
  for (let i = 0; i < photos.length; i += 5) groups.push(photos.slice(i, i + 5).map((p, k) => ({ ...p, idx: i + k })));

  return (
    <>
      <div className="space-y-3 md:space-y-4 mb-20">
        {groups.map((g, gi) => (
          <div key={gi} className="grid grid-cols-2 md:grid-cols-4 md:grid-flow-dense gap-3 md:gap-4">
            {g.map((p, k) => (
              <button
                key={p.src}
                onClick={() => open(p.idx)}
                data-reveal-img
                data-reveal-delay={String(k + 1)}
                className={`group relative aspect-square overflow-hidden bg-white/5 ${
                  k === 0 ? `col-span-2 row-span-2 ${gi % 2 ? "md:col-start-3" : ""}` : ""
                }`}
                aria-label={`${p.alt} — ${t("büyüt", "enlarge")}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></span>
              </button>
            ))}
          </div>
        ))}
      </div>
      {lightbox}
    </>
  );
};

// Videolar: /public/videos (web için sıkıştırılmış mp4 + kapak karesi .jpg)
interface VideoItem {
  file: string;
  /** Tek dilde aynı kalan başlık (marka/kampanya adı) ya da iki dilli başlık */
  title: string | Tx;
  /** İngilizce başlıklar için "en": büyük harfte i → İ dönüşmesin (AirACT) */
  lang?: "en";
}
// Videolar eski siteden (seminozturk.com — Galeri) alınmıştır; sitedeki videoların hepsi.
// Başlıklar videolardaki marka/kampanya yazılarından: Unilever (Sunsilk, Sedal) farklı ülke versiyonları,
// Pernigotti ve Koç Grubu. lang "en": büyük harfte i → İ dönüşmesin (yabancı/karma başlıklar).
const adVideos: VideoItem[] = [
  { file: "sunsilk-tayland", title: { tr: "Sunsilk — Tayland", en: "Sunsilk — Thailand" }, lang: "en" },
  { file: "sunsilk-lets-rethink-pink", title: "Sunsilk — Let's Rethink Pink", lang: "en" },
  { file: "sunsilk-pink-is-strong", title: "Sunsilk — Pink Is Strong", lang: "en" },
  { file: "sunsilk-it-shines", title: "Sunsilk — It Shines 24/7", lang: "en" },
  { file: "sedal-fuerza-y-brillo", title: "Sedal — Fuerza y Brillo 24/7", lang: "en" },
  { file: "sedal-rosa-es-fuerza", title: "Sedal — Rosa es Fuerza", lang: "en" },
  { file: "sedal-desestresa-tu-cabello", title: "Sedal — Desestresa tu Cabello", lang: "en" },
  { file: "sedal-salud-es-belleza", title: "Sedal — Salud es Belleza", lang: "en" },
  { file: "sedal-cabello-largo-kisa", title: "Sedal — Cabello Largo", lang: "en" },
  { file: "pernigotti-farkindayiz", title: "Pernigotti — Farkındayız", lang: "en" },
  { file: "koc-10-kasim", title: { tr: "Koç Grubu — 10 Kasım Atatürk'ü Anma", en: "Koç Group — 10 November Atatürk Commemoration" }, lang: "en" },
  { file: "eski-airact", title: "AirACT", lang: "en" },
  { file: "eski-airact-dikey", title: "AirACT", lang: "en" },
  { file: "eski-gosteri-ucusu", title: { tr: "Akrobasi Gösterisi", en: "Aerobatic Display" } },
];

// Kapak + oynat düğmesi; tıklayınca video kendi yerinde (sesli, kontrollerle) oynar
const VideoCard: React.FC<{ video: VideoItem; aspect: string; delay: number; small?: boolean }> = ({ video, aspect, delay, small }) => {
  const [playing, setPlaying] = useState(false);
  const lang = useLang();
  const title = typeof video.title === "string" ? video.title : pick(video.title, lang);
  const src = `/videos/${video.file}.mp4`;
  const poster = `/videos/${video.file}.jpg`;
  return (
    <div data-reveal-img data-reveal-delay={String(delay)} className={`group relative ${aspect} overflow-hidden bg-black border border-white/10`}>
      {playing ? (
        <video src={src} poster={poster} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-contain bg-black" />
      ) : (
        <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full text-left" aria-label={`${title} — ${lang === "en" ? "play" : "oynat"}`}>
          <img src={poster} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className={`${small ? "w-14 h-14" : "w-20 h-20"} rounded-full bg-[#E02F3C]/90 flex items-center justify-center pl-1 shadow-[0_0_40px_rgba(224,47,60,0.6)] group-hover:scale-110 transition-transform border-4 border-white/10 text-white`}
            >
              <Play className={`${small ? "w-6 h-6" : "w-8 h-8"} fill-white`} />
            </span>
          </span>
          <span className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent ${small ? "p-4 pt-10" : "p-6 pt-14"}`}>
            <span lang={video.lang} className={`block text-white font-black italic uppercase ${small ? "text-xs" : ""}`}>{title}</span>
          </span>
        </button>
      )}
    </div>
  );
};


const Media: React.FC = () => {
  const lang = useLang();
  const t = useT();
  return (
    <section id="media" className="py-24 bg-surface-dark font-['Lexend']">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Mayıs başlık */}
        <div className="flex items-center gap-4 mb-4" data-reveal>
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_rgba(224,47,60,0.5)]"></div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">{t("Medya", "Media")}</h2>
        </div>
        <p className="text-gray-400 text-lg font-medium mb-14 max-w-2xl" data-reveal>
          {t(
            "Ulusal ve uluslararası basında yer alan haberler, röportajlar ve videolar.",
            "News stories, interviews and videos from the Turkish and international press."
          )}
        </p>

        {/* Basın kupürleri — sayfanın en önemli bölümü: başta ve büyük */}
        <div className="flex items-center gap-4 mb-10" data-reveal>
          <div className="h-8 w-2 bg-[#E02F3C] transform skew-x-[-15deg]"></div>
          <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white">{t("Basın Kupürleri", "Press Clippings")}</h3>
        </div>
        <PressClippings />

        {/* Reklam filmleri — eski siteden: Unilever'in 7 ülkede yayınlanan reklam filmleri */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[#E02F3C] text-xs font-black italic tracking-[0.3em] uppercase">{t("Reklam Filmleri", "Commercials")}</span>
          <span className="flex-1 h-px bg-white/10"></span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {adVideos.map((v, i) => (
            <VideoCard key={v.file} video={v} aspect="aspect-video" delay={(i % 3) + 1} small />
          ))}
        </div>

        {/* Fotoğraflar — eski sitenin galerisinden */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[#E02F3C] text-xs font-black italic tracking-[0.3em] uppercase">{t("Fotoğraflar", "Photos")}</span>
          <span className="flex-1 h-px bg-white/10"></span>
        </div>
        <PhotoMosaic photos={galleryPhotos.map((p) => ({ src: p.src, alt: pick(p.alt, lang) }))} />

      </div>
    </section>
  );
};

export default Media;
