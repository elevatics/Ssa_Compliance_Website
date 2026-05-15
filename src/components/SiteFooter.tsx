import { Link } from "@tanstack/react-router";
import { Phone, Mail, Globe, Linkedin } from "lucide-react";
import ssaLogo from "../assets/SSA LOGO.png";

const NAV_COL1 = [
  { label: "Home", to: "/" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Services", to: "/services" as const },
  { label: "Why SSA", to: "/why-ssa" as const },
];

const NAV_COL2 = [
  { label: "Insights", to: "/insights" as const },
  { label: "Publications", to: "/publications" as const },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#1c1c1c] text-white">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Column 1 — Logo */}
          <div className="flex flex-col items-start">
            <img src={ssaLogo} alt="SSA Compliance Services LLP" className="h-20 w-auto" />
          </div>

          {/* Column 2 — Navigation */}
          <div className="grid grid-cols-2 gap-4">
            <ul className="flex flex-col gap-3">
              {NAV_COL1.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[13px] text-white/65 hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {NAV_COL2.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[13px] text-white/65 hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <p className="text-[13px] font-semibold text-white mb-2">
              SSA COMPLIANCE SERVICES LLP
            </p>
            <p className="text-[12px] text-white/60 leading-relaxed">
              #C2J, 3rd Floor, Unispace,<br />
              Plot No: 128-P2, near Ginger Hotel,<br />
              EPIP Zone, Whitefield,<br />
              Bengaluru Karnataka 560066
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href="tel:+919741808155"
                  className="inline-flex items-center gap-2 text-[12px] text-white/60 hover:text-white transition"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  +91-9741 808 155
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ssahrc.com"
                  className="inline-flex items-center gap-2 text-[12px] text-white/60 hover:text-white transition"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  info@ssahrc.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.ssahrc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[12px] text-white/60 hover:text-white transition"
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  www.ssahrc.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* LinkedIn button */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.linkedin.com/company/ssacomplianceservices/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-white/30 rounded-full px-6 py-2.5 text-[13px] text-white/75 hover:bg-white/10 transition"
          >
            Connect With Us On
            <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-[#0077b5]">
              <Linkedin className="h-3 w-3 fill-white stroke-none" />
            </span>
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6">
          <p className="text-center text-[11px] font-semibold tracking-widest text-white/50 uppercase mb-2">
            Disclaimer
          </p>
          <p className="text-center text-[11px] text-white/45 leading-relaxed max-w-4xl mx-auto">
            This website's content is provided for information purposes only and should not be
            construed as solicitation or advertising. This website's content/information should
            not be taken as legal advice. SSA COMPLIANCE SERVICES LLP will not be held responsible
            for any errors or omissions, or for the consequences of any action taken based on the
            material/information supplied on this website, or for the termination or suspension
            of this site.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4">
          <p className="text-center text-[12px] text-white/55">
            © all rights reserved – SSA COMPLIANCE SERVICES LLP.
          </p>
        </div>
      </div>
    </footer>
  );
}
