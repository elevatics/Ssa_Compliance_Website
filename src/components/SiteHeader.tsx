import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ssaLogo from "../assets/SSA LOGO.png";
import { BookingDialog } from "./BookingDialog";

type NavLink = {
  to: "/" | "/services" | "/why-ssa" | "/insights" | "/about" | "/publications";
  label: string;
  exact?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services" },
  { to: "/why-ssa", label: "Why SSA" },
  { to: "/insights", label: "Insights" },
  { to: "/publications", label: "Publications" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-rule/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={ssaLogo} alt="SSA Compliance" className="h-14 w-auto" />
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
          <BookingDialog
            trigger={(openDialog) => (
              <button
                type="button"
                onClick={openDialog}
                className="hidden sm:inline-flex items-center gap-1.5 text-[15px] font-normal text-paper bg-ink px-5 py-2.5 rounded-full hover:bg-accent-blue transition"
              >
                Book a Consultation
              </button>
            )}
          />
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
            <BookingDialog
              trigger={(openDialog) => (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openDialog();
                  }}
                  className="inline-flex w-fit items-center gap-1.5 text-[15px] text-paper bg-ink px-5 py-2.5 rounded-full"
                >
                  Book a Consultation
                </button>
              )}
            />
          </nav>
        </div>
      )}
    </header>
  );
}
