import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext.jsx";
import { getTranslation } from "../../data/translations.js";

function CommunityPopup() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem(
      "shalomhega-community-popup-shown"
    );

    if (hasShownPopup) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(
        "shalomhega-community-popup-shown",
        "true"
      );
    }, 20000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-popup-title"
    >
      <button
        type="button"
        aria-label={getTranslation(language, "common", "close")}
        onClick={closePopup}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-brand-field p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={closePopup}
          aria-label={getTranslation(language, "common", "close")}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {getTranslation(language, "common", "popupEyebrow")}
          </span>

          <h2
            id="community-popup-title"
            className="mt-3 max-w-md font-sora text-2xl font-bold leading-tight text-white sm:text-3xl"
          >
            {getTranslation(language, "common", "popupTitle")}
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-white/65 sm:text-base">
            {getTranslation(language, "common", "popupDescription")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/start-your-project"
            onClick={closePopup}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {getTranslation(language, "common", "popupCta")}
          </Link>

          <button
            type="button"
            onClick={closePopup}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {getTranslation(language, "common", "close")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityPopup;
