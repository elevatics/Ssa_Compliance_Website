import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileText,
  Gavel,
  ShieldCheck,
  Users,
  ClipboardList,
  FileSignature,
  BookOpen,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Expertise — Thought Leadership in Employment Law | SSA Compliance" },
      {
        name: "description",
        content:
          "Publications, research and capability briefs on India's employment and labour law — by SSA Compliance Services LLP.",
      },
      { property: "og:title", content: "Thought Leadership in Employment Law" },
      {
        property: "og:description",
        content:
          "Download research and briefings from SSA Compliance on India's evolving labour and employment landscape.",
      },
    ],
  }),
  component: InsightsPage,
});

const publications = [
  {
    title: "Women in Contemporary India",
    desc: "Workplace participation, equity policy and statutory protections in modern India.",
    tag: "Research",
  },
  {
    title: "Platform Economy & Workforce",
    desc: "Classification, social security and the future of platform-based labour.",
    tag: "White paper",
  },
  {
    title: "The Realm of India's Employment Law",
    desc: "A practitioner's overview of the four Labour Codes and their downstream impact.",
    tag: "Briefing",
  },
  {
    title: "Gig Economy in India Rising",
    desc: "Regulatory direction, contributions and emerging compliance obligations.",
    tag: "Research",
  },
  {
    title: "Business Strategies Post Pandemic",
    desc: "Workforce restructuring, hybrid policy and statutory considerations.",
    tag: "Briefing",
  },
  {
    title: "Labour & Environmental Law in India",
    desc: "Where occupational safety, ESG and labour codes converge.",
    tag: "White paper",
  },
];

const capabilities = [
  { num: "02", icon: Gavel, label: "Labour Law Contracts / Policy HR letter drafting" },
  { num: "06", icon: ShieldCheck, label: "Social Security & Industry Guidance" },
  { num: "04", icon: Users, label: "Employee Relations & Gender Equality (POSH Compliances)" },
  { num: "01", icon: ClipboardList, label: "HR Compliance Management" },
  { num: "03", icon: FileSignature, label: "Compliance Health Check" },
  { num: "05", icon: BookOpen, label: "Mandatory Labour Law Compliances" },
];

function InsightsPage() {
  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* HERO */}
      <section>
        <div className="mx-auto max-w-6xl px-6 lg:px-12 pt-32 md:pt-44 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-10"
          >
            Expertise &amp; Insights
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
            Thought leadership in
            <span className="block text-accent-blue font-light">Employment Law.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-muted-ink max-w-2xl leading-relaxed font-light"
          >
            Research, briefings and white papers from our partners — written for the Boards and HR leaders we serve.
          </motion.p>
        </div>
      </section>

     

      {/* CAPABILITIES GRID */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-20 md:mb-24">
            <div className="eyebrow mb-6">Capabilities</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              Six capability lines.
              <span className="block text-paper/55">Built into every engagement.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 border border-paper/10 rounded-3xl overflow-hidden">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group bg-ink p-10 md:p-12 min-h-[240px] flex flex-col justify-between hover:bg-paper/[0.04] transition-colors duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent-blue/15 flex items-center justify-center group-hover:bg-accent-blue transition-colors duration-300">
                    <Icon className="h-5 w-5 text-accent-blue group-hover:text-paper stroke-[1.5] transition-colors duration-300" />
                  </div>
                  <div className="mt-12 text-lg font-normal tracking-tight leading-snug max-w-[18ch] text-paper">
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
            Need a deeper brief
            <span className="block text-paper/45">on a specific code?</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <BookingDialog
              trigger={(open) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 bg-accent-orange text-paper px-8 py-3.5 rounded-full text-[15px] font-normal hover:opacity-90 transition"
                >
                  Request a custom brief
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

      <SiteFooter />
    </div>
  );
}
