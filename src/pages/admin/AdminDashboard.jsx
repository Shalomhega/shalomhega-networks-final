import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  supabase,
  isSupabaseConfigured,
} from "../../lib/supabase.js";
import Button from "../../components/ui/Button.jsx";

const reviewStatuses = ["pending", "approved"];

const inquiryStatuses = [
  "new",
  "contacted",
  "in_discussion",
  "confirmed",
  "closed",
];

const portfolioSlots = [
  { id: "welcome", title: "Welcome System", displayOrder: 1 },
  { id: "community-structure", title: "Community Structure", displayOrder: 2 },
  { id: "rules", title: "Rules System", displayOrder: 3 },
  { id: "role-selection", title: "Role Selection System", displayOrder: 4 },
  { id: "faq", title: "FAQ System", displayOrder: 5 },
  { id: "verification", title: "Verification System", displayOrder: 6 },
];

const label = (value = "") =>
  value.replaceAll("_", " ").toUpperCase();

export default function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("overview");

  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [filter, setFilter] = useState("new");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  async function load() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (adminError) {
        throw adminError;
      }

      if (!adminUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const [
        reviewsResult,
        inquiriesResult,
        portfolioResult,
        testimonialsResult,
      ] = await Promise.all([
        supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("project_inquiries")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("portfolio_projects")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false }),

        supabase
          .from("client_testimonials")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false }),
      ]);

      if (reviewsResult.error) {
        throw reviewsResult.error;
      }

      if (inquiriesResult.error) {
        throw inquiriesResult.error;
      }

      if (portfolioResult.error) {
        throw portfolioResult.error;
      }

      if (testimonialsResult.error) {
        throw testimonialsResult.error;
      }

      setReviews(reviewsResult.data || []);
      setInquiries(inquiriesResult.data || []);
      setPortfolio(portfolioResult.data || []);
      setTestimonials(testimonialsResult.data || []);
    } catch (error) {
      console.error("Admin dashboard load error:", error);
      setMessage(
        error?.message || "The admin dashboard could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!supabase || !user) return undefined;

    const channel = supabase
      .channel("admin-control-center")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        () => load()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "project_inquiries",
        },
        () => load()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "portfolio_projects",
        },
        () => load()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "client_testimonials",
        },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const reviewCounts = useMemo(
    () =>
      reviewStatuses.reduce((acc, status) => {
        acc[status] = reviews.filter(
          (item) => item.status === status
        ).length;
        return acc;
      }, {}),
    [reviews]
  );

  const inquiryCounts = useMemo(
    () =>
      inquiryStatuses.reduce((acc, status) => {
        acc[status] = inquiries.filter(
          (item) => item.status === status
        ).length;
        return acc;
      }, {}),
    [inquiries]
  );

  const attention = useMemo(
    () => ({
      reviews: reviewCounts.pending || 0,
      inquiries: inquiryCounts.new || 0,
      testimonials: testimonials.filter(
        (item) => item.is_published !== true
      ).length,
    }),
    [reviewCounts, inquiryCounts, testimonials]
  );

  const activity = useMemo(() => {
    const reviewActivity = reviews.map((item) => ({
      id: `review-${item.id}`,
      type: "REVIEW",
      title: item.name || item.email || "New review",
      status: item.status || "pending",
      createdAt: item.created_at,
    }));

    const inquiryActivity = inquiries.map((item) => ({
      id: `inquiry-${item.id}`,
      type: "INQUIRY",
      title: item.name || item.email || "Project inquiry",
      status: item.status || "new",
      createdAt: item.created_at,
    }));

    const testimonialActivity = testimonials.map((item) => ({
      id: `testimonial-${item.id}`,
      type: "TESTIMONIAL",
      title: item.client_name || "Client testimonial",
      status: item.is_published ? "published" : "hidden",
      createdAt: item.created_at,
    }));

    return [
      ...reviewActivity,
      ...inquiryActivity,
      ...testimonialActivity,
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 8);
  }, [reviews, inquiries, testimonials]);

  async function reviewStatus(id, status) {
    if (!supabase) return;

    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Review status updated.");
    await load();
  }

  async function deleteReview(id) {
    if (!supabase) return;

    const confirmed = confirm(
      "Delete this review permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Review deleted.");
    await load();
  }

  async function inquiryStatus(id, status) {
    if (!supabase) return;

    const { error } = await supabase
      .from("project_inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Inquiry status updated.");
    await load();
  }

  async function inquiryNote(id, notes) {
    if (!supabase) return;

    const { error } = await supabase
      .from("project_inquiries")
      .update({ admin_notes: notes })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Inquiry notes saved.");
    await load();
  }

  async function logout() {
    if (!supabase) return;

    await supabase.auth.signOut();
    nav("/admin");
  }

  if (!isSupabaseConfigured || !supabase) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">
            Supabase is not configured
          </h1>
          <p className="mt-3 text-slate-300">
            Add the required Supabase environment variables before
            using the admin dashboard.
          </p>
        </div>
      </main>
    );
  }

  if (user === null) {
    return <Navigate to="/admin" replace />;
  }

  const navs = [
    ["overview", "OVERVIEW"],
    ["portfolio", "PORTFOLIO"],
    ["testimonials", "TESTIMONIALS"],
    ["reviews", "REVIEWS"],
    ["inquiries", "PROJECT INQUIRIES"],
    ["notifications", "NOTIFICATIONS"],
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              SHALOMHEGA NETWORKS
            </p>
            <h1 className="mt-1 text-xl font-bold">
              Admin Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => nav("/")}
            >
              View Website
            </Button>

            <Button
              variant="secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {navs.map(([id, title]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTab(id);
                setMessage("");
              }}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                tab === id
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        {message ? (
          <div className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 text-sm text-cyan-100">
            {message}
          </div>
        ) : null}

        {loading ? (
          <Skeleton />
        ) : tab === "overview" ? (
          <Overview
            reviews={reviews}
            inquiries={inquiries}
            testimonials={testimonials}
            reviewCounts={reviewCounts}
            inquiryCounts={inquiryCounts}
            attention={attention}
            activity={activity}
          />
        ) : tab === "portfolio" ? (
          <Portfolio
            portfolio={portfolio}
            setMessage={setMessage}
            reload={load}
          />
        ) : tab === "testimonials" ? (
          <Testimonials
            testimonials={testimonials}
            setMessage={setMessage}
            reload={load}
          />
        ) : tab === "reviews" ? (
          <Reviews
            reviews={reviews}
            filter={filter}
            setFilter={setFilter}
            reviewCounts={reviewCounts}
            reviewStatus={reviewStatus}
            deleteReview={deleteReview}
          />
        ) : tab === "inquiries" ? (
          <Inquiries
            inquiries={inquiries}
            inquiryCounts={inquiryCounts}
            inquiryStatus={inquiryStatus}
            inquiryNote={inquiryNote}
          />
        ) : (
          <Notifications
            attention={attention}
            activity={activity}
          />
        )}
      </div>
    </main>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-3xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}

