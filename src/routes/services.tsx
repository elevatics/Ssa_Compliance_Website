import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Scale,
  ClipboardCheck,
  FolderOpen,
  ShieldCheck,
  Lightbulb,
  FileSignature,
  SearchCheck,
  GraduationCap,
  Gavel,
  RefreshCw,
  Check,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Comprehensive Labour Law Compliance India | SSA Compliance" },
      {
        name: "description",
        content:
          "Advisory, audits, statutory records and POSH compliance — end-to-end labour law services for enterprises across India, Southeast Asia and the Middle East.",
      },
      { property: "og:title", content: "Comprehensive Labour Law Compliance Services" },
      {
        property: "og:description",
        content:
          "Strategic advisory, pan-India audits, statutory records and POSH compliance — by SSA Compliance Services LLP.",
      },
    ],
  }),
  component: ServicesPage,
});

type TabKey = "advisory" | "audit" | "records" | "posh";

const tabs: {
  key: TabKey;
  label: string;
  icon: typeof Scale;
  headline: string;
  intro: string;
  bullets: string[];
}[] = [
  {
    key: "advisory",
    label: "Advisory",
    icon: Scale,
    headline: "Strategic counsel for boards and HR leadership.",
    intro:
      "Statutory interpretation, Apex Court judgments and risk-zone opinions — translated into commercial decisions you can act on.",
    bullets: [
      "Contract & employment agreement review",
      "Statutory interpretation & legal opinions",
      "Apex Court judgment briefings",
      "Risk-zone opinions for senior leadership",
      "HR policy drafting & harmonisation",
    ],
  },
  {
    key: "audit",
    label: "Audit",
    icon: ClipboardCheck,
    headline: "Forensic audits across every state, every contractor.",
    intro:
      "Centralised pan-India audits of core operations and the extended contractor ecosystem — with a clear, costed mitigation roadmap.",
    bullets: [
      "Centralised pan-India compliance audits",
      "Contractor & vendor compliance audits",
      "M&A due diligence on labour exposure",
      "Risk assessment & mitigation roadmap",
      "Periodic re-audits and assurance reviews",
    ],
  },
  {
    key: "records",
    label: "Records & Compliances",
    icon: FolderOpen,
    headline: "End-to-end statutory implementation.",
    intro:
      "Every register, every filing, every renewal — executed on time across jurisdictions, with multi-language statutory displays.",
    bullets: [
      "End-to-end statutory registers (50+ formats)",
      "EPF, ESI, PT, LWF & Gratuity administration",
      "CL(RA) licences, registrations & renewals",
      "Periodic returns, filings and renewals",
      "Multi-language statutory displays & abstracts",
    ],
  },
  {
    key: "posh",
    label: "POSH",
    icon: ShieldCheck,
    headline: "POSH compliance, end-to-end and confidential.",
    intro:
      "Policy, mandatory training and external investigations conducted by certified specialists — with capability building for your Internal Committee.",
    bullets: [
      "POSH policy drafting & rollout",
      "External, confidential investigations",
      "India-specific training (quarterly & annual)",
      "Internal Committee (IC) capability building",
      "Annual report filing & regulator liaison",
    ],
  },
];

const capabilityTimeline = [
  { icon: Lightbulb, label: "Advisory", desc: "Strategic counsel & opinions" },
  { icon: FileSignature, label: "Policy Drafting", desc: "Contracts, handbooks, codes" },
  { icon: SearchCheck, label: "Audits", desc: "Core ops & contractor reviews" },
  { icon: GraduationCap, label: "Training", desc: "POSH, IC, frontline managers" },
  { icon: Gavel, label: "Investigations", desc: "Confidential, evidence-led" },
  { icon: RefreshCw, label: "Ongoing Management", desc: "Filings, renewals, assurance" },
];

