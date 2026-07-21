import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessagesSquare,
  CalendarCheck,
  Users,
  UserPlus,
  ArrowUp,
  ArrowDown,
  MessageSquareText,
  PhoneCall,
} from "lucide-react";
import Reveal from "./Reveal.jsx";

const RANGES = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "all", label: "All time" },
];

const DATA = {
  today: [
    { label: "Total Queries", value: 84, trend: 12, icon: MessagesSquare, spark: [4, 6, 5, 8, 7, 9, 12] },
    { label: "Appointments Booked", value: 19, trend: 8, icon: CalendarCheck, spark: [2, 3, 2, 4, 3, 5, 6] },
    { label: "Total Patients", value: 612, trend: 2, icon: Users, spark: [10, 10, 11, 11, 12, 12, 13] },
    { label: "New Registered Users", value: 7, trend: -4, icon: UserPlus, spark: [3, 4, 2, 3, 2, 3, 2] },
  ],
  "7d": [
    { label: "Total Queries", value: 512, trend: 18, icon: MessagesSquare, spark: [40, 52, 48, 60, 58, 70, 84] },
    { label: "Appointments Booked", value: 118, trend: 14, icon: CalendarCheck, spark: [12, 14, 13, 16, 15, 18, 19] },
    { label: "Total Patients", value: 640, trend: 5, icon: Users, spark: [600, 608, 612, 620, 628, 635, 640] },
    { label: "New Registered Users", value: 34, trend: 21, icon: UserPlus, spark: [3, 5, 4, 6, 7, 8, 7] },
  ],
  "30d": [
    { label: "Total Queries", value: 2140, trend: 26, icon: MessagesSquare, spark: [200, 260, 300, 340, 380, 420, 460] },
    { label: "Appointments Booked", value: 486, trend: 19, icon: CalendarCheck, spark: [40, 55, 60, 68, 72, 80, 90] },
    { label: "Total Patients", value: 712, trend: 11, icon: Users, spark: [640, 655, 668, 680, 695, 705, 712] },
    { label: "New Registered Users", value: 143, trend: 32, icon: UserPlus, spark: [10, 15, 18, 22, 26, 30, 34] },
  ],
  all: [
    { label: "Total Queries", value: 18300, trend: 41, icon: MessagesSquare, spark: [1000, 3000, 6000, 9000, 12000, 15000, 18300] },
    { label: "Appointments Booked", value: 3980, trend: 33, icon: CalendarCheck, spark: [300, 800, 1400, 2000, 2700, 3300, 3980] },
    { label: "Total Patients", value: 1240, trend: 9, icon: Users, spark: [700, 800, 900, 1000, 1080, 1160, 1240] },
    { label: "New Registered Users", value: 890, trend: 27, icon: UserPlus, spark: [100, 200, 320, 450, 580, 720, 890] },
  ],
};

const QUERIES = [
  { q: "Do you accept Blue Cross insurance?", a: "Yes — Blue Cross PPO and HMO plans are accepted at this location.", channel: "chat", time: "2 min ago" },
  { q: "Can I move my Thursday appointment to Friday?", a: "Rescheduled to Friday, July 18 at 2:20 PM.", channel: "call", time: "14 min ago" },
  { q: "What are your hours on Saturday?", a: "Saturdays 9 AM–1 PM, walk-ins welcome.", channel: "chat", time: "41 min ago" },
  { q: "I have a fever and rash, should I come in?", a: "Logged as moderate priority — connecting you to a nurse now.", channel: "call", time: "1 hr ago" },
  { q: "Do you offer telehealth visits?", a: "Yes, video visits available Mon–Fri — book directly in chat.", channel: "chat", time: "2 hr ago" },
];

export default function DashboardPreview() {
  const [range, setRange] = useState("7d");
  const stats = DATA[range];

  return (
    <section id="dashboard" className="relative py-20 overflow-hidden border-y border-line">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-teal-50/50 to-transparent" />
      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-signal-500/10 blur-3xl" />

      <div className="container-px relative">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-3">Your dashboard</p>
            <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight text-balance max-w-xl">
              Every conversation, one screen.
            </h2>
          </div>
          <TimeFilter range={range} setRange={setRange} />
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <StatCard key={s.label + range} data={s} delay={i * 0.05} />
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="rounded-2xl border border-line bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-line">
            <p className="font-display text-lg">Recent queries</p>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
              {RANGES.find((r) => r.key === range).label}
            </span>
          </div>
          <div className="divide-y divide-line">
            {QUERIES.map((q, i) => (
              <QueryRow key={i} {...q} />
            ))}
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  );
}

function TimeFilter({ range, setRange }) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-line bg-base p-1 self-start">
      {RANGES.map((r) => (
        <button
          key={r.key}
          onClick={() => setRange(r.key)}
          className="relative px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm font-body rounded-full"
        >
          {range === r.key && (
            <motion.span
              layoutId="range-pill"
              className="absolute inset-0 rounded-full bg-teal-500"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className={`relative z-10 transition-colors duration-200 ${range === r.key ? "text-white" : "text-ink/60"}`}>
            {r.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function StatCard({ data, delay }) {
  const Icon = data.icon;
  const positive = data.trend >= 0;
  return (
    <Reveal delay={delay} y={16}>
      <div className="card-hover rounded-2xl border border-line bg-white p-6 h-full">
        <div className="flex items-center justify-between mb-5">
          <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <Icon size={18} />
          </div>
          <span
            className={`flex items-center gap-0.5 text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
              positive ? "text-teal-600 bg-teal-50" : "text-clay bg-clay/10"
            }`}
          >
            {positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
            {Math.abs(data.trend)}%
          </span>
        </div>
        <p className="font-display text-3xl mb-1">{data.value.toLocaleString()}</p>
        <p className="text-xs text-ink/50 mb-4">{data.label}</p>
        <Sparkline points={data.spark} positive={positive} />
      </div>
    </Reveal>
  );
}

function Sparkline({ points, positive }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100;
  const h = 28;
  const step = w / (points.length - 1);
  const norm = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none">
      <polyline
        points={norm}
        fill="none"
        stroke={positive ? "#0F6E68" : "#E8674B"}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

function QueryRow({ q, a, channel, time }) {
  const isCall = channel === "call";
  return (
    <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 hover:bg-base/60 transition-colors duration-200">
      <div className="flex items-center gap-2 sm:w-28 flex-shrink-0">
        <span className={`h-7 w-7 rounded-md flex items-center justify-center ${isCall ? "bg-signal-500/10 text-signal-500" : "bg-teal-50 text-teal-600"}`}>
          {isCall ? <PhoneCall size={13} /> : <MessageSquareText size={13} />}
        </span>
        <span className="text-[11px] font-mono text-ink/40 uppercase">{channel}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-ink/85 mb-1">{q}</p>
        <p className="text-xs text-ink/55 leading-relaxed">{a}</p>
      </div>
      <span className="text-[11px] font-mono text-ink/35 sm:w-20 sm:text-right flex-shrink-0">{time}</span>
    </div>
  );
}
