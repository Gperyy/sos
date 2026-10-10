// Etkinlik takvimi — tek kaynak. Ana sayfa ve Etkinlik Takvimi sayfası buradan okur.
// "Yaklaşan" / "Geçmiş" ayrımı tarihe göre otomatik yapılır: tarihi geçen etkinlik
// kendiliğinden geçmişe düşer.
//
// Yeni etkinlik: listeye ekleyin. Afiş için görseli /public/images/afisler içine koyup
// poster'a "/images/afisler/dosya.jpg" yazın (dikey 3:4 afişler en iyi görünür).

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
  },
  {
    id: "havaci-cocuklar-2026",
    date: "2026-04-19",
    time: "11:00",
    title: "Havacı Çocuklar Etkinliği",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Geleneksel kağıt uçak yarışması ve 5–15 yaş arası tüm çocuklara ücretsiz uçuş şansı.",
    poster: "/images/afisler/2026-04-19-havaci-cocuklar.jpg",
  },
  {
    id: "fly-inn-sempozyum-2026",
    date: "2026-04-25",
    title: "Fly-Inn / Amatör, Sportif ve Kültürel Havacılık Sempozyumu",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Dünya Pilotlar Günü kutlaması. Program içinde Semin Öztürk Şener akrobasi gösterisi.",
    poster: "/images/afisler/2026-04-25-fly-inn-sempozyum.jpg",
  },
  {
    id: "ucan-genclik-2026",
    date: "2026-05-17",
    time: "11:00",
    title: "Uçan Gençlik Etkinliği",
    location: "Sivrihisar Havacılık Merkezi",
    description: "19 Mayıs'ı uçarak kutluyoruz. Tüm gençlere ücretsiz uçuş şansı.",
    poster: "/images/afisler/2026-05-17-ucan-genclik.jpg",
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
  },
  { id: "kulup-balosu-2026", date: "2026-06-27", title: "Kulüp Balosu", location: "Sivrihisar" },
  { id: "ucmayan-koy-kalmasin-2026", date: "2026-06-28", title: "Uçmayan Köy Kalmasın", location: "Sivrihisar" },
  { id: "asinfura-2-2026", date: "2026-08-17", endDate: "2026-08-23", title: "ASINFURA 2", location: "Sivrihisar" },
  {
    id: "zafer-bayrami-2026",
    date: "2026-08-29",
    endDate: "2026-08-30",
    title: "Zafer Bayramı & Havacılık Haftası",
    location: "Sivrihisar",
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
  },
  {
    id: "cumhuriyet-fotografi-2026",
    date: "2026-10-25",
    time: "12:00",
    title: "Geleneksel Cumhuriyet Fotoğrafı",
    location: "Sivrihisar Havacılık Merkezi",
    description: "Cumhuriyet Bayramı'nı her yıl olduğu gibi gökyüzünden görünen dev bir ay-yıldız fotoğrafıyla kutluyoruz.",
    poster: "/images/afisler/2026-10-25-cumhuriyet-fotografi.jpg",
  },
];

const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/** "13-14" / "Haziran" / 2026 gibi parçalar (ay değişen aralıkta: "30 Eyl – 2 Eki" kısaltması yerine iki ay yazılır) */
export function formatDate(e: EventData) {
  const s = parse(e.date);
  const end = e.endDate ? parse(e.endDate) : undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (end && end.getMonth() !== s.getMonth()) {
    return { day: `${pad(s.getDate())}-${pad(end.getDate())}`, month: `${MONTHS[s.getMonth()]} – ${MONTHS[end.getMonth()]}`, year: s.getFullYear() };
  }
  return {
    day: end ? `${pad(s.getDate())}-${pad(end.getDate())}` : pad(s.getDate()),
    month: MONTHS[s.getMonth()],
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
