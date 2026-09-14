import { useMemo, useState } from "react";
import Section from "../components/ui/Section.jsx";
import Button from "../components/ui/Button.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const projectTypes = [
  "Complete Community Development",
  "Community Revamp",
  "Community Systems",
  "Onboarding",
  "Verification System",
  "Welcome System",
  "Rules System",
  "Role System",
  "Automation",
  "Notifications",
  "Support System",
  "Other",
];

const MAX_IMAGE = 5 * 1024 * 1024;

function LeaveReview() {
  const [form, setForm] = useState({
    name: "",
    project_type: "",
    review: "",
    rating: 0,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [state, setState] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const initials = useMemo(() => {
    return form.name.trim().charAt(0).toUpperCase() || "?";
  }, [form.name]);

  function update(key, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  function chooseImage(file) {
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setState({
        loading: false,
        error: "Please choose a JPEG, PNG, or WEBP image.",
        success: false,
      });

      return;
    }

    if (file.size > MAX_IMAGE) {
      setState({
        loading: false,
        error: "Profile images must be 5 MB or smaller.",
        success: false,
      });

      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imagePreview = URL.createObjectURL(file);

    setImage(file);
    setPreview(imagePreview);

    setState({
      loading: false,
      error: "",
      success: false,
    });
  }

  async function submit(event) {
    event.preventDefault();

    // =========================
    // VALIDATION
    // =========================

    if (
      !form.name.trim() ||
      !form.project_type ||
      form.review.trim().length < 10
    ) {
      setState({
        loading: false,
        error:
          "Please complete your name, project type, and a review of at least 10 characters.",
        success: false,
      });

      return;
    }

    if (!form.rating || form.rating < 1) {
      setState({
        loading: false,
        error: "Please select a star rating before submitting your review.",
        success: false,
      });

      return;
    }

    // =========================
    // CHECK SUPABASE
    // =========================

    if (!isSupabaseConfigured || !supabase) {
      setState({
        loading: false,
        error:
          "The review system is not configured yet. Please check the Supabase environment variables.",
        success: false,
      });

      return;
    }

    setState({
      loading: true,
      error: "",
      success: false,
    });

    let profile_image_url = null;

    try {
      // =========================
      // UPLOAD PROFILE IMAGE
      // =========================

      if (image) {
        const extension = image.name
          .split(".")
          .pop()
          .toLowerCase();

        const filePath = `public/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("review-profile-images")
          .upload(filePath, image, {
            contentType: image.type,
            upsert: false,
          });

        if (uploadError) {
          throw new Error(
            `Profile image upload failed: ${uploadError.message}`
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from("review-profile-images")
          .getPublicUrl(filePath);

        profile_image_url = publicUrlData?.publicUrl || null;
      }

      // =========================
      // SAVE REVIEW TO SUPABASE
      // =========================

      const { data: reviewData, error: reviewError } =
        await supabase
          .from("reviews")
          .insert({
            name: form.name.trim(),
            project_type: form.project_type,
            review: form.review.trim(),
            rating: Number(form.rating),
            profile_image_url,
            approved: false,
          })
          .select()
          .single();

      if (reviewError) {
        throw new Error(
          `Review submission failed: ${reviewError.message}`
        );
      }

      // =========================
      // SEND DISCORD NOTIFICATION
      // =========================

      try {
        const notificationResponse = await fetch(
          "/.netlify/functions/review-notification",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              id: reviewData.id,
              name: reviewData.name,
              project_type: reviewData.project_type,
              review: reviewData.review,
              rating: reviewData.rating,
            }),
          }
        );

        if (!notificationResponse.ok) {
          console.error(
            "Discord notification could not be sent."
          );
        }
      } catch (notificationError) {
        console.error(
          "Discord notification error:",
          notificationError
        );
      }

      // =========================
      // SUCCESS
      // =========================

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setForm({
        name: "",
        project_type: "",
        review: "",
        rating: 0,
      });

      setImage(null);
      setPreview("");

      setState({
        loading: false,
        error: "",
        success: true,
      });

    } catch (error) {
      console.error("Review submission error:", error);

      setState({
        loading: false,
        error:
          error.message ||
          "We could not submit your review right now. Please try again later.",
        success: false,
      });
    }
  }

  return (
    <main className="min-h-screen bg-brand-field">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <Section className="pt-28 sm:pt-36">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold tracking-[0.22em] text-cyan">
            COMMUNITY FEEDBACK
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-6xl">
            SHARE YOUR EXPERIENCE
          </h1>

          <p className="mt-6 text-lg leading-8 text-ink-muted">
            Your feedback can help other streamers, creators, and community
            owners understand what it is like to work with SHALOMHEGA NETWORKS.
          </p>

        </div>

      </Section>


      {/* ========================= */}
      {/* REVIEW FORM */}
      {/* ========================= */}

      <Section className="pt-0">

        <form
          onSubmit={submit}
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface/90 p-6 shadow-2xl shadow-purple/5 sm:p-10"
        >

          {/* SUCCESS MESSAGE */}

          {state.success && (

            <div className="mb-7 rounded-2xl border border-cyan/30 bg-cyan/10 p-5 text-sm leading-7">

              <p className="font-semibold">
                Review submitted successfully! 🎉
              </p>

              <p className="mt-2">
                Thank you for sharing your experience. Your review is now
                waiting for approval before appearing publicly.
              </p>

            </div>

          )}


          {/* ERROR MESSAGE */}

          {state.error && (

            <div className="mb-7 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-sm leading-7">

              <p className="font-semibold">
                Review submission problem
              </p>

              <p className="mt-2">
                {state.error}
              </p>

            </div>

          )}


          <div className="grid gap-6">


            {/* ========================= */}
            {/* NAME */}
            {/* ========================= */}

            <label className="grid gap-2 text-sm font-medium">

              NAME

              <input
                value={form.name}
                onChange={(event) =>
                  update("name", event.target.value)
                }
                placeholder="Your name"
                className="rounded-xl border border-border bg-background px-4 py-3.5 outline-none focus:border-cyan"
              />

            </label>


            {/* ========================= */}
            {/* PROFILE IMAGE */}
            {/* ========================= */}

            <div>

              <div className="mb-2 flex items-center justify-between text-sm font-medium">

                <span>PROFILE IMAGE</span>

                <span className="text-xs text-ink-muted">
                  OPTIONAL
                </span>

              </div>


              <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-border bg-background/70 p-5 transition hover:border-cyan/60">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-purple/20 text-xl">

                  {preview ? (

                    <img
                      src={preview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    initials

                  )}

                </div>


                <div>

                  <p className="font-medium">
                    Upload a profile image
                  </p>

                  <p className="mt-1 text-xs text-ink-muted">
                    JPEG, PNG, or WEBP, maximum 5 MB
                  </p>

                </div>


                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) =>
                    chooseImage(event.target.files?.[0])
                  }
                />

              </label>

            </div>


            {/* ========================= */}
            {/* PROJECT TYPE */}
            {/* ========================= */}

            <label className="grid gap-2 text-sm font-medium">

              PROJECT TYPE

              <select
                value={form.project_type}
                onChange={(event) =>
                  update("project_type", event.target.value)
                }
                className="rounded-xl border border-border bg-background px-4 py-3.5 outline-none focus:border-cyan"
              >

                <option value="">
                  Select your project type
                </option>

                {projectTypes.map((projectType) => (

                  <option
                    key={projectType}
                    value={projectType}
                  >
                    {projectType}
                  </option>

                ))}

              </select>

            </label>


            {/* ========================= */}
            {/* STAR RATING */}
            {/* ========================= */}

            <div className="grid gap-2">

              <span className="text-sm font-medium">
                YOUR RATING
              </span>

              <div className="flex gap-2">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    onClick={() => update("rating", star)}
                    className={`text-3xl transition hover:scale-110 ${
                      star <= form.rating
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                    aria-label={`${star} star rating`}
                  >
                    ★
                  </button>

                ))}

              </div>

            </div>


            {/* ========================= */}
            {/* REVIEW */}
            {/* ========================= */}

            <label className="grid gap-2 text-sm font-medium">

              YOUR REVIEW

              <textarea
                value={form.review}
                onChange={(event) =>
                  update(
                    "review",
                    event.target.value.slice(0, 1500)
                  )
                }
                placeholder="Tell us about your experience working with SHALOMHEGA NETWORKS..."
                rows="7"
                className="resize-y rounded-xl border border-border bg-background px-4 py-3.5 outline-none focus:border-cyan"
              />

              <span className="text-right text-xs text-ink-muted">
                {form.review.length}/1500
              </span>

            </label>

          </div>


          {/* ========================= */}
          {/* APPROVAL NOTICE */}
          {/* ========================= */}

          <p className="mt-7 text-sm leading-7 text-ink-muted">

            Reviews are checked before appearing publicly. Once approved,
            your review will become visible on the reviews page.

          </p>


          {/* ========================= */}
          {/* SUBMIT BUTTON */}
          {/* ========================= */}

          <Button
            type="submit"
            className="mt-7 w-full px-8 py-4 sm:w-auto"
            disabled={state.loading}
          >

            {state.loading
              ? "SUBMITTING..."
              : "SUBMIT YOUR REVIEW"}

          </Button>

        </form>

      </Section>

    </main>
  );
}

export default LeaveReview;
