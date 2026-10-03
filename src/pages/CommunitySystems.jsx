import { Button, Card, GlowOrb, Section, SectionHeading } from "../components/ui";
import { useLanguage } from "../lib/LanguageContext.jsx";
import communitySystemsTranslations from "../data/communitySystemsTranslations.js";

const Arrow = () => <span aria-hidden="true">→</span>;

function CommunitySystems() {
  const { language } = useLanguage();

  const content =
    communitySystemsTranslations[language] ||
    communitySystemsTranslations.en;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-right-20 top-0 h-[30rem] w-[30rem] bg-purple/20 blur-3xl" />
        <GlowOrb className="-left-16 bottom-0 h-80 w-80 bg-cyan/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              {content.heroEyebrow}
            </p>

            <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">
              {content.heroTitle.split(" ").map((word, index) => {
                const words = content.heroTitle.split(" ");
                const highlightStart = Math.max(words.length - 5, 0);

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
          eyebrow={content.sectionEyebrow}
          title={content.sectionTitle}
          description={content.sectionDescription}
        />

        <div className="mt-12 space-y-8">
          {content.categories.map((category, categoryIndex) => (
            <Card
              key={category.id}
              hover={false}
              className={`p-7 sm:p-10 ${
                categoryIndex % 2 === 1
                  ? "bg-gradient-to-br from-surface-alt via-surface to-background"
                  : ""
              }`}
            >
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <span className="text-sm font-bold text-cyan">
                    {category.id}
                  </span>

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
                      className="group rounded-2xl border border-white/[0.07] bg-background/45 p-5 transition duration-300 hover:border-cyan/30 hover:bg-white/[0.035]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-cyan">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-purple to-cyan opacity-60" />
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

      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/35">
        <GlowOrb className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-blue/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            {content.choiceEyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-bold sm:text-6xl">
            {content.choiceTitle}
          </h2>

          <p className="mx-auto mt-7 max-w-3xl leading-8 text-ink-muted">
            {content.choiceDescription}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {content.choiceItems.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/[0.08] bg-background/50 p-6"
              >
                <span className="text-xs font-bold text-purple">
                  0{index + 1}
                </span>

                <p className="mt-5 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Card
            hover={false}
            className="border-purple/25 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 sm:p-12"
          >
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                  {content.nextEyebrow}
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                  {content.nextTitle}
                </h2>

                <p className="mt-5 leading-8 text-ink-muted">
                  {content.nextDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button to="/services" variant="secondary">
                  {content.servicesButton} <Arrow />
                </Button>

                <Button
                  to="/find-your-vibe"
                  variant="secondary"
                >
                  {content.vibeButton} <Arrow />
                </Button>

                <Button to="/start-your-project">
                  {content.projectButton} <Arrow />
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
