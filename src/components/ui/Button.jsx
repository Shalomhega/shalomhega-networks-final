import { Link } from "react-router-dom";

const variantStyles = {
  primary: "bg-purple text-ink hover:bg-blue",
  secondary:
    "border border-border bg-surface-alt text-ink hover:border-cyan/40",
  outline:
    "border border-purple/50 bg-transparent text-ink hover:border-purple hover:bg-purple/10",
};

const sizeStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};

/**
 * Renders as a native button by default. Pass `to` for an internal link
 * (uses React Router), or `href` for an external link.
 */
function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type,
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    variantStyles[variant] || variantStyles.primary
  } ${sizeStyles[size] || sizeStyles.md} ${className}`;

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

  const Tag = as || "button";

  return (
    <Tag
      type={Tag === "button" ? type || "button" : undefined}
      className={classes}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Button;
