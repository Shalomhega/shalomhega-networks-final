import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import Button from "../components/ui/Button.jsx";
import { Link } from "react-router-dom";
const steps=[
 ["01","UNDERSTAND YOUR DIRECTION","We start with what you have, what is missing, and what you want your community or project to become."],
 ["02","MAP THE FOUNDATION","We identify the structure, systems, onboarding, roles, content, and infrastructure needed before growth."],
 ["03","BUILD THE RIGHT SYSTEMS","The agreed parts are developed into a connected setup instead of isolated features that do not work together."],
 ["04","TEST AND IMPROVE","We review the experience from the member and owner side, fix weak points, and prepare the next improvements."],
];
function HowItWorks(){return <main className="bg-brand-field pb-20"><Section className="pt-20"><Container><div className="max-w-4xl"><p className="text-sm font-semibold tracking-[.2em] text-cyan">OUR PROCESS</p><h1 className="mt-5 text-4xl font-bold sm:text-6xl">HOW IT WORKS</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">We use a practical process that keeps the project connected from the first conversation to the systems your community uses every day.</p></div></Container></Section><Section><Container><div className="grid gap-5">{steps.map(([n,t,d])=><article key={n} className="grid gap-5 rounded-3xl border border-border bg-surface p-7 md:grid-cols-[100px_1fr]"><div className="text-4xl font-bold text-cyan">{n}</div><div><h2 className="text-2xl font-bold">{t}</h2><p className="mt-3 max-w-3xl leading-8 text-ink-muted">{d}</p></div></article>)}</div></Container></Section><Section><Container><div className="rounded-3xl border border-border bg-surface p-8"><h2 className="text-3xl font-bold">READY TO TALK ABOUT YOUR PROJECT?</h2><p className="mt-4 max-w-2xl text-ink-muted">You do not need every answer before starting. Bring the direction you have, and we can help organize the next steps.</p><div className="mt-6"><Link to="/start-your-project"><Button>START THE CONVERSATION</Button></Link></div></div></Container></Section></main>}
export default HowItWorks;
