import { useEffect } from "react";

export default function VideoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Watch ${project.title}`}
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">

        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-ink">
              {project.title}
            </p>

            <p className="text-xs text-ink-muted">
              Project video demonstration
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-border px-4 py-2 text-sm text-ink-muted transition hover:text-ink"
          >
            Close ✕
          </button>
        </div>

        <div className="aspect-video bg-black">
          <video
            key={project.videoUrl}
            src={project.videoUrl}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-contain"
          >
            Your browser does not support video playback.
          </video>
        </div>

      </div>
    </div>
  );
}
