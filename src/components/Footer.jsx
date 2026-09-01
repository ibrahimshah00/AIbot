import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white/80 mt-32">
      <div className="container-px py-16 grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center relative">
              <span className="h-1.5 w-1.5 rounded-full bg-white absolute left-2" />
              <span className="h-1.5 w-1.5 rounded-full bg-white absolute right-2" />
            </span>
            <span className="font-display text-[19px] text-white tracking-tight">ClinicFlow AI</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-white/60">
            Chatbot and callbot systems for medical practices and clinics — built by a five-person team who ships fast.
          </p>
        </div>

        <FooterCol
          title="Site"
          links={[
            { to: "/services", label: "Services" },
            { to: "/packages", label: "Packages" },
            { to: "/#dashboard", label: "Dashboard" },
            { to: "/projects", label: "Case files" },
            { to: "/about", label: "About" },
            { to: "/book-a-demo", label: "Book a demo" },
          ]}
        />
        <FooterCol
          title="Services"
          links={[
            { to: "/services#medical", label: "Medical chatbots" },
            { to: "/services#callbots", label: "Callbots" },
            { to: "/services#records", label: "Records & EMR sync" },
          ]}
        />
        {/* <div>
          <p className="eyebrow text-teal-300 mb-4">Talk to us</p>
          <a href="mailto:ibrahimibnanwar002@gmail.com" className="block text-sm text-white hover:text-teal-300 transition-colors mb-2 link-underline w-fit">
            ibrahimibnanwar002@gmail.com
          </a>
          <Link to="/book-a-demo" className="inline-flex items-center gap-1.5 text-sm text-teal-300 hover:text-white transition-colors mt-2">
            Book a demo <ArrowUpRight size={14} />
          </Link>
        </div> */}
        <div>
  <p className="eyebrow text-teal-300 mb-4">Talk to us</p>

  <a
    href="mailto:ibrahimibnanwar002@gmail.com"
    className="block text-sm text-white hover:text-teal-300 transition-colors mb-2 link-underline w-fit"
  >
    contact@clinicflowai.us
  </a>

  <a
    href="https://wa.me/15128508657"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-sm text-white hover:text-teal-300 transition-colors mb-2 link-underline w-fit"
  >
    WhatsApp: +1 (512) 850-8657
  </a>

  <Link
    to="/book-a-demo"
    className="inline-flex items-center gap-1.5 text-sm text-teal-300 hover:text-white transition-colors mt-2"
  >
    Book a demo <ArrowUpRight size={14} />
  </Link>
</div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} ClinicFlow AI. All systems nominal.</p>
          <p>Built for medical teams that answer fast.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="eyebrow text-teal-300 mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-white/70 hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
