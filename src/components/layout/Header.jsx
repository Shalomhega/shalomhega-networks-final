import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../routes/routes.js";
import { useLanguage } from "../../lib/LanguageContext.jsx";
import { getTranslation } from "../../data/translations.js";

const primaryLinks = routes.filter((route) => !route.isCta);
const ctaLink = routes.find((route) => route.isCta);

const navigationTranslationKeys = {
  Home: "home",
  Services: "services",
  "Community Systems": "systems",
  "Find Your Community Vibe": "vibe",
  "Our Work": "work",
  Pricing: "pricing",
  "Our Team": "team",
  Reviews: "reviews",
  "How It Works": "howItWorks",
  "Start Your Project": "startProject",
};

function MenuIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
    </svg>
  );
}

function LanguageSelector({ mobile = false, onSelect }) {
  const {
    language,
    changeLanguage,
    currentLanguage,
    supportedLanguages,
  } = useLanguage();

  return (
    <div className={mobile ? "w-full" : "relative"}>
      <div className="relative">
        <select
          value={language}
          onChange={(event) => {
            changeLanguage(event.target.value);

            if (onSelect) {
              onSelect();
            }
          }}
          aria-label="Select website language"
          className={`appearance-none rounded-lg border border-border bg-background text-ink outline-none transition-colors hover:border-cyan/50 focus:border-cyan ${
            mobile
              ? "w-full py-2.5 pl-9 pr-9 text-sm"
              : "w-[125px] py-2 pl-8 pr-8 text-xs xl:text-sm"
          }`}
        >
          {supportedLanguages.map((item) => (
            <option key={item.code} value={item.code}>
              {item.nativeName}
            </option>
          ))}
        </select>

        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-muted ${
            mobile ? "left-3" : "left-2.5"
          }`}
        >
          <LanguageIcon />
        </span>

        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-muted ${
            mobile ? "right-3" : "right-2.5"
          }`}
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      <span className="sr-only">{currentLanguage.name}</span>
    </div>
  );
}

function getNavLabel(label, language) {
  const key = navigationTranslationKeys[label];

  if (!key) {
    return label;
  }

  return getTranslation(language, "nav", key);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label="SHALOMHEGA NETWORKS Home"
        >
          <img
            src="/images/NETWORKIMAGE.png"
            alt="SHALOMHEGA NETWORKS"
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <nav className="flex items-center justify-end gap-1">
            {primaryLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200 xl:px-3 xl:text-sm ${
                    isActive
                      ? "bg-surface text-cyan"
                      : "text-ink-muted hover:bg-surface/70 hover:text-ink"
                  }`
                }
              >
                {getNavLabel(label, language)}
              </NavLink>
            ))}

            <LanguageSelector />

            {ctaLink && (
              <NavLink
                to={ctaLink.path}
                className="ml-1 shrink-0 rounded-full bg-purple px-3.5 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:bg-blue hover:shadow-lg hover:shadow-purple/20 xl:px-4 xl:text-sm"
              >
                {getNavLabel(ctaLink.label, language)}
              </NavLink>
            )}
          </nav>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface lg:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background/95 px-4 pb-5 pt-3 backdrop-blur-xl sm:px-6 lg:hidden">
          <ul className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto">
            {primaryLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-surface text-cyan"
                        : "text-ink-muted hover:bg-surface hover:text-ink"
                    }`
                  }
                >
                  {getNavLabel(label, language)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <LanguageSelector mobile onSelect={closeMenu} />
          </div>

          {ctaLink && (
            <NavLink
              to={ctaLink.path}
              onClick={closeMenu}
              className="mt-4 block rounded-full bg-purple px-4 py-2.5 text-center text-sm font-semibold text-ink transition-all duration-200 hover:bg-blue"
            >
              {getNavLabel(ctaLink.label, language)}
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
