import { Button, Card, GlowOrb, Section, SectionHeading } from "../components/ui";
import { useLanguage } from "../lib/LanguageContext.jsx";
import servicesTranslations from "../data/servicesTranslations.js";

const Arrow = () => <span aria-hidden="true">→</span>;

function Services() {
  const { language } = useLanguage();
  const content =
    servicesTranslations[language] || servicesTranslations.en;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-left-24 top-12 h-80 w-80 bg-purple/20 blur-3xl" />
        <GlowOrb className="right-0 top-16 h-96 w-96 bg-cyan/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              {content.heroEyebrow}
            </p>

            <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">
              {content.heroTitle.split(" ").map((word, index) => {
                const highlightStart =
                  content.heroTitle.split(" ").length > 4
                    ? Math.max(
                        content.heroTitle.split(" ").length - 5,
                        0
                      )
                    : 0;

                return (
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
                );
              })}
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-muted">
              {content.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow={content.coreEyebrow}
          title={content.coreTitle}
          description={content.coreDescription}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.services.map((service) => (
            <Card
              key={service.number}
              className="flex min-h-[360px] flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan">
                  {service.number}
                </span>

                <span className="h-2 w-16 rounded-full bg-gradient-to-r from-purple to-cyan opacity-70" />
              </div>

              <h2 className="mt-10 text-2xl font-bold">
                {service.title}
              </h2>

              <p className="mt-5 leading-7 text-ink-muted">
                {service.text}
              </p>

              <ul className="mt-auto space-y-3 pt-8 text-sm text-ink-muted">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="text-cyan">✦</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-y border-white/[0.06] bg-surface/35">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
              {content.needsEyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              {content.needsTitle}
            </h2>

            <p className="mt-6 leading-8 text-ink-muted">
              {content.needsDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.needsItems.map((item, index) => (
              <Card key={item} className="p-6" hover={false}>
                <span className="text-xs font-bold text-cyan">
                  0{index + 1}
                </span>

                <p className="mt-6 text-lg font-semibold">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

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
              className={index < 3 ? "border-purple/20" : ""}
            >
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
            </Card>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-br from-purple/[0.06] via-surface to-blue/[0.06]">
        <GlowOrb className="left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-blue/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {content.approachEyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-bold sm:text-6xl">
            {content.approachTitle}
          </h2>

          <p className="mx-auto mt-7 max-w-3xl leading-8 text-ink-muted">
            {content.approachDescription}
          </p>

          <div className="mt-12 rounded-[2rem] border border-purple/25 bg-background/60 px-7 py-10 shadow-[0_30px_90px_rgba(76,59,255,0.14)] sm:px-12">
            <p className="font-heading text-3xl font-bold sm:text-5xl">
              {content.vision}{" "}
              <span className="text-cyan">+</span>{" "}
              {content.development}{" "}
              <span className="text-purple">=</span>{" "}
              {content.community}
            </p>
          </div>
        </div>
      </Section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Card
            hover={false}
            className="flex flex-col items-start justify-between gap-8 border-blue/20 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 sm:p-12 lg:flex-row lg:items-center"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {content.ctaEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                {content.ctaTitle}
              </h2>

              <p className="mt-4 leading-7 text-ink-muted">
                {content.ctaDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button to="/community-systems">
                {content.systemsButton} <Arrow />
              </Button>

              <Button
                to="/start-your-project"
                variant="secondary"
              >
                {content.projectButton} <Arrow />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Services;
