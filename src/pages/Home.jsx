import { useLanguage } from "../lib/LanguageContext.jsx";
import { homeTranslations } from "../data/homeTranslations.js";
import {
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
  GlowOrb,
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

function NetworkVisual() {
  return (
    <div className="relative mx-auto flex min-h-[420px] w-full max-w-[620px] items-center justify-center overflow-hidden sm:min-h-[500px]">
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

        @keyframes shalomElectric {
          0%, 100% {
            stroke-dashoffset: 900;
            opacity: 0.12;
          }

          40% {
            opacity: 0.65;
          }

          52% {
            opacity: 0.8;
          }

          70% {
            stroke-dashoffset: 0;
            opacity: 0.18;
          }
        }

        @keyframes shalomPulse {
          0%, 100% {
            transform: scale(0.94);
            opacity: 0.2;
          }

          50% {
            transform: scale(1.04);
            opacity: 0.5;
          }
        }

        .shalom-orbit {
          animation: shalomOrbit 18s linear infinite;
          transform-origin: center;
        }

        .shalom-orbit-reverse {
          animation: shalomOrbitReverse 24s linear infinite;
          transform-origin: center;
        }

        .shalom-electric {
          stroke-dasharray: 120 780;
          animation: shalomElectric 7s ease-in-out infinite;
        }

        .shalom-electric-delay {
          animation-delay: 2.4s;
        }

        .shalom-electric-delay-two {
          animation-delay: 4.5s;
        }

        .shalom-logo-glow {
          animation: shalomPulse 5s ease-in-out infinite;
          transform-origin: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .shalom-orbit,
          .shalom-orbit-reverse,
          .shalom-electric,
          .shalom-electric-delay,
          .shalom-electric-delay-two,
          .shalom-logo-glow {
            animation: none;
          }
        }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[90px]" />

      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-[75px]" />

      {/* Orbital network */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 600 600"
          className="h-full w-full max-w-[600px]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="shalomOrbitGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="45%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <linearGradient
              id="shalomElectricGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="35%" stopColor="#22d3ee" />
              <stop offset="65%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>

            <filter id="shalomGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main horizontal orbit */}
          <g className="shalom-orbit">
            <ellipse
              cx="300"
              cy="300"
              rx="225"
              ry="115"
              fill="none"
              stroke="url(#shalomOrbitGradient)"
              strokeWidth="1.4"
              opacity="0.42"
            />

            <ellipse
              cx="300"
              cy="300"
              rx="245"
              ry="128"
              fill="none"
              stroke="url(#shalomOrbitGradient)"
              strokeWidth="0.7"
              opacity="0.2"
            />

            <circle
              cx="525"
              cy="300"
              r="4"
              fill="#22d3ee"
              filter="url(#shalomGlow)"
            />

            <circle
              cx="75"
              cy="300"
              r="3"
              fill="#a855f7"
              filter="url(#shalomGlow)"
            />
          </g>

          {/* Vertical orbit */}
          <g className="shalom-orbit-reverse">
            <ellipse
              cx="300"
              cy="300"
              rx="180"
              ry="235"
              fill="none"
              stroke="url(#shalomOrbitGradient)"
              strokeWidth="0.8"
              opacity="0.22"
            />

            <circle
              cx="300"
              cy="65"
              r="3"
              fill="#60a5fa"
              filter="url(#shalomGlow)"
            />
          </g>

          {/* Electric traveling paths */}
          <ellipse
            cx="300"
            cy="300"
            rx="225"
            ry="115"
            fill="none"
            stroke="url(#shalomElectricGradient)"
            strokeWidth="2"
            className="shalom-electric"
          />

          <ellipse
            cx="300"
            cy="300"
            rx="180"
            ry="235"
            fill="none"
            stroke="url(#shalomElectricGradient)"
            strokeWidth="1.5"
            className="shalom-electric shalom-electric-delay"
          />

          <ellipse
            cx="300"
            cy="300"
            rx="245"
            ry="128"
            fill="none"
            stroke="url(#shalomElectricGradient)"
            strokeWidth="1"
            className="shalom-electric shalom-electric-delay-two"
          />
        </svg>
      </div>

      {/* Center SHALOMHEGA logo */}
      <div className="shalom-logo-glow relative z-20 flex items-center justify-center">
        <div className="absolute h-[205px] w-[205px] rounded-full bg-cyan-400/10 blur-[45px] sm:h-[250px] sm:w-[250px]" />

        <div className="relative flex h-[210px] w-[210px] items-center justify-center rounded-full border border-cyan-300/20 bg-[#070a18]/75 p-5 shadow-[0_0_80px_rgba(59,130,246,0.22)] backdrop-blur-sm sm:h-[260px] sm:w-[260px] sm:p-7">
          <div className="absolute inset-3 rounded-full border border-purple-400/15" />

          <div className="absolute inset-6 rounded-full border border-blue-400/10" />

          <img
            src="/images/NETWORKIMAGE.png"
            alt="SHALOMHEGA NETWORKS"
            className="relative z-10 max-h-[155px] max-w-[180px] object-contain drop-shadow-[0_0_28px_rgba(34,211,238,0.35)] sm:max-h-[195px] sm:max-w-[225px]"
          />
        </div>
      </div>

      {/* Floating system labels */}
      <div className="absolute left-[4%] top-[23%] rounded-full border border-cyan-400/15 bg-[#080b18]/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-200/70 backdrop-blur-md">
        Connected
      </div>

      <div className="absolute right-[3%] top-[31%] rounded-full border border-purple-400/15 bg-[#080b18]/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-purple-200/70 backdrop-blur-md">
        Community
      </div>

      <div className="absolute bottom-[19%] left-[13%] rounded-full border border-blue-400/15 bg-[#080b18]/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/70 backdrop-blur-md">
        Systems
      </div>

      <div className="absolute bottom-[14%] right-[13%] rounded-full border border-cyan-400/15 bg-[#080b18]/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-200/70 backdrop-blur-md">
        Built to grow
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
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-left-40 top-16 h-[28rem] w-[28rem] bg-purple/20 blur-3xl" />

        <GlowOrb className="right-[-8rem] top-[-6rem] h-[30rem] w-[30rem] bg-blue/15 blur-3xl" />

        <GlowOrb className="left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 bg-cyan/5 blur-3xl" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <Container className="relative py-24 sm:py-32 lg:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan shadow-[0_0_30px_rgba(0,229,255,0.06)]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />

                {content.heroBadge}
              </div>

              <h1 className="max-w-5xl font-heading text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
                {content.heroTitle}
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">
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
                    className="relative border-l border-white/[0.12] pl-4"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-px top-0 h-8 w-px bg-gradient-to-b from-cyan to-transparent"
                    />

                    <p className="font-semibold text-ink">{title}</p>

                    <p className="mt-1 text-sm leading-6 text-ink-muted">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Network visual */}
            <NetworkVisual />
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
        <GlowOrb className="-right-40 top-1/2 h-80 w-80 -translate-y-1/2 bg-blue/10 blur-3xl" />

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
            <GlowOrb className="left-1/2 top-0 h-56 w-56 -translate-x-1/2 bg-purple/10 blur-3xl" />

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
        <GlowOrb className="left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 bg-purple/20 blur-3xl" />

        <GlowOrb className="left-1/4 bottom-0 h-64 w-64 bg-blue/10 blur-3xl" />

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
