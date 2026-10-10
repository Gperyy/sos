import React from "react";
import { SectionHeader } from "./ui";

// Hakkında — her metin bölümü ve kendi fotoğrafları yan yana; fotoğraflar kaydırınca alttan açılarak belirir.

// Metinler eski siteden (seminozturk.com — Hakkında) birebir alınmıştır.
// Bölüm fotoğrafları: /public/images/hakkinda içinde; altyazılar da eski siteden.
interface ChapterPhoto {
  src: string;
  alt: string;
  aspect: number;
  caption?: string;
  sub?: string;
}

const chapters: { paragraphs: string[]; photos?: ChapterPhoto[] }[] = [
  {
    paragraphs: [
      "1991 doğumlu olan Semin Öztürk Şener Türkiye’nin İLK Profesyonel Kadın Akrobasi Pilotudur. Semin, ilk akrobasi uçuşunu henüz 12 yaşındayken, babası Milli Akrobasi Pilotu Ali İsmet Öztürk ile birlikte gerçekleştirdi. Liseyi Saint-Michel Fransız Lisesi’nde, üniversiteyi ise İstanbul Üniversitesi’nde okudu. Üniversite 2. sınıftayken Ayjet Uçuş Okulu sponsorluğunda Hususi Pilot Lisansı’nı (PPL) aldı. Daha sonra Amerika’ya giderek Kaliforniya eyaletinde bulunan Tutima Academy of Aviation Safety’de akrobasi uçuş eğitimini tamamladı. İlk yalnız akrobasi uçuşunu 21 yaşındayken Pitts S-2B uçağıyla yaptı. Böylelikle bu tip uçakla ilk yalnız uçan Türk Kadın Pilotu ünvanını da aldı. Semin Öztürk Şener, babasının yolundan gitmektedir.",
    ],
  },
  {
    paragraphs: [
      "İlk hava gösterisini 19 Eylül 2015’te S.H.M.'de düzenlenen SHG Airshow 2015’te gerçekleştiren genç akrobasi pilotu, İtalyan çikolata markası Pernigotti’nin Türkiye’deki başarılı iş kadınları ile çektiği reklam filminde rol aldı.",
      "8 Mart 2016 Dünya Kadınlar Günü'nde, Cumhurbaşkanlığı Sarayı'nda tertip edilen özel resepsiyona davet edildi. Bu davette mesleği ile ön plana geçen kadınlar arasında yerini aldı. Yine Dünya Kadınlar Günü vesilesi ile Mart 2018’de, Cumhurbaşkanlığı Sarayı’nda Sayın Emine Erdoğan Hanımefendi’nin verdiği yemek davetinde bulundu. 2016 yılında TUSAŞ Uçuş Okulu'nda PPL(H) Özel Helikopter Pilot Yetiştirme Kursu’nu başarıyla tamamlayarak Türkiye'nin İlk Sivil Kadın Helikopter Pilotu oldu.",
      "2017 yılında Koç Grubu’nun çektiği “10 Kasım Atatürk’ü Anma” reklam filminde akrobasi uçağı ile rol aldı. Aynı yıl İngiltere’de bulunan Advance Helicopter Uçuş Okulu’ndaki sınavı geçerek, Türkiye’nin ilk MD-500 lisansına sahip kadın helikopter pilotu oldu.",
    ],
    photos: [
      { src: "/images/hakkinda/pernigotti-dergi.jpg", alt: "Pernigotti reklamı dergilerde", caption: "Pernigotti Reklamı", sub: "Çeşitli Dergilerde", aspect: 484 / 656 },
      { src: "/images/hakkinda/md500-tip-egitimi.jpg", alt: "MD-500 tip eğitimi", caption: "MD-500 tip eğitimi", sub: "Advance Helicopters - İngiltere", aspect: 810 / 518 },
    ],
  },
  {
    paragraphs: [
      "2018 yılında ilk yurtdışı gösterisini Aeromania 2018'de gerçekleştirdi ve Romanya Büyükelçisi Sayın Osman Koray Ertaş'ın bizzat teşrif ettiği airshow'da Türk Bayrağını gururla sallandırdı. Aynı yıl Amerika Birleşik Devletleri'nin Colorado eyaletinin Denver şehrindeki \"Wings Over the Rockies Air & Space Museum\" 'da 100. yıl kutlamaları sebebiyle 4.3 metre x 5.5 ebadındaki akrobasi sırasında çekilmiş fotoğrafı müze duvarına asıldı ve Türkiye'mizi gerçek anlamda temsil etti.",
      "2020 yılında Unilever'in Arjantin, Filipinler, Malezya, Meksika, Uruguay, Tayland ve Türkiye'yi içeren Uzakdoğu, Latin Amerika ve Ortadoğu ülkelerinde gösterilen reklam filmlerinde yer aldı.",
    ],
    photos: [
      { src: "/images/hakkinda/aeromania-romanya-afis.jpg", alt: "Aeromania 2018 afişi", caption: "İlk Yurtdışı Akrobasi Gösterisi", sub: "Aeromania - Romanya", aspect: 460 / 656 },
      { src: "/images/hakkinda/unilever-reklam-filmi.png", alt: "Unilever reklam filminden kare", caption: "Unilever reklam filmi", aspect: 810 / 450 },
    ],
  },
  {
    paragraphs: [
      "Ayrıca, Boeing Stearman E-75 ve Mustang P-51 gibi çok özel uçaklarla uçmuş ve uçuş tecrübesini geliştirmiştir. Semin henüz çok genç olmasına rağmen, ülkemiz havacılığı için birçok ilki gerçekleştirmiştir.",
    ],
    photos: [
      { src: "/images/hakkinda/texan.jpg", alt: "Semin Öztürk Şener T-6 Texan kokpitinde", aspect: 1 },
      { src: "/images/hakkinda/boeing-stearman.jpg", alt: "Semin Öztürk Şener Boeing Stearman ile", aspect: 960 / 638 },
      { src: "/images/hakkinda/uh-1h-helikopter.jpg", alt: "Semin Öztürk Şener UH-1H helikopterinde", aspect: 1 },
    ],
  },
  {
    paragraphs: [
      "2022 yılında gösterilerine devam eden Semin Öztürk Şener, İzmir'in düşman işgalinden kurtuluşunun 100. yılında düzenlenen gösterilerde İzmir Körfezinde 2 Milyon seyirci ile buluştu. Ardından SHG Airshow ve İstanbul'da 100.000'i aşkın seyircinin önünde yaptığı gösterilerle \"Etkinlik Takvimini\" tamamladı.",
      "2022 yılı sonunda Semin Öztürk Şener, babası Ali İsmet Öztürk ve ekibi tarafından tasarlanan ve dünyanın en gelişmiş akrobasi uçaklarından biri olan \"Efsanevi Mor Menekşe\" ile uçmaya başlayarak, babasından bayrağı devraldı. Mor Menekşe, Mak Teknik'in özverili ve detaylı çalışmalarıyla, kapsamlı bir bakımdan geçti ve görüntüsü tamamen değişerek \"Yeni Menekşe\" ismini aldı.",
      "2023 yılında \"Yeni Menekşe\" ile ilk uluslararası gösterisini Almanya'da Flugtage Bautzen'de yaparak ülkemizi başarı ile temsil etti.",
    ],
    photos: [
      { src: "/images/hakkinda/image00007.jpg", alt: "Semin Öztürk Şener gösteri uçuşunda", aspect: 505 / 341 },
    ],
  },
];


