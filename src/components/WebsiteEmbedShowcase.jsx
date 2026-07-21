import { MessageCircle, Check } from "lucide-react";
import Reveal from "./Reveal.jsx";

const POINTS = [
  "Works with WordPress, Squarespace, Webflow & custom sites",
  "Matches your site's colors and fonts automatically",
  "No developer needed — copy, paste, done",
];

export default function WebsiteEmbedShowcase() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal>
          <p className="eyebrow mb-3">Integration</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 sm:mb-5 text-balance">
            Connects to your website in one line
          </h2>
          <p className="text-ink/60 leading-relaxed mb-6 sm:mb-7 max-w-md text-[15px] sm:text-base">
            No plugin marketplace, no dev sprint. Paste one snippet before your site's closing
            tag and the widget appears in the corner — ready to triage, book, and answer.
          </p>

          <div className="rounded-xl bg-ink px-4 sm:px-5 py-4 mb-6 sm:mb-7">
            <code className="font-mono text-[11.5px] sm:text-[12.5px] text-teal-300 leading-relaxed break-all sm:break-normal sm:whitespace-nowrap block sm:overflow-x-auto">
              &lt;script src="https://cdn.clinicflowai.com/widget.js" data-clinic="your-clinic-id"&gt;&lt;/script&gt;
            </code>
          </div>

          <ul className="space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-ink/75">
                <Check size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <BrowserMockup />
        </Reveal>
      </div>
    </section>
  );
}

function BrowserMockup() {
  return (
    <div className="rounded-2xl border border-line shadow-lift overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-base border-b border-line">
        <span className="h-2.5 w-2.5 rounded-full bg-clay/70 flex-shrink-0" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70 flex-shrink-0" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-500/70 flex-shrink-0" />
        <div className="ml-2 sm:ml-3 flex-1 min-w-0 h-6 rounded-md bg-white border border-line flex items-center px-3">
          <span className="text-[11px] font-mono text-ink/40 truncate">yourclinic.com</span>
        </div>
      </div>

      <div className="relative h-[340px] sm:h-[380px] md:h-[420px] bg-gradient-to-b from-teal-50 to-white p-4 sm:p-6 overflow-hidden">
        <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div className="h-2.5 w-10 sm:w-14 rounded bg-ink/10" />
          <div className="h-2.5 w-10 sm:w-14 rounded bg-ink/10" />
          <div className="h-2.5 w-10 sm:w-14 rounded bg-ink/10" />
        </div>
        <div className="h-4 sm:h-5 w-3/4 rounded bg-ink/15 mb-2 sm:mb-3" />
        <div className="h-4 sm:h-5 w-1/2 rounded bg-ink/15 mb-4 sm:mb-7" />
        <div className="h-14 sm:h-28 rounded-xl bg-white border border-line" />

        {/* floating widget */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex flex-col items-end gap-2 sm:gap-3 max-w-[calc(100%-1.5rem)]">
          {/* full conversation preview — enough vertical room from sm up */}
          <div className="hidden sm:block w-52 rounded-xl border border-line bg-white shadow-lift p-3">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse flex-shrink-0" />
              <p className="text-[11px] font-mono text-ink/50 uppercase tracking-wide">Chat with us</p>
            </div>
            <div className="bg-base rounded-lg rounded-bl-sm px-2.5 py-2 text-[11.5px] text-ink/70 mb-1.5 w-fit max-w-[85%]">
              Hi! Need to book an appointment?
            </div>
            <div className="bg-teal-500 text-white rounded-lg rounded-br-sm px-2.5 py-2 text-[11.5px] w-fit max-w-[85%] ml-auto">
              Yes, today if possible
            </div>
          </div>

          {/* compact badge — mobile only, keeps the widget from overlapping content */}
          <div className="sm:hidden flex items-center gap-1.5 bg-white border border-line rounded-full shadow-lift pl-2.5 pr-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse flex-shrink-0" />
            <span className="text-[10px] font-mono text-ink/60 whitespace-nowrap">Chat with us</span>
          </div>

          <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
            <span className="absolute inset-0 rounded-full border-2 border-teal-400 animate-pulseRing" />
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-500 shadow-lift flex items-center justify-center">
              <MessageCircle size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
