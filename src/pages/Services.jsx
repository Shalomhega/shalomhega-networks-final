import { Button, Card, GlowOrb, Section, SectionHeading } from "../components/ui";

const Arrow = () => <span aria-hidden="true">→</span>;

const coreServices = [
  {
    number: "01",
    title: "BUILD FROM SCRATCH",
    text: "Starting with a blank space does not mean starting without direction. We help plan the structure, member journey, systems and visual identity of a new community from the beginning.",
    points: ["Community planning", "Channel and category structure", "Core systems and automation"],
  },
  {
    number: "02",
    title: "REVAMP YOUR COMMUNITY",
    text: "When a community has outgrown its structure, we improve the experience without automatically destroying what is already working well for the people inside it.",
    points: ["Structure and navigation review", "System improvements", "Cleaner member experience"],
  },
  {
    number: "03",
    title: "IMPROVE SPECIFIC SYSTEMS",
    text: "Sometimes the whole community does not need rebuilding. We can focus on the exact areas that need stronger organization, automation or guidance.",
    points: ["Onboarding and verification", "Roles and notifications", "Support and automation"],
  },
];

const audiences = [
  ["STREAMERS", "Communities that support the channel beyond the live stream."],
  ["CONTENT CREATORS", "Organized spaces that help audiences stay connected."],
  ["GAMING COMMUNITIES", "Clear systems for active members, events and shared interests."],
  ["BUSINESSES", "Professional community spaces built around communication and support."],
  ["ONLINE COMMUNITIES", "Flexible infrastructure for groups with their own purpose and direction."],
];

function Services() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-left-24 top-12 h-80 w-80 bg-purple/20 blur-3xl" />
        <GlowOrb className="right-0 top-16 h-96 w-96 bg-cyan/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Services</p>
            <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">
              BUILDING COMMUNITIES <span className="bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-transparent">AROUND WHERE YOU WANT TO GO</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-muted">
              Every streamer, creator, community and business has a different direction. That is why SHALOMHEGA NETWORKS does not use one fixed approach for everyone. We develop around what you want to achieve.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Three core services" title="START WHERE YOUR COMMUNITY ACTUALLY NEEDS HELP" description="You can begin with a complete build, a thoughtful revamp or a focused improvement. The work should fit the project, not force the project to fit a package." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {coreServices.map((service) => (
            <Card key={service.number} className="flex min-h-[360px] flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan">{service.number}</span>
                <span className="h-2 w-16 rounded-full bg-gradient-to-r from-purple to-cyan opacity-70" />
              </div>
              <h2 className="mt-10 text-2xl font-bold">{service.title}</h2>
              <p className="mt-5 leading-7 text-ink-muted">{service.text}</p>
              <ul className="mt-auto space-y-3 pt-8 text-sm text-ink-muted">
                {service.points.map((point) => <li key={point} className="flex gap-3"><span className="text-cyan">✦</span>{point}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-y border-white/[0.06] bg-surface/35">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">Built around your needs</p>
            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">YOU DO NOT ALWAYS NEED A COMPLETE REBUILD</h2>
            <p className="mt-6 leading-8 text-ink-muted">Some projects need a full foundation. Others only need one important system fixed properly. We can work from the actual situation in front of you.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["A completely new community", "A complete revamp", "A few important improvements", "One specific system"].map((item, index) => (
              <Card key={item} className="p-6" hover={false}>
                <span className="text-xs font-bold text-cyan">0{index + 1}</span>
                <p className="mt-6 text-lg font-semibold">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Who we build for" title="COMMUNITY INFRASTRUCTURE WITH CREATORS AT THE CENTER" description="Streamers and creators are our main focus, while the same community development experience can support other organized spaces with their own goals." align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map(([title, text], index) => (
            <Card key={title} className={index < 3 ? "border-purple/20" : ""}>
              <span className="text-xs font-semibold tracking-[0.16em] text-cyan">FOCUS {String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-7 text-lg font-bold">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-gradient-to-br from-purple/[0.06] via-surface to-blue/[0.06]">
        <GlowOrb className="left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-blue/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Our development approach</p>
          <h2 className="mt-5 text-4xl font-bold sm:text-6xl">YOUR COMMUNITY SHOULD FEEL LIKE YOUR COMMUNITY</h2>
          <p className="mx-auto mt-7 max-w-3xl leading-8 text-ink-muted">We do not simply copy the same Discord template for every client. We listen to your goals, direction, personality, audience and preferences, then develop the structure and systems around that identity.</p>
          <div className="mt-12 rounded-[2rem] border border-purple/25 bg-background/60 px-7 py-10 shadow-[0_30px_90px_rgba(76,59,255,0.14)] sm:px-12">
            <p className="font-heading text-3xl font-bold sm:text-5xl">YOUR VISION <span className="text-cyan">+</span> OUR DEVELOPMENT <span className="text-purple">=</span> YOUR COMMUNITY</p>
          </div>
        </div>
      </Section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Card hover={false} className="flex flex-col items-start justify-between gap-8 border-blue/20 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Find the right direction</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">EXPLORE THE SYSTEMS BEHIND YOUR COMMUNITY</h2><p className="mt-4 leading-7 text-ink-muted">See the infrastructure we can select and develop around your goals.</p></div>
            <div className="flex flex-wrap gap-3"><Button to="/community-systems">Explore Community Systems <Arrow /></Button><Button to="/start-your-project" variant="secondary">Start Your Project <Arrow /></Button></div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Services;
