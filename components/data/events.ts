// Etkinlik takvimi — tek kaynak. Ana sayfa ve Etkinlik Takvimi sayfası buradan okur.
// "Yaklaşan" / "Geçmiş" ayrımı tarihe göre otomatik yapılır: tarihi geçen etkinlik
// kendiliğinden geçmişe düşer.
//
// Yeni etkinlik: listeye ekleyin. Afiş için görseli /public/images/afisler içine koyup
// poster'a "/images/afisler/dosya.jpg" yazın (dikey 3:4 afişler en iyi görünür).
// İngilizce sürüm için `en` alanına çeviri yazın (boş bırakılan alan Türkçe gösterilir).

import type { Lang } from "../ui/i18n";

export interface EventData {
  id: string;
  /** Başlangıç günü (YYYY-AA-GG) */
  date: string;
  /** Çok günlü etkinliklerde bitiş günü (YYYY-AA-GG) */
  endDate?: string;
  time?: string;
  title: string;
  location: string;
  description?: string;
  website?: string;
  poster?: string;
  /** İngilizce başlıklar için "en": büyük harfte i → İ dönüşmesin (AIRSHOW) */
  lang?: "en";
  /** İngilizce site için çeviriler */
  en?: { title?: string; location?: string; description?: string };
}

export const events: EventData[] = [
  {
    id: "kadin-ve-dunya-havaciligi-2026",
    date: "2026-03-08",
    time: "11:00",
    title: "Kadın ve Dünya Havacılığı Sempozyumu",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Tüm hanım misafirlerimize ücretsiz uçuş şansı.",
    poster: "/images/afisler/2026-03-08-kadin-ve-dunya-havaciligi.jpg",
    en: {
      title: "Women and World Aviation Symposium",
      location: "Sivrihisar Aviation Center",
      description: "A free flight opportunity for all our women guests.",
    },
  },
  {
    id: "havaci-cocuklar-2026",
    date: "2026-04-19",
    time: "11:00",
    title: "Havacı Çocuklar Etkinliği",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Geleneksel kağıt uçak yarışması ve 5–15 yaş arası tüm çocuklara ücretsiz uçuş şansı.",
    poster: "/images/afisler/2026-04-19-havaci-cocuklar.jpg",
    en: {
      title: "Aviator Kids Event",
      location: "Sivrihisar Aviation Center",
      description: "The traditional paper plane contest, plus a free flight opportunity for every child aged 5–15.",
    },
  },
  {
    id: "fly-inn-sempozyum-2026",
    date: "2026-04-25",
    endDate: "2026-04-26",
    title: "Fly-Inn / Amatör, Sportif ve Kültürel Havacılık Sempozyumu",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Dünya Pilotlar Günü kutlaması. Program içinde Semin Öztürk Şener akrobasi gösterisi.",
    poster: "/images/afisler/2026-04-25-fly-inn-sempozyum.jpg",
    en: {
      title: "Fly-Inn / Amateur, Sport and Cultural Aviation Symposium",
      location: "Sivrihisar Aviation Center",
      description: "A World Pilots' Day celebration, featuring an aerobatic display by Semin Öztürk Şener.",
    },
  },
  {
    id: "ucan-genclik-2026",
    date: "2026-05-17",
    time: "11:00",
    title: "Uçan Gençlik Etkinliği",
    location: "Sivrihisar Havacılık Merkezi",
    description: "19 Mayıs'ı uçarak kutluyoruz. Tüm gençlere ücretsiz uçuş şansı.",
    poster: "/images/afisler/2026-05-17-ucan-genclik.jpg",
    en: {
      title: "Flying Youth Event",
      location: "Sivrihisar Aviation Center",
      description: "Celebrating May 19, Youth and Sports Day, in the air — with a free flight opportunity for every young person.",
    },
  },
  {
    id: "rc-model-festivali-2026",
    date: "2026-06-13",
    endDate: "2026-06-14",
    time: "11:00",
    title: "RC Model Festivali",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Uçak, helikopter, gemi ve araba — model tutkunları buluşuyor.",
    poster: "/images/afisler/2026-06-13-rc-model-festivali.jpg",
    en: {
      title: "RC Model Festival",
      location: "Sivrihisar Aviation Center",
      description: "Planes, helicopters, boats and cars — a gathering for model enthusiasts.",
    },
  },
  { id: "kulup-balosu-2026", date: "2026-07-11", title: "Kulüp Balosu", location: "Sivrihisar", en: { title: "Sivrihisar Aviation Club Ball" } },
  {
    id: "ucmayan-koy-kalmasin-2026",
    date: "2026-06-28",
    title: "Uçmayan Köy Kalmasın",
    location: "Sivrihisar",
    en: { title: "Flying Villages" },
  },
  {
    id: "asinfura-2-2026",
    date: "2026-08-17",
    endDate: "2026-08-23",
    title: "ASINFURA 2",
    location: "Sivrihisar",
    en: { title: "ASINFURA 2 — Asiatic International Fun Rally" },
  },
  {
    id: "zafer-bayrami-2026",
    date: "2026-08-29",
    endDate: "2026-08-30",
    title: "Zafer Bayramı & Havacılık Haftası",
    location: "Sivrihisar",
    description: "Uçurtma Şenliği.",
    en: { title: "Victory Day & Aviation Week Celebration", description: "Kite Festival." },
  },
  {
    id: "shg-airshow-2026",
    date: "2026-09-19",
    endDate: "2026-09-20",
    title: "SHG Airshow 2026",
    lang: "en",
    location: "Sivrihisar Hava Gösterileri",
    description: "Türkiye'nin en büyük hava gösterisi organizasyonu. Binlerce seyirci, düzinelerce pilot ve unutulmaz bir sahne.",
    website: "https://shgairshow.com",
    poster: "/images/afisler/2026-09-19-shg-airshow.jpg",
    en: {
      description: "Türkiye's biggest airshow. Thousands of spectators, dozens of pilots and an unforgettable stage.",
    },
  },
  {
    id: "cumhuriyet-fotografi-2026",
    date: "2026-10-25",
    time: "12:00",
    title: "Geleneksel Cumhuriyet Fotoğrafı",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Cumhuriyet Bayramı'nı her yıl olduğu gibi gökyüzünden görünen dev bir ay-yıldız fotoğrafıyla kutluyoruz.",
    poster: "/images/afisler/2026-10-25-cumhuriyet-fotografi.jpg",
    en: {
      title: "Traditional Republic Photo",
      location: "Sivrihisar Aviation Center",
      description: "As every year, we celebrate Republic Day with a giant crescent and star photographed from the sky.",
    },
  },
  {
    id: "ataturke-saygi-ucusu-2026",
    date: "2026-11-10",
    title: "Atatürk'e Saygı Uçuşu",
    location: "Sivrihisar Havacılık Merkezi",
    en: { title: "Flight of Respect to Atatürk", location: "Sivrihisar Aviation Center" },
  },
];

