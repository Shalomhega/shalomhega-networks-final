import Section from "../components/ui/Section.jsx";
import Container from "../components/ui/Container.jsx";
import { Link } from "react-router-dom";

const leadership = [
  {
  name: "SHALOM",
  role: "Founder & Community Development Lead",
  username: "shalom_x2",
  image: "/images/Shalomnetwork.png",
  description:
    "Leading the vision, structure, development, and growth of SHALOMHEGA NETWORKS."
},
  {
  name: "OMHEGA",
  role: "Co-Founder & Community Systems Lead",
  username: "omhega_x3",
  image: "/images/OMHEGA.jpg",
  description:
    "Helping build strong systems, infrastructure, and practical foundations for the community."
},
];

const team = [
  {
  name: "Famezilla",
  username: "fame_max",
  role: "Team Member",
  image: "/images/Famemaxe.jpg",
},
  {
  name: "Novacore",
  username: "Novacore",
  role: "Team Member",
  image: "/images/Novacore.png",
},
  {
  name: "MONET",
  username: "Monet40",
  role: "Team Member",
  image: "/images/monet.png",
},
  {
  name: "Qosight",
  username: "Qosight",
  role: "Team Member",
  image: "/images/qosiht.png",
},
];

function OurTeam() {
  return (
    <main className="bg-brand-field pb-20">
      <Section className="pt-20 pb-12">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[.2em] text-cyan">
              OUR TEAM
            </p>

            <h1 className="mt-5 text-5xl font-bold text-white sm:text-6xl">
              THE PEOPLE BEHIND{" "}
              <span className="text-purple">SHALOMHEGA NETWORKS</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-text-muted">
              SHALOMHEGA NETWORKS is built by people focused on community,
              systems, creator support, and practical development. We work
              together to create stronger foundations and better experiences
              for the communities we support.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container>
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-[.2em] text-cyan">
              LEADERSHIP
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              BUILDING THE FOUNDATION
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border border-purple/40 bg-surface p-8"
              >
                <img
  src={member.image}
  alt={member.name}
  className="h-16 w-16 rounded-2xl object-cover border border-purple/40"
/>

                <p className="mt-6 text-sm font-semibold tracking-[.15em] text-cyan">
                  LEADERSHIP
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {member.name}
                </h3>

                <p className="mt-2 font-medium text-purple">
                  {member.role}
                </p>

                <p className="mt-1 text-sm text-text-muted">
                  @{member.username}
                </p>

                <p className="mt-6 leading-7 text-text-muted">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-[.2em] text-cyan">
              THE NETWORK
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              MEET THE TEAM
            </h2>

            <p className="mt-4 max-w-2xl text-text-muted">
              Every person contributes to the growth and development of the
              SHALOMHEGA NETWORKS vision.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <img
  src={member.image}
  alt={member.name}
  className="h-12 w-12 rounded-xl object-cover border border-cyan/40"
/>

                <h3 className="mt-5 text-xl font-bold text-white">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm text-purple">
                  {member.role}
                </p>

                <p className="mt-1 text-sm text-text-muted">
                  @{member.username}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="rounded-3xl border border-purple/40 bg-surface p-8 text-center sm:p-12">
            <p className="text-sm font-semibold tracking-[.2em] text-cyan">
              BUILD WITH US
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white">
              WANT TO BUILD WITH SHALOMHEGA NETWORKS?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-text-muted">
              Tell us what you are building and where you want your community
              to go.
            </p>

            <Link
              to="/start-your-project"
              className="mt-8 inline-block rounded-full bg-purple px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              START YOUR PROJECT
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export default OurTeam;
