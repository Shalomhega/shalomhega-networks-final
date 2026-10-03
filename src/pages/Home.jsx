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
    <span aria-hidden="true" className="text-lg">
      →
    </span>
  );
}

function Home() {
  const { language } = useLanguage();

  const content = homeTranslations[language] || homeTranslations.en;

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <GlowOrb className="-left-32 top-20 h-80 w-80 bg-purple/20 blur-3xl" />
        <GlowOrb className="right-0 top-0 h-96 w-96 bg-blue/15 blur-3xl" />

        <Container className="relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
              {content.heroBadge}
            </div>

            <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              {content.heroTitle}
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">
              {content.heroDescription}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to="/start-your-project">
                {content.startProject} <Arrow />
              </Button>

              <Button to="/our-work" variant="secondary">
                {content.exploreWork} <Arrow />
              </Button>
            </div>

            <div className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {content.highlights.map(([title, text]) => (
                <div
                  key={title}
                  className="border-l border-white/[0.12] pl-4"
                >
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.whatWeDoEyebrow}
            title={content.whatWeDoTitle}
            description={content.whatWeDoDescription}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.services.map(([title, text], index) => (
              <Card key={title}>
                <span className="text-sm font-bold text-cyan">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-8 text-xl font-semibold">{title}</h3>

                <p className="mt-4 leading-7 text-ink-muted">{text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/40">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">
              {content.whyEyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              {content.whyTitle}
            </h2>
          </div>

          <Card
            hover={false}
            className="border-blue/20 bg-gradient-to-br from-blue/10 via-surface to-purple/5"
          >
            <p className="text-lg leading-8 text-ink-muted">
              {content.whyDescription}
            </p>

            <div className="mt-8 h-px bg-gradient-to-r from-purple via-blue to-transparent" />

            <p className="mt-6 font-semibold text-ink">
              {content.whyStatement}
            </p>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.approachEyebrow}
            title={content.approachTitle}
            description={content.approachDescription}
            align="center"
          />

          <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-purple/25 bg-gradient-to-r from-purple/10 via-blue/10 to-cyan/10 px-8 py-12 text-center shadow-[0_30px_100px_rgba(76,59,255,0.12)] sm:px-14">
            <p className="font-heading text-3xl font-bold sm:text-5xl">
              {content.approachTitle}
            </p>

            <p className="mt-5 text-xl font-semibold text-ink-muted">
              <span className="text-cyan">+</span>{" "}
              {content.highlights[2][0]}{" "}
              <span className="text-purple">=</span>{" "}
              {content.highlights[0][0]}
            </p>
          </div>
        </Container>
      </Section>

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
                className="relative rounded-2xl border border-white/[0.07] bg-background/50 p-6"
              >
                <span className="text-xs font-bold text-cyan">
                  0{index + 1}
                </span>

                <p className="mt-8 font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/how-it-works" variant="secondary">
              {content.seeHowWeWork} <Arrow />
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.systemsEyebrow}
            title={content.systemsTitle}
            description={content.systemsDescription}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.systems.map((system, index) => (
              <Card key={system} className="min-h-[150px] p-6">
                <span className="text-xs text-purple">
                  SYSTEM {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-lg font-semibold">{system}</h3>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/community-systems">
              {content.exploreSystems} <Arrow />
            </Button>
          </div>
        </Container>
      </Section>

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
                className="flex aspect-[16/10] flex-col justify-between bg-gradient-to-br from-surface-alt via-surface to-background"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] text-cyan">
                    DEMO {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                    ▶
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">{video}</h3>

                  <p className="mt-2 text-sm text-ink-muted">
                    {content.videoComingSoon}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Button to="/our-work" variant="secondary">
              {content.exploreOurWork} <Arrow />
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.reviewsEyebrow}
            title={content.reviewsTitle}
            description={content.reviewsDescription}
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((number) => (
              <Card
                key={number}
                hover={false}
                className="min-h-[220px]"
              >
                <div className="h-2 w-20 rounded-full bg-gradient-to-r from-purple to-cyan opacity-60" />

                <p className="mt-10 text-sm leading-7 text-ink-muted">
                  {content.reviewPlaceholder}
                </p>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {content.reviewLabel}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button to="/reviews" variant="secondary">
              {content.readAllReviews} <Arrow />
            </Button>
          </div>
        </Container>
      </Section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <GlowOrb className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-purple/20 blur-3xl" />

        <Container className="relative text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
            {content.finalEyebrow}
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-bold sm:text-6xl">
            {content.finalTitle}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-ink-muted">
            {content.finalDescription}
          </p>

          <div className="mt-10">
            <Button to="/start-your-project">
              {content.startProject} <Arrow />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
