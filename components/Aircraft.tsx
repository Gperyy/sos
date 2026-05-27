import React from "react";
import { Plane, Settings, Gauge, Wind } from "lucide-react";

const Aircraft: React.FC = () => {
  return (
    <section id="aircraft" className="py-24 bg-surface-dark">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_#E02F3C]"></div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
            Uçağım
          </h2>
        </div>

        {/* Main Title */}
        <div className="mb-12">
          <h3 className="text-4xl md:text-5xl font-black italic text-[#E02F3C] uppercase leading-tight">
            Yeni Menekşe
          </h3>
        </div>

        {/* Technical Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Gauge className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Güç</h4>
            </div>
            <p className="text-gray-300 font-medium">400 HP gücünde motor</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Wind className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Hız</h4>
            </div>
            <p className="text-gray-300 font-medium">400 km/saat'i aşan hız</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Plane className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Pervane</h4>
            </div>
            <p className="text-gray-300 font-medium">Kompozit 3 pal pervanesi</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Dayanıklılık</h4>
            </div>
            <p className="text-gray-300 font-medium">+/-10 G'ye dayanıklı</p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h4 className="text-2xl font-black italic text-white uppercase">Teknik Özellikler</h4>
            <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                400 HP gücünde bir motorla donatılan bu uçak, havada kaldığı süre içinde bir bilgisayar yardımı ile sürekli kontrol edilmekte ve herhangi bir anormal durumda pilotu anında haberdar etmektedir.
              </p>
              <p>
                Kompozit bir üretimle yapılan üç pal'li pervanesi sadece akrobasi için dizayn edilmiştir. Bu mükemmel gösteri uçağı zaman zaman 400 km/saat'i aşan bir hızla gösterisini yaparken saatte 38 galon (~152 litre) yakıt ve 45 galon (~180 litre) duman yağı harcamaktadır.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-black italic text-white uppercase">Uçağın Hikayesi</h4>
            <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                Dünyanın en gelişmiş akrobasi uçaklarından biri olan "Yeni Menekşe" tamamen akrobasi için geliştirilmiş, sipariş üzerine yapılmış Pitts tabanlı ancak ondan çok üstün özel üretim bir uçaktır.
              </p>
              <p>
                2003 yılında Ali İsmet Öztürk ve ekibi tarafından üretilmiştir ve "Mor Menekşe" adını almıştır. İmalatı bir yıl sürmüştür. +/-10 G'ye dayanıklıdır.
              </p>
              <p className="border-l-4 border-[#E02F3C] pl-4 italic">
                13 Eylül 2021 tarihinde SHG Airshow'da Ali İsmet Öztürk jübilesini yaptı. Sonra "Efsanevi Mor Menekşe" Mak Teknik'in çalışmalarıyla bakımdan geçti ve dış görünüşü değişti. Artık "Yeni Menekşe" olarak Semin Öztürk Şener ile göklerde devam ediyor.
              </p>
            </div>
          </div>
        </div>

        {/* Ali İsmet Öztürk Section */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <h4 className="text-2xl font-black italic text-white uppercase mb-8">Ali İsmet Öztürk ve Mor Menekşe</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                Ali İsmet Öztürk 2013 yılına kadar 22 ayrı ülkede uçarak, 500'den fazla Airshow organizasyonuna katıldı, 859 gösteri uçuşunu hatasız bitirerek 25 milyondan fazla seyirciye ulaştı. 150.000 km yol kat etti. Her yıl 400'den fazla antrenman uçuşu yaptı.
              </p>
              <p>
                2005'te İngiliz Sivil Havacılık otoritesinden en üst kategoride "Display Authorisation" sertifikası aldı. 2006'da EAC "Sponsorunu En İyi Tanıtan Airshow Pilotu" ödülünü aldı. Avrupa'da birçok kez "Best Solo Display" seçildi.
              </p>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                34 sene boyunca profesyonel havacılıkla iştigal eden Ali İsmet Öztürk, Ticari Helikopter ve Uçak Pilot lisanslarına, çok motorlu uçuş sertifikasına, uçuş öğretmeni ve alet uçuşu sertifikalarına sahip.
              </p>
              <p>
                Aynı zamanda Uçak ve Helikopter bakım teknisyeni lisansına sahip. 50'den fazla hava aracında tecrübesi var. Toplam uçuşu 5500 saatin üzerinde. Halen Sivrihisar Havacılık Merkezinde tecrübesini Türk Gençleriyle paylaşıyor.
              </p>
            </div>
          </div>
        </div>

        {/* Pitts S-2B Info */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <h4 className="text-2xl font-black italic text-white uppercase mb-8">Semin Öztürk Şener ile Akrobasi Tanıtım Uçuşları</h4>
          <div className="bg-white/5 border border-white/10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-[#E02F3C] font-black italic uppercase mb-4">Pitts Special S-2B</h5>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Akrobasi Tanıtım Uçuşları'nda kullanılan Pitts Special S-2B, Lycoming 360 hp motora sahiptir. Aviat'ın en popüler modeli olan S-2B en gelişmiş manevraları yapabilmek için özel olarak tasarlanmıştır. Tasarımı ve çift kanat yapısı ile akrobasiye çok uygundur.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <a
                  href="#fly"
                  className="inline-block bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-8 py-4 rounded font-black italic text-lg uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(224,47,60,0.4)] hover:shadow-[0_0_30px_rgba(224,47,60,0.6)]"
                >
                  Uçmak İster Misiniz?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aircraft;
