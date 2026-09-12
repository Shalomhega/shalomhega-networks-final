import Container from "./Container.jsx";

/**
 * Standard vertical rhythm for a page section. Renders a `section` by
 * default with a Container inside it, so every section on the site gets
 * the same spacing without repeating classes.
 */
function Section({
  as: Tag = "section",
  className = "",
  containerClassName = "",
  children,
  ...props
}) {
  return (
    <Tag className={`py-16 sm:py-24 ${className}`} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

export default Section;
