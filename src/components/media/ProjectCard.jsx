import MediaPlaceholder from "./MediaPlaceholder.jsx";

export default function ProjectCard({ project, onWatch }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface/70 transition hover:-translate-y-1 hover:border-cyan/30">
      <div className="relative">
        {project.thumbnailUrl ? <img src={project.thumbnailUrl} alt={project.title} loading="lazy" className="aspect-[16/10] w-full object-cover" /> : <MediaPlaceholder className="rounded-none border-0" />}
        {project.videoUrl && <button onClick={() => onWatch(project)} className="absolute inset-0 flex items-center justify-center bg-background/0 transition group-hover:bg-background/30" aria-label={`Watch ${project.title}`}><span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-background/80 pl-1 text-cyan shadow-xl backdrop-blur">▶</span></button>}
      </div>
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">{project.categories?.map((category) => <span key={category} className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan">{category}</span>)}</div>
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {project.description && <p className="mt-3 text-sm leading-6 text-ink-muted">{project.description}</p>}
        {project.videoUrl && <button onClick={() => onWatch(project)} className="mt-5 text-sm font-semibold text-cyan hover:text-ink">WATCH PROJECT VIDEO <span aria-hidden>↗</span></button>}
      </div>
    </article>
  );
}
