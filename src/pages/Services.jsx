import {
  Button,
  Card,
  GlowOrb,
  Section,
  SectionHeading,
} from "../components/ui";
import { useLanguage } from "../lib/LanguageContext.jsx";
import servicesTranslations from "../data/servicesTranslations.js";

const Arrow = () => (
  <span
    aria-hidden="true"
    className="transition-transform duration-200 group-hover:translate-x-1"
  >
    →
  </span>
);

function Services() {
  const { language } = useLanguage();

  const content =
    servicesTranslations[language] || servicesTranslations.en;

  const heroWords = content.heroTitle.split(" ");

  const highlightStart =
    heroWords.length > 4
      ? Math.max(heroWords.length - 5, 0)
      : 0;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-left-24 top-12 h-80 w-80 bg-purple/20 blur-3xl" />
        <GlowOrb className="right-0 top-16 h-96 w-96 bg-cyan/10 blur-3xl" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
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

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-36">
          <div className="relative max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              {content.heroEyebrow}
            </p>

            <h1 className="mt-6 max-w-5xl font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              {heroWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={
                    index >= highlightStart
                      ? "bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-transparent"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-ink-muted sm:text-lg">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <Section>
        <SectionHeading
          eyebrow={content.coreEyebrow}
          title={content.coreTitle}
          description={content.coreDescription}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {content.services.map((service) => (
            <Card
              key={service.number}
              className="group relative flex min-h-[390px] flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple/30 hover:shadow-[0_24px_70px_rgba(76,59,255,0.10)]"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-center justify-between">
                <span className="text-sm font-bold text-cyan">
                  {service.number}
                </span>

                <span className="h-2 w-12 rounded-full bg-gradient-to-r from-purple to-cyan opacity-70 transition-all duration-300 group-hover:w-16" />
              </div>

              <div className="relative">
                <h2 className="mt-8 text-xl font-bold leading-tight">
                  {service.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-ink-muted">
                  {service.text}
                </p>
              </div>

              <ul className="relative mt-auto space-y-3 pt-7 text-sm text-ink-muted">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5"
                  >
                    <span className="shrink-0 text-cyan">
                      ✦
                    </span>

                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Needs */}
      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/35">
        <GlowOrb className="-right-40 top-1/2 h-80 w-80 -translate-y-1/2 bg-blue/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
              {content.needsEyebrow}
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              {content.needsTitle}
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-ink-muted">
              {content.needsDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.needsItems.map((item, index) => (
              <Card
                key={item}
                className="group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/20"
                hover={false}
              >
                <span className="text-xs font-bold tracking-[0.16em] text-cyan">
                  0{index + 1}
                </span>

                <div className="mt-5 h-px w-10 bg-gradient-to-r from-cyan to-transparent transition-all duration-300 group-hover:w-16" />

                <p className="mt-6 text-lg font-semibold">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Audience */}
      <Section>
        <SectionHeading
          eyebrow={content.audienceEyebrow}
          title={content.audienceTitle}
          description={content.audienceDescription}
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.audiences.map(([title, text], index) => (
            <Card
              key={title}
              className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan/20 ${
                index < 3 ? "border-purple/20" : ""
              }`}
            >
              <div className="absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-cyan/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <span className="text-xs font-semibold tracking-[0.16em] text-cyan">
                  {content.focus}{" "}
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-ink-muted">
                  {text}
                </p>

                <div className="mt-7 h-px w-10 bg-gradient-to-r from-purple to-cyan transition-all duration-300 group-hover:w-16" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-br from-purple/[0.06] via-surface to-blue/[0.06]">
        <GlowOrb className="left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-blue/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {content.approachEyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            {content.approachTitle}
          </h2>

          <p className="mx-auto mt-7 max-w-3xl leading-8 text-ink-muted">
            {content.approachDescription}
          </p>

          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-purple/25 bg-background/60 px-6 py-10 shadow-[0_30px_90px_rgba(76,59,255,0.14)] sm:px-12 sm:py-12">
            <GlowOrb className="left-1/2 top-0 h-48 w-48 -translate-x-1/2 bg-purple/10 blur-3xl" />

            <p className="relative font-heading text-3xl font-bold leading-tight sm:text-5xl">
              {content.vision}{" "}
              <span className="text-cyan">+</span>{" "}
              {content.development}{" "}
              <span className="text-purple">=</span>{" "}
              {content.community}
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Card
            hover={false}
            className="relative flex flex-col items-start justify-between gap-8 overflow-hidden border-blue/20 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 sm:p-12 lg:flex-row lg:items-center"
          >
            <GlowOrb className="-right-24 top-1/2 h-64 w-64 -translate-y-1/2 bg-cyan/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {content.ctaEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {content.ctaTitle}
              </h2>

              <p className="mt-4 leading-7 text-ink-muted">
                {content.ctaDescription}
              </p>
            </div>

            <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button to="/community-systems">
                <span className="group inline-flex items-center gap-2">
                  {content.systemsButton} <Arrow />
                </span>
              </Button>

              <Button
                to="/start-your-project"
                variant="secondary"
              >
                <span className="group inline-flex items-center gap-2">
                  {content.projectButton} <Arrow />
                </span>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Services;
