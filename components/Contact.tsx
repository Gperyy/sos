import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader, useLang, useT, pick } from "./ui";
import type { Tx } from "./ui";
import { FormStatus } from "../types";

const CONTACT_EMAIL = "semin.ozturk@acromach.com";
// Konu, dil değişse de seçili kalsın diye sırasıyla (index) tutulur
const subjects: Tx[] = [
  { tr: "Akrobasi Tanıtım Uçuşu", en: "Aerobatic Experience Flight" },
  { tr: "Basın & Medya", en: "Press & Media" },
  { tr: "Sponsorluk", en: "Sponsorship" },
];

// Bilgiler eski siteden (seminozturk.com — İletişim) birebir alınmıştır.
const infoLeft: { label: Tx; value: Tx }[] = [
  {
    label: { tr: "Adres", en: "Address" },
    value: {
      tr: "Sivrihisar Havacılık Merkezi\nYeşilköy Mah. 26600\nSivrihisar / Eskişehir / TÜRKİYE",
      en: "Sivrihisar Aviation Center\nYeşilköy Mah. 26600\nSivrihisar / Eskişehir / TÜRKIYE",
    },
  },
  { label: { tr: "S.H.M. Koordinatları", en: "S.H.M. Coordinates" }, value: { tr: "N 39°17’59.29”\nE 31°29’38.50′", en: "N 39°17’59.29”\nE 31°29’38.50′" } },
  { label: { tr: "Artan Kule", en: "Artan Tower" }, value: { tr: "131,625 MHz", en: "131.625 MHz" } },
  { label: { tr: "Pist Yönleri", en: "Runway Directions" }, value: { tr: "05 – 23", en: "05 – 23" } },
  { label: { tr: "Pist Uzunluğu", en: "Runway Length" }, value: { tr: "1810 x 32 m (Asfalt)", en: "1810 x 32 m (Asphalt)" } },
  { label: { tr: "Rakım", en: "Elevation" }, value: { tr: "2790 Feet", en: "2790 ft" } },
  {
    label: { tr: "Çalışma Günleri ve Saatleri", en: "Operating Days and Hours" },
    value: { tr: "Salı – Pazar\n09:00 – Gün batımı", en: "Tuesday – Sunday\n09:00 – Sunset" },
  },
];

const Contact: React.FC = () => {
  const lang = useLang();
  const t = useT();
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: "0", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form, ziyaretçinin e-posta uygulamasını bilgileri doldurulmuş bir mesajla açar (sunucu gerekmez).
  // Mesaj ziyaretçinin kendi e-posta adresinden gönderilir; yanıt doğrudan ona yazılabilir.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formState;
    const subject = pick(subjects[Number(formState.subject)] ?? subjects[0], lang);
    const body = [
      `${t("Ad Soyad", "Name")}: ${name}`,
      `${t("E-posta", "Email")}: ${email}`,
      phone ? `${t("Telefon", "Phone")}: ${phone}` : "",
      "",
      message,
    ]
      .filter((l, i) => l !== "" || i === 3)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${subject} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setStatus("success");
    setFeedbackMessage(
      t(
        "E-posta uygulamanız mesajınızla açıldı. Göndermek için orada “Gönder”e basmayı unutmayın.",
        "Your email app has opened with your message. Don’t forget to press “Send” there."
      )
    );
  };

  const handleReset = () => {
    setFormState({ name: "", email: "", phone: "", subject: "0", message: "" });
    setStatus("idle");
    setFeedbackMessage("");
  };

  const inputCls =
    "w-full bg-white border border-ink/15 px-4 py-3.5 text-ink placeholder-ink/40 font-light focus:outline-none focus:border-ink transition-colors disabled:opacity-50";

  return (
    <section id="contact" className="py-28 md:py-36 bg-paper">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-9">
        <SectionHeader title={t("İletişim", "Contact")} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Bilgiler */}
          <div className="lg:col-span-5" data-reveal>
            {infoLeft.map((item, i) => (
              <div key={i} className={`py-5 border-ink/10 ${i !== 0 ? "border-t" : ""}`}>
                <span className="block text-ink/45 text-[11px] tracking-[0.25em] uppercase mb-1.5">{pick(item.label, lang)}</span>
                <span className="block text-ink/80 font-light leading-relaxed whitespace-pre-line">{pick(item.value, lang)}</span>
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
                  {t("Yeni Mesaj", "New Message")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" name="name" value={formState.name} onChange={handleChange} required placeholder={t("Ad Soyad *", "Full Name *")} className={inputCls} />
                  <input type="email" name="email" value={formState.email} onChange={handleChange} required placeholder={t("E-posta *", "Email *")} className={inputCls} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder={t("Telefon", "Phone")} className={inputCls} />
                  <select name="subject" value={formState.subject} onChange={handleChange} className={`${inputCls} appearance-none`}>
                    {subjects.map((s, i) => (
                      <option key={s.tr} value={String(i)}>{pick(s, lang)}</option>
                    ))}
                  </select>
                </div>
                <textarea name="message" value={formState.message} onChange={handleChange} required rows={6} placeholder={t("Mesajınız *", "Your Message *")} className={`${inputCls} resize-none mb-4`}></textarea>
                <button type="submit" className="w-full bg-primary text-white py-4 text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#c91f2b] transition-colors flex items-center justify-center gap-2">
                  {t("Gönder", "Send")}
                </button>
                <p className="mt-3 text-ink/45 text-xs text-center">
                  {t("Gönder'e basınca e-posta uygulamanız mesajınızla açılır.", "Pressing Send opens your email app with your message.")}
                </p>
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
          aria-label={t("S.H.M. yol tarifi haritasını tam boy aç", "Open the S.H.M. directions map in full size")}
          data-reveal
        >
          <img src="/images/iletisim/shm-yol-haritasi.jpg" alt={t("Sivrihisar Havacılık Merkezi yol tarifi haritası", "Directions map to Sivrihisar Aviation Center")} className="w-full h-auto block" loading="lazy" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
