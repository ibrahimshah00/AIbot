import { Bot, Activity, Languages, ClipboardList, Globe, CalendarCheck, PhoneForwarded } from "lucide-react";
import Reveal from "./Reveal.jsx";

const CENTER = { x: 50, y: 54 };

const NODES = [
  { key: "core", x: 50, y: 13, icon: Bot, title: "ClinicFlow Core", text: "One AI engine, tuned to your practice", core: true },
  { key: "uptime", x: 20, y: 30, icon: Activity, title: "Zero Downtime", text: "24/7 AI coverage, no shift schedule" },
  { key: "lang", x: 80, y: 30, icon: Languages, title: "Multilingual", text: "English, Spanish, Arabic & more" },
  { key: "patients", x: 14, y: 55, icon: ClipboardList, title: "Manage Patients Like a Pro", text: "Every conversation, logged in one dashboard" },
  { key: "web", x: 86, y: 55, icon: Globe, title: "Website Ready", text: "Chat anywhere your patients already are" },
  { key: "sched", x: 20, y: 80, icon: CalendarCheck, title: "Smart Scheduling", text: "Books & reschedules instantly" },
  { key: "escalate", x: 80, y: 80, icon: PhoneForwarded, title: "Instant Escalation", text: "Warm-transfers urgent cases to staff" },
];

/** Orthogonal elbow path from a node to the center, matching the reference's connector style. */
function elbowPath(n) {
  const { x, y } = n;
  const { x: cx, y: cy } = CENTER;
  if (n.core) return `M ${x} ${y} L ${x} ${cy}`;
  const midX = x < cx ? x + (cx - x) * 0.55 : x - (x - cx) * 0.55;
  return `M ${x} ${y} L ${midX} ${y} L ${midX} ${cy} L ${cx} ${cy}`;
}

export default function FeatureOrbit() {
  return (
    <section className="container-px py-20">
      <Reveal>
        <p className="eyebrow mb-3 text-center lg:text-left">How it all connects</p>
        <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight text-balance text-center lg:text-left max-w-xl mx-auto lg:mx-0 mb-14">
          One engine. Every capability your front desk needs.
        </h2>
      </Reveal>

      {/* Desktop / tablet — connected diagram */}
      <Reveal className="hidden lg:block">
        <div className="relative rounded-[2rem] bg-teal-900 tech-grid overflow-hidden" style={{ height: 640 }}>
          <div className="absolute inset-0 grain opacity-20" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 54%, rgba(63,167,157,0.16), transparent 42%)" }}
          />

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {NODES.map((n) => (
              <path
                key={n.key}
                d={elbowPath(n)}
                stroke="#5FA79D"
                strokeWidth={n.core ? 1.1 : 0.9}
                vectorEffect="non-scaling-stroke"
                fill="none"
                opacity={n.core ? 0.5 : 0.32}
                strokeLinejoin="round"
              />
            ))}
            {NODES.filter((n) => !n.core).map((n) => {
              const midX = n.x < CENTER.x ? n.x + (CENTER.x - n.x) * 0.55 : n.x - (n.x - CENTER.x) * 0.55;
              return <circle key={`dot-${n.key}`} cx={midX} cy={n.y} r="0.6" fill="#5FA79D" opacity="0.6" />;
            })}
          </svg>

          {/* center avatar */}
          <div className="absolute z-10" style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, transform: "translate(-50%,-50%)" }}>
            <div className="relative flex items-center justify-center h-32 w-32">
              <span className="absolute inset-0 rounded-full border border-teal-300/40 animate-pulseRing" />
              <span className="absolute inset-0 rounded-full border border-teal-300/40 animate-pulseRing" style={{ animationDelay: "1.1s" }} />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-teal-300 to-teal-600 flex items-center justify-center shadow-[0_0_45px_rgba(95,167,157,0.55)] border border-white/20">
                <Bot size={30} className="text-white" />
              </div>
            </div>
          </div>

          {NODES.map((n) => (
            <Node key={n.key} node={n} />
          ))}
        </div>
      </Reveal>

      {/* Mobile — stacked, readable, no absolute positioning */}
      <div className="lg:hidden">
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center h-24 w-24">
            <span className="absolute inset-0 rounded-full border border-teal-300/40 animate-pulseRing" />
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-teal-300 to-teal-600 flex items-center justify-center shadow-lift">
              <Bot size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {NODES.filter((n) => !n.core).map((n) => (
            <MobileNode key={n.key} node={n} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Node({ node }) {
  const Icon = node.icon;
  return (
    <div
      className="absolute z-10 w-[195px]"
      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%,-50%)" }}
    >
      <div
        className={`rounded-xl border backdrop-blur px-4 py-3.5 flex items-start gap-3 transition-all duration-300 hover:-translate-y-1 ${
          node.core
            ? "border-teal-300/60 bg-teal-600/30 shadow-[0_0_25px_rgba(95,167,157,0.25)]"
            : "border-white/10 bg-white/[0.06] hover:bg-white/[0.1] hover:border-teal-400/40"
        }`}
      >
        <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-teal-300" />
        </div>
        <div>
          <p className="text-white font-display text-[14.5px] leading-snug mb-0.5">{node.title}</p>
          <p className="text-white/55 text-[12px] leading-snug">{node.text}</p>
        </div>
      </div>
    </div>
  );
}

function MobileNode({ node }) {
  const Icon = node.icon;
  return (
    <Reveal>
      <div className="rounded-2xl bg-teal-900 px-5 py-4 flex items-start gap-3.5 h-full">
        <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <Icon size={17} className="text-teal-300" />
        </div>
        <div>
          <p className="text-white font-display text-[15px] mb-0.5">{node.title}</p>
          <p className="text-white/55 text-[13px] leading-snug">{node.text}</p>
        </div>
      </div>
    </Reveal>
  );
}
