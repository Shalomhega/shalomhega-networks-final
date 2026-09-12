import { Button, Card, GlowOrb, Section, SectionHeading } from "../components/ui";

const Arrow = () => <span aria-hidden="true">→</span>;

const phases = [
  { number: "01", title: "FOUNDATION", price: "€200", items: ["Community direction discussion", "Basic server planning", "Core category and channel structure", "Foundation navigation", "Initial organization"] },
  { number: "02", title: "MEMBER EXPERIENCE", price: "€220", items: ["Welcome direction", "Onboarding setup", "Verification direction", "Rules presentation", "Role selection structure"] },
  { number: "03", title: "SYSTEMS AND AUTOMATION", price: "€230", items: ["Selected bot integrations", "Automation systems", "Notifications", "Logging direction", "Support systems and agreed infrastructure"] },
  { number: "04", title: "REFINEMENT AND COMPLETION", price: "€200", items: ["Final refinements", "Navigation improvements", "Community consistency", "Testing and review", "Final agreed adjustments"] },
];

const tiers = [
  { label: "TIER 1", title: "SYSTEM FOCUS", text: "For one specific system or a small number of important improvements.", items: ["Verification", "Rules", "Roles", "Onboarding", "Notifications", "Support systems"], action: "CONTACT US FOR PROJECT PRICING" },
  { label: "TIER 2", title: "COMMUNITY DEVELOPMENT", text: "For several systems, a structured revamp, or a significant part of a community that needs stronger direction.", items: ["Connected improvements", "Structured revamp", "Multiple systems", "Clearer member experience"], action: "CONTACT US FOR PROJECT PRICING" },
  { label: "TIER 3", title: "COMPLETE COMMUNITY", text: "For creators who want a full community development experience built around one agreed direction.", items: ["Complete development journey", "Structured phases", "Professional guidance", "€850 complete community development"], action: "EXPLORE THE COMPLETE PROJECT", featured: true },
];

