import { useEffect } from "react";

export default function VideoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Watch ${project.title}`}>
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div><p className="text-sm font-semibold text-ink">{project.title}</p><p className="text-xs text-ink-muted">Project video</p></div>
          <button onClick={onClose} className="rounded-full border border-border px-3 py-1.5 text-sm text-ink-muted hover:text-ink">Close</button>
        </div>
        <div className="aspect-video bg-black">
          {project.videoUrl ? (
            <video src={project.videoUrl} controls autoPlay playsInline className="h-full w-full object-contain" poster={project.thumbnailUrl || undefined} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
