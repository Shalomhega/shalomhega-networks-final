/**
 * Constrains content to a consistent maximum width with responsive
 * horizontal padding. Matches the width already used by the Header and
 * Footer, so everything on the site lines up.
 */
function Container({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-6 ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default Container;
