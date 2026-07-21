import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/#dashboard", label: "Dashboard" },
  { to: "/projects", label: "Case Files" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-base/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-px flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
            <span className="h-1.5 w-1.5 rounded-full bg-white absolute left-2" />
            <span className="h-1.5 w-1.5 rounded-full bg-white absolute right-2" />
          </span>
          <span className="font-display text-[19px] tracking-tight">ClinicFlow AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? "active text-ink" : ""}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/book-a-demo" className="btn-primary">
            Book a demo
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-base border-b border-line"
          >
            <div className="container-px py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="text-lg font-display">
                  {l.label}
                </Link>
              ))}
              <Link to="/book-a-demo" className="btn-primary w-fit">
                Book a demo <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
