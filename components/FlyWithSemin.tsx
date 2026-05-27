import React from "react";
import { Plane, Video, Calendar, Mail, Clock, MapPin, Award } from "lucide-react";

const FlyWithSemin: React.FC = () => {
  return (
    <section id="fly" className="py-24 bg-[#23130F]">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-2 bg-[#E02F3C] transform skew-x-[-15deg] shadow-[0_0_15px_#E02F3C]"></div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
            Uçmak İster Misiniz?
          </h2>
        </div>

        {/* Main Title */}
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-black italic text-[#E02F3C] uppercase leading-tight">
            Semin Öztürk Şener ile Uçmak İster Misiniz?
          </h3>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Konum</h4>
            </div>
            <p className="text-gray-300 font-medium">S.H.M. - Sivrihisar Havacılık Merkezi</p>
            <p className="text-gray-400 text-sm">Ankara'ya yaklaşık 100 km mesafede</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Süre</h4>
            </div>
            <p className="text-gray-300 font-medium">12/15 dakika</p>
            <p className="text-gray-400 text-sm">Uçuş süresi</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Video className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Kayıt</h4>
            </div>
            <p className="text-gray-300 font-medium">Video kayıt</p>
            <p className="text-gray-400 text-sm">USB formatında teslim</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-[#E02F3C]" />
              <h4 className="text-white font-black italic uppercase">Sertifika</h4>
            </div>
            <p className="text-gray-300 font-medium">Akrobasi Sertifikası</p>
            <p className="text-gray-400 text-sm">Uçuş sonrası takdim</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h4 className="text-2xl font-black italic text-white uppercase">Nasıl Çalışır?</h4>
            <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                Akrobasi Tanıtım Uçuşları'nı S.H.M.'de yani Sivrihisar Havacılık Merkezi'nde yapıyoruz. (Ankara'ya yaklaşık 100 km mesafedeyiz).
              </p>
              <p>
                Uçuşlar 12/15 dakika kadar oluyor ve bir kamera ile ses/görüntü olarak kaydediliyor. Uçuştan sonra kayıt USB formatında size veriliyor ve yanında Akrobasi Sertifikası takdim ediliyor.
              </p>
              <p>
                Pazartesi hariç her gün uçuş imkanı var.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-black italic text-white uppercase">Rezervasyon</h4>
            <div className="space-y-4 text-gray-300 leading-relaxed font-medium">
              <p>
                Uçmak istediğiniz tarih ve saati <strong>semin.ozturk@acromach.com</strong> mail adresine bildiriyorsunuz, ona göre planlama yapıyoruz.
              </p>
              <div className="bg-[#E02F3C] p-6 mt-6">
                <p className="text-white font-black italic text-xl uppercase text-center">
                  Birlikte dünyayı ters düz etmek üzere…
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="mailto:semin.ozturk@acromach.com"
            className="inline-block bg-[#E02F3C] hover:bg-[#FF4D5A] text-white px-12 py-6 rounded font-black italic text-xl uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(224,47,60,0.5)] hover:shadow-[0_0_35px_rgba(224,47,60,0.7)]"
          >
            Randevu Talep Et
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlyWithSemin;
