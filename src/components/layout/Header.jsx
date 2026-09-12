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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-heading text-base font-semibold tracking-tight text-ink"
        >
          <img
  src="/images/NETWORKIMAGE.png"
  alt="SHALOMHEGA NETWORKS"
  className="h-10 w-auto"
/>
        </Link>

        <nav className="hidden xl:flex xl:items-center xl:gap-6">
          {primaryLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-cyan"
                    : "text-ink-muted hover:text-ink"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {ctaLink && (
            <NavLink
              to={ctaLink.path}
              className="rounded-full bg-purple px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-blue"
            >
              {ctaLink.label}
            </NavLink>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink xl:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background px-6 pb-6 pt-2 xl:hidden">
          <ul className="flex flex-col gap-1">
            {primaryLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
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
              className="mt-4 block rounded-full bg-purple px-4 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:bg-blue"
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
