import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./ui";
import { FormStatus } from "../types";

const CONTACT_EMAIL = "semin.ozturk@acromach.com";
const subjects = ["Akrobasi Tanıtım Uçuşu", "Basın & Medya", "Sponsorluk"];

// Bilgiler eski siteden (seminozturk.com — İletişim) birebir alınmıştır.
const infoLeft = [
  { label: "Adres", value: "Sivrihisar Havacılık Merkezi\nYeşilköy Mah. 26600\nSivrihisar / Eskişehir / TÜRKİYE" },
  { label: "S.H.M. Koordinatları", value: "N 39°17’59.29”\nE 31°29’38.50′" },
  { label: "Artan Kule", value: "131,625 MHz" },
  { label: "Pist Yönleri", value: "05 – 23" },
  { label: "Pist Uzunluğu", value: "1810 x 32 m (Asfalt)" },
  { label: "Rakım", value: "2790 Feet" },
  { label: "Çalışma Günleri ve Saatleri", value: "Salı – Pazar\n09:00 – Gün batımı" },
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: subjects[0], message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form, ziyaretçinin e-posta uygulamasını bilgileri doldurulmuş bir mesajla açar (sunucu gerekmez).
  // Mesaj ziyaretçinin kendi e-posta adresinden gönderilir; yanıt doğrudan ona yazılabilir.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formState;
    const body = [`Ad Soyad: ${name}`, `E-posta: ${email}`, phone ? `Telefon: ${phone}` : "", "", message]
      .filter((l, i) => l !== "" || i === 3)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${subject} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setStatus("success");
    setFeedbackMessage("E-posta uygulamanız mesajınızla açıldı. Göndermek için orada “Gönder”e basmayı unutmayın.");
  };

  const handleReset = () => {
    setFormState({ name: "", email: "", phone: "", subject: subjects[0], message: "" });
    setStatus("idle");
    setFeedbackMessage("");
  };

  const inputCls =
    "w-full bg-white border border-ink/15 px-4 py-3.5 text-ink placeholder-ink/40 font-light focus:outline-none focus:border-ink transition-colors disabled:opacity-50";

  return (
    <section id="contact" className="py-28 md:py-36 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
        <SectionHeader title="İletişim" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Bilgiler */}
          <div className="lg:col-span-5" data-reveal>
            {infoLeft.map((item, i) => (
              <div key={i} className={`py-5 border-ink/10 ${i !== 0 ? "border-t" : ""}`}>
                <span className="block text-ink/45 text-[11px] tracking-[0.25em] uppercase mb-1.5">{item.label}</span>
                <span className="block text-ink/80 font-light leading-relaxed whitespace-pre-line">{item.value}</span>
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="group inline-flex items-center gap-2 text-ink text-[13px] tracking-[0.1em] font-medium border-b border-ink/25 hover:border-primary pb-1 self-start transition-colors">
                {CONTACT_EMAIL} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="tel:02227243031" className="text-ink/60 hover:text-ink font-light transition-colors self-start">
                0222 724 30 31
              </a>
              <a href="tel:02227243032" className="text-ink/60 hover:text-ink font-light transition-colors self-start">
                0222 724 30 32
              </a>
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-7" data-reveal data-reveal-delay="2">
            {status === "success" ? (
              <div className="border border-ink/15 bg-white p-12 text-center">
                <p className="font-black italic text-ink text-xl leading-snug mb-6">{feedbackMessage}</p>
                <button onClick={handleReset} className="border border-ink/25 hover:bg-ink hover:text-paper text-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase font-medium transition-colors">
                  Yeni Mesaj
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" name="name" value={formState.name} onChange={handleChange} required placeholder="Ad Soyad *" className={inputCls} />
                  <input type="email" name="email" value={formState.email} onChange={handleChange} required placeholder="E-posta *" className={inputCls} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder="Telefon" className={inputCls} />
                  <select name="subject" value={formState.subject} onChange={handleChange} className={`${inputCls} appearance-none`}>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <textarea name="message" value={formState.message} onChange={handleChange} required rows={6} placeholder="Mesajınız *" className={`${inputCls} resize-none mb-4`}></textarea>
                <button type="submit" className="w-full bg-primary text-white py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#c91f2b] transition-colors flex items-center justify-center gap-2">
                  Gönder
                </button>
                <p className="mt-3 text-ink/45 text-xs text-center">Gönder'e basınca e-posta uygulamanız mesajınızla açılır.</p>
              </form>
            )}
          </div>
        </div>

        {/* Eski siteden: S.H.M. yol tarifi haritası — sayfanın ortasında büyük; tıklayınca tam boy açılır */}
        <a
          href="/images/iletisim/shm-yol-haritasi.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-20 md:mt-28 max-w-5xl mx-auto border border-ink/10 shadow-xl"
          aria-label="S.H.M. yol tarifi haritasını tam boy aç"
          data-reveal
        >
          <img src="/images/iletisim/shm-yol-haritasi.jpg" alt="Sivrihisar Havacılık Merkezi yol tarifi haritası" className="w-full h-auto block" loading="lazy" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
