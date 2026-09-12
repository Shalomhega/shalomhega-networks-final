/**
 * Consistent heading block for page sections: an optional small eyebrow,
 * a main heading, and an optional supporting description.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className = "",
}) {
  const alignmentClasses =
    align === "left" ? "text-left" : "mx-auto text-center";

  return (
    <div className={`max-w-2xl ${alignmentClasses} ${className}`}>
      {eyebrow && (
        <div
          className={`mb-3 inline-flex items-center gap-2 text-sm font-medium text-cyan ${
            align === "left" ? "" : "justify-center"
          }`}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
          {eyebrow}
        </div>
      )}

      <Tag className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </Tag>

      {description && (
        <p className="mt-4 leading-relaxed text-ink-muted">{description}</p>
      )}
    </div>
  );
}

export default SectionHeading;
