import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

const FOUNDER = {
  name: "Furqan Sunka",
  role: "Owner & Lead",
  location: "United States",
  initials: "FS",
  gradient: "from-teal-500 to-teal-900",
  bio: "Sets the direction for ClinicFlow AI and leads the team building it — from which clinics we take on to how carefully every bot gets reviewed before it goes live.",
};

const TEAM = [
  {
    name: "Ibrahim Shah",
    role: "Full-Stack Engineer & Operations",
    credential: "BS Computer Science, Air University, Islamabad",
    bio: "Builds and ships the platform end-to-end, and runs day-to-day operations at ClinicFlow AI.",
    initials: "IS",
    gradient: "from-teal-600 to-teal-900",
  },
  {
    name: "Sehrish Rafique",
    role: "AI Specialist",
    credential: "PhD Candidate in AI, London, UK",
    bio: "Leads conversation design and model tuning, bringing research-level rigor to every escalation rule we ship.",
    initials: "SR",
    gradient: "from-teal-500 to-teal-700",
  },
  {
    name: "Mohsin",
    role: "AI Specialist",
    credential: "AI Chatbot Expert",
    bio: "Designs and fine-tunes the conversational engine behind every chatbot and callbot we build.",
    initials: "M",
    gradient: "from-signal-500 to-teal-600",
  },
  {
    name: "Awais Shah",
    role: "Marketing Head",
    credential: "MS, University of Liverpool",
    bio: "Leads positioning and client acquisition — the reason the right clinics find us in the first place.",
    initials: "AS",
    gradient: "from-clay to-teal-500",
  },
];

export default function About() {
  return (
    <>
      <section className="pt-40 pb-20 container-px">
        <Reveal>
          <p className="eyebrow mb-4">About</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl text-balance">
            Small team. Deliberately.
          </h1>
          <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">
            ClinicFlow AI is five people — a founder, an engineer who runs operations, two AI
            specialists, and a marketing lead. No account managers, no offshore support tier.
            The people who build your bot are the people who answer when you call.
          </p>
        </Reveal>
      </section>

      {/* FOUNDER SPOTLIGHT */}
      <section className="container-px pb-8">
        <Reveal>
          <div className="card-hover rounded-2xl border border-line bg-white p-7 sm:p-9 grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-start">
            <div
              className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br ${FOUNDER.gradient} flex items-center justify-center text-white font-display text-2xl flex-shrink-0`}
            >
              {FOUNDER.initials}
            </div>
            <div>
              <p className="eyebrow mb-2">{FOUNDER.role}</p>
              <h2 className="font-display text-2xl sm:text-3xl mb-2 text-balance">{FOUNDER.name}</h2>
              <p className="flex items-center gap-1.5 text-xs font-mono text-ink/45 uppercase tracking-wide mb-4">
                <MapPin size={13} className="flex-shrink-0" />
                {FOUNDER.location}
              </p>
              <p className="text-ink/60 leading-relaxed max-w-xl">{FOUNDER.bio}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TEAM GRID */}
      <section className="container-px pb-24">
        <Reveal>
          <p className="eyebrow mb-6">Who builds it</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="card-hover rounded-2xl border border-line bg-white p-6 h-full flex flex-col">
                <div
                  className={`h-14 w-14 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white font-display text-lg mb-5 flex-shrink-0`}
                >
                  {m.initials}
                </div>
                <p className="font-display text-lg mb-1 text-balance">{m.name}</p>
                <p className="text-sm text-teal-600 font-medium mb-3">{m.role}</p>
                <p className="flex items-start gap-1.5 text-xs font-mono text-ink/45 mb-4 leading-snug">
                  <GraduationCap size={14} className="flex-shrink-0 mt-0.5" />
                  {m.credential}
                </p>
                <p className="text-sm text-ink/55 leading-relaxed mt-auto">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY MEDICAL FIRST */}
      <section className="container-px pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="eyebrow mb-3">Why medical, first</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5 text-balance">
              The highest-stakes inbox deserved the most careful bot.
            </h2>
            <p className="text-ink/60 leading-relaxed max-w-md">
              We chose to specialize in healthcare because the cost of a bad automated answer is
              higher there than almost anywhere else. Holding every build to that bar is what
              keeps patients — and the practices who trust us with them — well served.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="space-y-6">
              <ProcessStep n="1" title="Map the bottleneck" text="We shadow your intake process — calls, messages, booking — before writing a script." />
              <ProcessStep n="2" title="Build & tune" text="Our AI specialists train the model on your real FAQs, tone, and escalation rules." />
              <ProcessStep n="3" title="Wire it in" text="Our engineer connects it to your calendar, website, and phone line — no new software for your staff to learn." />
              <ProcessStep n="4" title="Watch it live" text="You get call and chat logs from day one, and we keep tuning based on what patients actually ask." />
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="container-px pb-28">
        <Reveal>
          <div className="rounded-[2rem] bg-teal-900 grain px-8 py-16 md:px-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 text-balance max-w-xl mx-auto">
              Want to meet the team building yours?
            </h2>
            <Link to="/book-a-demo" className="btn-primary">
              Book a demo <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ProcessStep({ n, title, text }) {
  return (
    <li className="flex gap-5">
      <span className="font-mono text-sm text-teal-500 pt-1 flex-shrink-0 w-5">{n}</span>
      <div>
        <p className="font-display text-lg mb-1">{title}</p>
        <p className="text-sm text-ink/55 leading-relaxed">{text}</p>
      </div>
    </li>
  );
}
