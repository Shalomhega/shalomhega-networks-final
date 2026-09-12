import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section.jsx";
import { portfolioCategories, portfolioProjects } from "../data/portfolio.js";
import ProjectCard from "../components/media/ProjectCard.jsx";
import MediaPlaceholder from "../components/media/MediaPlaceholder.jsx";
import VideoModal from "../components/media/VideoModal.jsx";

function OurWork() {
  const [category, setCategory] = useState("All Work");
  const [activeVideo, setActiveVideo] = useState(null);
  const filtered = useMemo(() => category === "All Work" ? portfolioProjects : portfolioProjects.filter((project) => project.categories?.includes(category)), [category]);

  return (
    <main className="bg-brand-field">
      <section className="relative overflow-hidden border-b border-border px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-cyan">SHALOMHEGA NETWORKS PORTFOLIO</p>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">THE WORK BEHIND THE COMMUNITY</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">Explore real community development, systems, branding, and project experiences as they are added to the SHALOMHEGA NETWORKS portfolio.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/70 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-purple">MEDIA EXPERIENCE</p>
              <p className="mt-3 leading-7 text-ink-muted">Project images stay lightweight, and videos are designed to play only when a visitor chooses to watch them. This keeps the website fast while giving every project room to be explored.</p>
            </div>
          </div>
        </div>
      </section>

      <Section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold tracking-[0.22em] text-cyan">PROJECT SHOWCASE</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">EXPLORE THE PORTFOLIO</h2></div>
            <p className="max-w-xl text-sm leading-6 text-ink-muted">Images, screenshots, and optional project videos will appear here as real work is published.</p>
          </div>
          <div className="mb-10 flex flex-wrap gap-2">{portfolioCategories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm transition ${category === item ? "border-cyan bg-cyan/10 text-cyan" : "border-border text-ink-muted hover:border-purple/50 hover:text-ink"}`}>{item}</button>)}</div>

          {filtered.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((project) => <ProjectCard key={project.id} project={project} onWatch={setActiveVideo} />)}</div> : (
            <div className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                <MediaPlaceholder label="REAL PROJECT MEDIA WILL APPEAR HERE" className="min-h-[280px]" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-purple">PORTFOLIO IN PROGRESS</p>
                  <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">REAL WORK DESERVES A REAL SHOWCASE</h3>
                  <p className="mt-4 max-w-xl leading-7 text-ink-muted">The portfolio is ready for genuine project screenshots, images, and videos. No placeholder client work or invented project results are being displayed.</p>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-ink-muted">Phase 5C will connect this experience to secure media storage and private portfolio management.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section className="border-t border-border px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            ["01", "IMAGE FIRST", "Project thumbnails and screenshots load efficiently and give visitors immediate visual context."],
            ["02", "PLAY WHEN READY", "Videos are not forced to autoplay. Visitors choose what they want to watch, then the player opens on demand."],
            ["03", "MANAGED FROM ONE PLACE", "The next phase will connect real portfolio media to secure storage and the private Admin Control Center."],
          ].map(([number, title, text]) => <div key={number} className="rounded-2xl border border-border bg-surface/60 p-6"><span className="text-xs font-semibold tracking-[0.2em] text-cyan">{number}</span><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-ink-muted">{text}</p></div>)}
        </div>
      </Section>

      <section className="border-t border-border px-6 py-20 text-center"><div className="mx-auto max-w-2xl"><p className="text-xs font-semibold tracking-[0.22em] text-cyan">HAVE A PROJECT IN MIND</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">LET'S TALK ABOUT WHAT YOU WANT TO BUILD</h2><p className="mt-5 leading-7 text-ink-muted">Start with your direction, and we can explore the right development approach for your community.</p><Link to="/start-your-project" className="mt-8 inline-flex rounded-full bg-purple px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blue">START YOUR PROJECT</Link></div></section>
      <VideoModal project={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}

export default OurWork;
