import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section.jsx";
import { portfolioCategories } from "../data/portfolio.js";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const showcaseVideos = [
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

  ...Array.from({ length: 8 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `welcome-${number}`,
      category: "Welcome System",
      number: `DEMO ${number}`,
      title: "Welcome System",
      description: "Click to watch this community welcome system demonstration.",
      video: `/videos/welcome-video-${number}.mp4`,
    };
  }),

  ...Array.from({ length: 7 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `rules-${number}`,
      category: "Rules System",
      number: `DEMO ${number}`,
      title: "Rules System",
      description: "Click to watch this community rules system demonstration.",
      video: `/videos/rules-video-${number}.mp4`,
    };
  }),

  ...Array.from({ length: 3 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      id: `roles-${number}`,
      category: "Roles System",
      number: `DEMO ${number}`,
      title: "Roles System",
      description: "Click to watch this community roles system demonstration.",
      video: `/videos/roles-video-${number}.mp4`,
    };
  }),

  {
    id: "faq-01",
    category: "FAQ System",
    number: "DEMO 01",
    title: "FAQ System",
    description: "Click to watch this community FAQ system demonstration.",
    video: "/videos/faq-video-01.mp4",
  },
];

const videoCategories = [
  "All Videos",
  "Template",
  "Verification",
  "Welcome System",
  "Rules System",
  "Roles System",
  "FAQ System",
];

function getProjectMediaUrl(project) {
  if (!project?.media_url) {
    return "";
  }

  if (
    project.media_url.startsWith("http://") ||
    project.media_url.startsWith("https://")
  ) {
    return project.media_url;
  }

  if (supabase) {
    const { data } = supabase.storage
      .from("portfolio-videos")
      .getPublicUrl(project.media_url);

    return data?.publicUrl || project.media_url;
  }

  return project.media_url;
}

function getMediaType(project) {
  if (project?.media_type) {
    return project.media_type.toLowerCase();
  }

  const mediaUrl = project?.media_url?.toLowerCase() || "";

  if (
    mediaUrl.endsWith(".mp4") ||
    mediaUrl.endsWith(".webm") ||
    mediaUrl.endsWith(".mov")
  ) {
    return "video";
  }

  return "image";
}

