import React, { useState } from "react";
import { Loader2, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./ui";
import { FormStatus } from "../types";

const subjects = ["Genel Bilgi", "Akrobasi Tanıtım Uçuşu", "Basın & Medya", "Sponsorluk", "Etkinlik Katılımı", "Diğer"];

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
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: "Genel Bilgi", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        setFeedbackMessage("Mesajınız gönderildi. En kısa sürede dönüş yapacağız.");
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
    setFormState({ name: "", email: "", phone: "", subject: "Genel Bilgi", message: "" });
    setStatus("idle");
    setFeedbackMessage("");
  };

  const inputCls =
    "w-full bg-white border border-ink/15 px-4 py-3.5 text-ink placeholder-ink/40 font-light focus:outline-none focus:border-ink transition-colors disabled:opacity-50";

  return (
    <section id="contact" className="py-28 md:py-36 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
        <SectionHeader eyebrow="İletişim" title="İletişim" subtitle="Akrobasi tanıtım uçuşları, basın ve iş birlikleri için bize yazın." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Bilgiler */}
          <div className="lg:col-span-5" data-reveal>
            <h3 className="font-black italic uppercase text-ink text-2xl">Sivrihisar Havacılık Merkezi (SHM)</h3>
            <p className="text-ink/55 font-light mt-1 mb-8">Necati Artan Tesisleri</p>
            {infoLeft.map((item, i) => (
              <div key={i} className={`py-5 border-ink/10 ${i !== 0 ? "border-t" : ""}`}>
                <span className="block text-ink/45 text-[11px] tracking-[0.25em] uppercase mb-1.5">{item.label}</span>
                <span className="block text-ink/80 font-light leading-relaxed whitespace-pre-line">{item.value}</span>
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a href="mailto:semin.ozturk@acromach.com" className="group inline-flex items-center gap-2 text-ink text-[13px] tracking-[0.1em] font-medium border-b border-ink/25 hover:border-primary pb-1 self-start transition-colors">
                semin.ozturk@acromach.com <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="tel:02227243031" className="text-ink/60 hover:text-ink font-light transition-colors self-start">
                0222 724 30 31
              </a>
              <a href="tel:02227243032" className="text-ink/60 hover:text-ink font-light transition-colors self-start">
                0222 724 30 32
              </a>
            </div>

            {/* Eski siteden: S.H.M. yol tarifi haritası — tıklayınca tam boy açılır */}
            <a href="/images/iletisim/shm-yol-haritasi.jpg" target="_blank" rel="noopener noreferrer" className="block mt-10 border border-ink/10" aria-label="S.H.M. yol tarifi haritasını tam boy aç">
              <img src="/images/iletisim/shm-yol-haritasi.jpg" alt="Sivrihisar Havacılık Merkezi yol tarifi haritası" className="w-full h-auto block" loading="lazy" />
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-7" data-reveal data-reveal-delay="2">
            {status === "success" ? (
              <div className="border border-ink/15 bg-white p-12 text-center">
                <p className="font-black italic text-ink text-2xl mb-6">{feedbackMessage}</p>
                <button onClick={handleReset} className="border border-ink/25 hover:bg-ink hover:text-paper text-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase font-medium transition-colors">
                  Yeni Mesaj
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" name="name" value={formState.name} onChange={handleChange} required disabled={status === "loading"} placeholder="Ad Soyad *" className={inputCls} />
                  <input type="email" name="email" value={formState.email} onChange={handleChange} required disabled={status === "loading"} placeholder="E-posta *" className={inputCls} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="tel" name="phone" value={formState.phone} onChange={handleChange} disabled={status === "loading"} placeholder="Telefon" className={inputCls} />
                  <select name="subject" value={formState.subject} onChange={handleChange} disabled={status === "loading"} className={`${inputCls} appearance-none`}>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <textarea name="message" value={formState.message} onChange={handleChange} required disabled={status === "loading"} rows={6} placeholder="Mesajınız *" className={`${inputCls} resize-none mb-4`}></textarea>
                <button type="submit" disabled={status === "loading"} className="w-full bg-primary text-white py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#c91f2b] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gönder"}
                </button>
                {status === "error" && <p className="text-primary mt-4 text-sm font-medium text-center">{feedbackMessage}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
