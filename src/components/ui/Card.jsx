import { Link } from "react-router-dom";

/**
 * Generic surface for content blocks. Compose freely inside it, for
 * example an icon, a title, and a short paragraph for a service card, or
 * a name and a quote for a review card.
 *
 * Renders as a plain div by default. Pass `to` for an internal link
 * (uses React Router), or `href` for an external link, to make the whole
 * card clickable.
 */
function Card({
  as,
  to,
  href,
  hover = true,
  className = "",
  children,
  ...props
}) {
  const classes = `rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 sm:p-8 ${
    hover ? "hover:border-purple/40 hover:bg-surface-alt" : ""
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Tag = as || "div";

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

export default Card;
