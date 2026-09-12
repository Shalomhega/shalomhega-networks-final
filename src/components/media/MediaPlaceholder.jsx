export default function MediaPlaceholder({ label = "PROJECT MEDIA", className = "" }) {
  return (
    <div className={`relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface via-background to-purple/20 ${className}`}>
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-purple/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl" />
      <div className="relative text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"/><path d="m8 15 2.8-3 2.2 2.1 1.5-1.6L17 15"/></svg>
        </div>
        <p className="text-xs font-semibold tracking-[0.22em] text-ink-muted">{label}</p>
      </div>
    </div>
  );
}
