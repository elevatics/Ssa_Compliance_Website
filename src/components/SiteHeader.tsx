import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

type NavLink = {
  to: "/" | "/services" | "/products" | "/why-ssa" | "/insights" | "/about";
  label: string;
  exact?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/why-ssa", label: "Why SSA" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-rule/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl font-normal tracking-tight">
          SSA <span className="text-muted-ink">Compliance</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[15px] font-normal text-muted-ink">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={l.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-ink" }}
              className="hover:text-ink transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            hash="contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-[15px] font-normal text-paper bg-ink px-5 py-2.5 rounded-full hover:bg-accent-blue transition"
          >
            Contact <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-rule/60 text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-rule/60 bg-paper/95 backdrop-blur">
          <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-5 text-base font-normal text-muted-ink">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={l.exact ? { exact: true } : undefined}
                activeProps={{ className: "text-ink" }}
                onClick={() => setOpen(false)}
                className="hover:text-ink transition"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="contact"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit items-center gap-1.5 text-[15px] text-paper bg-ink px-5 py-2.5 rounded-full"
            >
              Contact <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
