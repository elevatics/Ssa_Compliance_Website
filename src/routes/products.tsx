import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LayoutDashboard,
  ClipboardCheck,
  FileSpreadsheet,
  Bot,
  FileSignature,
  CalendarClock,
  MapPinned,
  Check,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title:
          "Products — Compliance Management Platform | SSA Compliance",
      },
      {
        name: "description",
        content:
          "Automate labour-law compliance with SSA's Compliance Management Platform — dashboards, audits, registers, advisory bot, policy drafting, calendar and state-wise tracking.",
      },
      {
        property: "og:title",
        content: "Compliance Management Platform — SSA Compliance",
      },
      {
        property: "og:description",
        content:
          "Software that automates statutory compliance: dashboards, audits, registers, advisory bot, calendar and pan-India state & act tracking.",
      },
    ],
  }),
  component: ProductsPage,
});

const features = [
  {
    icon: LayoutDashboard,
    title: "Compliance Dashboard",
    desc: "A single source of truth across entities, states and acts — live status, exposure heatmaps and drill-downs.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit & Records",
    desc: "Plan, execute and evidence audits with full document trails and contractor coverage.",
  },
  {
    icon: FileSpreadsheet,
    title: "Forms & Registers",
    desc: "50+ statutory registers and returns auto-populated, versioned and ready for inspection.",
  },
  {
    icon: Bot,
    title: "Advisory Bot",
    desc: "Instant answers on statutes, judgments and risk-zones — grounded in our 25-year knowledge base.",
  },
  {
    icon: FileSignature,
    title: "Policy Drafting",
    desc: "Templates for HR policies, codes and contracts — harmonised across jurisdictions.",
  },
  {
    icon: CalendarClock,
    title: "Compliance Calendar",
    desc: "Every filing, renewal and return — tracked, assigned and reminded before due dates.",
  },
  {
    icon: MapPinned,
    title: "State & Act-Wise Tracking",
    desc: "Pan-India coverage of 236+ acts, mapped to every location and entity in your group.",
  },
];

function ProductsPage() {
  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-orange/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-32 md:pt-44 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-10 text-accent-orange"
          >
            Products
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
            Compliance Management
            <span className="block text-accent-blue font-light">
              Platform.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-paper/70 max-w-2xl leading-relaxed font-light"
          >
            Software that automates compliance requirements — built on 25 years
            of statutory practice, deployed across enterprises in India.
          </motion.p>
          <div className="mt-12 flex flex-wrap gap-3">
            <BookingDialog
              trigger={(open) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 bg-accent-orange text-paper px-7 py-3 rounded-full text-[14px] font-normal hover:opacity-90 transition"
                >
                  Request a demo <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            />
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-paper px-7 py-3 rounded-full text-[14px] font-normal border border-paper/20 hover:bg-paper/10 transition"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT INTRO */}
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-20 md:mb-24">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-6">01 — Flagship</div>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
                One platform for
                <span className="block text-accent-blue font-light">
                  every statutory obligation.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg text-muted-ink leading-relaxed font-light">
                The Compliance Management Platform brings together every
                register, return, audit and renewal across your group — with
                role-based workflows and an AI advisory bot trained on Indian
                labour law.
              </p>
            </div>
          </div>

          {/* FEATURES BENTO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule/60 border border-rule/60 rounded-3xl overflow-hidden">
            {features.map((f, i) => {
              const Icon = f.icon;
              const featured = i === 0;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`group bg-paper p-8 md:p-10 min-h-[240px] flex flex-col justify-between hover:bg-bone transition-colors duration-300 ${
                    featured ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue transition-colors duration-300">
                      <Icon className="h-5 w-5 text-accent-blue group-hover:text-paper stroke-[1.5] transition-colors duration-300" />
                    </div>
                    <span className="text-[11px] font-mono text-accent-orange tracking-widest">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-10">
                    <div className="text-lg md:text-xl font-normal tracking-tight leading-snug">
                      {f.title}
                    </div>
                    <p className="mt-3 text-[14px] text-muted-ink font-light leading-relaxed max-w-[40ch]">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY THE PLATFORM */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="eyebrow mb-6">Why the platform</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1]">
                From scattered spreadsheets
                <span className="block text-accent-orange font-light">
                  to one auditable system.
                </span>
              </h2>
              <Sparkles className="mt-12 h-8 w-8 text-accent-blue stroke-[1] hidden md:block" />
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-5">
                {[
                  "Automate statutory registers, returns and renewals end-to-end.",
                  "Centralise audits across entities, states and contractors.",
                  "Cut response times with an AI advisory bot trained on Indian labour law.",
                  "Stay ahead of due dates with the integrated compliance calendar.",
                  "Track exposure act-by-act, state-by-state, in real time.",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-4">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-paper border border-rule flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-accent-blue stroke-[2.5]" />
                    </div>
                    <span className="text-[15px] md:text-base text-ink/85 font-light leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-orange/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12 py-32 md:py-40 text-center">
          <div className="eyebrow mb-8">Demo</div>
          <h2 className="font-display text-4xl md:text-7xl tracking-tight leading-[1.05] font-light">
            See the platform
            <span className="block text-paper/45">in action.</span>
          </h2>
          <p className="mt-10 text-lg text-paper/70 max-w-xl mx-auto leading-relaxed font-light">
            A 30-minute walkthrough — tailored to your entities, states and
            contractor footprint.
          </p>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <BookingDialog
              trigger={(open) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 bg-accent-orange text-paper px-8 py-3.5 rounded-full text-[15px] font-normal hover:opacity-90 transition"
                >
                  Request a demo
                </button>
              )}
            />
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-paper px-8 py-3.5 rounded-full text-[15px] font-normal border border-paper/20 hover:bg-paper/10 transition"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-paper/55 border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] font-light">
          <div>
            <div className="text-paper font-normal">
              SSA Compliance Services LLP
            </div>
            <div className="mt-1">
              Bengaluru · Mumbai · Singapore · Dubai
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} SSA Compliance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
