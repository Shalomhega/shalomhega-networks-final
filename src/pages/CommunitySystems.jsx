import { Button, Card, GlowOrb, Section, SectionHeading } from "../components/ui";

const Arrow = () => <span aria-hidden="true">→</span>;

const categories = [
  { id: "01", eyebrow: "Community entry and onboarding", title: "MAKE THE FIRST STEPS CLEAR", accent: "cyan", items: ["Custom Animated Welcome System", "Verification System", "Onboarding System", "Start Here Guide", "Role Selection System"] },
  { id: "02", eyebrow: "Information and guidance", title: "KEEP IMPORTANT INFORMATION EASY TO FIND", accent: "purple", items: ["Custom Rules System", "FAQ System", "Announcement System", "Embedded Social Links"] },
  { id: "03", eyebrow: "Automation and management", title: "SUPPORT THE COMMUNITY BEHIND THE SCENES", accent: "blue", items: ["Bot Integration", "Bot Analysis", "Logging System", "Member Count System"] },
  { id: "04", eyebrow: "Community engagement", title: "GIVE MEMBERS MORE WAYS TO PARTICIPATE", accent: "cyan", items: ["Birthday Bot Setup", "Counting System", "Gaming Bot Integration"] },
  { id: "05", eyebrow: "Creator and social notifications", title: "KEEP THE COMMUNITY CONNECTED TO WHAT IS HAPPENING", accent: "purple", items: ["Live Stream Notifications", "YouTube Notifications", "TikTok Notifications", "Instagram Notifications", "Clips Announcement System"] },
  { id: "06", eyebrow: "Community support", title: "CREATE A CLEAR PLACE FOR MEMBERS TO GET HELP", accent: "blue", items: ["Support Ticket System"] },
];

function CommunitySystems() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <GlowOrb className="-right-20 top-0 h-[30rem] w-[30rem] bg-purple/20 blur-3xl" />
        <GlowOrb className="-left-16 bottom-0 h-80 w-80 bg-cyan/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Community systems</p>
            <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">THE SYSTEMS <span className="bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-transparent">BEHIND A STRONG COMMUNITY</span></h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-ink-muted">A good community is not simply a collection of channels. It needs organized systems that help members understand where to go, what to do and how to interact with the space around them.</p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Built as connected infrastructure" title="EVERY SYSTEM SHOULD HAVE A PURPOSE" description="These systems are organized into areas of the community experience, making it easier to understand how each part can support the people using your server." />
        <div className="mt-12 space-y-8">
          {categories.map((category, categoryIndex) => (
            <Card key={category.id} hover={false} className={`p-7 sm:p-10 ${categoryIndex % 2 === 1 ? "bg-gradient-to-br from-surface-alt via-surface to-background" : ""}`}>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <span className="text-sm font-bold text-cyan">{category.id}</span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-purple">{category.eyebrow}</p>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{category.title}</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {category.items.map((item, index) => (
                    <div key={item} className="group rounded-2xl border border-white/[0.07] bg-background/45 p-5 transition duration-300 hover:border-cyan/30 hover:bg-white/[0.035]">
                      <div className="flex items-center justify-between gap-4"><span className="text-xs font-bold text-cyan">{String(index + 1).padStart(2, "0")}</span><span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-purple to-cyan opacity-60" /></div>
                      <p className="mt-7 font-semibold leading-6">{item}</p>
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Choose what makes sense</p>
          <h2 className="mt-5 text-4xl font-bold sm:text-6xl">NOT EVERY COMMUNITY NEEDS EVERY SYSTEM</h2>
          <p className="mx-auto mt-7 max-w-3xl leading-8 text-ink-muted">The right setup depends on your goals, audience and community direction. We help identify the systems that make sense instead of adding features simply because they are available.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {["Your goals", "Your audience", "Your direction"].map((item, index) => <div key={item} className="rounded-2xl border border-white/[0.08] bg-background/50 p-6"><span className="text-xs font-bold text-purple">0{index + 1}</span><p className="mt-5 font-semibold">{item}</p></div>)}
          </div>
        </div>
      </Section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Card hover={false} className="border-purple/25 bg-gradient-to-r from-purple/10 via-surface to-cyan/10 p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">What comes next</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">BUILD THE RIGHT FOUNDATION FOR THE COMMUNITY YOU WANT</h2><p className="mt-5 leading-8 text-ink-muted">Explore how we approach projects, discover a community direction or start discussing what your own community needs.</p></div>
              <div className="flex flex-wrap gap-3"><Button to="/services" variant="secondary">Explore Services <Arrow /></Button><Button to="/find-your-vibe" variant="secondary">Find Your Community Vibe <Arrow /></Button><Button to="/start-your-project">Start Your Project <Arrow /></Button></div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default CommunitySystems;
