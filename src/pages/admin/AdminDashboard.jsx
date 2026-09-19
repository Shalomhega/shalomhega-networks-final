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
  {
    id: "welcome",
    title: "Welcome System",
    displayOrder: 1,
  },
  {
    id: "community-structure",
    title: "Community Structure",
    displayOrder: 2,
  },
  {
    id: "rules",
    title: "Rules System",
    displayOrder: 3,
  },
  {
    id: "role-selection",
    title: "Role Selection System",
    displayOrder: 4,
  },
  {
    id: "faq",
    title: "FAQ System",
    displayOrder: 5,
  },
  {
    id: "verification",
    title: "Verification System",
    displayOrder: 6,
  },
];

const label = (value = "") =>
  value.replaceAll("_", " ").toUpperCase();

function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [tab, setTab] = useState("overview");

  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } =
      await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(user);

    const [
      reviewsResult,
      inquiriesResult,
      portfolioResult,
    ] = await Promise.all([
      supabase
        .from("reviews")
        .select("*")
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("project_inquiries")
        .select("*")
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        }),
    ]);

    if (!reviewsResult.error) {
      setReviews(reviewsResult.data || []);
    }

    if (!inquiriesResult.error) {
      setInquiries(inquiriesResult.data || []);
    }

    if (!portfolioResult.error) {
      setPortfolio(portfolioResult.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel("admin-control-center")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        load
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "project_inquiries",
        },
        load
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "portfolio_projects",
        },
        load
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const reviewCounts = useMemo(
    () => ({
      pending: reviews.filter(
        (review) => review.approved !== true
      ).length,

      approved: reviews.filter(
        (review) => review.approved === true
      ).length,
    }),
    [reviews]
  );

  const inquiryCounts = useMemo(
    () =>
      Object.fromEntries(
        inquiryStatuses.map((status) => [
          status,
          inquiries.filter(
            (inquiry) =>
              inquiry.status === status
          ).length,
        ])
      ),
    [inquiries]
  );

  const attention = [
    {
      type: "review",
      title: "Pending reviews",
      count: reviewCounts.pending,
      go: () => {
        setTab("reviews");
        setFilter("pending");
      },
    },
    {
      type: "inquiry",
      title: "New project inquiries",
      count: inquiryCounts.new,
      go: () => {
        setTab("inquiries");
        setFilter("new");
      },
    },
    {
      type: "discussion",
      title: "Active discussions",
      count: inquiryCounts.in_discussion,
      go: () => {
        setTab("inquiries");
        setFilter("in_discussion");
      },
    },
  ].filter((item) => item.count > 0);

  const activity = useMemo(
    () =>
      [
        ...reviews.map((review) => ({
          time: review.created_at,
          title:
            review.approved === true
              ? "Review approved"
              : "New review submitted",
          detail: review.name,
          go: () => {
            setTab("reviews");
            setFilter(
              review.approved === true
                ? "approved"
                : "pending"
            );
          },
        })),

        ...inquiries.map((inquiry) => ({
          time:
            inquiry.updated_at ||
            inquiry.created_at,
          title:
            inquiry.status === "new"
              ? "New project inquiry received"
              : `Project status updated to ${label(
                  inquiry.status
                )}`,
          detail: inquiry.name,
          go: () => {
            setTab("inquiries");
            setFilter(inquiry.status);
          },
        })),
      ]
        .sort(
          (a, b) =>
            new Date(b.time) -
            new Date(a.time)
        )
        .slice(0, 8),
    [reviews, inquiries]
  );

  async function reviewStatus(id, status) {
    if (status === "approved") {
      const { error } = await supabase
        .from("reviews")
        .update({
          approved: true,
        })
        .eq("id", id);

      setMessage(
        error
          ? `Review could not be approved: ${error.message}`
          : "Review approved successfully."
      );

      if (!error) {
        await load();
      }

      return;
    }

    if (status === "pending") {
      const { error } = await supabase
        .from("reviews")
        .update({
          approved: false,
        })
        .eq("id", id);

      setMessage(
        error
          ? `Review could not be unpublished: ${error.message}`
          : "Review unpublished successfully."
      );

      if (!error) {
        await load();
      }
    }
  }

  async function deleteReview(id) {
    if (
      !confirm(
        "Reject and delete this review permanently? This cannot be undone."
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    setMessage(
      error
        ? `Review could not be rejected: ${error.message}`
        : "Review rejected and deleted successfully."
    );

    if (!error) {
      await load();
    }
  }

  async function inquiryStatus(id, status) {
    const { error } = await supabase
      .from("project_inquiries")
      .update({
        status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id);

    setMessage(
      error
        ? "Inquiry could not be updated."
        : "Inquiry updated successfully."
    );

    if (!error) {
      await load();
    }
  }

  async function note(id, notes) {
    const { error } = await supabase
      .from("project_inquiries")
      .update({
        notes,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id);

    setMessage(
      error
        ? "Notes could not be saved."
        : "Internal notes saved."
    );

    if (!error) {
      await load();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    nav("/admin");
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="min-h-screen bg-background p-10 text-ink">
        Supabase is not configured.
      </main>
    );
  }

  if (user === null) {
    return <Navigate to="/admin" replace />;
  }

  const navs = [
    ["overview", "OVERVIEW"],
    ["portfolio", "PORTFOLIO"],
    ["reviews", "REVIEWS"],
    ["inquiries", "PROJECT INQUIRIES"],
    ["notifications", "NOTIFICATIONS"],
  ];

  return (
    <main className="min-h-screen bg-background text-ink">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-cyan">
              SHALOMHEGA NETWORKS
            </p>

            <h1 className="font-semibold">
              ADMIN CONTROL CENTER
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setTab("notifications")
              }
              className="relative rounded-xl border border-border px-4 py-2 text-sm"
            >
              NOTIFICATIONS

              {attention.length > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-purple px-2 py-0.5 text-xs">
                  {attention.length}
                </span>
              )}
            </button>

            <Button
              variant="secondary"
              onClick={logout}
            >
              LOGOUT
            </Button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-2 overflow-auto px-5 pb-3">
          {navs.map(([id, text]) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);

                if (id === "reviews") {
                  setFilter("pending");
                }

                if (id === "inquiries") {
                  setFilter("new");
                }
              }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                tab === id
                  ? "bg-purple text-ink"
                  : "border border-border text-ink-muted"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        {message && (
          <div className="mb-6 flex justify-between rounded-xl border border-border bg-surface p-4 text-sm text-ink-muted">
            <span>{message}</span>

            <button
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
        )}

        {loading ? (
          <Skeleton />
        ) : tab === "overview" ? (
          <Overview
            rc={reviewCounts}
            ic={inquiryCounts}
            attention={attention}
            activity={activity}
            setTab={setTab}
          />
        ) : tab === "portfolio" ? (
          <Portfolio
            portfolio={portfolio}
            setMessage={setMessage}
            reload={load}
          />
        ) : tab === "reviews" ? (
          <Reviews
            reviews={reviews}
            counts={reviewCounts}
            filter={filter}
            setFilter={setFilter}
            action={reviewStatus}
            remove={deleteReview}
          />
        ) : tab === "inquiries" ? (
          <Inquiries
            inquiries={inquiries}
            statuses={inquiryStatuses}
            counts={inquiryCounts}
            filter={filter}
            setFilter={setFilter}
            change={inquiryStatus}
            saveNote={note}
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
    <div className="grid gap-4">
      <div className="h-32 animate-pulse rounded-2xl bg-surface" />
      <div className="h-48 animate-pulse rounded-2xl bg-surface" />
    </div>
  );
}

function Overview({
  rc,
  ic,
  attention,
  activity,
  setTab,
}) {
  return (
    <div className="grid gap-8">
      <section>
        <p className="text-sm text-ink-muted">
          Manage community feedback, project inquiries,
          portfolio work, and important activity from one
          organized place.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            REQUIRES YOUR ATTENTION
          </h2>
        </div>

        {attention.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {attention.map((item) => (
              <button
                onClick={item.go}
                key={item.title}
                className="rounded-2xl border border-purple/40 bg-surface p-6 text-left transition hover:-translate-y-0.5"
              >
                <p className="text-xs uppercase tracking-widest text-cyan">
                  {item.title}
                </p>

                <p className="mt-3 text-4xl font-bold">
                  {item.count}
                </p>

                <p className="mt-3 text-sm text-ink-muted">
                  Open and manage this area.
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-ink-muted">
            Everything is currently organized. There
            are no new items requiring attention.
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Stat
          title="PENDING REVIEWS"
          value={rc.pending}
        />

        <Stat
          title="NEW INQUIRIES"
          value={ic.new}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold">
          RECENT ACTIVITY
        </h2>

        <Activity items={activity} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => setTab("reviews")}
          className="rounded-2xl border border-border bg-surface p-6 text-left font-semibold"
        >
          MANAGE REVIEWS
        </button>

        <button
          onClick={() => setTab("inquiries")}
          className="rounded-2xl border border-border bg-surface p-6 text-left font-semibold"
        >
          VIEW PROJECT INQUIRIES
        </button>
      </section>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <p className="text-xs tracking-widest text-ink-muted">
        {title}
      </p>

      <p className="mt-2 text-4xl font-bold">
        {value || 0}
      </p>
    </div>
  );
}

function Activity({ items }) {
  return (
    <div className="mt-4 grid gap-3">
      {items.length ? (
        items.map((item, index) => (
          <button
            onClick={item.go}
            key={index}
            className="rounded-xl border border-border bg-surface p-4 text-left"
          >
            <b>{item.title}</b>

            <p className="text-sm text-ink-muted">
              {item.detail} ·{" "}
              {new Date(
                item.time
              ).toLocaleString()}
            </p>
          </button>
        ))
      ) : (
        <div className="rounded-xl border border-dashed border-border p-6 text-ink-muted">
          You are up to date.
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PORTFOLIO MANAGEMENT
========================================================= */

function Portfolio({
  portfolio,
  setMessage,
  reload,
}) {
  const [selectedSlot, setSelectedSlot] =
    useState(portfolioSlots[0].id);

  const [selectedProjectId, setSelectedProjectId] =
    useState(null);

  const [mode, setMode] = useState("new");

  const selectedSlotData =
    portfolioSlots.find(
      (slot) => slot.id === selectedSlot
    ) || portfolioSlots[0];

  const slotProjects = portfolio
    .filter(
      (project) =>
        project.display_order ===
        selectedSlotData.displayOrder
    )
    .sort(
      (a, b) =>
        new Date(b.created_at || 0) -
        new Date(a.created_at || 0)
    );

  const selectedProject =
    slotProjects.find(
      (project) =>
        String(project.id) ===
        String(selectedProjectId)
    ) || null;

  const [title, setTitle] = useState(
    selectedSlotData.title
  );

  const [description, setDescription] =
    useState("");

  const [videoFile, setVideoFile] =
    useState(null);

  const [published, setPublished] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  function startNewVideo() {
    setMode("new");
    setSelectedProjectId(null);
    setTitle(selectedSlotData.title);
    setDescription("");
    setPublished(true);
    setVideoFile(null);
    setMessage("");
  }

  function editProject(project) {
    setMode("edit");
    setSelectedProjectId(project.id);
    setTitle(project.title || "");
    setDescription(
      project.description || ""
    );
    setPublished(
      project.is_published ?? true
    );
    setVideoFile(null);
    setMessage("");
  }

  useEffect(() => {
    setMode("new");
    setSelectedProjectId(null);
    setTitle(selectedSlotData.title);
    setDescription("");
    setPublished(true);
    setVideoFile(null);
  }, [
    selectedSlotData.id,
    selectedSlotData.title,
  ]);

  async function savePortfolio() {
    if (!supabase) {
      setMessage(
        "Supabase is not configured."
      );
      return;
    }

    if (!title.trim()) {
      setMessage(
        "Please enter a portfolio title."
      );
      return;
    }

    if (mode === "new" && !videoFile) {
      setMessage(
        "Please choose a video before adding a new portfolio item."
      );
      return;
    }

    if (mode === "edit" && !selectedProject) {
      setMessage(
        "Please select an existing video to edit."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      let mediaUrl =
        selectedProject?.media_url || null;

      if (videoFile) {
        const extension =
          videoFile.name
            .split(".")
            .pop()
            ?.toLowerCase() || "mp4";

        const safeSlot = selectedSlot
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-|-$/g, "");

        const filePath =
          `portfolio/${safeSlot}-${Date.now()}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("portfolio-videos")
            .upload(
              filePath,
              videoFile,
              {
                cacheControl: "3600",
                upsert: false,
                contentType:
                  videoFile.type ||
                  "video/mp4",
              }
            );

        if (uploadError) {
          throw new Error(
            uploadError.message ||
              "The video could not be uploaded."
          );
        }

        const {
          data: publicUrlData,
        } = supabase.storage
          .from("portfolio-videos")
          .getPublicUrl(filePath);

        mediaUrl =
          publicUrlData?.publicUrl ||
          null;
      }

      const payload = {
        title: title.trim(),
        description:
          description.trim(),
        category: "Systems",
        media_url: mediaUrl,
        media_type: "video",
        display_order:
          selectedSlotData.displayOrder,
        is_published: published,
      };

      let result;

      /*
       * NEW VIDEO
       *
       * Always INSERT.
       * This is the important change.
       * It will never replace an existing video.
       */
      if (mode === "new") {
        result = await supabase
          .from("portfolio_projects")
          .insert(payload);
      }

      /*
       * EXISTING VIDEO
       *
       * Only UPDATE when the user deliberately
       * selected an existing video.
       */
      if (mode === "edit") {
        result = await supabase
          .from("portfolio_projects")
          .update(payload)
          .eq(
            "id",
            selectedProject.id
          );
      }

      if (result?.error) {
        throw new Error(
          result.error.message
        );
      }

      setMessage(
        mode === "new"
          ? `${selectedSlotData.title} video added successfully. Existing videos were kept.`
          : `${selectedSlotData.title} video updated successfully.`
      );

      setVideoFile(null);

      await reload();

      /*
       * After adding a new video, reset the form
       * so the next upload is another NEW video.
       */
      if (mode === "new") {
        setMode("new");
        setSelectedProjectId(null);
        setTitle(selectedSlotData.title);
        setDescription("");
        setPublished(true);
      }
    } catch (error) {
      console.error(
        "Portfolio save error:",
        error
      );

      setMessage(
        error?.message ||
          "The portfolio update could not be completed."
      );
    } finally {
      setSaving(false);
    }
  }

  async function removePortfolio(project) {
    if (!project?.id) {
      setMessage(
        "There is no portfolio item selected."
      );
      return;
    }

    const confirmed = confirm(
      `Remove "${project.title}" from the website?`
    );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("portfolio_projects")
        .delete()
        .eq("id", project.id);

      if (error) {
        throw new Error(
          error.message
        );
      }

      setMessage(
        `"${project.title}" was removed from the website.`
      );

      setSelectedProjectId(null);
      setMode("new");
      setTitle(selectedSlotData.title);
      setDescription("");
      setPublished(true);
      setVideoFile(null);

      await reload();
    } catch (error) {
      console.error(
        "Portfolio removal error:",
        error
      );

      setMessage(
        error?.message ||
          "The portfolio item could not be removed."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[.2em] text-cyan">
          PORTFOLIO MANAGEMENT
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          MANAGE OUR WORK
        </h2>

        <p className="mt-3 max-w-2xl text-ink-muted">
          Add multiple videos to each community system
          without replacing existing work. Select an
          existing video only when you want to edit it.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 text-xs font-semibold tracking-widest text-ink-muted">
            PORTFOLIO SECTIONS
          </p>

          <div className="grid gap-2">
            {portfolioSlots.map((slot) => {
              const count =
                portfolio.filter(
                  (item) =>
                    item.display_order ===
                    slot.displayOrder
                ).length;

              return (
                <button
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(
                      slot.id
                    );
                  }}
                  className={`rounded-xl px-4 py-3 text-left text-sm transition ${
                    selectedSlot === slot.id
                      ? "bg-purple text-ink"
                      : "border border-border text-ink-muted hover:text-ink"
                  }`}
                >
                  <span className="block font-semibold">
                    {slot.title}
                  </span>

                  <span className="mt-1 block text-xs opacity-70">
                    {count === 0
                      ? "No videos yet"
                      : `${count} ${
                          count === 1
                            ? "video"
                            : "videos"
                        }`}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-widest text-cyan">
              SELECTED SECTION
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {selectedSlotData.title}
            </h3>
          </div>

          {slotProjects.length > 0 && (
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-ink-muted">
                    EXISTING VIDEOS
                  </p>

                  <p className="mt-1 text-sm text-ink-muted">
                    Select a video if you want to edit or remove it.
                  </p>
                </div>

                <Button
                  variant="secondary"
                  onClick={startNewVideo}
                  disabled={saving}
                >
                  + ADD NEW VIDEO
                </Button>
              </div>

              <div className="grid gap-3">
                {slotProjects.map(
                  (project, index) => (
                    <div
                      key={project.id}
                      className={`rounded-xl border p-4 ${
                        selectedProjectId ===
                        project.id
                          ? "border-cyan bg-cyan/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            editProject(
                              project
                            )
                          }
                          className="flex min-w-0 flex-1 items-center gap-3 text-left"
                        >
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-purple/20 text-sm font-bold">
                            {index + 1}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold">
                              {project.title}
                            </p>

                            <p className="mt-1 text-xs text-ink-muted">
                              {project.is_published
                                ? "Published"
                                : "Not published"}
                            </p>
                          </div>
                        </button>

                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              editProject(
                                project
                              )
                            }
                            disabled={saving}
                          >
                            EDIT
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() =>
                              removePortfolio(
                                project
                              )
                            }
                            disabled={saving}
                          >
                            REMOVE
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {slotProjects.length === 0 && (
            <div className="mb-6 rounded-xl border border-dashed border-border p-5 text-sm text-ink-muted">
              No videos have been added to this section yet.
              Add your first video below.
            </div>
          )}

          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-cyan">
                {mode === "new"
                  ? "NEW VIDEO"
                  : "EDITING VIDEO"}
              </p>

              <p className="mt-1 text-sm text-ink-muted">
                {mode === "new"
                  ? "This will create a new portfolio item and keep all existing videos."
                  : "Changes will only affect the selected video."}
              </p>
            </div>

            {mode === "edit" && (
              <Button
                variant="secondary"
                onClick={startNewVideo}
                disabled={saving}
              >
                + NEW VIDEO
              </Button>
            )}
          </div>

          <div className="grid gap-6">
            <div>
              <label className="text-sm font-semibold">
                TITLE
              </label>

              <input
                value={title}
                onChange={(event) =>
                  setTitle(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-border bg-background p-3"
                placeholder="Portfolio title"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                DESCRIPTION
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                className="mt-2 min-h-32 w-full rounded-xl border border-border bg-background p-3"
                placeholder="Explain what this system does and how it helps the community."
              />
            </div>

            {mode === "edit" &&
              selectedProject?.media_url && (
                <div>
                  <label className="text-sm font-semibold">
                    CURRENT VIDEO
                  </label>

                  <video
                    src={
                      selectedProject.media_url
                    }
                    controls
                    playsInline
                    preload="metadata"
                    className="mt-2 max-h-96 w-full rounded-xl border border-border bg-black"
                  />
                </div>
              )}

            <div>
              <label className="text-sm font-semibold">
                {mode === "edit"
                  ? "REPLACE THIS VIDEO (OPTIONAL)"
                  : "UPLOAD NEW VIDEO"}
              </label>

              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={(event) =>
                  setVideoFile(
                    event.target.files?.[0] ||
                      null
                  )
                }
                className="mt-2 block w-full rounded-xl border border-border bg-background p-3 text-sm"
              />

              {videoFile && (
                <p className="mt-2 text-sm text-cyan">
                  Selected:{" "}
                  {videoFile.name}
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-ink-muted">
                MP4 is recommended for your portfolio videos.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4">
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
                <span className="block font-semibold">
                  Publish on Our Work
                </span>

                <span className="block text-sm text-ink-muted">
                  When enabled, this portfolio video will be visible publicly.
                </span>
              </span>
            </label>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={savePortfolio}
                disabled={saving}
              >
                {saving
                  ? "SAVING..."
                  : mode === "new"
                  ? "ADD NEW VIDEO"
                  : "SAVE CHANGES"}
              </Button>

              {mode === "edit" &&
                selectedProject && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      removePortfolio(
                        selectedProject
                      )
                    }
                    disabled={saving}
                  >
                    REMOVE VIDEO
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notifications({
  attention,
  activity,
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold">
        NOTIFICATIONS
      </h2>

      <p className="mt-2 text-ink-muted">
        Important items and recent real activity from
        your system.
      </p>

      {attention.length ? (
        <div className="mt-5 grid gap-3">
          {attention.map((item) => (
            <button
              key={item.title}
              onClick={item.go}
              className="rounded-xl border border-purple/40 bg-surface p-5 text-left"
            >
              <b>
                {item.count}{" "}
                {item.title.toLowerCase()}
              </b>

              <p className="text-sm text-ink-muted">
                Open the relevant management area.
              </p>
            </button>
          ))}
        </div>
      ) : null}

      <Activity items={activity} />
    </section>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function Reviews({
  reviews,
  counts,
  filter,
  setFilter,
  action,
  remove,
}) {
  const visible =
    filter === "pending"
      ? reviews.filter(
          (review) =>
            review.approved !== true
        )
      : filter === "approved"
      ? reviews.filter(
          (review) =>
            review.approved === true
        )
      : reviews;

  return (
    <section>
      <h2 className="text-2xl font-bold">
        REVIEWS
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {reviewStatuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilter(status)
            }
            className={`rounded-full border px-4 py-2 text-sm ${
              filter === status
                ? "border-cyan bg-cyan/10"
                : "border-border"
            }`}
          >
            {label(status)}{" "}
            {counts[status] || 0}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5">
        {visible.length ? (
          visible.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex items-center gap-3">
                  {review.profile_image_url ? (
                    <img
                      src={
                        review.profile_image_url
                      }
                      className="h-12 w-12 rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-purple/20 text-lg">
                      {review.name?.[0]?.toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold">
                      {review.name}
                    </h3>

                    <p className="text-sm text-cyan">
                      {review.project_type}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs ${
                    review.approved === true
                      ? "border-cyan text-cyan"
                      : "border-purple text-purple"
                  }`}
                >
                  {review.approved === true
                    ? "APPROVED"
                    : "PENDING"}
                </span>
              </div>

              <div className="mt-4 flex gap-1 text-sm text-yellow-300">
                {"★".repeat(
                  Number(review.rating) || 0
                )}
              </div>

              <p className="mt-4 whitespace-pre-wrap text-ink-muted">
                {review.review}
              </p>

              <p className="mt-3 text-xs text-ink-muted">
                {new Date(
                  review.created_at
                ).toLocaleString()}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {review.approved !== true && (
                  <Button
                    onClick={() =>
                      action(
                        review.id,
                        "approved"
                      )
                    }
                  >
                    APPROVE
                  </Button>
                )}

                {review.approved === true && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      action(
                        review.id,
                        "pending"
                      )
                    }
                  >
                    UNPUBLISH
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() =>
                    remove(review.id)
                  }
                >
                  REJECT & DELETE
                </Button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">
            There are currently no{" "}
            {label(
              filter
            ).toLowerCase()} reviews.
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   INQUIRIES
========================================================= */

function Inquiries({
  inquiries,
  statuses,
  counts,
  filter,
  setFilter,
  change,
  saveNote,
}) {
  const visible = inquiries.filter(
    (inquiry) =>
      inquiry.status === filter
  );

  return (
    <section>
      <h2 className="text-2xl font-bold">
        PROJECT INQUIRIES
      </h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilter(status)
            }
            className={`rounded-full border px-4 py-2 text-sm ${
              filter === status
                ? "border-cyan bg-cyan/10"
                : "border-border"
            }`}
          >
            {label(status)}{" "}
            {counts[status] || 0}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {visible.length ? (
          visible.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              i={inquiry}
              statuses={statuses}
              change={change}
              saveNote={saveNote}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">
            There are currently no{" "}
            {label(
              filter
            ).toLowerCase()} project inquiries.
          </div>
        )}
      </div>
    </section>
  );
}

function InquiryCard({
  i,
  statuses,
  change,
  saveNote,
}) {
  const [note, setNote] = useState(
    i.notes || ""
  );

  return (
    <article className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            {i.name}
          </h3>

          <a
            className="text-sm text-cyan"
            href={`mailto:${i.email}`}
          >
            {i.email}
          </a>

          <p className="mt-2 text-sm text-ink-muted">
            {new Date(
              i.created_at
            ).toLocaleString()}
          </p>
        </div>

        <select
          value={i.status}
          onChange={(event) =>
            change(
              i.id,
              event.target.value
            )
          }
          className="rounded-xl border border-border bg-background px-3 py-2"
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {label(status)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-4 text-sm md:grid-cols-2">
        <Info
          title="PROJECT DIRECTION"
          value={
            Array.isArray(
              i.project_directions
            )
              ? i.project_directions.join(
                  ", "
                )
              : i.project_directions
          }
        />

        <Info
          title="COMMUNITY TYPE"
          value={i.community_type}
        />

        {i.community_direction && (
          <Info
            title="COMMUNITY DIRECTION"
            value={
              i.community_direction
            }
          />
        )}

        {i.budget_approach && (
          <Info
            title="PROJECT APPROACH"
            value={
              i.budget_approach
            }
          />
        )}
      </div>

      <div className="mt-5">
        <b>PROJECT DETAILS</b>

        <p className="mt-2 whitespace-pre-wrap leading-7 text-ink-muted">
          {i.project_details}
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <label className="text-sm font-semibold">
          INTERNAL NOTES
        </label>

        <textarea
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          className="mt-2 min-h-28 w-full rounded-xl border border-border bg-background p-3 text-sm"
          placeholder="Internal notes, not visible publicly."
        />

        <div className="mt-3">
          <Button
            variant="secondary"
            onClick={() =>
              saveNote(i.id, note)
            }
          >
            SAVE NOTES
          </Button>
        </div>
      </div>
    </article>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <b>{title}</b>

      <p className="mt-1 text-ink-muted">
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;
