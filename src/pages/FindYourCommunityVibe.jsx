import { Link } from "react-router-dom";
import { Section, Container, SectionHeading, Card, Button, GlowOrb } from "../components/ui";

const vibes = [
  ["THE GAMING HUB","A high energy home for gamers, multiplayer communities, creators, and competitive audiences.","Gamers, multiplayer creators, competitive communities"],
  ["THE STREAMER HQ","A central headquarters where your audience can stay connected before, during, and after your streams.","Streamers, loyal viewers, growing audiences"],
  ["THE CYBER WORLD","A futuristic direction with digital energy, technology inspired spaces, and a modern online atmosphere.","Tech creators, futuristic brands, digital communities"],
  ["THE NIGHT LOUNGE","A relaxed dark space built around conversations, late night streams, and casual community energy.","Late night creators, chill audiences, social communities"],
  ["THE ELITE CLUB","A polished and organized direction with a premium atmosphere and a strong sense of belonging.","Premium communities, VIP spaces, exclusive audiences"],
  ["THE CREATOR STUDIO","A professional community direction for content, projects, updates, collaboration, and audience interaction.","Content creators, artists, digital projects"],
  ["THE ESPORTS ARENA","A competitive environment for teams, tournaments, events, and esports focused communities.","Competitive gaming, teams, tournaments"],
  ["THE RACING GARAGE","A community built around cars, racing, mechanics, motorsport, and high speed energy.","Racing creators, car lovers, motorsport fans"],
  ["THE ANIME WORLD","An entertainment focused direction for anime discussions, gaming, fandom interaction, and shared interests.","Anime creators, fandoms, entertainment communities"],
  ["THE FANTASY REALM","An immersive direction for RPG players, adventures, storytelling, and imaginative worlds.","RPG communities, fantasy creators, storytellers"],
  ["THE COMMUNITY LOUNGE","A warm and welcoming social space focused on conversations and natural member interaction.","Social communities, friendly audiences"],
  ["THE CREW","A close knit direction built around loyalty, friendships, regular members, and belonging.","Tight communities, loyal audiences, friend groups"],
  ["THE BATTLE ZONE","A bold high energy direction for shooters, action games, and competitive audiences.","FPS creators, action games, competitive players"],
  ["THE DIGITAL LAB","A modern space for technology, development, experiments, projects, and innovation.","Developers, tech creators, digital builders"],
  ["THE FITNESS BASE","A focused community direction for motivation, progress, accountability, and fitness journeys.","Fitness creators, gym communities, accountability groups"],
  ["THE MUSIC ROOM","A creative environment for musicians, artists, DJs, sound, and audience interaction.","Musicians, DJs, artists, music fans"],
  ["THE SPORTS ARENA","A community direction for sports creators, fans, discussions, competitions, and live events.","Sports creators, fan communities, live event audiences"],
  ["THE HORROR VAULT","A darker mysterious atmosphere for horror games, spooky content, and thriller communities.","Horror creators, spooky gaming, thriller fans"],
  ["THE RETRO ARCADE","A nostalgic direction inspired by classic gaming, old school aesthetics, and retro entertainment.","Retro gamers, nostalgic communities, classic entertainment"],
  ["THE BUSINESS LOUNGE","A structured professional space for entrepreneurs, networking, education, and organized discussions.","Businesses, entrepreneurs, professional communities"],
];

function FindYourCommunityVibe() {
  return <>
    <Section className="relative overflow-hidden pt-24 sm:pt-32">
      <GlowOrb className="-top-24 -left-24" />
      <Container className="relative text-center max-w-4xl">
        <p className="text-cyan-300 font-semibold tracking-[0.2em] text-xs mb-5">COMMUNITY DIRECTION</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">FIND THE VIBE FOR YOUR COMMUNITY</h1>
        <p className="mt-6 text-lg text-slate-300 leading-8">Not everyone already knows what they want their community to look or feel like. Explore different directions and find a vibe that feels close to your personality, content, audience, and goals.</p>
        <p className="mt-8 inline-block rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-200">START WITH A VIBE, THEN MAKE IT YOUR OWN</p>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="HOW THIS WORKS" title="A direction before the development" description="Choose one vibe, combine ideas from different directions, or simply use them as inspiration. Nothing here is a fixed template." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {["01, Explore Different Vibes","02, Find What Feels Right","03, Share Your Direction With Us","04, We Build Around Your Vision"].map((step) => <Card key={step} className="p-6"><p className="text-sm font-semibold text-cyan-200">{step}</p></Card>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="20 STARTING POINTS" title="Explore Community Vibes" description="Each direction has its own personality and audience, while staying flexible enough to become something uniquely yours." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          {vibes.map(([name, description, audience], i) => <Card key={name} className="group p-6 min-h-[220px] flex flex-col">
            <div className="flex items-center justify-between mb-5"><span className="text-xs text-purple-300 font-semibold">{String(i+1).padStart(2,"0")}</span><span className="h-2 w-2 rounded-full bg-cyan-300 group-hover:scale-150 transition" /></div>
            <h3 className="text-xl font-bold">{name}</h3><p className="mt-3 text-sm text-slate-300 leading-6">{description}</p><p className="mt-auto pt-5 text-xs text-slate-400">Best for, {audience}</p>
          </Card>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container><Card className="p-8 sm:p-12 text-center relative overflow-hidden"><GlowOrb className="right-0 bottom-0 opacity-60" /><div className="relative"><p className="text-cyan-300 text-xs tracking-[0.2em] font-semibold">MAKE IT YOUR OWN</p><h2 className="mt-4 text-3xl sm:text-5xl font-bold">YOUR COMMUNITY DOES NOT HAVE TO LOOK LIKE EVERYONE ELSE'S</h2><p className="mt-6 max-w-3xl mx-auto text-slate-300 leading-8">Your chosen vibe is only the beginning. The final community can be shaped around your brand, colors, personality, audience, content, goals, and preferred systems.</p></div></Card></Container>
    </Section>

    <Section className="pb-24"><Container className="text-center"><SectionHeading eyebrow="NEED HELP CHOOSING?" title="We can help you find your direction" description="Tell us about your content, goals, audience, and personality. We can help you identify a community direction that makes sense before development begins." /><div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"><Link to="/services"><Button>Explore Our Services</Button></Link><Link to="/start-your-project"><Button variant="secondary">Start Your Project</Button></Link></div></Container></Section>
  </>;
}
export default FindYourCommunityVibe;
