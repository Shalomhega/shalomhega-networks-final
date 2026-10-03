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
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[100px]" />

      <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10" />

      <div className="absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue/10" />

      <svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full opacity-60"
      >
        <defs>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.05)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.65)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.55)" />
          </linearGradient>
        </defs>

        <line x1="90" y1="170" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1.5" />
        <line x1="510" y1="150" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1.5" />
        <line x1="105" y1="430" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1.5" />
        <line x1="495" y1="445" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1.5" />
        <line x1="180" y1="70" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1" />
        <line x1="430" y1="75" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1" />
        <line x1="170" y1="530" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1" />
        <line x1="435" y1="525" x2="300" y2="300" stroke="url(#networkGradient)" strokeWidth="1" />

        <circle cx="90" cy="170" r="5" fill="rgba(124,58,237,0.8)" />
        <circle cx="510" cy="150" r="5" fill="rgba(34,211,238,0.8)" />
        <circle cx="105" cy="430" r="5" fill="rgba(59,130,246,0.8)" />
        <circle cx="495" cy="445" r="5" fill="rgba(124,58,237,0.8)" />
        <circle cx="180" cy="70" r="4" fill="rgba(34,211,238,0.7)" />
        <circle cx="430" cy="75" r="4" fill="rgba(59,130,246,0.7)" />
        <circle cx="170" cy="530" r="4" fill="rgba(34,211,238,0.7)" />
        <circle cx="435" cy="525" r="4" fill="rgba(124,58,237,0.7)" />
      </svg>

      <div className="relative flex aspect-square items-center justify-center">
        <div className="absolute h-[15rem] w-[15rem] rounded-full bg-purple/10 blur-3xl" />

        <div className="relative flex h-[15rem] w-[15rem] items-center justify-center rounded-full border border-white/[0.10] bg-surface/75 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:h-[18rem] sm:w-[18rem] sm:p-10">
          <div className="absolute inset-4 rounded-full border border-cyan/10" />

          <div className="absolute inset-8 rounded-full border border-purple/10" />

          <img
            src="/images/Shalomnetwork.png"
            alt="SHALOMHEGA NETWORKS"
            className="relative z-10 max-h-[8rem] max-w-[11rem] object-contain drop-shadow-[0_0_35px_rgba(34,211,238,0.18)] sm:max-h-[10rem] sm:max-w-[13rem]"
          />

          <span className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.9)]" />

          <span className="absolute bottom-8 left-6 h-2 w-2 rounded-full bg-purple shadow-[0_0_15px_rgba(124,58,237,0.9)]" />

          <span className="absolute bottom-12 right-7 h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
        </div>

        <div className="absolute left-2 top-1/4 hidden rounded-xl border border-purple/20 bg-surface/80 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple">
            Community
          </p>
          <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-purple to-blue" />
        </div>

        <div className="absolute bottom-1/4 right-0 hidden rounded-xl border border-cyan/20 bg-surface/80 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan">
            Systems
          </p>
          <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue to-cyan" />
        </div>

        <div className="absolute right-4 top-10 hidden rounded-full border border-white/10 bg-background/70 px-3 py-2 text-xs text-ink-muted backdrop-blur-md sm:block">
          Connected
        </div>

        <div className="absolute bottom-12 left-8 hidden rounded-full border border-white/10 bg-background/70 px-3 py-2 text-xs text-ink-muted backdrop-blur-md sm:block">
          Built to grow
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
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 72% 42%, rgba(34,211,238,0.12), transparent 28%), radial-gradient(circle at 35% 30%, rgba(124,58,237,0.12), transparent 30%)",
          }}
        />

        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
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

              <div className="mt-12 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
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
