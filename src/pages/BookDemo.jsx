import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ChevronLeft, ChevronRight, Check, ArrowUpRight, ArrowLeft, AlertCircle } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const TIME_SLOTS = ["9:00 AM", "9:40 AM", "10:20 AM", "11:00 AM", "1:00 PM", "1:40 PM", "2:20 PM", "3:00 PM"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["S","M","T","W","T","F","S"];

export default function BookDemo() {
  const [step, setStep] = useState("date"); // date -> details -> done
  const [viewDate, setViewDate] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", practice: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const today = useMemo(() => stripTime(new Date()), []);
  const days = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  function pickDate(d) {
    if (isPast(d, today)) return;
    setSelectedDate(d);
    setSelectedTime(null);
  }

  function confirmSlot() {
    if (selectedDate && selectedTime) setStep("details");
  }

  async function submitDetails(e) {
    e.preventDefault();
    setSendError(false);
    setSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS isn't configured yet, don't block the demo flow — just skip sending.
    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS is not configured — no notification email was sent. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to a .env file. See README.md."
      );
      setSending(false);
      setStep("done");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          practice: form.practice || "Not provided",
          demo_date: formatDate(selectedDate),
          demo_time: selectedTime,
          notes: form.notes || "Not provided",
        },
        { publicKey }
      );
      setStep("done");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="pt-40 pb-28 container-px min-h-screen">
      <Reveal>
        <p className="eyebrow mb-4">Book a demo</p>
        <h1 className="font-display text-[2.1rem] leading-[1.15] sm:text-4xl md:text-5xl md:leading-tight max-w-2xl text-balance">
          Pick a slot. See your bot live in 20 minutes.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-ink/70 max-w-xl leading-relaxed">
          No sales deck — one of our AI specialists walks you through a working chatbot or
          callbot built around a scenario from your own practice.
        </p>
      </Reveal>

      <div className="mt-14 max-w-xl">
        <AnimatePresence mode="wait">
          {step === "date" && (
            <StepWrap key="date">
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6 max-w-sm mx-auto sm:mx-0">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-display text-xl">
                    {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </p>
                  <div className="flex items-center gap-2">
                    <NavButton dir="prev" onClick={() => setViewDate(addMonths(viewDate, -1))} disabled={sameMonth(viewDate, today) } />
                    <NavButton dir="next" onClick={() => setViewDate(addMonths(viewDate, 1))} />
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1.5 mb-2">
                  {DAY_LABELS.map((d, i) => (
                    <p key={i} className="text-center font-mono text-[11px] text-ink/55 py-2">{d}</p>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {days.map((d, i) => {
                    if (!d) return <div key={i} />;
                    const disabled = isPast(d, today);
                    const isSelected = selectedDate && sameDay(d, selectedDate);
                    return (
                      <button
                        key={i}
                        onClick={() => pickDate(d)}
                        disabled={disabled}
                        className={`aspect-square rounded-lg text-sm font-body transition-all duration-200 ${
                          disabled
                            ? "text-ink/20 cursor-not-allowed"
                            : isSelected
                            ? "bg-teal-500 text-white shadow-lift scale-105"
                            : "text-ink/75 hover:bg-teal-50 hover:text-teal-600"
                        }`}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-7 mt-7 border-t border-line">
                        <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 mb-4">
                          Available — {formatDate(selectedDate)}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`px-2.5 py-2.5 rounded-lg text-[13px] font-body border transition-all duration-200 ${
                                selectedTime === t
                                  ? "bg-teal-500 border-teal-500 text-white"
                                  : "border-line text-ink/70 hover:border-teal-300 hover:text-teal-600"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-5 max-w-sm mx-auto sm:mx-0 flex justify-end">
                <button
                  onClick={confirmSlot}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary disabled:opacity-30 disabled:pointer-events-none"
                >
                  Continue <ArrowUpRight size={15} />
                </button>
              </div>
            </StepWrap>
          )}

          {step === "details" && (
            <StepWrap key="details">
              <button onClick={() => setStep("date")} className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-6 transition-colors">
                <ArrowLeft size={14} /> Change time
              </button>

              <div className="rounded-[1.75rem] border border-line bg-white p-6 md:p-8">
                <div className="flex items-center gap-3 mb-7 pb-7 border-b border-line">
                  <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-mono text-xs">
                    {selectedDate?.getDate()}
                  </div>
                  <div>
                    <p className="font-display text-base">{formatDate(selectedDate)}</p>
                    <p className="text-xs text-ink/50 font-mono">{selectedTime} · 20 min · Video call</p>
                  </div>
                </div>

                <form onSubmit={submitDetails} className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Dr. Amara Osei" />
                  <Field label="Work email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="amara@clinic.com" />
                  <Field label="Practice / business name" value={form.practice} onChange={(v) => setForm({ ...form, practice: v })} placeholder="Riverside Family Medicine" className="sm:col-span-2" />
                  <div className="sm:col-span-2">
                    <label className="text-sm text-ink/70 mb-2 block">What would you like the demo to focus on?</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="e.g. after-hours call coverage, cutting no-shows, multilingual intake..."
                      className="w-full rounded-xl border border-line px-4 py-3 text-sm bg-base focus:bg-white focus:border-teal-500 transition-colors duration-200 outline-none resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col items-end gap-3 mt-2">
                    {sendError && (
                      <p className="flex items-center gap-2 text-sm text-clay">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        Something went wrong sending your request. Please try again.
                      </p>
                    )}
                    <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60 disabled:pointer-events-none">
                      {sending ? "Sending..." : "Confirm demo"} {!sending && <ArrowUpRight size={15} />}
                    </button>
                  </div>
                </form>
              </div>
            </StepWrap>
          )}

          {step === "done" && (
            <StepWrap key="done">
              <div className="rounded-[1.75rem] border border-line bg-white p-10 md:p-14 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-16 w-16 rounded-full bg-teal-500 text-white flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={28} />
                </motion.div>
                <h2 className="font-display text-2xl md:text-3xl mb-3 text-balance">You're booked, {form.name.split(" ")[0] || "there"}.</h2>
                <p className="text-ink/60 max-w-sm mx-auto leading-relaxed mb-2">
                  {formatDate(selectedDate)} at {selectedTime}. A calendar invite and confirmation are on their way to {form.email || "your inbox"}.
                </p>
                <p className="text-xs text-ink/40 font-mono mt-6">Reply to that email any time to reschedule.</p>
              </div>
            </StepWrap>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StepWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function NavButton({ dir, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 rounded-full border border-line flex items-center justify-center text-ink/60 hover:border-teal-500 hover:text-teal-600 transition-colors duration-200 disabled:opacity-20 disabled:pointer-events-none"
    >
      {dir === "prev" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required, className = "" }) {
  return (
    <div className={className}>
      <label className="text-sm text-ink/70 mb-2 block">
        {label} {required && <span className="text-clay">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line px-4 py-3 text-sm bg-base focus:bg-white focus:border-teal-500 transition-colors duration-200 outline-none"
      />
    </div>
  );
}

/* ---------- date helpers ---------- */
function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d, n) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function stripTime(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function sameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function sameMonth(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth(); }
function isPast(d, today) { return stripTime(d) < today; }
function formatDate(d) {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
function buildMonthGrid(monthStart) {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(new Date(year, month, d));
  return grid;
}
