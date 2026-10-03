import {
  Button,
  Card,
  GlowOrb,
  Section,
  SectionHeading,
} from "../components/ui";
import { useLanguage } from "../lib/LanguageContext.jsx";
import communitySystemsTranslations from "../data/communitySystemsTranslations.js";

const Arrow = () => (
  <span
    aria-hidden="true"
    className="transition-transform duration-200 group-hover:translate-x-1"
  >
    →
  </span>
);

function CommunitySystems() {
  const { language } = useLanguage();

  const content =
    communitySystemsTranslations[language] ||
    communitySystemsTranslations.en;

  const heroWords = content.heroTitle.split(" ");
  const highlightStart = Math.max(heroWords.length - 5, 0);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-right-20 top-0 h-[30rem] w-[30rem] bg-purple/20 blur-3xl" />
        <GlowOrb className="-left-16 bottom-0 h-80 w-80 bg-cyan/10 blur-3xl" />

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

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-36">
          <div className="max-w-5xl">
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

      {/* Systems */}
      <Section>
        <SectionHeading
          eyebrow={content.sectionEyebrow}
          title={content.sectionTitle}
          description={content.sectionDescription}
        />

        <div className="mt-12 space-y-8">
          {content.categories.map((category, categoryIndex) => (
            <Card
              key={category.id}
              hover={false}
              className={`relative overflow-hidden p-7 sm:p-10 ${
                categoryIndex % 2 === 1
                  ? "bg-gradient-to-br from-surface-alt via-surface to-background"
                  : ""
              }`}
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple/5 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-cyan">
                      {category.id}
                    </span>

                    <span className="h-px w-12 bg-gradient-to-r from-cyan to-transparent" />
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
                    {category.eyebrow}
                  </p>

                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                    {category.title}
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {category.items.map((item, index) => (
                    <div
                      key={item}
                      className="group rounded-2xl border border-white/[0.07] bg-background/45 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:bg-white/[0.035]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-cyan">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-purple to-cyan opacity-60 transition-all duration-300 group-hover:w-14" />
                      </div>

                      <p className="mt-7 font-semibold leading-6">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Choice */}
      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/35">
        <GlowOrb className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-blue/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {content.choiceEyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            {content.choiceTitle}
          </h2>

          <p className="mx-auto mt-7 max-w-3xl leading-8 text-ink-muted">
            {content.choiceDescription}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {content.choiceItems.map((item, index) => (
              <div
                key={item}
                className="group rounded-2xl border border-white/[0.08] bg-background/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple/25"
              >
                <span className="text-xs font-bold text-purple">
                  0{index + 1}
                </span>

                <div className="mx-auto mt-5 h-px w-10 bg-gradient-to-r from-purple to-cyan transition-all duration-300 group-hover:w-16" />

                <p className="mt-5 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Card
            hover={false}
            className="relative overflow-hidden border-purple/25 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 sm:p-12"
          >
            <GlowOrb className="-right-24 top-1/2 h-64 w-64 -translate-y-1/2 bg-cyan/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                  {content.nextEyebrow}
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                  {content.nextTitle}
                </h2>

                <p className="mt-5 leading-8 text-ink-muted">
                  {content.nextDescription}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <Button to="/services" variant="secondary">
                  <span className="group inline-flex items-center gap-2">
                    {content.servicesButton} <Arrow />
                  </span>
                </Button>

                <Button to="/find-your-vibe" variant="secondary">
                  <span className="group inline-flex items-center gap-2">
                    {content.vibeButton} <Arrow />
                  </span>
                </Button>

                <Button to="/start-your-project">
                  <span className="group inline-flex items-center gap-2">
                    {content.projectButton} <Arrow />
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default CommunitySystems;
