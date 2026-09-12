import AnnouncementBar from "../components/layout/AnnouncementBar.jsx";
import { Button, Card, Container, Section, SectionHeading, GlowOrb } from "../components/ui";

const services = [
  ["01", "Build From Scratch", "We plan and develop a new Discord community around your channel, audience and the experience you want members to have."],
  ["02", "Revamp Your Community", "We improve an existing server by fixing structure, movement, clarity and the systems members interact with every day."],
  ["03", "Improve Specific Systems", "Already happy with your community? We can focus on the exact systems that need stronger structure or better automation."],
];

const systems = ["Custom Welcome System", "Rules System", "Onboarding", "Verification", "Role Selection", "Live Stream Notifications", "Bot Integration", "Support Tickets"];
const videos = ["Welcome", "Structure", "Rules", "Roles", "FAQ", "Verification"];

function Arrow() { return <span aria-hidden="true" className="text-lg">→</span>; }

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <GlowOrb className="-left-32 top-20 h-80 w-80 bg-purple/20 blur-3xl" />
        <GlowOrb className="right-0 top-0 h-96 w-96 bg-blue/15 blur-3xl" />
        <Container className="relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
              Community development for creators
            </div>
            <h1 className="max-w-4xl font-heading text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-8xl">
              BUILD A COMMUNITY THAT <span className="bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-transparent">MOVES WITH YOUR CHANNEL</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">
              SHALOMHEGA NETWORKS helps streamers and creators build new Discord communities, improve existing ones and develop systems around the direction they actually want to take their channel.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to="/start-your-project">Start Your Project <Arrow /></Button>
              <Button to="/our-work" variant="secondary">Explore Our Work <Arrow /></Button>
            </div>
            <div className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[["Built around you", "Your direction leads the development"], ["Real foundation", "No fake growth or artificial activity"], ["Team support", "Systems built with structure and purpose"]].map(([title, text]) => (
                <div key={title} className="border-l border-white/[0.12] pl-4">
                  <p className="font-semibold text-ink">{title}</p><p className="mt-1 text-sm leading-6 text-ink-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <AnnouncementBar />

      <Section>
        <Container>
          <SectionHeading eyebrow="What we do" title="MORE THAN JUST A DISCORD SERVER" description="A good community is not only about adding channels. It is about creating a clear environment where members understand where to go, what to do and how to stay connected." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map(([number,title,text]) => <Card key={title}><span className="text-sm font-bold text-cyan">{number}</span><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-ink-muted">{text}</p></Card>)}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/40">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple">Why community matters</p><h2 className="mt-5 text-4xl font-bold sm:text-5xl">YOUR CHANNEL NEEDS SOMEWHERE FOR PEOPLE TO CONNECT</h2></div>
          <Card hover={false} className="border-blue/20 bg-gradient-to-br from-blue/10 via-surface to-purple/5"><p className="text-lg leading-8 text-ink-muted">Promotion can bring people to a channel, but a properly developed community gives those people somewhere organized to connect, stay informed and return.</p><div className="mt-8 h-px bg-gradient-to-r from-purple via-blue to-transparent" /><p className="mt-6 font-semibold text-ink">Visibility brings attention, community gives it somewhere to grow.</p></Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Our approach" title="YOUR VISION, OUR DEVELOPMENT" description="We do not build communities around assumptions. We listen to where you want to go, understand what you want members to experience, then bring structure and ideas that support that direction." align="center" />
          <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-purple/25 bg-gradient-to-r from-purple/10 via-blue/10 to-cyan/10 px-8 py-12 text-center shadow-[0_30px_100px_rgba(76,59,255,0.12)] sm:px-14">
            <p className="font-heading text-3xl font-bold sm:text-5xl">YOUR VISION <span className="text-cyan">+</span> OUR DEVELOPMENT <span className="text-purple">=</span> YOUR COMMUNITY</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/35">
        <Container>
          <SectionHeading eyebrow="How we work" title="A CLEAR PROCESS, BUILT TO KEEP YOU INVOLVED" />
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {["Understand Your Vision","Plan the Direction","Build the Systems","Show the Progress","Refine Together"].map((step,i)=><div key={step} className="relative rounded-2xl border border-white/[0.07] bg-background/50 p-6"><span className="text-xs font-bold text-cyan">0{i+1}</span><p className="mt-8 font-semibold leading-6">{step}</p></div>)}
          </div>
          <div className="mt-10"><Button to="/how-it-works" variant="secondary">See How We Work <Arrow /></Button></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Community systems" title="THE SYSTEMS THAT HOLD THE EXPERIENCE TOGETHER" description="Every community needs different tools, but these are some of the systems we can structure around your needs." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((system,i)=><Card key={system} className="min-h-[150px] p-6"><span className="text-xs text-purple">SYSTEM 0{i+1}</span><h3 className="mt-7 text-lg font-semibold">{system}</h3></Card>)}
          </div>
          <div className="mt-10"><Button to="/community-systems">Explore Community Systems <Arrow /></Button></div>
        </Container>
      </Section>

      <Section className="border-y border-white/[0.06] bg-surface/40">
        <Container>
          <SectionHeading eyebrow="Our work" title="FOCUSED DEMONSTRATIONS, NOT RANDOM SHOWCASES" description="Our portfolio is organized around individual community systems so you can clearly see what each part of the experience is designed to do." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video,i)=><Card key={video} className="aspect-[16/10] flex flex-col justify-between bg-gradient-to-br from-surface-alt via-surface to-background"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.2em] text-cyan">DEMO {String(i+1).padStart(2,"0")}</span><span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]">▶</span></div><div><h3 className="text-2xl font-semibold">{video}</h3><p className="mt-2 text-sm text-ink-muted">Video showcase coming soon</p></div></Card>)}
          </div>
          <div className="mt-10"><Button to="/our-work" variant="secondary">Explore Our Work <Arrow /></Button></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Reviews" title="REAL WORDS WILL SPEAK FOR THE WORK" description="Approved client reviews will appear here as projects are completed and feedback is shared." align="center" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[1,2,3].map(n=><Card key={n} hover={false} className="min-h-[220px]"><div className="h-2 w-20 rounded-full bg-gradient-to-r from-purple to-cyan opacity-60"/><p className="mt-10 text-sm leading-7 text-ink-muted">Approved client feedback will be displayed here after the review system is connected.</p><p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Review placeholder</p></Card>)}
          </div>
          <div className="mt-10 text-center"><Button to="/reviews" variant="secondary">Read All Reviews <Arrow /></Button></div>
        </Container>
      </Section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <GlowOrb className="left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-purple/20 blur-3xl" />
        <Container className="relative text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Start when you are ready</p><h2 className="mx-auto mt-5 max-w-4xl text-4xl font-bold sm:text-6xl">READY TO BUILD SOMETHING BETTER FOR YOUR COMMUNITY?</h2><p className="mx-auto mt-6 max-w-2xl leading-8 text-ink-muted">Whether you are starting from scratch, revamping an existing community or improving specific systems, we can work around the direction you want to take.</p><div className="mt-10"><Button to="/start-your-project">Start Your Project <Arrow /></Button></div></Container>
      </section>
    </>
  );
}
export default Home;
