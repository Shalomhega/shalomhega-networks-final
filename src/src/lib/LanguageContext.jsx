import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

export const supportedLanguages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    direction: "ltr",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    direction: "ltr",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    direction: "ltr",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    direction: "ltr",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    direction: "ltr",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    direction: "ltr",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    direction: "ltr",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    direction: "ltr",
  },
];

const DEFAULT_LANGUAGE = "en";
const STORAGE_KEY = "shalomhega-language";

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

  const browserLanguage = navigator.language?.split("-")[0];

  const savedIsSupported = supportedLanguages.some(
    (language) => language.code === savedLanguage
  );

  if (savedIsSupported) {
    return savedLanguage;
  }

  const browserIsSupported = supportedLanguages.some(
    (language) => language.code === browserLanguage
  );

  if (browserIsSupported) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const currentLanguage = useMemo(
    () =>
      supportedLanguages.find((item) => item.code === language) ||
      supportedLanguages[0],
    [language]
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);

    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.direction;
  }, [language, currentLanguage]);

  const changeLanguage = (nextLanguage) => {
    const exists = supportedLanguages.some(
      (item) => item.code === nextLanguage
    );

    if (!exists) {
      return;
    }

    setLanguage(nextLanguage);
  };

  const value = {
    language,
    changeLanguage,
    currentLanguage,
    supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
