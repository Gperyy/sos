import React from "react";
import { SectionHeader, useLang, useT, pick } from "./ui";
import type { Tx } from "./ui";

// Hakkında — her metin bölümü ve kendi fotoğrafları yan yana; fotoğraflar kaydırınca alttan açılarak belirir.

// Metinler eski siteden (seminozturk.com — Hakkında) birebir alınmıştır.
// Bölüm fotoğrafları: /public/images/hakkinda içinde; altyazılar da eski siteden.
// İngilizce metinler bu Türkçe metinlerin çevirisidir.
interface ChapterPhoto {
  src: string;
  alt: Tx;
  aspect: number;
  caption?: Tx;
  sub?: Tx;
}

const chapters: { paragraphs: Tx<string[]>; photos?: ChapterPhoto[] }[] = [
  {
    paragraphs: {
      tr: [
        "1991 doğumlu olan Semin Öztürk Şener Türkiye’nin İLK Profesyonel Kadın Akrobasi Pilotudur. Semin, ilk akrobasi uçuşunu henüz 12 yaşındayken, babası Milli Akrobasi Pilotu Ali İsmet Öztürk ile birlikte gerçekleştirdi. Liseyi Saint-Michel Fransız Lisesi’nde, üniversiteyi ise İstanbul Üniversitesi’nde okudu. Üniversite 2. sınıftayken Ayjet Uçuş Okulu sponsorluğunda Hususi Pilot Lisansı’nı (PPL) aldı. Daha sonra Amerika’ya giderek Kaliforniya eyaletinde bulunan Tutima Academy of Aviation Safety’de akrobasi uçuş eğitimini tamamladı. İlk yalnız akrobasi uçuşunu 21 yaşındayken Pitts S-2B uçağıyla yaptı. Böylelikle bu tip uçakla ilk yalnız uçan Türk Kadın Pilotu ünvanını da aldı. Semin Öztürk Şener, babasının yolundan gitmektedir.",
      ],
      en: [
        "Born in 1991, Semin Öztürk Şener is Türkiye’s FIRST professional female aerobatic pilot. Semin flew her first aerobatic flight at just 12 years old, alongside her father, national aerobatic pilot Ali Ismet Öztürk. She attended Saint-Michel French High School and went on to study at Istanbul University. In her second year of university, she earned her Private Pilot License (PPL) under the sponsorship of Ayjet Flight School. She then traveled to the United States and completed her aerobatic flight training at the Tutima Academy of Aviation Safety in California. She flew her first solo aerobatic flight at the age of 21 in a Pitts S-2B, also becoming the first Turkish female pilot to fly this type of aircraft solo. Semin Öztürk Şener is following in her father’s footsteps.",
      ],
    },
  },
  {
    paragraphs: {
      tr: [
        "İlk hava gösterisini 19 Eylül 2015’te S.H.M.'de düzenlenen SHG Airshow 2015’te gerçekleştiren genç akrobasi pilotu, İtalyan çikolata markası Pernigotti’nin Türkiye’deki başarılı iş kadınları ile çektiği reklam filminde rol aldı.",
        "8 Mart 2016 Dünya Kadınlar Günü'nde, Cumhurbaşkanlığı Sarayı'nda tertip edilen özel resepsiyona davet edildi. Bu davette mesleği ile ön plana geçen kadınlar arasında yerini aldı. Yine Dünya Kadınlar Günü vesilesi ile Mart 2018’de, Cumhurbaşkanlığı Sarayı’nda Sayın Emine Erdoğan Hanımefendi’nin verdiği yemek davetinde bulundu. 2016 yılında TUSAŞ Uçuş Okulu'nda PPL(H) Özel Helikopter Pilot Yetiştirme Kursu’nu başarıyla tamamlayarak Türkiye'nin İlk Sivil Kadın Helikopter Pilotu oldu.",
        "2017 yılında Koç Grubu’nun çektiği “10 Kasım Atatürk’ü Anma” reklam filminde akrobasi uçağı ile rol aldı. Aynı yıl İngiltere’de bulunan Advance Helicopter Uçuş Okulu’ndaki sınavı geçerek, Türkiye’nin ilk MD-500 lisansına sahip kadın helikopter pilotu oldu.",
      ],
      en: [
        "The young aerobatic pilot performed her first airshow on September 19, 2015, at SHG Airshow 2015, held at the Sivrihisar Aviation Center (SHM). She then appeared in a commercial by Italian chocolate brand Pernigotti, filmed with successful businesswomen from Türkiye.",
        "On International Women’s Day, March 8, 2016, she was invited to a special reception at the Presidential Palace, taking her place among women who stand out in their professions. Again on the occasion of International Women’s Day, in March 2018 she attended a dinner hosted by Mrs. Emine Erdoğan at the Presidential Palace. In 2016, she successfully completed the PPL(H) Private Helicopter Pilot Course at the TUSAŞ Flight School, becoming Türkiye’s first civilian female helicopter pilot.",
        "In 2017, she appeared with her aerobatic aircraft in Koç Group’s commemorative film “November 10: Remembering Atatürk.” That same year, she passed her exam at Advance Helicopters flight school in England, becoming Türkiye’s first female helicopter pilot to hold an MD-500 license.",
      ],
    },
    photos: [
      {
        src: "/images/hakkinda/pernigotti-dergi.jpg",
        alt: { tr: "Pernigotti reklamı dergilerde", en: "Pernigotti advertisement in magazines" },
        caption: { tr: "Pernigotti Reklamı", en: "Pernigotti Advertisement" },
        sub: { tr: "Çeşitli Dergilerde", en: "In Various Magazines" },
        aspect: 484 / 656,
      },
      {
        src: "/images/hakkinda/md500-tip-egitimi.jpg",
        alt: { tr: "MD-500 tip eğitimi", en: "MD-500 type training" },
        caption: { tr: "MD-500 tip eğitimi", en: "MD-500 type training" },
        sub: { tr: "Advance Helicopters - İngiltere", en: "Advance Helicopters - England" },
        aspect: 810 / 518,
      },
    ],
  },
  {
    paragraphs: {
      tr: [
        "2018 yılında ilk yurtdışı gösterisini Aeromania 2018'de gerçekleştirdi ve Romanya Büyükelçisi Sayın Osman Koray Ertaş'ın bizzat teşrif ettiği airshow'da Türk Bayrağını gururla sallandırdı. Aynı yıl Amerika Birleşik Devletleri'nin Colorado eyaletinin Denver şehrindeki \"Wings Over the Rockies Air & Space Museum\" 'da 100. yıl kutlamaları sebebiyle 4.3 metre x 5.5 ebadındaki akrobasi sırasında çekilmiş fotoğrafı müze duvarına asıldı ve Türkiye'mizi gerçek anlamda temsil etti.",
        "2020 yılında Unilever'in Arjantin, Filipinler, Malezya, Meksika, Uruguay, Tayland ve Türkiye'yi içeren Uzakdoğu, Latin Amerika ve Ortadoğu ülkelerinde gösterilen reklam filmlerinde yer aldı.",
      ],
      en: [
        "In 2018, she performed her first display abroad at Aeromania 2018, proudly flying the Turkish flag at an airshow personally attended by Türkiye’s Ambassador to Romania, H.E. Osman Koray Ertaş. That same year, as part of its 100th anniversary celebrations, the \"Wings Over the Rockies Air & Space Museum\" in Denver, Colorado, hung a 4.3 m × 5.5 m photograph of her, taken during an aerobatic display, on the museum wall, truly representing Türkiye.",
        "In 2020, she featured in Unilever commercials aired across the Far East, Latin America and the Middle East, in countries including Argentina, the Philippines, Malaysia, Mexico, Uruguay, Thailand and Türkiye.",
      ],
    },
    photos: [
      {
        src: "/images/hakkinda/aeromania-romanya-afis.jpg",
        alt: { tr: "Aeromania 2018 afişi", en: "Aeromania 2018 poster" },
        caption: { tr: "İlk Yurtdışı Akrobasi Gösterisi", en: "First Aerobatic Display Abroad" },
        sub: { tr: "Aeromania - Romanya", en: "Aeromania - Romania" },
        aspect: 460 / 656,
      },
      {
        src: "/images/hakkinda/unilever-reklam-filmi.png",
        alt: { tr: "Unilever reklam filminden kare", en: "Still from the Unilever commercial" },
        caption: { tr: "Unilever reklam filmi", en: "Unilever commercial" },
        aspect: 810 / 450,
      },
    ],
  },
  {
    paragraphs: {
      tr: [
        "Ayrıca, Boeing Stearman E-75 ve Mustang P-51 gibi çok özel uçaklarla uçmuş ve uçuş tecrübesini geliştirmiştir. Semin henüz çok genç olmasına rağmen, ülkemiz havacılığı için birçok ilki gerçekleştirmiştir.",
      ],
      en: [
        "She has also flown very special aircraft such as the Boeing Stearman E-75 and the P-51 Mustang, further broadening her flight experience. Though still very young, Semin has already achieved many firsts for Turkish aviation.",
      ],
    },
    photos: [
      {
        src: "/images/hakkinda/texan.jpg",
        alt: { tr: "Semin Öztürk Şener T-6 Texan kokpitinde", en: "Semin Öztürk Şener in the cockpit of a T-6 Texan" },
        aspect: 1,
      },
      {
        src: "/images/hakkinda/boeing-stearman.jpg",
        alt: { tr: "Semin Öztürk Şener Boeing Stearman ile", en: "Semin Öztürk Şener with a Boeing Stearman" },
        aspect: 960 / 638,
      },
      {
        src: "/images/hakkinda/uh-1h-helikopter.jpg",
        alt: { tr: "Semin Öztürk Şener UH-1H helikopterinde", en: "Semin Öztürk Şener in a UH-1H helicopter" },
        aspect: 1,
      },
    ],
  },
  {
    paragraphs: {
      tr: [
        "2022 yılında gösterilerine devam eden Semin Öztürk Şener, İzmir'in düşman işgalinden kurtuluşunun 100. yılında düzenlenen gösterilerde İzmir Körfezinde 2 Milyon seyirci ile buluştu. Ardından SHG Airshow ve İstanbul'da 100.000'i aşkın seyircinin önünde yaptığı gösterilerle \"Etkinlik Takvimini\" tamamladı.",
        "2022 yılı sonunda Semin Öztürk Şener, babası Ali İsmet Öztürk ve ekibi tarafından tasarlanan ve dünyanın en gelişmiş akrobasi uçaklarından biri olan \"Efsanevi Mor Menekşe\" ile uçmaya başlayarak, babasından bayrağı devraldı. Mor Menekşe, Mak Teknik'in özverili ve detaylı çalışmalarıyla, kapsamlı bir bakımdan geçti ve görüntüsü tamamen değişerek \"Yeni Menekşe\" ismini aldı.",
        "2023 yılında \"Yeni Menekşe\" ile ilk uluslararası gösterisini Almanya'da Flugtage Bautzen'de yaparak ülkemizi başarı ile temsil etti.",
      ],
      en: [
        "Continuing her displays in 2022, Semin Öztürk Şener performed for 2 million spectators over the Gulf of Izmir at the shows marking the 100th anniversary of Izmir’s liberation from enemy occupation. She then completed her events calendar with displays at SHG Airshow and in Istanbul, in front of more than 100,000 spectators.",
        "At the end of 2022, Semin Öztürk Şener took over the flag from her father, beginning to fly the \"Legendary Mor Menekşe\" (Purple Violet), designed by her father Ali Ismet Öztürk and his team and one of the most advanced aerobatic aircraft in the world. Thanks to the dedicated and meticulous work of Mak Teknik, Mor Menekşe underwent a comprehensive overhaul; its look was completely transformed and it was renamed \"Yeni Menekşe\" (New Violet).",
        "In 2023, she flew her first international display with \"Yeni Menekşe\" at Flugtage Bautzen in Germany, successfully representing Türkiye.",
      ],
    },
    photos: [
      {
        src: "/images/hakkinda/image00007.jpg",
        alt: { tr: "Semin Öztürk Şener gösteri uçuşunda", en: "Semin Öztürk Şener during a display flight" },
        aspect: 505 / 341,
      },
    ],
  },
];


