import React from "react";
import { SectionHeader, Card, AnimatedSection } from "./ui";

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background-light">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <SectionHeader title="About" />
        </AnimatedSection>

        {/* Main Title */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-black italic text-[#E02F3C] uppercase leading-tight">
            Türkiye'nin İlk Profesyonel Kadın Akrobasi Pilotu
          </h3>
        </div>

        {/* Biography Content */}
        <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-medium">
          <p>
            1991 doğumlu olan Semin Öztürk Şener <strong>Türkiye'nin İLK Profesyonel Kadın Akrobasi Pilotudur</strong>. Semin, ilk akrobasi uçuşunu henüz 12 yaşındayken, babası Milli Akrobasi Pilotu Ali İsmet Öztürk ile birlikte gerçekleştirdi. Liseyi Saint-Michel Fransız Lisesi'nde, üniversiteyi ise İstanbul Üniversitesi'nde okudu. Üniversite 2. sınıftayken Ayjet Uçuş Okulu sponsorluğunda Hususi Pilot Lisansı'nı (PPL) aldı. Daha sonra Amerika'ya giderek Kaliforniya eyaletinde bulunan Tutima Academy of Aviation Safety'de akrobasi uçuş eğitimini tamamladı. İlk yalnız akrobasi uçuşunu 21 yaşındayken Pitts S-2B uçağıyla yaptı. Böylelikle bu tip uçakla ilk yalnız uçan Türk Kadın Pilotu ünvanını da aldı. Semin Öztürk Şener, babasının yolundan gitmektedir.
          </p>

          <p>
            İlk hava gösterisini 19 Eylül 2015'te S.H.M.'de düzenlenen SHG Airshow 2015'te gerçekleştiren genç akrobasi pilotu, İtalyan çikolata markası Pernigotti'nin Türkiye'deki başarılı iş kadınları ile çektiği reklam filminde rol aldı.
          </p>

          <p>
            8 Mart 2016 Dünya Kadınlar Günü'nde, Cumhurbaşkanlığı Sarayı'nda tertip edilen özel resepsiyona davet edildi. Bu davette mesleği ile ön plana geçen kadınlar arasında yerini aldı. Yine Dünya Kadınlar Günü vesilesi ile Mart 2018'de, Cumhurbaşkanlığı Sarayı'nda Sayın Emine Erdoğan Hanımefendi'nin verdiği yemek davetinde bulundu.
          </p>

          <p>
            2016 yılında TUSAŞ Uçuş Okulu'nda PPL(H) Özel Helikopter Pilot Yetiştirme Kursu'nu başarıyla tamamlayarak <strong>Türkiye'nin İlk Sivil Kadın Helikopter Pilotu</strong> oldu.
          </p>

          <p>
            2017 yılında Koç Grubu'nun çektiği "10 Kasım Atatürk'ü Anma" reklam filminde akrobasi uçağı ile rol aldı. Aynı yıl İngiltere'de bulunan Advance Helicopter Uçuş Okulu'ndaki sınavı geçerek, <strong>Türkiye'nin ilk MD-500 lisansına sahip kadın helikopter pilotu</strong> oldu.
          </p>

          <p>
            2018 yılında ilk yurtdışı gösterisini Aeromania 2018'de gerçekleştirdi ve Romanya Büyükelçisi Sayın Osman Koray Ertaş'ın bizzat teşrif ettiği airshow'da Türk Bayrağını gururla sallandırdı. Aynı yıl ABD Colorado Denver'daki "Wings Over the Rockies Air & Space Museum"'da 100. yıl kutlamaları sebebiyle 4.3m x 5.5m ebadındaki fotoğrafı müze duvarına asıldı.
          </p>

          <p>
            2020 yılında Unilever'in Arjantin, Filipinler, Malezya, Meksika, Uruguay, Tayland ve Türkiye'yi içeren reklam filmlerinde yer aldı. Ayrıca, Boeing Stearman E-75 ve Mustang P-51 gibi çok özel uçaklarla uçmuş ve uçuş tecrübesini geliştirmiştir.
          </p>

          <p>
            2022 yılında İzmir'in düşman işgalinden kurtuluşunun 100. yılında düzenlenen gösterilerde İzmir Körfezinde 2 Milyon seyirci ile buluştu. Ardından SHG Airshow ve İstanbul'da 100.000'i aşkın seyircinin önünde yaptığı gösterilerle "Etkinlik Takvimini" tamamladı.
          </p>

          <p>
            2022 yılı sonunda babası Ali İsmet Öztürk ve ekibi tarafından tasarlanan "Efsanevi Mor Menekşe" ile uçmaya başlayarak babasından bayrağı devraldı. Mor Menekşe, Mak Teknik'in özverili ve detaylı çalışmalarıyla kapsamlı bir bakımdan geçti ve görüntüsü tamamen değişerek "Yeni Menekşe" ismini aldı.
          </p>

          <p>
            2023 yılında "Yeni Menekşe" ile ilk uluslararası gösterisini Almanya'da Flugtage Bautzen'de yaparak ülkemizi başarı ile temsil etti.
          </p>
        </div>

        {/* Achievements Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedSection delay={0}>
            <Card variant="achievement" title="İlk">
              Türkiye'nin İlk Profesyonel Kadın Akrobasi Pilotu
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <Card variant="achievement" title="İlk">
              Türkiye'nin İlk Sivil Kadın Helikopter Pilotu
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <Card variant="achievement" title="İlk">
              Türkiye'nin İlk MD-500 Lisanslı Kadın Helikopter Pilotu
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
