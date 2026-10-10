# UX & Tasarım Anayasası — Semin Öztürk Şener

Bu belge tasarım/UX kararlarında **ortak rehberimizdir**. Yeni bir bölüm eklerken
önce buraya bakarız; kuralı değiştirmeden önce burada güncelleriz.

> **Yön:** Minimal, sinematik, editoryal. İlham: charlesleclerc.com, cristianoronaldo.com.
> **His:** Kısıtlamayla lüks — az ama kusursuz. Sakin, prestijli, nefes alan.
> Türkiye'nin ilk profesyonel kadın akrobasi pilotunun gerçek markası; "efekt" değil *işçilik*.

---

## 1. Renk & zemin
- Palet: **ink `#0b0b0d`** (neredeyse siyah) ve **paper `#f4f1ec`** (sıcak kırık beyaz).
- Bölümler **açık/koyu dönüşümlü** gelir → sinematik ritim.
- **Kırmızı `#E02F3C` çok az** kullanılır: kısa bir çizgi, aktif sekme altı, minik vurgu.
  Asla büyük kırmızı bloklar, **asla neon/glow/parlama**.

## 2. Tipografi
- **Fraunces** (serif) = büyük başlıklar, rakamlar, ifadeler. Genelde **ince (light)** ağırlık.
- **Archivo** (sans) = etiketler, gövde, buton, menü.
- Küçük etiketler: BÜYÜK HARF + geniş harf aralığı (`tracking-[0.2em]+`), 11–12px.
- Gövde metni **light** ağırlık, rahat satır aralığı, okunur genişlik.
- **İtalik çok seyrek**, tek kelimelik zarif vurgu için. Skew (eğik) **yok**.

## 3. İçerik kahramandır
- Büyük, seyrek, sinematik fotoğraf. Dekor değil, içerik taşır.
- Görsel yokken **düz, sessiz placeholder** (ince çerçeve + küçük etiket) — renkli gradyan değil.
- Posterler dikey **1080×1350 (4:5)**.

## 4. Boşluk & ritim
- **Bol boşluk.** Bölümler `py-28`/`py-36`. Sıkışık değil.
- Ortak başlık kalıbı (`SectionHeader`): kısa kırmızı çizgi + küçük büyük-harf etiket,
  altında büyük Fraunces başlık, opsiyonel sakin alt başlık.
- Ayırıcı olarak **ince çizgi** (`border-ink/10`), kutu/gölge yığını değil.

## 5. Butonlar & etkileşim
- Sessiz: **ince çerçeveli** ("ghost") veya **altı çizili metin link**. Hover'da dolgu/renk döner.
- Gölge/glow/shimmer/skew **yok**. Mikro hareket (ok 2px kayar) yeter.
- Tıklanabilir olan tıklanabilir görünür; yatay kaydırmada peek + ok + ilerleme.

## 6. Hareket
- Ölçülü: scroll-reveal, sayan rakamlar, yavaş görsel zoom (1000ms+).
- Tek, düzenli giriş; dağınık mikro-efekt yok. `prefers-reduced-motion` desteklenir.

## 7. Erişilebilirlik
- `alt`, `aria-label`, görünür focus, yeterli kontrast, klavye erişimi.

## 8. Mobil-öncelikli
- Önce dar ekran; dokunma hedefleri ≥ 44px; ızgaralar sadeleşir.

## 9. Her yeni bölüm için kontrol listesi
- [ ] ink/paper paleti + açık-koyu ritim?
- [ ] Fraunces başlık / Archivo gövde?
- [ ] Kırmızı yalnızca minik vurgu mu?
- [ ] Bol boşluk, ince çizgi ayırıcı?
- [ ] Fotoğraf/placeholder sessiz ve içerik-öncelikli mi?
- [ ] Butonlar ghost/altı-çizili, glow'suz mu?
- [ ] alt / aria / focus / mobil tamam mı?

---

### Dokunmayacaklarımız
- **Hero** onaylandı — korunur, kıyas noktamızdır (video + Fraunces, sinematik sükûnet).

### Çöpe attıklarımız (bir daha dönme)
- Neon kırmızı glow, shimmer butonlar, her yerde italik+skew+BÜYÜK HARF.
- Uçuşan "6.5G / 300KM/H" yazıları, radial-gradient placeholder kutuları, blueprint ızgara.
- "Uçuş rotası/tırmanış", kaotik bento — gösteriş için konsept. Lexend fontu.