function Pricing() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-left-24 top-12 h-80 w-80 bg-purple/20 blur-3xl" />
        <GlowOrb className="right-0 top-16 h-96 w-96 bg-cyan/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <div className="relative max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Pricing and project options</p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">BUILD YOUR COMMUNITY <span className="bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-transparent">AT YOUR OWN PACE</span></h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-muted">Not every creator needs the same level of development at the same time. Some projects need one important system, while others need a complete community built from the ground up.</p>
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-cyan">START WHERE YOU NEED TO START</p>
          </div>
        </div>
      </section>

      <Section className="border-b border-white/[0.06] bg-surface/25">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">Our approach</p><h2 className="mt-5 text-4xl font-bold sm:text-5xl">TRUST WHAT WE BUILD</h2></div>
          <Card hover={false} className="border-cyan/15 bg-gradient-to-br from-surface via-surface to-cyan/[0.04] p-8 sm:p-10"><p className="text-lg leading-8 text-ink-muted">We focus on building trust through what we develop, demonstrate and deliver. You should be able to see the direction and quality of the work instead of relying only on words. Every project can be discussed around its scope, priorities and practical next steps.</p></Card>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Complete community development" title="ONE COMPLETE DIRECTION, CLEARLY AGREED" description="Our complete community development project is designed for creators who want the full community experience planned and developed around their goals." />
        <Card hover={false} className="relative mt-12 overflow-hidden border-purple/30 bg-gradient-to-br from-purple/[0.13] via-surface to-cyan/[0.08] p-8 sm:p-12">
          <GlowOrb className="right-0 top-0 h-72 w-72 bg-purple/15 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Complete package</p><h2 className="mt-4 text-4xl font-bold sm:text-6xl">COMPLETE COMMUNITY DEVELOPMENT</h2><p className="mt-6 max-w-3xl leading-8 text-ink-muted">One complete project direction, a structured development process, and a community built around your goals. Features agreed within the final project scope are included without hidden additions later. The scope is agreed before development begins, so both sides understand what the project covers.</p></div><div className="rounded-3xl border border-white/10 bg-background/60 px-8 py-7 text-center backdrop-blur"><p className="text-sm uppercase tracking-[0.18em] text-ink-muted">Fixed complete price</p><p className="mt-2 text-6xl font-bold text-cyan">€850</p></div></div>
        </Card>
      </Section>

      <Section className="border-y border-white/[0.06] bg-surface/25">
        <SectionHeading eyebrow="Build in phases" title="COMPLETE THE JOURNEY STEP BY STEP" description="If the complete project is not the right place to begin, the community can be developed through connected phases. Completing all four phases equals the complete €850 development journey." />
        <div className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {phases.map((phase) => <Card key={phase.number} className="flex min-h-[410px] flex-col p-7"><div className="flex items-start justify-between"><span className="text-sm font-bold text-cyan">PHASE {phase.number}</span><span className="text-3xl font-bold text-purple">{phase.price}</span></div><h3 className="mt-8 text-xl font-bold">{phase.title}</h3><ul className="mt-6 space-y-3 text-sm leading-6 text-ink-muted">{phase.items.map((item) => <li key={item} className="flex gap-3"><span className="text-cyan">✦</span>{item}</li>)}</ul></Card>)}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-cyan/20 bg-background/60 p-6 text-center sm:flex-row sm:text-left"><div><p className="font-bold">ALL FOUR PHASES CONNECT INTO ONE COMPLETE DEVELOPMENT JOURNEY</p><p className="mt-2 text-sm text-ink-muted">Exact systems can be adjusted around what the community actually needs.</p></div><p className="text-4xl font-bold text-cyan">TOTAL, €850</p></div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Three project directions" title="CHOOSE THE LEVEL THAT MATCHES THE WORK" description="These tiers explain the level of support available. Smaller and unique projects can be discussed based on their actual requirements." align="center" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">{tiers.map((tier) => <Card key={tier.label} className={`flex min-h-[440px] flex-col ${tier.featured ? "border-purple/40 bg-gradient-to-b from-purple/[0.12] to-surface shadow-[0_30px_90px_rgba(76,59,255,0.12)]" : ""}`}><span className="text-xs font-bold tracking-[0.18em] text-cyan">{tier.label}</span><h3 className="mt-7 text-2xl font-bold">{tier.title}</h3><p className="mt-4 leading-7 text-ink-muted">{tier.text}</p><ul className="mt-7 space-y-3 text-sm text-ink-muted">{tier.items.map((item) => <li key={item} className="flex gap-3"><span className="text-purple">✦</span>{item}</li>)}</ul><div className="mt-auto pt-8"><Button to="/start-your-project" variant={tier.featured ? "primary" : "secondary"} className="w-full justify-center">{tier.action} <Arrow /></Button></div></Card>)}</div>
      </Section>

      <Section className="border-y border-white/[0.06] bg-gradient-to-br from-purple/[0.05] via-surface to-blue/[0.05]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Need something different?</p><h2 className="mt-5 text-4xl font-bold sm:text-5xl">START WITH THE CONVERSATION</h2><p className="mt-6 leading-8 text-ink-muted">Not every project fits perfectly into a standard structure. If you have a smaller budget, a unique idea, or questions about what should come first, we can discuss the right direction professionally.</p></div><div className="grid gap-3 sm:grid-cols-2">{["Your current community", "Your goals", "Your priorities", "The systems you need first", "A possible development direction"].map((item) => <div key={item} className="rounded-2xl border border-white/[0.08] bg-background/50 p-5 text-sm font-medium">{item}</div>)}</div></div>
      </Section>

      <Section>
        <SectionHeading eyebrow="What you are paying for" title="MORE THAN A COLLECTION OF CHANNELS" description="Community development involves the thinking and refinement behind how everything works together." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{["Planning", "Structure", "Navigation", "Member experience", "Systems", "Automation", "Organization", "Customization", "Testing", "Refinement", "Professional recommendations"].map((item, index) => <Card key={item} className="p-5" hover={false}><span className="text-xs font-bold text-cyan">{String(index + 1).padStart(2, "0")}</span><p className="mt-5 font-semibold">{item}</p></Card>)}</div>
      </Section>

      <section className="pb-20 sm:pb-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Card hover={false} className="border-blue/20 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 text-center sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Your next step</p><h2 className="mt-4 text-4xl font-bold sm:text-6xl">LET'S TALK ABOUT YOUR COMMUNITY</h2><p className="mx-auto mt-6 max-w-3xl leading-8 text-ink-muted">Whether you already know exactly what you want or you are still figuring out where to start, we can discuss the direction that makes sense for your project.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Button to="/start-your-project">START YOUR PROJECT <Arrow /></Button><Button to="/community-systems" variant="secondary">EXPLORE COMMUNITY SYSTEMS <Arrow /></Button></div></Card></div></section>
    </>
  );
}

export default Pricing;