// Fotoğraflar büyük ve kırpılmadan; iki fotoğraf varsa üstte ve altta, altlarında eski sitedeki açıklama.
// Ekran yüksekliğini aşmasınlar diye en fazla yükseklik sınırı var (tek: 78vh, iki: 40vh).
const PhotoStack: React.FC<{ photos: ChapterPhoto[] }> = ({ photos }) => {
  const lang = useLang();
  return photos.length >= 3 ? (
    // Üç fotoğraf: ilki üstte büyük, diğerleri altında yan yana aynı yükseklikte
    <div className="flex flex-col gap-4">
      <div data-reveal-img className="overflow-hidden">
        <img src={photos[0].src} alt={pick(photos[0].alt, lang)} loading="lazy" className="block w-full h-auto border border-black/10 shadow-xl" />
      </div>
      <div className="flex items-start gap-4">
        {photos.slice(1).map((ph, k) => (
          <div key={ph.src} data-reveal-img data-reveal-delay={String(k + 1)} style={{ flex: `${ph.aspect} 1 0%`, minWidth: 0 }} className="overflow-hidden">
            <img src={ph.src} alt={pick(ph.alt, lang)} loading="lazy" className="block w-full h-auto border border-black/10 shadow-xl" />
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
              alt={pick(ph.alt, lang)}
              loading="lazy"
              className={`block w-auto h-auto max-w-full border border-black/10 shadow-xl ${photos.length > 1 ? "lg:max-h-[40vh]" : "lg:max-h-[78vh]"}`}
            />
          </div>
          {ph.caption && (
            <figcaption className="mt-3">
              <span className="block text-[#181210] font-black italic text-sm">{pick(ph.caption, lang)}</span>
              {ph.sub && <span className="block text-gray-500 text-sm font-medium mt-0.5">{pick(ph.sub, lang)}</span>}
            </figcaption>
          )}
        </figure>
      );
    })}
  </div>
);
};

