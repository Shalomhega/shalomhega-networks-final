import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  supabase,
  isSupabaseConfigured,
} from "../../lib/supabase.js";
import Button from "../../components/ui/Button.jsx";

const reviewStatuses = ["pending", "approved", "rejected"];

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

    const { data: admin, error: adminError } = await supabase
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
    () =>
      Object.fromEntries(
        reviewStatuses.map((status) => [
          status,
          reviews.filter(
            (review) => review.status === status
          ).length,
        ])
      ),
    [reviews]
  );

  const inquiryCounts = useMemo(
    () =>
      Object.fromEntries(
        inquiryStatuses.map((status) => [
          status,
          inquiries.filter(
            (inquiry) => inquiry.status === status
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
          time:
            review.updated_at ||
            review.created_at,
          title:
            review.status === "pending"
              ? "New review submitted"
              : `Review ${review.status}`,
          detail: review.name,
          go: () => {
            setTab("reviews");
            setFilter(review.status);
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
    const now = new Date().toISOString();

    const patch = {
      status,
      updated_at: now,
      approved_at:
        status === "approved" ? now : null,
    };

    const { error } = await supabase
      .from("reviews")
      .update(patch)
      .eq("id", id);

    setMessage(
      error
        ? "Action could not be completed."
        : "Review updated successfully."
    );

    if (!error) {
      await load();
    }
  }

  async function deleteReview(id) {
    if (
      !confirm(
        "Delete this review permanently? This cannot be undone."
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
        ? "Review could not be deleted."
        : "Review deleted successfully."
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
        updated_at: new Date().toISOString(),
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
        updated_at: new Date().toISOString(),
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
              onClick={() => setTab(id)}
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

  const selectedSlotData =
    portfolioSlots.find(
      (slot) => slot.id === selectedSlot
    ) || portfolioSlots[0];

  const selectedProject =
    portfolio.find(
      (project) =>
        project.display_order ===
        selectedSlotData.displayOrder
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

  useEffect(() => {
    setTitle(
      selectedProject?.title ||
        selectedSlotData.title
    );

    setDescription(
      selectedProject?.description || ""
    );

    setPublished(
      selectedProject?.is_published ?? true
    );

    setVideoFile(null);
  }, [
    selectedProject?.id,
    selectedProject?.title,
    selectedProject?.description,
    selectedProject?.is_published,
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
        media_type: videoFile
          ? "video"
          : selectedProject?.media_type ||
            "video",
        display_order:
          selectedSlotData.displayOrder,
        is_published: published,
      };

      let result;

      if (selectedProject?.id) {
        result = await supabase
          .from("portfolio_projects")
          .update(payload)
          .eq(
            "id",
            selectedProject.id
          );
      } else {
        result = await supabase
          .from("portfolio_projects")
          .insert(payload);
      }

      if (result.error) {
        throw new Error(
          result.error.message
        );
      }

      setMessage(
        `${selectedSlotData.title} updated successfully.`
      );

      setVideoFile(null);

      await reload();
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

  async function removePortfolio() {
    if (!selectedProject?.id) {
      setMessage(
        "There is no portfolio item in this section yet."
      );
      return;
    }

    const confirmed = confirm(
      `Remove ${selectedSlotData.title} from the website?`
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
        .eq(
          "id",
          selectedProject.id
        );

      if (error) {
        throw new Error(
          error.message
        );
      }

      setMessage(
        `${selectedSlotData.title} was removed from the website.`
      );

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
          Upload and manage the videos and descriptions
          shown on the public Our Work page without
          editing the website code.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 text-xs font-semibold tracking-widest text-ink-muted">
            PORTFOLIO SECTIONS
          </p>

          <div className="grid gap-2">
            {portfolioSlots.map((slot) => {
              const project =
                portfolio.find(
                  (item) =>
                    item.display_order ===
                    slot.displayOrder
                );

              return (
                <button
                  key={slot.id}
                  onClick={() =>
                    setSelectedSlot(
                      slot.id
                    )
                  }
                  className={`rounded-xl px-4 py-3 text-left text-sm transition ${
                    selectedSlot ===
                    slot.id
                      ? "bg-purple text-ink"
                      : "border border-border text-ink-muted hover:text-ink"
                  }`}
                >
                  <span className="block font-semibold">
                    {slot.title}
                  </span>

                  <span className="mt-1 block text-xs opacity-70">
                    {project
                      ? project.is_published
                        ? "Published"
                        : "Saved, not published"
                      : "Not added yet"}
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

            {selectedProject?.media_url && (
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
                {selectedProject?.media_url
                  ? "REPLACE VIDEO"
                  : "UPLOAD VIDEO"}
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
                  When enabled, this portfolio section
                  will be visible publicly.
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
                  : selectedProject
                  ? "SAVE CHANGES"
                  : "ADD TO PORTFOLIO"}
              </Button>

              {selectedProject && (
                <Button
                  variant="secondary"
                  onClick={
                    removePortfolio
                  }
                  disabled={saving}
                >
                  REMOVE FROM WEBSITE
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
    filter &&
    reviewStatuses.includes(filter)
      ? reviews.filter(
          (review) =>
            review.status === filter
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

                <span className="rounded-full border border-border px-3 py-1 text-xs">
                  {label(review.status)}
                </span>
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
                {review.status !==
                  "approved" && (
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

                {review.status !==
                  "rejected" && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      action(
                        review.id,
                        "rejected"
                      )
                    }
                  >
                    REJECT
                  </Button>
                )}

                {review.status ===
                  "approved" && (
                  <Button
                    variant="outline"
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
                  DELETE
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
