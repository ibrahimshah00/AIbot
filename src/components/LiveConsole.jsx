import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCRIPT = [
  { from: "user", text: "Hi, I've had a fever since last night and my throat hurts." },
  { from: "bot", text: "Sorry to hear that. On a scale of 1–10, how would you rate the fever discomfort?" },
  { from: "user", text: "Maybe a 6. No trouble breathing though." },
  { from: "bot", text: "Understood — logging that as moderate, non-urgent. Dr. Amara has an opening tomorrow at 10:40 AM." },
  { from: "user", text: "That works." },
  { from: "bot", text: "Booked ✓ Confirmation sent by SMS. Reply RESCHEDULE any time to change it." },
];

const TYPE_SPEED = 22;
const PAUSE_AFTER_MESSAGE = 900;
const PAUSE_BEFORE_LOOP = 2600;

export default function LiveConsole() {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState("");
  const [typingFrom, setTypingFrom] = useState(null);
  const scrollRef = useRef(null);
  const runId = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const myRun = ++runId.current;

    async function play() {
      while (!cancelled && myRun === runId.current) {
        setVisible([]);
        setTyping("");
        for (const msg of SCRIPT) {
          if (cancelled) return;
          setTypingFrom(msg.from);
          for (let i = 1; i <= msg.text.length; i++) {
            if (cancelled) return;
            setTyping(msg.text.slice(0, i));
            await sleep(TYPE_SPEED);
          }
          await sleep(PAUSE_AFTER_MESSAGE);
          setVisible((v) => [...v, msg]);
          setTyping("");
          setTypingFrom(null);
          await sleep(280);
        }
        await sleep(PAUSE_BEFORE_LOOP);
      }
    }
    play();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visible, typing]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* ambient glow */}
      <div className="absolute -inset-6 bg-teal-500/10 blur-3xl rounded-[2rem] -z-10" />

      <div className="rounded-[1.75rem] border border-line bg-white shadow-lift overflow-hidden">
        {/* device chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line bg-teal-900">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-300" />
          </span>
          <p className="font-mono text-[11px] tracking-wider text-white/80 uppercase">
            Live · Front-Desk Assistant
          </p>
        </div>

        {/* transcript */}
        <div ref={scrollRef} className="h-[300px] sm:h-[340px] overflow-hidden px-5 py-5 space-y-3 bg-[radial-gradient(circle_at_top_right,_#EAF4F2,_#FFFFFF_60%)]">
          <AnimatePresence initial={false}>
            {visible.map((m, i) => (
              <Bubble key={i} from={m.from} text={m.text} />
            ))}
          </AnimatePresence>
          {typing && <Bubble from={typingFrom} text={typing} isTyping />}
        </div>

        {/* input bar (decorative) */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-line bg-white">
          <div className="flex-1 h-10 rounded-full bg-base border border-line" />
          <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L20 4L13 20L11 13L4 12Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ from, text, isTyping }) {
  const isBot = from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-snug font-body ${
          isBot
            ? "bg-white border border-line text-ink rounded-bl-sm"
            : "bg-teal-500 text-white rounded-br-sm"
        }`}
      >
        {text}
        {isTyping && <span className="inline-block w-1.5 h-3.5 bg-current ml-0.5 align-middle animate-blink" />}
      </div>
    </motion.div>
  );
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
