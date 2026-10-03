import { Link } from "react-router-dom";
import {
  Section,
  Container,
  SectionHeading,
  Card,
  Button,
  GlowOrb,
} from "../components/ui";
import { useLanguage } from "../lib/LanguageContext.jsx";
import communityVibeTranslations from "../data/communityVibeTranslations.js";

function FindYourCommunityVibe() {
  const { language } = useLanguage();

  const content =
    communityVibeTranslations[language] ||
    communityVibeTranslations.en;

  return (
    <>
      <Section className="relative overflow-hidden pt-24 sm:pt-32">
        <GlowOrb className="-top-24 -left-24" />

        <Container className="relative max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-cyan-300">
            {content.heroEyebrow}
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {content.heroTitle}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            {content.heroDescription}
          </p>

          <p className="mt-8 inline-block rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-200">
            {content.heroBadge}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.howEyebrow}
            title={content.howTitle}
            description={content.howDescription}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((step) => (
              <Card key={step} className="p-6">
                <p className="text-sm font-semibold text-cyan-200">
                  {step}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={content.vibesEyebrow}
            title={content.vibesTitle}
            description={content.vibesDescription}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.vibes.map(([name, description, audience], index) => (
              <Card
                key={name}
                className="group flex min-h-[260px] flex-col p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-cyan-300 transition group-hover:scale-150" />
                </div>

                <h3 className="text-xl font-bold">{name}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {description}
                </p>

                <p className="mt-auto pt-5 text-xs text-slate-400">
                  {content.bestFor}, {audience}
                </p>

                <Link
                  to={`/start-your-project?vibe=${encodeURIComponent(name)}`}
                  className="mt-5"
                >
                  <Button className="w-full">
                    {content.projectButton}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="relative overflow-hidden p-8 text-center sm:p-12">
            <GlowOrb className="bottom-0 right-0 opacity-60" />

            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
                {content.ownEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                {content.ownTitle}
              </h2>

              <p className="mx-auto mt-6 max-w-3xl leading-8 text-slate-300">
                {content.ownDescription}
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="pb-24">
        <Container className="text-center">
          <SectionHeading
            eyebrow={content.helpEyebrow}
            title={content.helpTitle}
            description={content.helpDescription}
          />

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/services">
              <Button>{content.servicesButton}</Button>
            </Link>

            <Link to="/start-your-project">
              <Button variant="secondary">
                {content.projectButton}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default FindYourCommunityVibe;
