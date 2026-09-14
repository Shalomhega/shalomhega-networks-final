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
  // =========================
  // TEMPLATE VIDEOS
  // =========================
  ...Array.from({ length: 6 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `template-${number}`,
      category: "Template",
      number: `DEMO ${number}`,
      title: "Template",
      description: "Click to watch this community system demonstration.",
      video: `/videos/template-video-${number}.mp4`,
    };
  }),

  // =========================
  // VERIFICATION VIDEOS
  // =========================
  ...Array.from({ length: 7 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `verification-${number}`,
      category: "Verification",
      number: `DEMO ${number}`,
      title: "Verification System",
      description: "Click to watch this verification system demonstration.",
      video: `/videos/verification-video-${number}.mp4`,
    };
  }),

  // =========================
  // WELCOME VIDEOS
  // =========================
  ...Array.from({ length: 8 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `welcome-${number}`,
      category: "Welcome",
      number: `DEMO ${number}`,
      title: "Welcome System",
      description: "Click to watch this community welcome system demonstration.",
      video: `/videos/welcome-video-${number}.mp4`,
    };
  }),

  // =========================
  // RULES VIDEOS
  // =========================
  ...Array.from({ length: 7 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `rules-${number}`,
      category: "Rules",
      number: `DEMO ${number}`,
      title: "Rules System",
      description: "Click to watch this community rules system demonstration.",
      video: `/videos/rules-video-${number}.mp4`,
    };
  }),

  // =========================
  // ROLES VIDEOS
  // =========================
  ...Array.from({ length: 3 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `roles-${number}`,
      category: "Roles",
      number: `DEMO ${number}`,
      title: "Roles System",
      description: "Click to watch this community roles system demonstration.",
      video: `/videos/roles-video-${number}.mp4`,
    };
  }),
];

const videoCategories = [
  "All Videos",
  "Template",
  "Verification",
  "Welcome",
  "Rules",
  "Roles",
];

function OurWork() {
  const [category, setCategory] = useState("All Work");
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCategory, setVideoCategory] = useState("All Videos");

  // =========================
  // VIDEO SHOWCASE FILTER
  // =========================
  const filteredVideos = useMemo(() => {
    if (videoCategory === "All Videos") {
      return showcaseVideos;
    }

    return showcaseVideos.filter(
      (video) => video.category === videoCategory
    );
  }, [videoCategory]);

  // =========================
  // REMOVE VIDEOS FROM PROJECT
  // SHOWCASE TO PREVENT DUPLICATES
  // =========================
  const nonVideoProjects = useMemo(() => {
    return portfolioProjects.filter((project) => !project.videoUrl);
  }, []);

  // =========================
  // PROJECT SHOWCASE FILTER
  // =========================
  const filtered = useMemo(() => {
    if (category === "All Work") {
      return nonVideoProjects;
    }

    return nonVideoProjects.filter((project) =>
      project.categories?.includes(category)
    );
  }, [category, nonVideoProjects]);

  return (
    <main className="bg-brand-field">

      {/* ========================= */}
      {/* HERO SECTION */}
      {/* ========================= */}

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
                Explore real demonstrations of community systems. Videos only
                play when you choose to watch them, helping keep the experience
                smooth and organized.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ========================= */}
      {/* VIDEO SHOWCASE */}
      {/* ========================= */}

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


          {/* ========================= */}
          {/* VIDEO FILTERS */}
          {/* ========================= */}

          <div className="mb-10 flex flex-wrap gap-2">

            {videoCategories.map((item) => (

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


          {/* ========================= */}
          {/* VIDEO COUNT */}
          {/* ========================= */}

          <p className="mb-6 text-sm text-ink-muted">
            Showing{" "}
            <span className="font-semibold text-cyan">
              {filteredVideos.length}
            </span>{" "}
            {filteredVideos.length === 1 ? "video" : "videos"}
          </p>


          {/* ========================= */}
          {/* VIDEO CARDS */}
          {/* ========================= */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredVideos.map((video) => (

              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:-translate-y-1 hover:border-purple/60"
              >

                {/* VIDEO PREVIEW */}

                <div className="relative aspect-video overflow-hidden bg-black">

                  <video
                    src={video.video}
                    muted
                    preload="metadata"
                    className="h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  {/* VIDEO LABEL */}

                  <div className="absolute left-4 top-4 rounded-full border border-cyan/50 bg-brand-field/80 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-cyan backdrop-blur">
                    VIDEO DEMO
                  </div>

                  {/* PLAY BUTTON */}

                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 text-2xl text-cyan backdrop-blur transition group-hover:scale-110 group-hover:border-cyan">
                      ▶
                    </div>

                  </div>

                </div>


                {/* VIDEO INFORMATION */}

                <div className="p-6">

                  <div className="flex items-center justify-between gap-4">

                    <p className="text-xs font-semibold tracking-[0.22em] text-cyan">
                      {video.number}
                    </p>

                    <span className="text-xs font-semibold tracking-[0.14em] text-purple">
                      {video.category.toUpperCase()}
                    </span>

                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {video.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    {video.description}
                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

      </Section>


      {/* ========================= */}
      {/* PROJECT SHOWCASE */}
      {/* ========================= */}

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
              Additional project screenshots, branding, community development,
              and real project media will appear here as more work is published.
            </p>

          </div>


          {/* PROJECT FILTERS */}

          <div className="mb-10 flex flex-wrap gap-2">

            {portfolioCategories
              .filter((item) => item !== "Video")
              .map((item) => (

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


          {/* PROJECT CONTENT */}

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
                    The video demonstrations are now available in the Community
                    System Showcase above. Additional project screenshots,
                    branding, community development work, and real client
                    projects will continue to be added here.
                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      </Section>


      {/* ========================= */}
      {/* HOW TO EXPLORE */}
      {/* ========================= */}

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

              <h3 className="mt-4 text-xl font-semibold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-muted">
                {text}
              </p>

            </div>

          ))}

        </div>

      </Section>


      {/* ========================= */}
      {/* CTA */}
      {/* ========================= */}

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


      {/* ========================= */}
      {/* VIDEO PLAYER MODAL */}
      {/* ========================= */}

      {selectedVideo && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >

          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border bg-surface p-4"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-xl text-white transition hover:bg-black"
              aria-label="Close video"
            >
              ×
            </button>


            <div className="mb-4 pr-12">

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
              playsInline
              className="w-full rounded-xl bg-black"
            >
              <source
                src={selectedVideo.video}
                type="video/mp4"
              />

              Your browser does not support the video tag.

            </video>

          </div>

        </div>

      )}


      {/* EXISTING VIDEO MODAL */}

      <VideoModal
        project={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

    </main>
  );
}

export default OurWork;
