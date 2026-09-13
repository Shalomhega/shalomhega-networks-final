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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Watch ${project.title}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-[#151827] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan">
              VIDEO SHOWCASE
            </p>

            <h2 className="mt-1 text-lg font-semibold text-ink sm:text-xl">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-lg text-ink-muted transition hover:border-cyan hover:text-cyan"
            aria-label="Close video"
          >
            ×
          </button>
        </div>

        {/* Video */}
        <div className="flex max-h-[70vh] min-h-[250px] items-center justify-center bg-black p-2 sm:p-4">
          {project.videoUrl && (
            <video
              src={project.videoUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
              poster={project.thumbnailUrl || undefined}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-5 py-3">
          <p className="text-xs text-ink-muted">
            SHALOMHEGA NETWORKS • COMMUNITY SYSTEM SHOWCASE
          </p>
        </div>
      </div>
    </div>
  );
}
