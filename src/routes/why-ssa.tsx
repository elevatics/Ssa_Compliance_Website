import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Lightbulb,
  Gauge,
  ShieldCheck,
  FileWarning,
  AlertTriangle,
  Scale,
  Ban,
  Lock,
  FileCheck2,
  Building2,
  TrendingDown,
  UserCheck,
  Sparkles,
  Handshake,
  Rocket,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/why-ssa")({
  head: () => ({
    meta: [
      { title: "Why SSA — The SSA Advantage in Labour Law Compliance | SSA Compliance" },
      {
        name: "description",
        content:
          "One-stop advisory to execution, expert statutory interpretation and guaranteed service levels — the case for choosing SSA Compliance Services LLP.",
      },
      { property: "og:title", content: "Why SSA — One-Stop Labour Law Compliance Partner" },
      {
        property: "og:description",
        content:
          "Advisory to execution under one roof, 25+ years of expert interpretation, and transparent service levels.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What are the risks of labour law non-compliance in India?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Risks escalate from inspection reports and show-cause notices to monetary penalties, fines and imprisonment under the Labour Codes, and in severe cases, suspension of operations or business closure.",
              },
            },
            {
              "@type": "Question",
              name: "Why choose SSA Compliance Services LLP?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "SSA delivers advisory to execution under one roof with 25+ years of front-line statutory interpretation and guaranteed, measurable service levels across India, Southeast Asia and the Middle East.",
              },
            },
            {
              "@type": "Question",
              name: "Does SSA support M&A due diligence on labour exposure?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. SSA conducts forensic labour and employment due diligence for M&A — including contractor ecosystems — and delivers a costed mitigation roadmap.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: WhySSAPage,
});

const advantages = [
  {
    icon: Layers,
    title: "One-Stop Solution",
    desc: "Advisory to execution under one roof — no hand-offs, no gaps between counsel and on-ground delivery.",
  },
  {
    icon: Lightbulb,
    title: "Expert Interpretation",
    desc: "25+ years interpreting statutes, Apex Court judgments and the four new Labour Codes for Boards and HR leaders.",
  },
  {
    icon: Gauge,
    title: "Guaranteed Service Levels",
    desc: "Transparent, measurable delivery — every register, filing and audit on a defined SLA you can monitor.",
  },
];

const risks = [
  { level: "01", icon: FileWarning, label: "Inspection Reports", tone: "blue" as const },
  { level: "02", icon: AlertTriangle, label: "Show-Cause Notices", tone: "blue" as const },
  { level: "03", icon: Scale, label: "Penalties", tone: "orange" as const },
  { level: "04", icon: Lock, label: "Fines & Imprisonment", tone: "orange" as const },
  { level: "05", icon: Ban, label: "Business Closure", tone: "orange" as const },
];

const cases = [
  { icon: ShieldCheck, label: "Stay legally protected" },
  { icon: FileCheck2, label: "Evidence-grade records" },
  { icon: Sparkles, label: "Safeguard reputation" },
  { icon: TrendingDown, label: "Prevent financial loss" },
  { icon: UserCheck, label: "Protect employer & employee rights" },
  { icon: Lightbulb, label: "Future-proof policies" },
  { icon: Handshake, label: "Support M&A readiness" },
  { icon: Rocket, label: "Mitigate startup and scale-up risks under Labour Laws" },
];

function WhySSAPage() {
  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* HERO */}
      <section>
        <div className="mx-auto max-w-6xl px-6 lg:px-12 pt-32 md:pt-44 pb-20 md:pb-28">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-10">
            Why SSA
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
            The compliance partner
            <span className="block text-accent-blue font-light">enterprises rely on.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-muted-ink max-w-2xl leading-relaxed font-light"
          >
            Three reasons Boards and CHROs choose SSA — and a clear-eyed view of what non-compliance actually costs.
          </motion.p>
        </div>
      </section>

      {/* THE SSA ADVANTAGE */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-16 md:mb-20">
            <div className="eyebrow mb-6">The SSA Advantage</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1]">
              Three commitments. <span className="text-accent-orange">Every engagement.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {advantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-paper border border-rule/60 rounded-3xl p-12 min-h-[340px] flex flex-col justify-between hover:border-accent-blue/40 hover:shadow-lg hover:shadow-ink/5 transition"
                >
                  <div className="h-16 w-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-accent-blue stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-accent-orange uppercase tracking-widest mb-3">
                      0{i + 1}
                    </div>
                    <h3 className="font-display text-2xl font-normal tracking-tight leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-4 text-[15px] text-muted-ink font-light leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NON-COMPLIANCE RISKS — Pyramid */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="eyebrow mb-6">Non-compliance risks</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1] font-light">
                Each level of failure
                <span className="block text-accent-orange">multiplies the next.</span>
              </h2>
              <p className="mt-8 text-[15px] text-paper/65 font-light leading-relaxed max-w-md">
                A single missed register can cascade into criminal liability for directors and operational shutdown. The escalation is rarely linear — and rarely reversible.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-3 max-w-3xl ml-auto">
                {risks.map((r, i) => {
                  const Icon = r.icon;
                  // pyramid: each step wider
                  const widthPct = 56 + i * 11;
                  const isOrange = r.tone === "orange";
                  return (
                    <motion.div
                      key={r.level}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      style={{ width: `${widthPct}%` }}
                      className={`ml-auto flex items-center gap-5 rounded-2xl p-5 md:p-6 border ${
                        isOrange
                          ? "border-accent-orange/30 bg-accent-orange/[0.06]"
                          : "border-paper/15 bg-paper/[0.04]"
                      }`}
                    >
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                          isOrange ? "bg-accent-orange text-paper" : "bg-paper/10 text-paper"
                        }`}
                      >
                        <Icon className="h-5 w-5 stroke-[1.5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[11px] font-mono tracking-widest mb-1 ${
                            isOrange ? "text-accent-orange" : "text-paper/50"
                          }`}
                        >
                          LEVEL {r.level}
                        </div>
                        <div className="text-base md:text-lg font-normal tracking-tight">
                          {r.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE CASE FOR COMPLIANCE — 8 icon strip */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-16 md:mb-20">
            <div className="eyebrow mb-6">The case for compliance</div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1]">
              Eight outcomes our clients
              <span className="block text-accent-blue font-light">measure us against.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/10 border border-paper/10 rounded-3xl overflow-hidden">
            {cases.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group bg-ink p-8 md:p-10 min-h-[200px] flex flex-col justify-between hover:bg-paper/[0.04] transition-colors duration-300"
                >
                  <div className="h-11 w-11 rounded-xl bg-accent-orange/15 flex items-center justify-center group-hover:bg-accent-orange transition-colors duration-300">
                    <Icon className="h-5 w-5 text-accent-orange group-hover:text-paper stroke-[1.5] transition-colors duration-300" />
                  </div>
                  <div className="mt-8 text-[15px] font-normal tracking-tight leading-snug max-w-[20ch] text-paper">
                    {c.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-orange/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12 py-32 md:py-40 text-center">
          <div className="eyebrow mb-8">Engage</div>
          <h2 className="font-display text-4xl md:text-7xl tracking-tight leading-[1.05] font-light">
            Move from exposure
            <span className="block text-paper/45">to assurance.</span>
          </h2>
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
            <Link to="/services" className="inline-flex items-center gap-2 text-paper px-8 py-3.5 rounded-full text-[15px] font-normal border border-paper/20 hover:bg-paper/10 transition">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
