import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../routes/routes.js";

const primaryLinks = routes.filter((route) => !route.isCta);
const ctaLink = routes.find((route) => route.isCta);

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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
                {label}
              </NavLink>
            ))}

            {ctaLink && (
              <NavLink
                to={ctaLink.path}
                className="ml-1 shrink-0 rounded-full bg-purple px-3.5 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:bg-blue hover:shadow-lg hover:shadow-purple/20 xl:px-4 xl:text-sm"
              >
                {ctaLink.label}
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
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {ctaLink && (
            <NavLink
              to={ctaLink.path}
              onClick={closeMenu}
              className="mt-4 block rounded-full bg-purple px-4 py-2.5 text-center text-sm font-semibold text-ink transition-all duration-200 hover:bg-blue"
            >
              {ctaLink.label}
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