// Her metin bölümü kendi fotoğraflarıyla aynı satırda: fotoğraf solda, metin sağda — hep paralel.
// Hangisi kısaysa (metin ya da fotoğraflar) diğeri bitene kadar yanında sabit kalır (satır içi sticky).
const About: React.FC = () => {
  const lang = useLang();
  const t = useT();
  return (
    <section id="about" className="py-24 bg-background-light">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <SectionHeader title={t("Hakkında", "About")} />

        <div className="flex flex-col gap-16 lg:gap-24 mt-4">
          {chapters.map((ch, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-6 lg:sticky lg:top-28 self-start">
                {ch.photos ? (
                  <PhotoStack photos={ch.photos} />
                ) : (
                  // Fotoğrafı olmayan ilk bölüm: eski sitedeki başlık
                  <p data-reveal className="font-black italic text-[#181210] leading-[1.05] text-3xl md:text-5xl">
                    {t(
                      <>Türkiye'nin İlk Profesyonel <span className="text-[#E02F3C]">Kadın Akrobasi Pilotu</span></>,
                      <>Türkiye's First Professional <span className="text-[#E02F3C]">Female Aerobatic Pilot</span></>
                    )}
                  </p>
                )}
              </div>
              <div className="lg:col-span-6 space-y-5 lg:sticky lg:top-28 self-start" data-reveal>
                {pick(ch.paragraphs, lang).map((text, k) => (
                  <p key={k} className="text-gray-700 text-lg leading-relaxed">{text}</p>
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
