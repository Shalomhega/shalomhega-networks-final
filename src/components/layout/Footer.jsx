import { Link } from "react-router-dom";
import Container from "../ui/Container.jsx";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col items-center gap-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Link
            to="/"
            className="font-heading text-sm font-semibold tracking-tight text-ink"
          >
            SHALOMHEGA NETWORKS
          </Link>
          <p className="mt-1 text-xs text-ink-muted">
            Discord community development for streamers, creators, and
            businesses.
          </p>
        </div>

        <p className="text-xs text-ink-muted">
          Copyright {year} SHALOMHEGA NETWORKS. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