function ServicesPage() {
  const [active, setActive] = useState<TabKey>("advisory");
  const current = tabs.find((t) => t.key === active)!;

  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-12 pt-32 md:pt-44 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-10"
          >
            Practice
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
            Comprehensive labour law
            <span className="block text-accent-blue font-light">compliance services. India.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-muted-ink max-w-2xl leading-relaxed font-light"
          >
            Four practices. One unbroken standard. Choose the entry point that matches your exposure today.
          </motion.p>
        </div>
      </section>

      {/* TABS */}
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-32 md:pb-44">
          {/* Tab bar */}
          <div className="border-b border-rule/60">
            <div className="flex gap-1 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = t.key === active;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={`relative shrink-0 flex items-center gap-2.5 px-5 md:px-7 py-5 text-[14px] font-normal transition ${
                      isActive ? "text-ink" : "text-muted-ink hover:text-ink"
                    }`}
                  >
                    <Icon className="h-4 w-4 stroke-[1.5]" />
                    {t.label}
                    {isActive && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-px bg-accent-orange"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-16 md:mt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-7"
              >
                <div className="eyebrow mb-6">{current.label}</div>
                <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] max-w-2xl">
                  {current.headline}
                </h2>
                <p className="mt-8 text-lg text-muted-ink max-w-xl leading-relaxed font-light">
                  {current.intro}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    hash="contact"
                    className="inline-flex items-center gap-2 bg-accent-orange text-paper px-7 py-3 rounded-full text-[14px] font-normal hover:opacity-90 transition"
                  >
                    Discuss this practice
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-ink px-7 py-3 rounded-full text-[14px] font-normal border border-ink/15 hover:bg-bone transition"
                  >
                    Meet the team <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.key + "-list"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="lg:col-span-5"
              >
                <div className="bg-bone rounded-3xl p-10 md:p-12">
                  <div className="text-[13px] font-normal text-muted-ink uppercase tracking-wider mb-6">
                    What&rsquo;s included
                  </div>
                  <ul className="space-y-5">
                    {current.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-4">
                        <div className="mt-0.5 h-6 w-6 rounded-full bg-paper border border-rule flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-accent-blue stroke-[2.5]" />
                        </div>
                        <span className="text-[15px] text-ink/85 font-light leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CAPABILITIES TIMELINE */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-20 md:mb-24">
            <div className="eyebrow mb-6">What we deliver</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] font-light">
              From first opinion to
              <span className="block text-accent-orange">ongoing assurance.</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* horizontal connector */}
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-paper/15" />
            <div className="hidden lg:block absolute top-7 left-0 h-px bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" style={{ width: "100%" }} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
              {capabilityTimeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative flex flex-col items-start"
                  >
                    <div className="relative z-10 h-14 w-14 rounded-2xl bg-paper text-ink flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <div className="text-[11px] font-mono text-accent-orange tracking-widest mb-2">
                      0{i + 1}
                    </div>
                    <div className="text-base font-normal text-paper">
                      {step.label}
                    </div>
                    <div className="mt-2 text-[13px] text-paper/60 font-light leading-relaxed">
                      {step.desc}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-5xl px-6 lg:px-12 py-32 md:py-40 text-center">
          <div className="eyebrow mb-8">Engage</div>
          <h2 className="font-display text-4xl md:text-7xl tracking-tight leading-[1.05] font-light">
            Map your exposure.
            <span className="block text-muted-ink">Then close it.</span>
          </h2>
          <p className="mt-10 text-lg text-muted-ink max-w-xl mx-auto leading-relaxed font-light">
            A confidential read of your current compliance posture — across states, contractors and codes.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <BookingDialog
              trigger={(open) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 bg-accent-orange text-paper px-8 py-3.5 rounded-full text-[15px] font-normal hover:opacity-90 transition"
                >
                  Book consultation
                </button>
              )}
            />
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-ink px-8 py-3.5 rounded-full text-[15px] font-normal border border-ink/15 hover:bg-bone transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-paper/55 border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] font-light">
          <div>
            <div className="text-paper font-normal">SSA Compliance Services LLP</div>
            <div className="mt-1">Bengaluru · Mumbai · Singapore · Dubai</div>
          </div>
          <div>© {new Date().getFullYear()} SSA Compliance. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
