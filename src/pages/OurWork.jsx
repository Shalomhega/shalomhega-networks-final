import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section.jsx";
import { portfolioCategories } from "../data/portfolio.js";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

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
  // WELCOME SYSTEM VIDEOS
  // =========================
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

  // =========================
  // RULES SYSTEM VIDEOS
  // =========================
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

  // =========================
  // ROLES SYSTEM VIDEOS
  // =========================
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
];

const videoCategories = [
  "All Videos",
  "Template",
  "Verification",
  "Welcome System",
  "Rules System",
  "Roles System",
];

// =========================
// GET SUPABASE MEDIA URL
// =========================

function getProjectMediaUrl(project) {
  if (!project?.media_url) {
    return "";
  }

  // If media_url is already a complete URL,
  // use it directly.
  if (
    project.media_url.startsWith("http://") ||
    project.media_url.startsWith("https://")
  ) {
    return project.media_url;
  }

  // If media_url is a Storage path,
  // generate the public URL from Supabase.
  if (supabase) {
    const { data } = supabase.storage
      .from("portfolio-media")
      .getPublicUrl(project.media_url);

    return data.publicUrl;
  }

  return project.media_url;
}

// =========================
// CHECK MEDIA TYPE
// =========================

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
  // =========================
  // VIDEO SHOWCASE STATES
  // =========================

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCategory, setVideoCategory] = useState("All Videos");

  // =========================
  // SUPABASE PROJECT STATES
  // =========================

  const [category, setCategory] = useState("All Work");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  // =========================
  // LOAD SUPABASE PROJECTS
  // =========================

  useEffect(() => {
    async function loadProjects() {
      // Prevent unnecessary loading
      // if Supabase is not configured.
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
          .select("*")
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
  // PROJECT SHOWCASE FILTER
  // =========================

  const filteredProjects = useMemo(() => {
    if (category === "All Work") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === category
    );
  }, [category, projects]);

  // =========================
  // PROJECT CATEGORIES
  // =========================

  const projectCategories = useMemo(() => {
    return portfolioCategories.filter(
      (item) => item !== "Video"
    );
  }, []);

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

        <div className="
