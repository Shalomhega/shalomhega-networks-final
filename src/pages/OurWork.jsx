import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section.jsx";
import {
  portfolioCategories,
  portfolioProjects,
} from "../data/portfolio.js";
import ProjectCard from "../components/media/ProjectCard.jsx";
import MediaPlaceholder from "../components/media/MediaPlaceholder.jsx";
import VideoModal from "../components/media/VideoModal.jsx";

const showcaseVideos = [
  {
    id: "template-01",
    category: "Template",
    number: "DEMO 01",
    title: "Template",
    video: "/videos/template-video-01.mp4",
  },
  {
    id: "template-02",
    category: "Template",
    number: "DEMO 02",
    title: "Template",
    video: "/videos/template-video-02.mp4",
  },
  {
    id: "template-03",
    category: "Template",
    number: "DEMO 03",
    title: "Template",
    video: "/videos/template-video-03.mp4",
  },
  {
    id: "template-04",
    category: "Template",
    number: "DEMO 04",
    title: "Template",
    video: "/videos/template-video-04.mp4",
  },
  {
    id: "template-05",
    category: "Template",
    number: "DEMO 05",
    title: "Template",
    video: "/videos/template-video-05.mp4",
  },
  {
    id: "template-06",
    category: "Template",
    number: "DEMO 06",
    title: "Template",
    video: "/videos/template-video-06.mp4",
  },

  {
    id: "verification-01",
    category: "Verification",
    number: "DEMO 01",
    title: "Verification",
    video: "/videos/verification-video-01.mp4",
  },
  {
    id: "verification-02",
    category: "Verification",
    number: "DEMO 02",
    title: "Verification",
    video: "/videos/verification-video-02.mp4",
  },
  {
    id: "verification-03",
    category: "Verification",
    number: "DEMO 03",
    title: "Verification",
    video: "/videos/verification-video-03.mp4",
  },
  {
    id: "verification-04",
    category: "Verification",
    number: "DEMO 04",
    title: "Verification",
    video: "/videos/verification-video-04.mp4",
  },
  {
    id: "verification-05",
    category: "Verification",
    number: "DEMO 05",
    title: "Verification",
    video: "/videos/verification-video-05.mp4",
  },
  {
    id: "verification-06",
    category: "Verification",
    number: "DEMO 06",
    title: "Verification",
    video: "/videos/verification-video-06.mp4",
  },
  {
    id: "verification-07",
    category: "Verification",
    number: "DEMO 07",
    title: "Verification",
    video: "/videos/verification-video-07.mp4",
  },
];

function OurWork() {
  const [category, setCategory] = useState("All Work");
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCategory, setVideoCategory] = useState("All Videos");

  const filtered = useMemo(
    () =>
      category === "All Work"
        ? portfolioProjects
        : portfolioProjects.filter((project) =>
            project.categories?.includes(category)
          ),
    [category]
  );

  const filteredVideos = useMemo(
    () =>
      videoCategory === "All Videos"
        ? showcaseVideos
        : showcaseVideos.filter(
            (video) => video.category === videoCategory
          ),
    [videoCategory]
  );

  return (
    <main className="bg-brand-field">
      <section className="relative overflow-hidden border-b border-border px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-cyan">
            SHALOMHEGA NETWORKS PORTFOLIO
          </p>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
                THE WORK BEHIND THE COMMUNITY
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
                Explore real community development, systems, branding, and
                project experiences as they are added to the SHALOMHEGA NETWORKS
                portfolio.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/70 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-purple">
                MEDIA EXPERIENCE
              </p>

              <p className="mt-3 leading-7 text-ink-muted">
                Project videos are designed to play only when a visitor chooses
                to watch them. This keeps the website fast while giving every
                project room to be explored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SHOWCASE */}
      <Section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
                COMMUNITY SYSTEM SHOWCASE
              </p>

              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                EXPLORE THE VIDEO WORK
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-ink-muted">
              Explore real examples of community systems and development work.
              Select any video to watch the full experience.
            </p>
          </div>

          {/* VIDEO FILTERS */}
          <div className="mb-10 flex flex-wrap gap-2">
            {["All Videos", "Template", "Verification"].map((item) => (
              <button
                key={item}
                onClick={() => setVideoCategory(item)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  videoCategory === item
                    ? "border-cyan bg-cyan/10 text-cyan"
                    : "border-border text-ink-muted hover:border-purple/50 hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* VIDEO CARDS */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group rounded-2xl border border-border bg-surface p-6 text-left transition hover:border-purple/60 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
                    {video.number}
                  </p>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-brand-field text-lg transition group-hover:border-cyan group-hover:text-cyan">
                    ▶
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-sm text-purple">
                    {video.category.toUpperCase()}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    {video.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    Click to watch this community system demonstration.
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* EXISTING PORTFOLIO SECTION */}
      <Section className="border-t border-border px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
                PROJECT SHOWCASE
              </p>

              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                EXPLORE THE PORTFOLIO
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-ink-muted">
              Images, screenshots, and additional project media will appear here
              as real work is published.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {portfolioCategories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  category === item
                    ? "border-cyan bg-cyan/10 text-cyan"
                    : "border-border text-ink-muted hover:border-purple/50 hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filtered.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onWatch={setActiveVideo}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                <MediaPlaceholder
                  label="REAL PROJECT MEDIA WILL APPEAR HERE"
                  className="min-h-[280px]"
                />

                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-purple">
                    PORTFOLIO IN PROGRESS
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                    REAL WORK DESERVES A REAL SHOWCASE
                  </h3>

                  <p className="mt-4 max-w-xl leading-7 text-ink-muted">
                    The portfolio is ready for genuine project screenshots,
                    images, and videos. No placeholder client work or invented
                    project results are being displayed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section className="border-t border-border px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            [
              "01",
              "WATCH REAL SYSTEMS",
              "Explore demonstrations of real community systems and development work.",
            ],
            [
              "02",
              "PLAY WHEN READY",
              "Videos are not forced to autoplay. Visitors choose what they want to watch.",
            ],
            [
              "03",
              "MORE WORK COMING",
              "Additional community systems and project experiences will continue to be added.",
            ],
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="rounded-2xl border border-border bg-surface/60 p-6"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-cyan">
                {number}
              </span>

              <h3 className="mt-4 text-xl font-semibold">{title}</h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-border px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
            HAVE A PROJECT IN MIND
          </p>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            LET'S TALK ABOUT WHAT YOU WANT TO BUILD
          </h2>

          <p className="mt-5 leading-7 text-ink-muted">
            Start with your direction, and we can explore the right development
            approach for your community.
          </p>

          <Link
            to="/start-your-project"
            className="mt-8 inline-flex rounded-full bg-purple px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
          >
            START YOUR PROJECT
          </Link>
        </div>
      </section>

      {/* VIDEO PLAYER MODAL */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl border border-border bg-surface p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xl text-white"
            >
              ×
            </button>

            <div className="mb-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan">
                {selectedVideo.category.toUpperCase()}
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {selectedVideo.title} — {selectedVideo.number}
              </h2>
            </div>

            <video
              key={selectedVideo.video}
              controls
              autoPlay
              className="w-full rounded-xl"
            >
              <source src={selectedVideo.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <VideoModal
        project={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </main>
  );
}

export default OurWork;
