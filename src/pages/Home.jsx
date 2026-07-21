import { Link } from "react-router-dom";
import { ArrowUpRight, MessageSquareText, PhoneCall, HeartPulse, Stethoscope } from "lucide-react";
import LiveConsole from "../components/LiveConsole.jsx";
import Waveform from "../components/Waveform.jsx";
import Reveal from "../components/Reveal.jsx";
import FeatureOrbit from "../components/FeatureOrbit.jsx";
import WebsiteEmbedShowcase from "../components/WebsiteEmbedShowcase.jsx";
import FAQ from "../components/FAQ.jsx";
import DashboardPreview from "../components/DashboardPreview.jsx";

const IMG_DOCTOR_TABLET = "https://images.unsplash.com/photo-1666886573452-9dc8ce8f5cc5?auto=format&fit=crop&w=1600&q=80";
const IMG_TWO_DOCTORS = "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?auto=format&fit=crop&w=1600&q=80";

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="absolute inset-0 grain" />
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-teal-100/60 blur-3xl animate-floatSlow" />
        <div className="absolute top-40 -left-32 h-72 w-72 rounded-full bg-signal-500/10 blur-3xl" />

        <div className="container-px relative grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">AI reception for clinics & medical practices</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[2.15rem] leading-[1.12] sm:text-[2.6rem] sm:leading-[1.08] md:text-6xl md:leading-[1.05] text-balance">
                Your front desk, awake at{" "}
                <span className="italic text-teal-500">2 a.m.</span> too.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-ink/65 max-w-lg leading-relaxed">
                ClinicFlow AI builds chatbots and callbots that triage patients, answer routine
                questions, and book appointments — so your staff spends less time on the phone
                and more time with people in the room.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/book-a-demo" className="btn-primary">
                  Book a demo <ArrowUpRight size={16} />
                </Link>
                <Link to="/projects" className="btn-ghost">
                  See case files
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] sm:text-sm text-ink/60 uppercase tracking-wide">
                <span>5-person team</span>
                <span className="h-1 w-1 rounded-full bg-ink/25 flex-shrink-0" />
                <span>Medical-first</span>
                <span className="h-1 w-1 rounded-full bg-ink/25 flex-shrink-0" />
                <span>Live in weeks, not quarters</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={30}>
            <LiveConsole />
          </Reveal>
        </div>
      </section>

      {/* ================= DASHBOARD PREVIEW (just below hero) ================= */}
      <DashboardPreview />

      {/* ================= SERVICES PREVIEW ================= */}
      <section className="container-px py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <Reveal>
            <div>
              <p className="eyebrow mb-3">What we build</p>
              <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight text-balance max-w-xl">
                Two channels. One brain. Every patient answered.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/services" className="btn-ghost">
              All services <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<MessageSquareText size={22} />}
            eyebrow="Chatbots"
            title="Medical practice chatbots"
            desc="Symptom intake, insurance FAQs, appointment booking and reminders — on your website and SMS, in your clinic's voice."
          />
          <ServiceCard
            icon={<PhoneCall size={22} />}
            eyebrow="Callbots"
            title="Voice callbots"
            desc="Answers real phone calls, understands natural speech, books or reschedules appointments, and transfers urgent cases to a human instantly."
            waveform
          />
          <ServiceCard
            icon={<HeartPulse size={22} />}
            eyebrow="Records"
            title="Patient records & EMR sync"
            desc="Every chat and call is logged and pushed straight into your existing EMR — no manual re-entry, no lost context between visits."
          />
        </div>
      </section>

      {/* ================= FEATURE ORBIT DIAGRAM ================= */}
      <FeatureOrbit />

      {/* ================= IMAGE + STATS BAND ================= */}
      <section className="relative py-24 mt-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_TWO_DOCTORS} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-teal-900/85" />
        </div>
        <div className="container-px relative grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="eyebrow text-teal-300 mb-4">Why medical practices call us first</p>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight text-balance">
                Built by AI specialists who read HIPAA before they read the room.
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed max-w-md">
                We started with clinics because the stakes are real — a missed call can be a
                missed diagnosis. Every bot we ship is reviewed for clinical tone, escalation
                rules, and data handling before it goes live.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-6">
            <Stat number="24/7" label="Coverage, no shift schedule" />
            <Stat number="<2s" label="Average response latency" />
            <Stat number="5" label="Specialists on your build" />
            <Stat number="2" label="AI engineers dedicated to fine-tuning" />
          </div>
        </div>
      </section>

      {/* ================= WEBSITE EMBED SHOWCASE ================= */}
      <WebsiteEmbedShowcase />

      {/* ================= TEAM STRIP ================= */}
      <section className="container-px py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <Reveal>
            <div className="relative rounded-[1.75rem] overflow-hidden shadow-lift">
              <img src={IMG_DOCTOR_TABLET} alt="Clinician reviewing patient messages on a tablet" className="w-full h-[420px] object-cover" loading="lazy" />
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-xl px-5 py-4 flex items-center gap-3 shadow-soft">
                <Stethoscope size={18} className="text-teal-500 flex-shrink-0" />
                <p className="text-sm text-ink/80">
                  "Patients get a same-day answer even when the front desk is slammed."
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-3">The team</p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-balance mb-5">
                Five people. No handoffs, no account managers, no runaround.
              </h2>
              <p className="text-ink/65 leading-relaxed max-w-lg mb-8">
                Two AI specialists build and fine-tune your models. One full-stack engineer wires
                it into your booking system and website. Two on marketing make sure the right
                patients — and the right clients — find you in the first place.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/about" className="btn-ghost">
                Meet the team <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="container-px pb-28">
        <Reveal>
          <div className="relative rounded-[2rem] bg-teal-500 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center grain">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-signal-500/20 blur-3xl" />
            <p className="eyebrow text-white/70 mb-4">Ready when you are</p>
            <h2 className="font-display text-3xl md:text-5xl text-white leading-tight max-w-2xl mx-auto text-balance">
              Pick a slot. We'll show you your bot, live, in 20 minutes.
            </h2>
            <div className="mt-9">
              <Link to="/book-a-demo" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-teal-600 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
                Book a demo <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= FAQ (just above footer) ================= */}
      <FAQ />
    </>
  );
}

function ServiceCard({ icon, eyebrow, title, desc, waveform }) {
  return (
    <Reveal className="card-hover group relative rounded-2xl border border-line bg-white p-7 flex flex-col">
      <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white">
        {icon}
      </div>
      <p className="font-mono text-[13px] font-semibold tracking-[0.1em] uppercase text-teal-600 mb-2">{eyebrow}</p>
      <h3 className="font-display text-xl mb-3">{title}</h3>
      <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
      {waveform && (
        <div className="mt-6 pt-5 border-t border-line">
          <Waveform className="h-9" />
        </div>
      )}
    </Reveal>
  );
}

function Stat({ number, label }) {
  return (
    <div className="border border-white/15 rounded-xl px-5 py-6 bg-white/5">
      <p className="font-display text-3xl text-white mb-1">{number}</p>
      <p className="text-xs text-white/60 leading-snug">{label}</p>
    </div>
  );
}
