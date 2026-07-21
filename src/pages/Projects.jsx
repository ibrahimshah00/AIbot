import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

/**
 * Sample case files — replace with your real client work.
 * Each entry becomes one "Case File" card below.
 */
const CASES = [
  {
    id: "001",
    client: "Family medicine clinic, 4 physicians",
    type: "Chatbot",
    challenge: "Front desk fielded 60+ calls a day just for appointment requests and insurance questions.",
    result: "Booking calls down 41%",
    detail: "Web + SMS chatbot trained on the clinic's intake forms and insurance panel, live in three weeks.",
    tags: ["Medical", "Chatbot", "Booking"],
  },
  {
    id: "002",
    client: "Urgent care network, 3 locations",
    type: "Callbot",
    challenge: "After-hours calls went to voicemail; patients gave up and went to the ER instead.",
    result: "24/7 phone coverage, 0 missed after-hours calls",
    detail: "Voice callbot handles triage questions after close and escalates anything urgent to the on-call line.",
    tags: ["Medical", "Callbot", "Triage"],
  },
  {
    id: "003",
    client: "Dermatology practice, 2 physicians",
    type: "Chatbot + Callbot",
    challenge: "New patient inquiries were answered inconsistently depending on which staff member picked up.",
    result: "Consistent intake on 100% of new inquiries",
    detail: "Combined chat and voice deployment so every channel books off the same live calendar.",
    tags: ["Medical", "Chatbot", "Callbot"],
  },
  {
    id: "004",
    client: "Physical therapy clinic, 6 therapists",
    type: "Callbot",
    challenge: "Follow-up visits were falling through the cracks between sessions, hurting recovery outcomes.",
    result: "Follow-up booking rate up 35%",
    detail: "Callbot proactively reaches out after each session to lock in the next appointment before patients forget.",
    tags: ["Medical", "Callbot", "Follow-up"],
  },
];

export default function Projects() {
  return (
    <section className="pt-40 pb-28 container-px">
      <Reveal>
        <p className="eyebrow mb-4">Case files</p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl text-balance">
          A few of the desks we've quieted down.
        </h1>
        <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">
          Each build starts with one real bottleneck — a phone line, a waitlist, a front desk
          that's stretched too thin — and ends with a number that moved.
        </p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {CASES.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.05}>
            <CaseCard {...c} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-20 rounded-[1.75rem] border border-dashed border-teal-300 bg-teal-50/50 px-8 py-10 text-center">
          <p className="font-display text-2xl mb-2 text-balance">Your practice could be Case 005.</p>
          <p className="text-ink/60 mb-6 max-w-md mx-auto">
            Book a slot and we'll map your exact bottleneck before we write a line of code.
          </p>
          <Link to="/book-a-demo" className="btn-primary">
            Book a demo <ArrowUpRight size={15} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function CaseCard({ id, client, type, challenge, result, detail, tags }) {
  return (
    <div className="card-hover group rounded-2xl border border-line bg-white p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-teal-500 tracking-widest">CASE {id}</span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink/40">{type}</span>
      </div>
      <h3 className="font-display text-xl mb-3 text-balance">{client}</h3>
      <p className="text-sm text-ink/60 leading-relaxed mb-5">{challenge}</p>

      <div className="mt-auto pt-5 border-t border-line">
        <p className="font-display text-lg text-teal-600 mb-2">{result}</p>
        <p className="text-xs text-ink/50 leading-relaxed mb-4">{detail}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-base border border-line text-ink/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
