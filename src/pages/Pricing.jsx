import { Link } from "react-router-dom";
import { Check, X, Sparkle } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const TIERS = [
  {
    key: "basic",
    name: "Basic",
    tagline: "For small clinics",
    cta: "Get started",
    popular: false,
    features: [
      { label: "2,000 minutes / month", included: true },
      { label: "24/7 chat coverage", included: true },
      { label: "5 concurrent sessions", included: true },
      { label: "Standard AI engine", included: true },
      { label: "Email support", included: true },
      { label: "Basic analytics", included: true },
      { label: "EMR integration", included: false },
      { label: "Multilingual support", included: false },
      { label: "Advanced analytics", included: false },
      { label: "HIPAA add-on", included: false },
    ],
  },
  {
    key: "standard",
    name: "Standard",
    tagline: "Most popular",
    cta: "Get started",
    popular: true,
    features: [
      { label: "8,000 minutes / month", included: true },
      { label: "24/7 chat coverage", included: true },
      { label: "15 concurrent sessions", included: true },
      { label: "Multilingual AI engine", included: true },
      { label: "Priority support", included: true },
      { label: "Advanced analytics", included: true },
      { label: "EMR integration", included: true },
      { label: "3 languages", included: true },
      { label: "HIPAA compliant", included: true },
      { label: "High-precision engine", included: false },
      { label: "Custom telephony", included: false },
    ],
  },
  {
    key: "premium",
    name: "Premium",
    tagline: "Enterprise",
    cta: "Contact sales",
    popular: false,
    features: [
      { label: "25,000 minutes / month", included: true },
      { label: "24/7 chat coverage", included: true },
      { label: "Unlimited sessions", included: true },
      { label: "High-precision AI engine", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "Full analytics suite", included: true },
      { label: "Deep EMR integration", included: true },
      { label: "3+ languages", included: true },
      { label: "Enhanced HIPAA controls", included: true },
      { label: "Custom telephony", included: true },
      { label: "SLA guarantee", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <section className="pt-40 pb-16 container-px">
        <Reveal>
          <p className="eyebrow mb-4 text-center">Packages</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl mx-auto text-balance text-center">
            Plans built around minutes, not mysteries.
          </h1>
          <p className="mt-6 text-lg text-ink/60 max-w-xl mx-auto leading-relaxed text-center">
            Every tier runs on the same clinically-reviewed engine. Pick the coverage your call
            and chat volume actually needs — upgrade any time as you grow.
          </p>
        </Reveal>
      </section>

      <section className="container-px pb-28">
        <div className="relative rounded-[2rem] bg-teal-900 tech-grid overflow-hidden">
          <div className="absolute inset-0 grain opacity-20" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-3 gap-6 p-6 md:p-10">
            {TIERS.map((t, i) => (
              <Reveal key={t.key} delay={i * 0.08}>
                <TierCard tier={t} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="text-center text-sm text-ink/50 mt-8">
            All plans include a 20-minute onboarding demo and month-to-month billing — no long-term contract.
          </p>
        </Reveal>
      </section>
    </>
  );
}

function TierCard({ tier }) {
  return (
    <div
      className={`relative rounded-[1.5rem] p-7 md:p-8 flex flex-col h-full ${
        tier.popular ? "bg-teal-950/40 border-2 border-teal-400" : "bg-white/[0.03] border border-white/10"
      }`}
      style={tier.popular ? { boxShadow: "0 0 50px rgba(63,167,157,0.35)" } : undefined}
    >
      {tier.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white text-teal-700 text-[11px] font-mono font-semibold tracking-wide uppercase px-3.5 py-1.5 shadow-lift whitespace-nowrap">
          <Sparkle size={12} className="fill-teal-500 text-teal-500" />
          Most popular
        </span>
      )}

      <div className="flex items-center justify-between mb-6">
        <p className={`font-mono text-xs tracking-[0.14em] uppercase ${tier.popular ? "text-teal-300" : "text-white/40"}`}>
          {tier.name}
        </p>
        <p className="text-sm italic text-white/50">{tier.tagline}</p>
      </div>

      <Link
        to="/book-a-demo"
        className={`w-full text-center rounded-full py-3.5 text-sm font-mono font-semibold uppercase tracking-wide mb-8 transition-all duration-300 ${
          tier.popular
            ? "bg-white text-teal-700 hover:-translate-y-0.5 hover:shadow-2xl"
            : "border border-white/15 text-white/70 hover:border-teal-400 hover:text-white"
        }`}
      >
        {tier.cta} →
      </Link>

      <ul className="space-y-4 flex-1">
        {tier.features.map((f) => (
          <li
            key={f.label}
            className={`flex items-center gap-3 text-sm ${
              f.included ? "text-white/85" : "text-white/25 line-through decoration-white/20"
            }`}
          >
            {f.included ? (
              <Check size={16} className="text-teal-400 flex-shrink-0" />
            ) : (
              <X size={16} className="text-white/20 flex-shrink-0" />
            )}
            {f.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
