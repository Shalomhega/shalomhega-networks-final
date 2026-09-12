const DEFAULT_TEXT =
  "COMMUNITY DEVELOPMENT • DISCORD INFRASTRUCTURE • CREATOR SUPPORT • REAL COMMUNITY FOUNDATION • BUILT AROUND YOUR VISION";

/**
 * A single line of text scrolling continuously from right to left. The
 * text is rendered twice back to back and the track is animated exactly
 * half its own width, so the loop point is invisible.
 *
 * `overflow-hidden` on the outer wrapper keeps this from ever causing
 * horizontal scroll on the page, no matter how long the text is.
 */
function AnnouncementBar({ text = DEFAULT_TEXT }) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface">
      <div className="flex w-max animate-marquee py-2.5 motion-reduce:animate-none">
        {[0, 1].map((loopIndex) => (
          <div
            key={loopIndex}
            aria-hidden={loopIndex === 1 ? "true" : undefined}
            className="flex shrink-0 items-center whitespace-nowrap pr-16"
          >
            <span className="text-xs font-medium tracking-wide text-ink-muted">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;
