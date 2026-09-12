import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import Button from "../components/ui/Button.jsx";
import { Link } from "react-router-dom";

const values=[
  ["BUILD WITH PURPOSE","We focus on communities, systems, and experiences that have a clear reason for existing."],
  ["DEVELOP THE FOUNDATION","Strong communities need structure before growth. We design the systems that support the people inside them."],
  ["SUPPORT THE CREATOR","Our work is built around helping creators, streamers, and community owners move from ideas to usable infrastructure."],
  ["GROW TOGETHER","A community is not finished at launch. We build with room for improvement, feedback, and the next phase of growth."],
];
function OurTeam(){return <main className="bg-brand-field pb-20">
<Section className="pt-20"><Container><div className="max-w-4xl"><p className="text-sm font-semibold tracking-[.2em] text-cyan">THE PEOPLE BEHIND THE SYSTEMS</p><h1 className="mt-5 text-4xl font-bold sm:text-6xl">OUR TEAM</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">SHALOMHEGA NETWORKS brings together community thinking, creator support, and practical infrastructure. Our focus is simple: help good communities become easier to run, easier to join, and ready to grow.</p></div></Container></Section>
<Section><Container><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-3xl border border-border bg-surface p-8"><p className="text-sm font-semibold tracking-[.18em] text-cyan">OUR ROLE</p><h2 className="mt-4 text-3xl font-bold">WE BUILD THE FOUNDATION AROUND YOUR VISION.</h2><p className="mt-5 leading-8 text-ink-muted">Every project starts with your goals. We then help translate that direction into community structure, onboarding, automation, branding, and systems that your members can actually use.</p></div><div className="rounded-3xl border border-border bg-surface p-8"><p className="text-sm font-semibold tracking-[.18em] text-purple">HOW WE WORK</p><h2 className="mt-4 text-3xl font-bold">CLEAR DIRECTION. PRACTICAL EXECUTION.</h2><p className="mt-5 leading-8 text-ink-muted">We prefer a structured process over random changes. Understand the community first, identify the gaps, build the right systems, then improve from real feedback.</p></div></div></Container></Section>
<Section><Container><p className="text-sm font-semibold tracking-[.2em] text-cyan">WHAT GUIDES US</p><div className="mt-6 grid gap-5 md:grid-cols-2">{values.map(([t,d])=><div key={t} className="rounded-2xl border border-border bg-surface p-6"><h3 className="font-bold">{t}</h3><p className="mt-3 leading-7 text-ink-muted">{d}</p></div>)}</div></Container></Section>
<Section><Container><div className="rounded-3xl border border-purple/40 bg-surface p-8 text-center"><h2 className="text-3xl font-bold">WANT TO BUILD WITH US?</h2><p className="mx-auto mt-4 max-w-2xl text-ink-muted">Tell us what you are working on and where you want your community to go.</p><div className="mt-6"><Link to="/start-your-project"><Button>START YOUR PROJECT</Button></Link></div></div></Container></Section>
</main>}
export default OurTeam;