function Overview({
  reviews,
  inquiries,
  testimonials,
  reviewCounts,
  inquiryCounts,
  attention,
  activity,
}) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Overview
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Control your website content
        </h2>
        <p className="mt-3 max-w-3xl text-slate-400">
          Manage portfolio work, client testimonials, reviews and
          project inquiries from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Stat
          label="Reviews"
          value={reviews.length}
        />

        <Stat
          label="Pending Reviews"
          value={reviewCounts.pending || 0}
        />

        <Stat
          label="Inquiries"
          value={inquiries.length}
        />

        <Stat
          label="New Inquiries"
          value={inquiryCounts.new || 0}
        />

        <Stat
          label="Testimonials"
          value={testimonials.length}
        />

        <Stat
          label="Needs Attention"
          value={
            attention.reviews +
            attention.inquiries +
            attention.testimonials
          }
        />
      </div>

      <Activity items={activity} />
    </section>
  );
}

function Stat({ label: statLabel, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-slate-400">
        {statLabel}
      </p>
      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function Activity({ items }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5">
        <h3 className="text-lg font-bold">
          Recent Activity
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          The latest activity across your website.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4"
            >
              <div>
                <p className="font-semibold">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.type} • {label(item.status)}
                </p>
              </div>

              <p className="text-xs text-slate-500">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : "Unknown date"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Portfolio({
  portfolio,
  setMessage,
  reload,
}) {
  const [mode, setMode] = useState("new");
  const [selectedId, setSelectedId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("welcome");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [videoFile, setVideoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const selectedProject =
    portfolio.find(
      (item) => String(item.id) === String(selectedId)
    ) || null;

  function startNew() {
    setMode("new");
    setSelectedId(null);
    setTitle("");
    setDescription("");
    setCategory("welcome");
    setDisplayOrder(1);
    setVideoFile(null);
    setMessage("");
  }

  function editProject(project) {
    setMode("edit");
    setSelectedId(project.id);
    setTitle(project.title || "");
    setDescription(project.description || "");
    setCategory(project.category || "welcome");
    setDisplayOrder(project.display_order || 1);
    setVideoFile(null);
    setMessage("");
  }

  async function saveProject() {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter a project title.");
      return;
    }

    if (mode === "new" && !videoFile) {
      setMessage("Please choose a project video.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      let videoUrl = selectedProject?.video_url || null;

      if (videoFile) {
        const extension =
          videoFile.name.split(".").pop()?.toLowerCase() || "mp4";

        const safeName =
          title
            .trim()
            .replace(/[^a-z0-9]+/gi, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

        const filePath =
          `portfolio/${safeName}-${Date.now()}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("portfolio-videos")
            .upload(filePath, videoFile, {
              cacheControl: "3600",
              upsert: false,
              contentType: videoFile.type || "video/mp4",
            });

        if (uploadError) {
          throw new Error(
            uploadError.message ||
              "The project video could not be uploaded."
          );
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("portfolio-videos")
            .getPublicUrl(filePath);

        videoUrl = publicUrlData?.publicUrl || null;
      }

      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        category,
        video_url: videoUrl,
        display_order: Number(displayOrder) || 1,
      };

      let result;

      if (mode === "new") {
        result = await supabase
          .from("portfolio_projects")
          .insert(payload);
      } else {
        result = await supabase
          .from("portfolio_projects")
          .update(payload)
          .eq("id", selectedId);
      }

      if (result?.error) {
        throw new Error(result.error.message);
      }

      setMessage(
        mode === "new"
          ? "Portfolio project added successfully."
          : "Portfolio project updated successfully."
      );

      await reload();
      startNew();
    } catch (error) {
      console.error("Portfolio save error:", error);
      setMessage(
        error?.message ||
          "The portfolio project could not be saved."
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeProject(project) {
    if (!project?.id) return;

    const confirmed = confirm(
      `Remove "${project.title}" from the portfolio?`
    );

    if (!confirmed) return;

    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("portfolio_projects")
        .delete()
        .eq("id", project.id);

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Portfolio project removed successfully.");

      await reload();
      startNew();
    } catch (error) {
      console.error("Portfolio removal error:", error);
      setMessage(
        error?.message ||
          "The portfolio project could not be removed."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Portfolio
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Manage portfolio projects
        </h2>

        <p className="mt-3 max-w-3xl text-slate-400">
          Add and update the project videos shown across your
          website.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">
                {mode === "new"
                  ? "Add Project"
                  : "Edit Project"}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Upload the project video and add the details.
              </p>
            </div>

            {mode === "edit" ? (
              <Button
                variant="ghost"
                onClick={startNew}
              >
                New
              </Button>
            ) : null}
          </div>

          <div className="space-y-5">
            <Field
              label="Project Title"
              value={title}
              onChange={setTitle}
              placeholder="Welcome System"
            />

            <Field
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Short description of this project."
              textarea
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
              >
                {portfolioSlots.map((slot) => (
                  <option
                    key={slot.id}
                    value={slot.id}
                  >
                    {slot.title}
                  </option>
                ))}
              </select>
            </div>

            <Field
              label="Display Order"
              value={displayOrder}
              onChange={setDisplayOrder}
              type="number"
              min="1"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Project Video
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={(event) =>
                  setVideoFile(
                    event.target.files?.[0] || null
                  )
                }
                className="block w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300"
              />

              {mode === "edit" && selectedProject?.video_url ? (
                <p className="mt-2 text-xs text-slate-500">
                  Leave this empty to keep the current video.
                </p>
              ) : null}
            </div>

            <Button
              onClick={saveProject}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : mode === "new"
                ? "Add Project"
                : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold">
              Current Projects
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Select a project to edit it.
            </p>
          </div>

          {portfolio.length === 0 ? (
            <p className="text-sm text-slate-400">
              No portfolio projects yet.
            </p>
          ) : (
            <div className="space-y-3">
              {portfolio.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {project.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {project.category || "Other"} • Order{" "}
                        {project.display_order || 0}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          editProject(project)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() =>
                          removeProject(project)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Testimonials({
  testimonials,
  setMessage,
  reload,
}) {
  const [mode, setMode] = useState("new");
  const [selectedId, setSelectedId] = useState(null);

  const [clientName, setClientName] = useState("");
  const [communityProject, setCommunityProject] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [writtenTestimonial, setWrittenTestimonial] =
    useState("");
  const [discordInviteUrl, setDiscordInviteUrl] =
    useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const selectedTestimonial =
    testimonials.find(
      (item) => String(item.id) === String(selectedId)
    ) || null;

  function startNew(clearMessage = true) {
    setMode("new");
    setSelectedId(null);
    setClientName("");
    setCommunityProject("");
    setShortDescription("");
    setWrittenTestimonial("");
    setDiscordInviteUrl("");
    setDisplayOrder(0);
    setPublished(true);
    setVideoFile(null);

    if (clearMessage) {
      setMessage("");
    }
  }

  function editTestimonial(testimonial) {
    setMode("edit");
    setSelectedId(testimonial.id);
    setClientName(testimonial.client_name || "");
    setCommunityProject(
      testimonial.community_project || ""
    );
    setShortDescription(
      testimonial.short_description || ""
    );
    setWrittenTestimonial(
      testimonial.written_testimonial || ""
    );
    setDiscordInviteUrl(
      testimonial.discord_invite_url || ""
    );
    setDisplayOrder(
      testimonial.display_order || 0
    );
    setPublished(
      testimonial.is_published ?? true
    );
    setVideoFile(null);
    setMessage("");
  }

  async function saveTestimonial() {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }

    if (!clientName.trim()) {
      setMessage("Please enter the client name.");
      return;
    }

    if (!communityProject.trim()) {
      setMessage(
        "Please enter the community or project name."
      );
      return;
    }

    if (mode === "new" && !videoFile) {
      setMessage(
        "Please choose a testimonial video."
      );
      return;
    }

    if (
      discordInviteUrl.trim() &&
      !/^https?:\/\//i.test(
        discordInviteUrl.trim()
      )
    ) {
      setMessage(
        "The Discord invite must begin with https:// or http://"
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      let videoUrl =
        selectedTestimonial?.video_url || null;

      if (videoFile) {
        const extension =
          videoFile.name
            .split(".")
            .pop()
            ?.toLowerCase() || "mp4";

        const safeName =
          clientName
            .trim()
            .replace(/[^a-z0-9]+/gi, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

        const filePath =
          `testimonials/${safeName}-${Date.now()}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("client-testimonials")
            .upload(filePath, videoFile, {
              cacheControl: "3600",
              upsert: false,
              contentType:
                videoFile.type || "video/mp4",
            });

        if (uploadError) {
          throw new Error(
            uploadError.message ||
              "The testimonial video could not be uploaded."
          );
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("client-testimonials")
            .getPublicUrl(filePath);

        videoUrl =
          publicUrlData?.publicUrl || null;
      }

      const payload = {
        client_name: clientName.trim(),
        community_project:
          communityProject.trim(),
        video_url: videoUrl,
        short_description:
          shortDescription.trim() || null,
        written_testimonial:
          writtenTestimonial.trim() || null,
        discord_invite_url:
          discordInviteUrl.trim() || null,
        is_published: published,
        display_order:
          Number(displayOrder) || 0,
      };

      let result;

      if (mode === "new") {
        result = await supabase
          .from("client_testimonials")
          .insert(payload);
      } else {
        result = await supabase
          .from("client_testimonials")
          .update(payload)
          .eq("id", selectedId);
      }

      if (result?.error) {
        throw new Error(result.error.message);
      }

      const successMessage =
        mode === "new"
          ? "Testimonial added successfully."
          : "Testimonial updated successfully.";

      await reload();

      startNew(false);
      setMessage(successMessage);
    } catch (error) {
      console.error(
        "Testimonial save error:",
        error
      );

      setMessage(
        error?.message ||
          "The testimonial could not be saved."
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeTestimonial(testimonial) {
    if (!testimonial?.id) return;

    const confirmed = confirm(
      `Remove "${testimonial.client_name}" testimonial from the website?`
    );

    if (!confirmed) return;

    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("client_testimonials")
        .delete()
        .eq("id", testimonial.id);

      if (error) {
        throw new Error(error.message);
      }

      await reload();

      startNew(false);
      setMessage(
        "Testimonial removed successfully."
      );
    } catch (error) {
      console.error(
        "Testimonial removal error:",
        error
      );

      setMessage(
        error?.message ||
          "The testimonial could not be removed."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Testimonials
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Manage client testimonials
        </h2>

        <p className="mt-3 max-w-3xl text-slate-400">
          Upload client testimonial videos and add the
          information visitors will see on the Testimonials
          page.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">
                {mode === "new"
                  ? "Add Testimonial"
                  : "Edit Testimonial"}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Add the client information and testimonial
                video.
              </p>
            </div>

            {mode === "edit" ? (
              <Button
                variant="ghost"
                onClick={() => startNew()}
              >
                New
              </Button>
            ) : null}
          </div>

          <div className="space-y-5">
            <Field
              label="Client Name"
              value={clientName}
              onChange={setClientName}
              placeholder="Client name"
            />

            <Field
              label="Community / Project"
              value={communityProject}
              onChange={setCommunityProject}
              placeholder="Community or project name"
            />

            <Field
              label="Short Description"
              value={shortDescription}
              onChange={setShortDescription}
              placeholder="Short description of their experience."
              textarea
            />

            <Field
              label="Written Testimonial"
              value={writtenTestimonial}
              onChange={setWrittenTestimonial}
              placeholder="Optional written testimonial."
              textarea
            />

            <Field
              label="Discord Invite Link"
              value={discordInviteUrl}
              onChange={setDiscordInviteUrl}
              placeholder="https://discord.gg/example"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200">
                Testimonial Video
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={(event) =>
                  setVideoFile(
                    event.target.files?.[0] || null
                  )
                }
                className="block w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300"
              />

              {mode === "edit" &&
              selectedTestimonial?.video_url ? (
                <p className="mt-2 text-xs text-slate-500">
                  Leave this empty to keep the current
                  video.
                </p>
              ) : null}
            </div>

            <Field
              label="Display Order"
              value={displayOrder}
              onChange={setDisplayOrder}
              type="number"
              min="0"
            />

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4">
              <input
                type="checkbox"
                checked={published}
                onChange={(event) =>
                  setPublished(
                    event.target.checked
                  )
                }
                className="h-4 w-4"
              />

              <span>
                <span className="block text-sm font-semibold">
                  Publish on website
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Turn this off if you want to keep the
                  testimonial hidden.
                </span>
              </span>
            </label>

            <Button
              onClick={saveTestimonial}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : mode === "new"
                ? "Add Testimonial"
                : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold">
              Current Testimonials
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Select a testimonial to edit it.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-center">
              <p className="font-semibold">
                No testimonials yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Add your first client testimonial using
                the form.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">
                          {testimonial.client_name}
                        </p>

                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            testimonial.is_published
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-slate-400/10 text-slate-400"
                          }`}
                        >
                          {testimonial.is_published
                            ? "Published"
                            : "Hidden"}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {testimonial.community_project}
                      </p>

                      {testimonial.short_description ? (
                        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                          {testimonial.short_description}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          editTestimonial(
                            testimonial
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() =>
                          removeTestimonial(
                            testimonial
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Notifications({
  attention,
  activity,
}) {
  const notifications = [
    attention.reviews > 0
      ? `${attention.reviews} review${
          attention.reviews === 1 ? "" : "s"
        } waiting for attention.`
      : null,

    attention.inquiries > 0
      ? `${attention.inquiries} new project ${
          attention.inquiries === 1
            ? "inquiry"
            : "inquiries"
        } waiting for attention.`
      : null,

    attention.testimonials > 0
      ? `${attention.testimonials} hidden testimonial${
          attention.testimonials === 1 ? "" : "s"
        } in the dashboard.`
      : null,
  ].filter(Boolean);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Notifications
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Website activity
        </h2>
      </div>

      <div className="grid gap-4">
        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="font-semibold">
              Everything is up to date.
            </p>

            <p className="mt-2 text-sm text-slate-400">
              There is nothing waiting for your attention.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification}
              className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 text-cyan-100"
            >
              {notification}
            </div>
          ))
        )}
      </div>

      <Activity items={activity} />
    </section>
  );
}

function Reviews({
  reviews,
  filter,
  setFilter,
  reviewCounts,
  reviewStatus,
  deleteReview,
}) {
  const visibleReviews =
    filter === "all"
      ? reviews
      : reviews.filter(
          (item) => item.status === filter
        );

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Reviews
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Manage client reviews
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          ALL {reviews.length}
        </FilterButton>

        {reviewStatuses.map((status) => (
          <FilterButton
            key={status}
            active={filter === status}
            onClick={() => setFilter(status)}
          >
            {label(status)}{" "}
            {reviewCounts[status] || 0}
          </FilterButton>
        ))}
      </div>

      {visibleReviews.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="font-semibold">
            No reviews found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-lg font-bold">
                    {review.name ||
                      review.email ||
                      "Client"}
                  </p>

                  {review.email ? (
                    <p className="mt-1 text-sm text-slate-500">
                      {review.email}
                    </p>
                  ) : null}
                </div>

                <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                  {label(review.status)}
                </span>
              </div>

              {review.rating ? (
                <p className="mt-4 text-cyan-300">
                  {"★".repeat(
                    Math.max(
                      0,
                      Math.min(
                        5,
                        Number(review.rating)
                      )
                    )
                  )}
                </p>
              ) : null}

              {review.message ? (
                <p className="mt-4 whitespace-pre-wrap text-slate-300">
                  {review.message}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {review.status !== "approved" ? (
                  <Button
                    onClick={() =>
                      reviewStatus(
                        review.id,
                        "approved"
                      )
                    }
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      reviewStatus(
                        review.id,
                        "pending"
                      )
                    }
                  >
                    Move to Pending
                  </Button>
                )}

                <Button
                  variant="secondary"
                  onClick={() =>
                    deleteReview(review.id)
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Inquiries({
  inquiries,
  inquiryCounts,
  inquiryStatus,
  inquiryNote,
}) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Project Inquiries
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Manage incoming projects
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {inquiryStatuses.map((status) => (
          <div
            key={status}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <p className="text-xs text-slate-500">
              {label(status)}
            </p>

            <p className="mt-1 text-xl font-bold">
              {inquiryCounts[status] || 0}
            </p>
          </div>
        ))}
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="font-semibold">
            No project inquiries yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              inquiryStatus={inquiryStatus}
              inquiryNote={inquiryNote}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function InquiryCard({
  inquiry,
  inquiryStatus,
  inquiryNote,
}) {
  const [notes, setNotes] = useState(
    inquiry.admin_notes || ""
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h3 className="text-lg font-bold">
            {inquiry.name ||
              inquiry.email ||
              "Project Inquiry"}
          </h3>

          {inquiry.email ? (
            <p className="mt-1 text-sm text-slate-500">
              {inquiry.email}
            </p>
          ) : null}
        </div>

        <select
          value={inquiry.status || "new"}
          onChange={(event) =>
            inquiryStatus(
              inquiry.id,
              event.target.value
            )
          }
          className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          {inquiryStatuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {label(status)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Info
          label="Project Type"
          value={
            inquiry.project_type ||
            inquiry.service ||
            "Not provided"
          }
        />

        <Info
          label="Budget"
          value={
            inquiry.budget ||
            "Not provided"
          }
        />

        <Info
          label="Timeline"
          value={
            inquiry.timeline ||
            "Not provided"
          }
        />

        <Info
          label="Created"
          value={
            inquiry.created_at
              ? new Date(
                  inquiry.created_at
                ).toLocaleString()
              : "Unknown"
          }
        />
      </div>

      {inquiry.message ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Message
          </p>

          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
            {inquiry.message}
          </p>
        </div>
      ) : null}

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold">
          Admin Notes
        </label>

        <textarea
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          rows={4}
          placeholder="Internal notes about this project."
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        />

        <div className="mt-3">
          <Button
            variant="ghost"
            onClick={() =>
              inquiryNote(
                inquiry.id,
                notes
              )
            }
          >
            Save Notes
          </Button>
        </div>
      </div>
    </div>
  );
}

function Info({ label: infoLabel, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {infoLabel}
      </p>

      <p className="mt-2 text-sm text-slate-200">
        {value}
      </p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label: fieldLabel,
  value,
  onChange,
  placeholder,
  textarea = false,
  type = "text",
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-200">
        {fieldLabel}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          min={min}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600"
        />
      )}
    </div>
  );
}
