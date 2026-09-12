const colorMap = {
  purple: "bg-purple/25",
  blue: "bg-blue/25",
  cyan: "bg-cyan/20",
};

/**
 * A single soft, blurred color accent, meant to sit behind content inside
 * a `relative overflow-hidden` wrapper. Size and position are controlled
 * through `className`, for example `h-72 w-72 -top-24 -left-16`.
 *
 * Kept intentionally low opacity so it reads as atmosphere, not decoration
 * that competes with text.
 */
function GlowOrb({ color = "purple", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${
        colorMap[color] || colorMap.purple
      } ${className}`}
    />
  );
}

export default GlowOrb;