const MONTHS: Record<Lang, string[]> = {
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

/** Etkinliği seçilen dile çevirir (çevirisi olmayan alan Türkçe kalır). İngilizce sayfa zaten lang="en". */
export function localizeEvent(e: EventData, lang: Lang): EventData {
  if (lang === "tr") return e;
  return { ...e, ...e.en, lang: undefined };
}

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/** "13-14" / "Haziran" / 2026 gibi parçalar (ay değişen aralıkta: "30 Eyl – 2 Eki" kısaltması yerine iki ay yazılır) */
export function formatDate(e: EventData, lang: Lang = "tr") {
  const months = MONTHS[lang];
  const s = parse(e.date);
  const end = e.endDate ? parse(e.endDate) : undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (end && end.getMonth() !== s.getMonth()) {
    return { day: `${pad(s.getDate())}-${pad(end.getDate())}`, month: `${months[s.getMonth()]} – ${months[end.getMonth()]}`, year: s.getFullYear() };
  }
  return {
    day: end ? `${pad(s.getDate())}-${pad(end.getDate())}` : pad(s.getDate()),
    month: months[s.getMonth()],
    year: s.getFullYear(),
  };
}

/** Bugünü (yerel saat, gün başı) baz alarak yaklaşan (en yakın önce) ve geçmiş (en yeni önce) etkinlikler */
export function splitEvents(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const upcoming = events
    .filter((e) => parse(e.endDate ?? e.date).getTime() >= today)
    .sort((a, b) => parse(a.date).getTime() - parse(b.date).getTime());
  const past = events
    .filter((e) => parse(e.endDate ?? e.date).getTime() < today)
    .sort((a, b) => parse(b.date).getTime() - parse(a.date).getTime());
  return { upcoming, past };
}