// Fotoğraflar büyük ve kırpılmadan; iki fotoğraf varsa üstte ve altta, altlarında eski sitedeki açıklama.
// Ekran yüksekliğini aşmasınlar diye en fazla yükseklik sınırı var (tek: 78vh, iki: 40vh).
const PhotoStack: React.FC<{ photos: ChapterPhoto[] }> = ({ photos }) =>
  photos.length >= 3 ? (
    // Üç fotoğraf: ilki üstte büyük, diğerleri altında yan yana aynı yükseklikte
    <div className="flex flex-col gap-4">
      <div data-reveal-img className="overflow-hidden">
        <img src={photos[0].src} alt={photos[0].alt} loading="lazy" className="block w-full h-auto border border-black/10 shadow-xl" />
      </div>
      <div className="flex items-start gap-4">
        {photos.slice(1).map((ph, k) => (
          <div key={ph.src} data-reveal-img data-reveal-delay={String(k + 1)} style={{ flex: `${ph.aspect} 1 0%`, minWidth: 0 }} className="overflow-hidden">
            <img src={ph.src} alt={ph.alt} loading="lazy" className="block w-full h-auto border border-black/10 shadow-xl" />
          </div>
        ))}
      </div>
    </div>
  ) : (
  // Yığın en geniş fotoğraf kadar geniş; dikey (dar) fotoğraf altındaki yatay fotoğrafa göre ortalanır
  <div className="inline-flex flex-col items-center gap-8 max-w-full">
    {photos.map((ph) => {
      const portrait = ph.aspect < 1;
      return (
        <figure key={ph.src} className={portrait ? "flex flex-col items-center text-center" : undefined}>
          <div data-reveal-img className="overflow-hidden">
            <img
              src={ph.src}
              alt={ph.alt}
              loading="lazy"
              className={`block w-auto h-auto max-w-full border border-black/10 shadow-xl ${photos.length > 1 ? "lg:max-h-[40vh]" : "lg:max-h-[78vh]"}`}
            />
          </div>
          {ph.caption && (
            <figcaption className="mt-3">
              <span className="block text-[#181210] font-black italic text-sm">{ph.caption}</span>
              {ph.sub && <span className="block text-gray-500 text-sm font-medium mt-0.5">{ph.sub}</span>}
            </figcaption>
          )}
        </figure>
      );
    })}
  </div>
);

// Her metin bölümü kendi fotoğraflarıyla aynı satırda: fotoğraf solda, metin sağda — hep paralel.
// Hangisi kısaysa (metin ya da fotoğraflar) diğeri bitene kadar yanında sabit kalır (satır içi sticky).
const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background-light">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeader eyebrow="Biyografi" title="Hakkında" />

        <div className="flex flex-col gap-16 lg:gap-24 mt-4">
          {chapters.map((ch, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-6 lg:sticky lg:top-28 self-start">
                {ch.photos ? (
                  <PhotoStack photos={ch.photos} />
                ) : (
                  // Fotoğrafı olmayan ilk bölüm: eski sitedeki başlık
                  <p data-reveal className="font-black italic text-[#181210] leading-[1.05] text-3xl md:text-5xl">
                    Türkiye'nin İlk Profesyonel <span className="text-[#E02F3C]">Kadın Akrobasi Pilotu</span>
                  </p>
                )}
              </div>
              <div className="lg:col-span-6 space-y-5 lg:sticky lg:top-28 self-start" data-reveal>
                {ch.paragraphs.map((t, k) => (
                  <p key={k} className="text-gray-700 text-lg leading-relaxed">{t}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
