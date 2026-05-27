import React, { useState } from "react";
import { MapPin, Phone, Mail, Radio, Plane, Clock, Loader2 } from "lucide-react";
import { SectionHeader, Card, AnimatedSection } from "./ui";
import { FormStatus } from "../types";

const subjects = [
  "Genel Bilgi",
  "Akrobasi Tanıtım Uçuşu",
  "Basın & Medya",
  "Sponsorluk",
  "Etkinlik Katılımı",
  "Diğer",
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Genel Bilgi",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMessage("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
      } else {
        setStatus("error");
        setFeedbackMessage(data.error || "Bir hata oluştu.");
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  const handleReset = () => {
    setFormState({
      name: "",
      email: "",
      phone: "",
      subject: "Genel Bilgi",
      message: "",
    });
    setStatus("idle");
    setFeedbackMessage("");
  };
  return (
    <section id="contact" className="py-24 bg-background-light">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <SectionHeader title="İletişim" />
        </AnimatedSection>

        {/* Location Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <AnimatedSection delay={0}>
            <h3 className="text-2xl font-black italic text-[#E02F3C] uppercase mb-8">
              Sivrihisar Havacılık Merkezi (SHM)
            </h3>
            <div className="space-y-6">
              <Card variant="info" title="Adres" icon={<MapPin className="w-6 h-6" />}>
                Sivrihisar Havacılık Merkezi<br />
                Yeşilköy Mah. 26600<br />
                Sivrihisar / Eskişehir / TÜRKİYE
              </Card>

              <Card variant="info" title="Kule Frekansı" icon={<Radio className="w-6 h-6" />}>
                Artan Kule - 131,625 MHz
              </Card>

              <Card variant="info" title="Pist Bilgileri" icon={<Plane className="w-6 h-6" />}>
                Pist Yönleri: 05 – 23<br />
                Pist Uzunluğu: 1810 x 32 m (Asfalt)<br />
                Rakım: 2790 Feet
              </Card>

              <Card variant="info" title="Çalışma Saatleri" icon={<Clock className="w-6 h-6" />}>
                Salı – Pazar, 09:00 – Gün batımı
              </Card>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h3 className="text-2xl font-black italic text-[#E02F3C] uppercase mb-8">
              İletişim Bilgileri
            </h3>
            <div className="space-y-6">
              <Card variant="info" title="E-posta" icon={<Mail className="w-6 h-6" />}>
                <a
                  href="mailto:semin.ozturk@acromach.com"
                  className="hover:text-[#E02F3C] transition-colors"
                >
                  semin.ozturk@acromach.com
                </a>
              </Card>

              <Card variant="info" title="Telefon" icon={<Phone className="w-6 h-6" />}>
                <div className="space-y-1">
                  <a
                    href="tel:02227243031"
                    className="block hover:text-[#E02F3C] transition-colors"
                  >
                    0222 724 30 31
                  </a>
                  <a
                    href="tel:02227243032"
                    className="block hover:text-[#E02F3C] transition-colors"
                  >
                    0222 724 30 32
                  </a>
                </div>
              </Card>
            </div>

            {/* Coordinates */}
            <div className="mt-8">
              <Card variant="achievement" title="Koordinatlar">
                N 39°17'59.29" — E 31°29'38.50'
              </Card>
            </div>
          </AnimatedSection>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-[#E02F3C] p-8 md:p-12">
          <h3 className="text-3xl font-black italic text-white uppercase mb-2 text-center">
            Birlikte Uçmak İster Misiniz?
          </h3>
          <p className="text-white/80 font-medium mb-8 max-w-2xl mx-auto text-center">
            Akrobasi tanıtım uçuşları için bizimle iletişime geçin.
            Uçuşlar S.H.M.'de (Sivrihisar Havacılık Merkezi) yapılmaktadır.
          </p>

          {status === "success" ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-300 mb-3">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl font-black italic text-white mb-6">{feedbackMessage}</p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-block bg-white text-[#E02F3C] px-8 py-3 font-black italic text-sm uppercase tracking-wider transition-all hover:bg-gray-100 shadow-lg"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    placeholder="Ad Soyad *"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all font-bold disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    placeholder="E-posta *"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all font-bold disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="Telefon"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all font-bold disabled:opacity-50"
                  />
                </div>
                <div>
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all font-bold disabled:opacity-50 appearance-none"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s} className="text-[#181210] bg-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  rows={5}
                  placeholder="Mesajınız *"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all font-bold resize-none disabled:opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-[#E02F3C] px-8 py-4 font-black italic text-lg uppercase tracking-wider transition-all hover:bg-gray-100 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Gönder"
                )}
              </button>
              {status === "error" && (
                <p className="text-white mt-4 text-sm font-bold text-center">
                  {feedbackMessage}
                </p>
              )}
            </form>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-white/20">
            <a
              href="mailto:semin.ozturk@acromach.com"
              className="inline-block bg-white/10 border border-white/30 text-white px-6 py-3 font-black italic text-sm uppercase tracking-wider transition-all hover:bg-white/20 text-center"
            >
              E-posta Gönder
            </a>
            <a
              href="tel:02227243031"
              className="inline-block bg-white/10 border border-white/30 text-white px-6 py-3 font-black italic text-sm uppercase tracking-wider transition-all hover:bg-white/20 text-center"
            >
              Ara: 0222 724 30 31
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
