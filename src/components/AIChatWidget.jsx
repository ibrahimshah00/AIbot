import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, ArrowUpRight } from "lucide-react";

const GREETING =
  "Hi, I'm Flo — ClinicFlow AI's assistant. Ask me about our chatbots, callbots, or getting a demo booked.";

const QUICK_REPLIES = ["What do you offer?", "How do I book a demo?", "Is patient data secure?"];

const FALLBACK_MESSAGE =
  "I'm having trouble connecting right now. You can book a demo directly or reach us at ibrahimibnanwar002@gmail.com.";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || FALLBACK_MESSAGE }]);
    } catch (err) {
      console.error("AI chat error:", err);
      setMessages((m) => [...m, { role: "assistant", content: FALLBACK_MESSAGE }]);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  const showQuickReplies = messages.length === 1;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] sm:max-h-[560px] h-[520px] flex flex-col rounded-2xl border border-line bg-white shadow-lift overflow-hidden"
          >
            {/* header */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-4 bg-teal-900 flex-shrink-0">
              <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-teal-300 to-teal-600 flex items-center justify-center flex-shrink-0">
                <Bot size={17} className="text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal-300 border-2 border-teal-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-display text-[15px] leading-tight">Flo</p>
                <p className="text-white/50 text-[11px] font-mono truncate">ClinicFlow AI assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="h-8 w-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 bg-[radial-gradient(circle_at_top_right,_#EAF4F2,_#FFFFFF_60%)]">
              {messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
              ))}
              {sending && <TypingBubble />}
            </div>

            {/* quick replies */}
            {showQuickReplies && !sending && (
              <div className="px-4 sm:px-5 pb-3 flex flex-wrap gap-2 flex-shrink-0">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs font-body px-3 py-1.5 rounded-full border border-line text-ink/65 hover:border-teal-400 hover:text-teal-600 transition-colors duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-line bg-white flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ClinicFlow AI..."
                disabled={sending}
                className="flex-1 min-w-0 h-10 rounded-full bg-base border border-line px-4 text-sm outline-none focus:border-teal-500 transition-colors duration-200 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-105 disabled:opacity-30 disabled:pointer-events-none"
              >
                <Send size={15} className="text-white" />
              </button>
            </form>

            <Link
              to="/book-a-demo"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-teal-600 py-2 border-t border-line hover:bg-teal-50 transition-colors duration-200 flex-shrink-0"
            >
              Prefer to book directly? <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat with Flo"}
        className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-teal-500 shadow-lift flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {!open && <span className="absolute inset-0 rounded-full border-2 border-teal-400 animate-pulseRing" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
}

function MessageBubble({ role, content }) {
  const isBot = role === "assistant";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug whitespace-pre-wrap ${
          isBot ? "bg-white border border-line text-ink rounded-bl-sm" : "bg-teal-500 text-white rounded-br-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-line rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-teal-400"
            style={{ animation: `typingDot 1.2s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
        <style>{`
          @keyframes typingDot {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-4px); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
