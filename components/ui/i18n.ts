import { createContext, useContext } from "react";

// Site dili. Türkçe kök adreslerde (/hakkinda), İngilizce /en altında (/en/about).
// Not: <html lang> dile göre değişir; CSS `uppercase` Türkçede i → İ, İngilizcede i → I yapar.
// Bu yüzden büyük harf görünecek metinleri normal yazıp `uppercase` sınıfına bırakın.
export type Lang = "tr" | "en";

/** Her iki dilde değeri olan alan (veri listeleri için). */
export type Tx<T = string> = { tr: T; en: T };

export const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "tr",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext).lang;
export const useSetLang = () => useContext(LangContext).setLang;

/** `const t = useT(); t("Hakkında", "About")` — metni o anki dile göre seçer (JSX de olabilir). */
export const useT = () => {
  const lang = useLang();
  return <T,>(tr: T, en: T): T => (lang === "en" ? en : tr);
};

/** Tx alanından o anki dilin değerini alır. */
export const pick = <T,>(v: Tx<T>, lang: Lang): T => v[lang];
