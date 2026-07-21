import { Link } from "react-router-dom";
import { ArrowUpRight, Check, MessageSquareText, PhoneCall, HeartPulse } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import Waveform from "../components/Waveform.jsx";

const IMG_TABLET = "https://images.unsplash.com/photo-1666886573452-9dc8ce8f5cc5?auto=format&fit=crop&w=1400&q=80";

export default function Services() {
  return (
    <>
      <section className="pt-40 pb-16 container-px">
        <Reveal>
          <p className="eyebrow mb-4">Services</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl text-balance">
            Three ways to never miss a patient.
          </h1>
          <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">
            Every build starts from the same core engine, then gets tuned to how your practice
            actually talks, triages, and books.
          </p>
        </Reveal>
      </section>

      {/* MEDICAL CHATBOTS */}
      <ServiceBlock
        id="medical"
        icon={<MessageSquareText size={20} />}
        eyebrow="01 — Chatbots"
        title="Medical practice chatbots"
        desc="A web and SMS chatbot trained on your intake forms, insurance list, and clinic hours. It asks the right triage questions, flags anything urgent for a human, and books directly into your calendar."
        bullets={[
          "Symptom-aware intake, tuned to your specialty",
          "Insurance & billing FAQs answered instantly",
          "Direct booking into your existing scheduling system",
          "Automatic escalation to staff for anything urgent",
        ]}
        image={IMG_TABLET}
        reverse={false}
      />

      {/* CALLBOTS */}
      <section id="callbots" className="container-px py-20 border-t border-line">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative rounded-[1.75rem] bg-teal-900 p-10 h-[380px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 grain opacity-30" />
              <p className="eyebrow text-teal-300">02 — Callbots</p>
              <Waveform className="h-16" color="#5FA79D" />
              <div className="flex items-center gap-3">
                <PhoneCall size={16} className="text-teal-300" />
                <p className="font-mono text-xs text-white/60">Incoming call · 00:14 · answering...</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5 text-balance">
              Voice callbots that pick up on the first ring
            </h2>
            <p className="text-ink/60 leading-relaxed mb-7 max-w-lg">
              Phone is still how most patients reach a clinic. Our callbots handle natural
              conversation — not a rigid phone tree — to reschedule, answer hours and location
              questions, and route anything sensitive to your team in real time.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Understands natural speech, not just keypad menus",
                "Reschedules and cancels appointments live",
                "Warm-transfers urgent calls to on-call staff",
                "Call summaries logged automatically for your records",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink/75">
                  <Check size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link to="/book-a-demo" className="btn-primary">
              Hear it on a live call <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PATIENT RECORDS & EMR */}
      <section id="records" className="container-px py-20 border-t border-line pb-28">
        <Reveal>
          <div className="rounded-[1.75rem] border border-line bg-white p-10 md:p-14 grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="h-14 w-14 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <HeartPulse size={26} />
            </div>
            <div>
              <p className="eyebrow mb-3">03 — Records</p>
              <h2 className="font-display text-2xl md:text-3xl mb-4 text-balance">
                Patient records & EMR sync, done automatically
              </h2>
              <p className="text-ink/60 leading-relaxed max-w-2xl mb-6">
                Every chat and call is transcribed, summarized, and pushed into your existing EMR
                — so your team never re-types what a patient already told the bot.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {["Structured visit summaries", "EMR-ready exports", "HIPAA-aware logging"].map((t) => (
                  <div key={t} className="rounded-xl bg-base border border-line px-4 py-3.5 text-sm font-mono text-ink/70">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ServiceBlock({ id, eyebrow, title, desc, bullets, image, reverse }) {
  return (
    <section id={id} className="container-px py-20 border-t border-line">
      <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <div className="rounded-[1.75rem] overflow-hidden shadow-lift">
            <img src={image} alt="" className="w-full h-[380px] object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5 text-balance">{title}</h2>
          <p className="text-ink/60 leading-relaxed mb-7 max-w-lg">{desc}</p>
          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-ink/75">
                <Check size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <Link to="/book-a-demo" className="btn-primary">
            Book a demo <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
