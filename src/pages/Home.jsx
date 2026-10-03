import { useLanguage } from "../lib/LanguageContext.jsx";
import { homeTranslations } from "../data/homeTranslations.js";
import {
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from "../components/ui";

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="text-lg transition-transform duration-200 group-hover:translate-x-1"
    >
      →
    </span>
  );
}

function HeroNetworkVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <style>{`
        @keyframes shalomOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shalomOrbitReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes shalomPulse {
          0%,
          100% {
            transform: scale(0.98);
            opacity: 0.8;
          }

          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        @keyframes shalomGlow {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.8;
          }
        }

        @keyframes shalomLightSweep {
          0% {
            transform: translateX(-120%);
            opacity: 0;
          }

          20% {
            opacity: 0.4;
          }

          50% {
            opacity: 0.7;
          }

          80% {
            opacity: 0.4;
          }

          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        .shalom-orbit {
          animation: shalomOrbit 22s linear infinite;
          transform-origin: center;
        }

        .shalom-orbit-reverse {
          animation: shalomOrbitReverse 30s linear infinite;
          transform-origin: center;
        }

        .shalom-logo-pulse {
          animation: shalomPulse 6s ease-in-out infinite;
          transform-origin: center;
        }

        .shalom-glow {
          animation: shalomGlow 5s ease-in-out infinite;
        }

        .shalom-light-sweep {
          animation: shalomLightSweep 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .shalom-orbit,
          .shalom-orbit-reverse,
          .shalom-logo-pulse,
          .shalom-glow,
          .shalom-light-sweep {
            animation: none;
          }
        }
      `}</style>

      {/* Light display surface */}
      <div className="relative min-h-[540px] overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50 px-5 py-8 shadow-[0_35px_100px_rgba(37,99,235,0.14)] sm:min-h-[620px] sm:px-8 sm:py-10">
        {/* Ambient light */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/15 blur-[100px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/15 blur-[90px]" />

        {/* Technical grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at center, black 15%, transparent 76%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 15%, transparent 76%)",
          }}
        />

        {/* Top label */}
        <div className="absolute left-6 top-6 z-30 flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-3 py-2 shadow-[0_10px_30px_rgba(6,182,212,0.10)] backdrop-blur-md sm:left-8 sm:top-8">
          <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.65)]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-700">
            SHALOMHEGA NETWORKS
          </span>
        </div>

        {/* Orbital system */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 700 700"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="shalomLightGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="48%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>

            <g className="shalom-orbit">
              <ellipse
                cx="350"
                cy="350"
                rx="280"
                ry="150"
                fill="none"
                stroke="url(#shalomLightGradient)"
                strokeWidth="1.5"
                opacity="0.28"
              />

              <ellipse
                cx="350"
                cy="350"
                rx="315"
                ry="170"
                fill="none"
                stroke="url(#shalomLightGradient)"
                strokeWidth="0.8"
                opacity="0.12"
              />

              <circle
                cx="630"
                cy="350"
                r="5"
                fill="#06b6d4"
                className="shalom-glow"
              />

              <circle
                cx="70"
                cy="350"
                r="4"
                fill="#9333ea"
                className="shalom-glow"
              />
            </g>

            <g className="shalom-orbit-reverse">
              <ellipse
                cx="350"
                cy="350"
                rx="210"
                ry="285"
                fill="none"
                stroke="url(#shalomLightGradient)"
                strokeWidth="1"
                opacity="0.16"
              />

              <circle
                cx="350"
                cy="65"
                r="4"
                fill="#2563eb"
                className="shalom-glow"
              />

              <circle
                cx="350"
                cy="635"
                r="4"
                fill="#9333ea"
                className="shalom-glow"
              />
            </g>
          </svg>
        </div>

        {/* Central logo */}
        <div className="absolute inset-x-5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center sm:inset-x-8">
          <div className="absolute h-[350px] w-[350px] rounded-full bg-white/85 shadow-[0_0_100px_rgba(37,99,235,0.18)] blur-3xl sm:h-[430px] sm:w-[430px]" />

          <div className="shalom-logo-pulse relative flex w-full items-center justify-center">
            <img
              src="/images/shalomhega-home-logo.png"
              alt="SHALOMHEGA NETWORKS"
              className="relative z-10 h-auto w-[430px] max-w-full object-contain drop-shadow-[0_18px_38px_rgba(37,99,235,0.28)] sm:w-[530px]"
            />

            {/* Soft light sweep */}
            <span
              aria-hidden="true"
              className="shalom-light-sweep pointer-events-none absolute left-1/2 top-1/2 z-20 h-[65%] w-[12%] -translate-x-1/2 -translate-y-1/2 rotate-[25deg] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-xl"
            />
          </div>
        </div>

        {/* Connected */}
        <div className="absolute left-5 top-24 z-30 rounded-2xl border border-cyan-200 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(6,182,212,0.12)] backdrop-blur-md sm:left-8 sm:top-28">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">
            Connected
          </p>

          <p className="mt-1 text-xs font-medium text-slate-600">
            People • Ideas • Communities
          </p>
        </div>

        {/* Community */}
        <div className="absolute right-5 top-28 z-30 rounded-2xl border border-purple-200 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(147,51,234,0.12)] backdrop-blur-md sm:right-8 sm:top-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">
            Community
          </p>

          <p className="mt-1 text-xs font-medium text-slate-600">
            Built around your vision
          </p>
        </div>

        {/* Systems */}
        <div className="absolute bottom-24 left-5 z-30 rounded-2xl border border-blue-200 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(37,99,235,0.12)] backdrop-blur-md sm:bottom-28 sm:left-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
            Systems
          </p>

          <p className="mt-1 text-xs font-medium text-slate-600">
            Modern tools for growth
          </p>
        </div>

        {/* Built to Grow */}
        <div className="absolute bottom-10 right-5 z-30 rounded-2xl border border-purple-200 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(147,51,234,0.12)] backdrop-blur-md sm:bottom-14 sm:right-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">
            Built to Grow
          </p>

          <p className="mt-1 text-xs font-medium text-slate-600">
            Scalable solutions
          </p>
        </div>

        {/* Bottom feature strip */}
        <div className="absolute bottom-2 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md sm:flex">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-blue-600">
            Community Platforms
          </span>

          <span className="text-blue-300">•</span>

          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-purple-600">
            Custom Systems
          </span>

          <span className="text-purple-300">•</span>

          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-cyan-600">
            Real Growth
          </span>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { language } = useLanguage();

  const content = homeTranslations[language] || homeTranslations.en;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 88%)",
          }}
        />

        <div className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-purple-300/20 blur-[110px]" />

        <div className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-blue-300/20 blur-[120px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-[100px]" />

        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_10px_30px_rgba(6,182,212,0.08)] backdrop-blur-md">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />

                {content.heroBadge}
              </div>

              <h1 className="max-w-5xl font-heading text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl">
                {content.heroTitle}
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {content.heroDescription}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button to="/start-your-project">
                  <span className="group inline-flex items-center gap-2">
                    {content.startProject} <Arrow />
                  </span>
                </Button>

                <Button to="/our-work" variant="secondary">
                  <span className="group inline-flex items-center gap-2">
                    {content.exploreWork} <Arrow />
                  </span>
                </Button>
              </div>

              <div className="mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
                {content.highlights.map(([title, text]) => (
                  <div
                    key={title}
                    className="relative border-l border-slate-300 pl-4"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-px top-0 h-8 w-px bg-gradient-to-b from-cyan-500 to-transparent"
                    />

                    <p className="font-semibold text-slate-950">{title}</p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <HeroNetworkVisual />
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.whatWeDoEyebrow}
            title={content.whatWeDoTitle}
            description={content.whatWeDoDescription}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {content.services.map(([title, text], index) => (
              <Card
                key={title}
                className="group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple/30 hover:shadow-[0_24px_70px_rgba(76,59,255,0.10)]"
              >
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-purple/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs uppercase tracking-[0.16em] text-ink-muted">
                      SERVICE
                    </span>
                  </div>

                  <h3 className="mt-10 text-xl font-semibold">{title}</h3>

                  <p className="mt-4 leading-7 text-ink-muted">{text}</p>

                  <div className="mt-8 h-px w-full bg-gradient-to-r from-purple/40 via-blue/20 to-transparent" />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Us */}
      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/40">
        <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">
              {content.whyEyebrow}
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              {content.whyTitle}
            </h2>
          </div>

          <Card
            hover={false}
            className="relative overflow-hidden border-blue/20 bg-gradient-to-br from-blue/10 via-surface to-purple/5 p-7 sm:p-9"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue/10 blur-3xl" />

            <div className="relative">
              <p className="text-lg leading-8 text-ink-muted">
                {content.whyDescription}
              </p>

              <div className="my-8 h-px bg-gradient-to-r from-purple via-blue to-transparent" />

              <p className="font-semibold leading-7 text-ink">
                {content.whyStatement}
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Approach */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.approachEyebrow}
            title={content.approachTitle}
            description={content.approachDescription}
            align="center"
          />

          <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2rem] border border-purple/25 bg-gradient-to-br from-purple/10 via-blue/10 to-cyan/10 px-7 py-12 text-center shadow-[0_30px_100px_rgba(76,59,255,0.12)] sm:px-14 sm:py-14">
            <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-purple/10 blur-3xl" />

            <div className="relative">
              <p className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">
                {content.approachTitle}
              </p>

              <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-3 text-lg font-semibold text-ink-muted sm:text-xl">
                <span className="rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-cyan">
                  {content.highlights[2][0]}
                </span>

                <span className="text-cyan">+</span>

                <span className="rounded-full border border-purple/20 bg-purple/5 px-4 py-2 text-purple">
                  {content.highlights[0][0]}
                </span>

                <span className="text-purple">=</span>

                <span className="rounded-full border border-blue/20 bg-blue/5 px-4 py-2 text-blue">
                  {content.highlights[1][0]}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="bg-surface/35">
        <Container>
          <SectionHeading
            eyebrow={content.processEyebrow}
            title={content.processTitle}
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.processSteps.map((step, index) => (
              <div
                key={step}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-background/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/20 hover:bg-background/70"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-cyan">
                  0{index + 1}
                </span>

                <div className="mt-5 h-px w-10 bg-gradient-to-r from-cyan to-transparent transition-all duration-300 group-hover:w-16" />

                <p className="mt-7 font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/how-it-works" variant="secondary">
              <span className="group inline-flex items-center gap-2">
                {content.seeHowWeWork} <Arrow />
              </span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Community Systems */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.systemsEyebrow}
            title={content.systemsTitle}
            description={content.systemsDescription}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.systems.map((system, index) => (
              <Card
                key={system}
                className="group relative min-h-[170px] overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30"
              >
                <div className="absolute bottom-0 right-0 h-28 w-28 translate-x-8 translate-y-8 rounded-full bg-blue/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <span className="text-xs tracking-[0.16em] text-purple">
                    SYSTEM {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-7 text-lg font-semibold">{system}</h3>

                  <div className="mt-8 h-px w-10 bg-gradient-to-r from-purple to-blue transition-all duration-300 group-hover:w-16" />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/community-systems">
              <span className="group inline-flex items-center gap-2">
                {content.exploreSystems} <Arrow />
              </span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Work */}
      <Section className="border-y border-white/[0.06] bg-surface/40">
        <Container>
          <SectionHeading
            eyebrow={content.workEyebrow}
            title={content.workTitle}
            description={content.workDescription}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.videos.map((video, index) => (
              <Card
                key={video}
                className="group relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-gradient-to-br from-surface-alt via-surface to-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-cyan/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] text-cyan">
                    DEMO {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-sm transition-transform duration-300 group-hover:scale-110">
                    ▶
                  </span>
                </div>

                <div className="relative">
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {video}
                  </h3>

                  <p className="mt-2 text-sm text-ink-muted">
                    {content.videoComingSoon}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/our-work" variant="secondary">
              <span className="group inline-flex items-center gap-2">
                {content.exploreOurWork} <Arrow />
              </span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Reviews */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.reviewsEyebrow}
            title={content.reviewsTitle}
            description={content.reviewsDescription}
            align="center"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[1, 2, 3].map((number) => (
              <Card
                key={number}
                hover={false}
                className="relative min-h-[220px] overflow-hidden p-7"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple/5 blur-3xl" />

                <div className="relative">
                  <div className="h-2 w-20 rounded-full bg-gradient-to-r from-purple to-cyan opacity-70" />

                  <p className="mt-10 text-sm leading-7 text-ink-muted">
                    {content.reviewPlaceholder}
                  </p>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    {content.reviewLabel}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button to="/reviews" variant="secondary">
              <span className="group inline-flex items-center gap-2">
                {content.readAllReviews} <Arrow />
              </span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-purple/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blue/10 blur-3xl" />

        <Container className="relative text-center">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
              {content.finalEyebrow}
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              {content.finalTitle}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-ink-muted">
              {content.finalDescription}
            </p>

            <div className="mt-10 flex justify-center">
              <Button to="/start-your-project">
                <span className="group inline-flex items-center gap-2">
                  {content.startProject} <Arrow />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