function OurWork() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCategory, setVideoCategory] = useState("All Videos");

  const [category, setCategory] = useState("All Work");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      if (!isSupabaseConfigured || !supabase) {
        setProjects([]);
        setProjectsLoading(false);
        setProjectsError(
          "Supabase is not configured for the portfolio projects."
        );
        return;
      }

      try {
        setProjectsLoading(true);
        setProjectsError(null);

        const { data, error } = await supabase
          .from("portfolio_projects")
          .select(
            "id, created_at, title, description, category, media_url, media_type, display_order, is_published"
          )
          .eq("is_published", true)
          .order("display_order", {
            ascending: true,
          })
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          throw error;
        }

        setProjects(data || []);
      } catch (error) {
        console.error("Error loading portfolio projects:", error);

        setProjectsError(
          "We could not load the portfolio projects right now."
        );
      } finally {
        setProjectsLoading(false);
      }
    }

    loadProjects();
  }, []);

  // =========================
  // DATABASE VIDEO SHOWCASE
  // =========================

  const databaseVideos = useMemo(() => {
    return projects
      .filter((project) => getMediaType(project) === "video")
      .map((project) => {
        const categoryByOrder = {
          1: "Welcome System",
          2: "Community Structure",
          3: "Rules System",
          4: "Roles System",
          5: "FAQ System",
          6: "Verification System",
        };

        return {
          id: `database-${project.id}`,
          category:
            categoryByOrder[Number(project.display_order)] ||
            project.category ||
            "Other",
          number: "PROJECT",
          title: project.title,
          description:
            project.description ||
            "Click to watch this community system demonstration.",
          video: getProjectMediaUrl(project),
        };
      });
  }, [projects]);

  const allShowcaseVideos = useMemo(() => {
    return [...showcaseVideos, ...databaseVideos];
  }, [databaseVideos]);

  const filteredVideos = useMemo(() => {
    if (videoCategory === "All Videos") {
      return allShowcaseVideos;
    }

    return allShowcaseVideos.filter(
      (video) => video.category === videoCategory
    );
  }, [videoCategory, allShowcaseVideos]);

  const filteredProjects = useMemo(() => {
    if (category === "All Work") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === category
    );
  }, [category, projects]);

  const projectCategories = useMemo(() => {
    const categories = portfolioCategories.filter(
      (item) => item !== "Video"
    );

    const databaseCategories = projects
      .map((project) => project.category)
      .filter(Boolean);

    return Array.from(
      new Set(["All Work", ...categories, ...databaseCategories])
    );
  }, [projects]);

  return (
    <main className="bg-brand-field">

      {/* HERO */}

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

          <p className="mb-6 text-sm text-ink-muted">

            Showing{" "}

            <span className="font-semibold text-cyan">
              {filteredVideos.length}
            </span>{" "}

            {filteredVideos.length === 1 ? "video" : "videos"}

          </p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredVideos.map((video) => (

              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:-translate-y-1 hover:border-purple/60"
              >

                <div className="relative aspect-video overflow-hidden bg-black">

                  <video
                    src={video.video}
                    muted
                    preload="metadata"
                    className="h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-90"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute left-4 top-4 rounded-full border border-cyan/50 bg-brand-field/80 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-cyan backdrop-blur">
                    VIDEO DEMO
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 text-2xl text-cyan backdrop-blur transition group-hover:scale-110 group-hover:border-cyan">
                      ▶
                    </div>

                  </div>

                </div>

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

      {/* PROJECT SHOWCASE */}

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
              Explore real community development, branding, systems, and
              project work published directly from the SHALOMHEGA NETWORKS
              portfolio.
            </p>

          </div>

          <div className="mb-10 flex flex-wrap gap-2">

            {projectCategories.map((item) => (

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

          {projectsLoading && (

            <div className="rounded-3xl border border-border bg-surface/60 p-10 text-center">

              <p className="text-xs font-semibold tracking-[0.2em] text-cyan">
                LOADING PORTFOLIO
              </p>

              <p className="mt-3 text-ink-muted">
                Loading the latest published projects...
              </p>

            </div>

          )}

          {!projectsLoading && projectsError && (

            <div className="rounded-3xl border border-red-500/30 bg-surface/60 p-10 text-center">

              <p className="text-xs font-semibold tracking-[0.2em] text-purple">
                PORTFOLIO UNAVAILABLE
              </p>

              <p className="mt-3 text-ink-muted">
                {projectsError}
              </p>

            </div>

          )}

          {!projectsLoading &&
            !projectsError &&
            filteredProjects.length > 0 && (

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredProjects.map((project) => {

                  const mediaUrl = getProjectMediaUrl(project);
                  const mediaType = getMediaType(project);

                  return (

                    <button
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:-translate-y-1 hover:border-purple/60"
                    >

                      <div className="relative aspect-video overflow-hidden bg-black">

                        {mediaUrl && mediaType === "video" && (

                          <video
                            src={mediaUrl}
                            muted
                            preload="metadata"
                            className="h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-90"
                          />

                        )}

                        {mediaUrl && mediaType !== "video" && (

                          <img
                            src={mediaUrl}
                            alt={project.title}
                            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                          />

                        )}

                        {!mediaUrl && (

                          <div className="flex h-full w-full items-center justify-center text-sm text-ink-muted">
                            PROJECT MEDIA
                          </div>

                        )}

                        <div className="absolute inset-0 bg-black/20" />

                        <div className="absolute left-4 top-4 rounded-full border border-cyan/50 bg-brand-field/80 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-cyan backdrop-blur">

                          {mediaType === "video"
                            ? "VIDEO PROJECT"
                            : "PROJECT MEDIA"}

                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">

                          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/50 text-2xl text-cyan backdrop-blur transition group-hover:scale-110 group-hover:border-cyan">

                            {mediaType === "video" ? "▶" : "↗"}

                          </div>

                        </div>

                      </div>

                      <div className="p-6">

                        <div className="flex items-center justify-between gap-4">

                          <p className="text-xs font-semibold tracking-[0.18em] text-cyan">
                            PROJECT
                          </p>

                          <span className="text-xs font-semibold tracking-[0.14em] text-purple">
                            {(project.category || "Portfolio").toUpperCase()}
                          </span>

                        </div>

                        <h3 className="mt-4 text-2xl font-semibold">
                          {project.title}
                        </h3>

                        {project.description && (

                          <p className="mt-3 text-sm leading-6 text-ink-muted">
                            {project.description}
                          </p>

                        )}

                      </div>

                    </button>

                  );
                })}

              </div>

            )}

          {!projectsLoading &&
            !projectsError &&
            filteredProjects.length === 0 && (

              <div className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-10">

                <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">

                  <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-border bg-brand-field/30">

                    <p className="text-center text-xs font-semibold tracking-[0.2em] text-ink-muted">
                      REAL PROJECT MEDIA WILL APPEAR HERE
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold tracking-[0.2em] text-purple">
                      PORTFOLIO IN PROGRESS
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
                      REAL WORK DESERVES A REAL SHOWCASE
                    </h3>

                    <p className="mt-4 max-w-xl leading-7 text-ink-muted">

                      {category === "All Work"
                        ? "New published projects from the SHALOMHEGA NETWORKS portfolio will automatically appear here."
                        : `No published projects are currently available under ${category}.`}

                    </p>

                  </div>

                </div>

              </div>

            )}

        </div>

      </Section>

      {/* HOW TO EXPLORE */}

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
              "New published portfolio projects automatically appear as the work continues to grow.",
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

      {/* CTA */}

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

      {/* ADMIN ACCESS */}

      <section className="border-t border-border px-6 py-10">

        <div className="mx-auto flex max-w-6xl justify-center">

          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold tracking-[0.08em] text-ink-muted transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
          >
            <span aria-hidden="true">🔐</span>
            ADMIN ACCESS
          </Link>

        </div>

      </section>

      {/* VIDEO MODAL */}

      {selectedVideo && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >

          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface p-4"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-xl text-white transition hover:bg-black"
              aria-label="Close video"
            >
              ×
            </button>

            <div className="mb-4 shrink-0 pr-12">

              <p className="text-xs font-semibold tracking-[0.2em] text-cyan">
                {selectedVideo.category.toUpperCase()}
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {selectedVideo.title} — {selectedVideo.number}
              </h2>

            </div>

            <div className="flex max-h-[70vh] min-h-0 w-full items-center justify-center overflow-hidden rounded-xl bg-black">

              <video
                key={selectedVideo.video}
                controls
                autoPlay
                playsInline
                className="max-h-[70vh] max-w-full rounded-xl bg-black object-contain"
              >

                <source
                  src={selectedVideo.video}
                  type="video/mp4"
                />

                Your browser does not support the video tag.

              </video>

            </div>

          </div>

        </div>

      )}

      {/* SUPABASE PROJECT MODAL */}

      {selectedProject && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedProject(null)}
        >

          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface p-4"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-xl text-white transition hover:bg-black"
              aria-label="Close project"
            >
              ×
            </button>

            <div className="mb-4 shrink-0 pr-12">

              <p className="text-xs font-semibold tracking-[0.2em] text-cyan">
                {(selectedProject.category || "Portfolio").toUpperCase()}
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {selectedProject.title}
              </h2>

              {selectedProject.description && (

                <p className="mt-3 leading-7 text-ink-muted">
                  {selectedProject.description}
                </p>

              )}

            </div>

            {getMediaType(selectedProject) === "video" && (

              <div className="flex max-h-[70vh] min-h-0 w-full items-center justify-center overflow-hidden rounded-xl bg-black">

                <video
                  key={getProjectMediaUrl(selectedProject)}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[70vh] max-w-full rounded-xl bg-black object-contain"
                >

                  <source
                    src={getProjectMediaUrl(selectedProject)}
                    type="video/mp4"
                  />

                  Your browser does not support the video tag.

                </video>

              </div>

            )}

            {getMediaType(selectedProject) !== "video" && (

              <div className="flex max-h-[70vh] min-h-0 items-center justify-center overflow-hidden rounded-xl bg-black">

                <img
                  src={getProjectMediaUrl(selectedProject)}
                  alt={selectedProject.title}
                  className="max-h-[70vh] max-w-full rounded-xl object-contain"
                />

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}

export default OurWork;
