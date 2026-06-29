import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Handshake,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Labour Law Compliance, Employment Law & HR Compliance Services India" },
      {
        name: "description",
        content:
          "Comprehensive labour law compliance, employment law compliance, HR compliance services, statutory compliance, POSH compliance, payroll compliance, audits, and advisory services across India.",
      },
      {
        name: "keywords",
        content:
          "labour law compliance India, employment law compliance, HR compliance services India, human resources compliance, statutory compliance in HR, labour law audit India, POSH compliance India, payroll compliance India",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Labour Law Compliance & HR Compliance Services India" },
      {
        property: "og:description",
        content:
          "End-to-end labour law, employment law, HR compliance, statutory compliance, payroll, and POSH advisory services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.ssahrc.com/services" },
      { property: "og:image", content: "https://www.ssahrc.com/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://www.ssahrc.com/services" },
    ],
  }),
  component: ServicesPage,
});

type TabKey = "advisory" | "Labour Law and HR Audits" | "records" | "posh";

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
    icon: Handshake,
    headline: "Strategic counsel for Boards and HR leadership.",
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
    key: "Labour Law and HR Audits",
    label: "Labour Law and HR Audits",
    icon: ClipboardCheck,
    headline: "Forensic audits across every state, every contractor.",
    intro:
      "Centralised pan-India audits of core operations and the extended contractor ecosystem — with a clear, costed mitigation roadmap.",
    bullets: [
      "Centralised pan-India compliance audits",
      "Establishment and contractor compliance audits",
      "M&A due diligence on labour exposure",
      "Risk assessment & mitigation roadmap",
      "Periodic re-audits and assurance reviews",
    ],
  },
  {
    key: "records",
    label: "Records & Compliances",
    icon: FolderOpen,
    headline: "End-to-end Statutory Compliances.",
    intro:
      "Every register, every filing, every renewal — executed on time across jurisdictions, with multi-language statutory displays.",
    bullets: [
      "End-to-end statutory registers (payroll compliances and post payroll compliances)",
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

  // Carousel state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", updateArrows); ro.disconnect(); };
  }, [updateArrows]);

  function scrollPrev() {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }
  function scrollNext() {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

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
            className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
            Comprehensive labour law
            <span className="block text-accent-blue font-light">compliance services. India.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-xl md:text-2xl text-muted-ink max-w-2xl leading-relaxed font-light"
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
                    className={`relative shrink-0 flex items-center gap-2.5 px-5 md:px-7 py-4 rounded-lg text-[15px] md:text-base font-normal transition ${
                      isActive
                        ? "text-ink bg-bone"
                        : "text-muted-ink hover:text-ink hover:bg-bone/50"
                    }`}
                  >
                    <Icon className="h-4 w-4 stroke-[1.5]" />
                    {t.label}
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
                <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.1] max-w-2xl">
                  {current.headline}
                </h2>
                <p className="mt-8 text-xl text-muted-ink max-w-xl leading-relaxed font-light">
                  {current.intro}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    hash="contact"
                    className="inline-flex items-center gap-2 bg-accent-orange text-paper px-7 py-3 rounded-full text-base font-normal hover:opacity-90 transition"
                  >
                    Discuss this practice
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-ink px-7 py-3 rounded-full text-base font-normal border border-ink/15 hover:bg-bone transition"
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
                  <div className="text-sm font-normal text-muted-ink uppercase tracking-wider mb-6">
                    What&rsquo;s included
                  </div>
                  <ul className="space-y-5">
                    {current.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-4">
                        <div className="mt-0.5 h-6 w-6 rounded-full bg-paper border border-rule flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-accent-blue stroke-[2.5]" />
                        </div>
                        <span className="text-base text-ink/85 font-light leading-relaxed">
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

      {/* CAPABILITIES TIMELINE — arrow carousel */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-32 md:pt-44 pb-20 md:pb-32">

          {/* Header row with arrow buttons */}
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <div className="eyebrow mb-5">What we deliver</div>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] font-light">
                From first opinion to
                <span className="block text-accent-orange">ongoing assurance.</span>
              </h2>
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-2 shrink-0 pb-1">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous"
                className="h-11 w-11 rounded-full border border-paper/20 flex items-center justify-center text-paper transition hover:bg-paper/10 disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next"
                className="h-11 w-11 rounded-full border border-paper/20 flex items-center justify-center text-paper transition hover:bg-paper/10 disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Card track */}
          <div className="relative">
            {/* Right fade hint */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ink to-transparent z-10" />

            <div
              ref={scrollRef}
              className="overflow-x-auto no-scrollbar"
            >
              <div className="flex gap-4 w-max">
                {capabilityTimeline.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                      className="group relative w-64 md:w-72 shrink-0 rounded-3xl border border-paper/10 bg-paper/5 hover:bg-paper/10 transition-colors p-7 flex flex-col"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-paper/10 group-hover:bg-paper/20 transition flex items-center justify-center mb-5">
                        <Icon className="h-5 w-5 stroke-[1.5] text-paper" />
                      </div>
                      <div className="text-[16px] font-normal text-paper leading-snug mb-2">
                        {step.label}
                      </div>
                      <div className="mt-auto pt-3 text-[13px] text-paper/55 font-light leading-relaxed">
                        {step.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
                  Book a demo
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

      <SiteFooter />
    </div>
  );
}
