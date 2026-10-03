import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import Button from "../components/ui/Button.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";

const directions = [
  "Build From Scratch",
  "Revamp My Community",
  "Improve Specific Systems",
  "Help Me Find My Community Direction",
];

const communityTypes = [
  "Streamer Community",
  "Creator Community",
  "Gaming Community",
  "Business Community",
  "Online Community",
  "Other",
];

const vibes = [
  "The Gaming Hub",
  "The Cyber World",
  "The Elite Club",
  "The Racing Garage",
  "Other",
];

const approaches = [
  "I Want To Discuss The Complete Community",
  "I Prefer Building In Phases",
  "I Need Help With A Smaller Project",
  "I Am Not Sure Yet",
];

const emailAddress = "shalomcostar@gmail.com";
const discordUsername = "shalom_x2";

const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=shalomcostar@gmail.com";

const mailtoUrl =
  "mailto:shalomcostar@gmail.com?subject=SHALOMHEGA%20NETWORKS%20Project%20Inquiry";

function StartYourProject() {
  const [searchParams] = useSearchParams();

  const selectedVibe = searchParams.get("vibe") || "";

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    project_directions: [],
    community_type: "",
    project_details: "",
    community_direction: selectedVibe,
    budget_approach: "",
  });

  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => ({
      ...current,
      [key]: "",
    }));
  };

  const toggleDirection = (direction) => {
    update(
      "project_directions",
      form.project_directions.includes(direction)
        ? form.project_directions.filter(
            (item) => item !== direction
          )
        : [...form.project_directions, direction]
    );
  };

  const validateStep = (currentStep) => {
    const nextErrors = {};

    if (currentStep === 1) {
      if (!form.project_directions.length) {
        nextErrors.project_directions =
          "Choose at least one direction.";
      }
    }

    if (currentStep === 2) {
      if (!form.community_type) {
        nextErrors.community_type =
          "Choose what you are working on.";
      }
    }

    if (currentStep === 3) {
      if (form.project_details.trim().length < 20) {
        nextErrors.project_details =
          "Please tell us a little more about your project.";
      }
    }

    if (currentStep === 4) {
      if (!form.name.trim()) {
        nextErrors.name = "Please enter your name.";
      }

      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        nextErrors.email =
          "Please enter a valid email address.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      return;
    }

    setStep((current) => Math.min(current + 1, 4));
  };

  const previousStep = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  };

  async function submit(event) {
    event.preventDefault();

    if (!validateStep(4)) {
      return;
    }

    setMessage("");

    if (!isSupabaseConfigured) {
      setState("error");
      setMessage(
        "The project inquiry system is not configured yet."
      );
      return;
    }

    setState("submitting");

    const { error } = await supabase
      .from("project_inquiries")
      .insert([
        {
          ...form,
          project_directions: form.project_directions,
          status: "new",
        },
      ]);

    if (error) {
      setState("error");
      setMessage(
        "We could not submit your inquiry right now. Please try again."
      );
      return;
    }

    setState("success");

    setMessage(
      "Thank you for sharing your project direction. Your inquiry has been received successfully. We now have the information needed to understand what you are looking to build or improve."
    );

    setForm({
      name: "",
      email: "",
      project_directions: [],
      community_type: "",
      project_details: "",
      community_direction: "",
      budget_approach: "",
    });

    setStep(1);
  }

  const input =
    "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted focus:border-cyan focus:outline-none";

  return (
    <main className="bg-brand-field pb-20">
      <Section className="pt-20">
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[.2em] text-cyan">
              SHALOMHEGA NETWORKS
            </p>

            <h1 className="mt-5 text-4xl font-bold sm:text-6xl">
              LET&apos;S TALK ABOUT YOUR COMMUNITY
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
              Whether you want to build something completely new,
              improve an existing community, or figure out where
              to start, the first step is understanding your
              direction.
            </p>

            <p className="mt-8 font-semibold tracking-[.16em] text-purple">
              EVERY COMMUNITY STARTS WITH A CONVERSATION
            </p>
          </div>
        </Container>
      </Section>

      {/* Direct Contact */}
      <Section className="pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-cyan/15 bg-surface/70 p-6 shadow-2xl shadow-purple/5 md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-cyan/5 blur-3xl" />

            <div className="relative">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                  DIRECT CONTACT
                </p>

                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Prefer to speak with us directly?
                </h2>

                <p className="mt-3 leading-7 text-ink-muted">
                  You can send your project details through the
                  form below, or contact SHALOMHEGA NETWORKS
                  directly by email or Discord.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-purple/20 bg-purple/5 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-purple/40 hover:bg-purple/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-purple">
                      GMAIL
                    </span>

                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-5 font-semibold text-ink">
                    Open Gmail
                  </p>

                  <p className="mt-1 break-all text-sm text-ink-muted">
                    {emailAddress}
                  </p>
                </a>

                <a
                  href={mailtoUrl}
                  className="group rounded-2xl border border-cyan/20 bg-cyan/5 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan/40 hover:bg-cyan/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                      EMAIL
                    </span>

                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-5 font-semibold text-ink">
                    Email Us
                  </p>

                  <p className="mt-1 break-all text-sm text-ink-muted">
                    {emailAddress}
                  </p>
                </a>

                <a
                  href="https://discord.com/users/shalom_x2"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-blue/20 bg-blue/5 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue/40 hover:bg-blue/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
                      DISCORD
                    </span>

                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-5 font-semibold text-ink">
                    Message on Discord
                  </p>

                  <p className="mt-1 text-sm text-ink-muted">
                    {discordUsername}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Inquiry */}
      <Section>
        <Container>
          <form
            onSubmit={submit}
            className="grid gap-8 rounded-3xl border border-border bg-surface/80 p-6 shadow-2xl shadow-purple/5 md:p-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                PROJECT INQUIRY
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Tell us what you want to build
              </h2>

              <p className="mt-2 text-ink-muted">
                Four simple steps are enough to give us the
                direction we need.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[1, 2, 3, 4].map((number) => (
                <div
                  key={number}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                    number === step
                      ? "border-cyan bg-cyan/10 text-cyan"
                      : number < step
                      ? "border-purple bg-purple/10 text-purple"
                      : "border-border text-ink-muted"
                  }`}
                >
                  {number}
                </div>
              ))}

              <div className="ml-2 text-sm text-ink-muted">
                Step {step} of 4
              </div>
            </div>

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold">
                  WHAT DO YOU NEED HELP WITH?
                </h2>

                <p className="mt-2 text-ink-muted">
                  Choose one or more directions that match your
                  project.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {directions.map((direction) => (
                    <button
                      type="button"
                      key={direction}
                      onClick={() =>
                        toggleDirection(direction)
                      }
                      className={`rounded-2xl border p-5 text-left transition ${
                        form.project_directions.includes(
                          direction
                        )
                          ? "border-cyan bg-cyan/10"
                          : "border-border bg-background hover:border-purple"
                      }`}
                    >
                      <span className="font-semibold">
                        {direction.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>

                {errors.project_directions && (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.project_directions}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold">
                  WHAT ARE YOU WORKING ON?
                </h2>

                <p className="mt-2 text-ink-muted">
                  Tell us what type of community or project you
                  are developing.
                </p>

                <label className="mt-6 block">
                  COMMUNITY TYPE

                  <select
                    className={input}
                    value={form.community_type}
                    onChange={(event) =>
                      update(
                        "community_type",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select one
                    </option>

                    {communityTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  {errors.community_type && (
                    <span className="text-sm text-red-300">
                      {errors.community_type}
                    </span>
                  )}
                </label>

                <label className="mt-6 block">
                  COMMUNITY VIBE

                  <select
                    className={input}
                    value={form.community_direction}
                    onChange={(event) =>
                      update(
                        "community_direction",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Choose a direction
                    </option>

                    {vibes.map((vibe) => (
                      <option key={vibe} value={vibe}>
                        {vibe}
                      </option>
                    ))}
                  </select>
                </label>

                {form.community_direction && (
                  <div className="mt-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                      Selected community direction
                    </p>

                    <p className="mt-2 font-semibold">
                      {form.community_direction}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold">
                  TELL US ABOUT THE PROJECT
                </h2>

                <p className="mt-2 text-ink-muted">
                  Give us enough context to understand what you
                  currently have and what you want to build.
                </p>

                <label className="mt-6 block">
                  PROJECT DETAILS

                  <textarea
                    className={`${input} min-h-48`}
                    value={form.project_details}
                    onChange={(event) =>
                      update(
                        "project_details",
                        event.target.value
                      )
                    }
                    placeholder="Tell us what you currently have, what you want to improve, what you want to build, and where you want your community to go."
                  />

                  {errors.project_details && (
                    <span className="text-sm text-red-300">
                      {errors.project_details}
                    </span>
                  )}
                </label>

                <label className="mt-6 block">
                  PROJECT APPROACH, OPTIONAL

                  <select
                    className={input}
                    value={form.budget_approach}
                    onChange={(event) =>
                      update(
                        "budget_approach",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select an approach
                    </option>

                    {approaches.map((approach) => (
                      <option
                        key={approach}
                        value={approach}
                      >
                        {approach}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold">
                  HOW CAN WE REACH YOU?
                </h2>

                <p className="mt-2 text-ink-muted">
                  Give us your contact details so we can respond
                  to your project inquiry.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label>
                    NAME

                    <input
                      className={input}
                      value={form.name}
                      onChange={(event) =>
                        update("name", event.target.value)
                      }
                      placeholder="Your name"
                    />

                    {errors.name && (
                      <span className="text-sm text-red-300">
                        {errors.name}
                      </span>
                    )}
                  </label>

                  <label>
                    EMAIL

                    <input
                      className={input}
                      value={form.email}
                      onChange={(event) =>
                        update("email", event.target.value)
                      }
                      placeholder="you@example.com"
                    />

                    {errors.email && (
                      <span className="text-sm text-red-300">
                        {errors.email}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            )}

            {message && (
              <div
                className={`rounded-2xl border p-5 ${
                  state === "success"
                    ? "border-cyan/40 bg-cyan/10"
                    : "border-red-400/40 bg-red-400/10"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={previousStep}
                >
                  BACK
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                >
                  CONTINUE
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="md"
                  disabled={state === "submitting"}
                >
                  {state === "submitting"
                    ? "SENDING..."
                    : "START THE CONVERSATION"}
                </Button>
              )}
            </div>
          </form>
        </Container>
      </Section>
    </main>
  );
}

export default StartYourProject;
