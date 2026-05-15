import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Layers,
  Clock3,
  FolderOpen,
  Scale,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import { CounterStat } from "@/components/CounterStat";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";
import heroBg from "@/assets/hero-corporate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Labour Law Compliance India | Employment Law Advisory | SSA Compliance" },
      {
        name: "description",
        content:
          "India's leading employment & labour law advisory firm delivering Pan-India statutory compliance, audits, POSH training and risk mitigation for enterprises.",
      },
      { property: "og:title", content: "Labour Law Compliance India | SSA Compliance" },
      {
        property: "og:description",
        content:
          "Pan-India statutory compliance, audits, POSH training and risk mitigation for enterprises.",
      },
      { property: "og:image", content: heroBg },
      { name: "twitter:image", content: heroBg },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "SSA Compliance Services LLP",
              url: "https://ssacompliance.com",
              email: "contact@ssacompliance.com",
              areaServed: ["India", "Southeast Asia", "Middle East"],
              location: ["Bengaluru", "Mumbai", "Singapore", "Dubai"],
            },
            {
              "@type": "ProfessionalService",
              name: "SSA Compliance Services LLP",
              description:
                "Employment and labour law advisory, pan-India compliance audits, statutory records & filings and POSH compliance.",
              areaServed: ["India", "Southeast Asia", "Middle East"],
              serviceType: [
                "Employment Law Advisory",
                "Labour Law Compliance Audit",
                "Statutory Records & Filings",
                "POSH Compliance",
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const challenges = [
  { icon: MapPin, title: "Multi-state variations", impact: "28 different state labour regimes." },
  { icon: Layers, title: "250+ Acts. 1500+ obligations", impact: "Overlapping duties across four new Labour Codes." },
  { icon: Clock3, title: "Frequent amendments", impact: "Over 100 regulatory changes every year." },
  { icon: FolderOpen, title: "Record maintenance", impact: "50+ registers and periodic statutory filings." },
];

const services = [
  {
    icon: Scale,
    title: "Employment Law Advisory",
    desc: "Statutory interpretation, contracts and risk mitigation for boards and HR leadership.",
    tone: "blue" as const,
  },
  {
    icon: ClipboardList,
    title: "Pan-India Compliance Audits",
    desc: "Forensic review of core operations and contractor ecosystems across every state.",
    tone: "orange" as const,
  },
  {
    icon: FolderOpen,
    title: "Statutory Records & Filings",
    desc: "End-to-end implementation of registers, returns and periodic regulatory filings.",
    tone: "blue" as const,
  },
  {
    icon: ShieldCheck,
    title: "POSH Compliance",
    desc: "Policy, mandatory training and confidential investigation by certified specialists.",
    tone: "orange" as const,
  },
];

const clients = [
  "Ernst & Young",
  "OLA Electric",
  "L&T Defence",
  "BigBasket",
  "TAJ Vivanta",
  "Novo Nordisk",
  "Blue Star",
  "Sprinklr",
  "Ashirvad Pipes",
];

function Home() {
  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* HERO — dark split layout: headline left, stat cards right */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 -z-0">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/80" />
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-accent-blue/25 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-orange/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-24 md:pt-32 pb-24 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT — headline + copy + CTAs */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="eyebrow mb-8"
              >
                Employment & Labour Law Compliance
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.05 }}
                className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1.02] tracking-tight text-balance text-paper"
              >
                Simplified. Scalable.
                <span className="block text-accent-blue">Assured.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 text-lg md:text-xl text-paper/70 max-w-xl leading-relaxed font-light"
              >
                Enterprise-grade labour law compliance advisory, audit, execution, and POSH support across India, Southeast Asia, and the Middle East.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-paper text-ink px-7 py-3.5 rounded-full text-[15px] font-normal hover:bg-accent-blue hover:text-paper transition"
                >
                  Request Compliance Assessment
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-paper px-7 py-3.5 rounded-full text-[15px] font-normal border border-paper/25 hover:bg-paper/10 transition"
                >
                  Talk to an Expert
                </a>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 text-[13px] text-paper/50 font-light max-w-lg leading-relaxed"
              >
                SEO focus: labour law compliance India · HR compliance services · POSH compliance · statutory compliance management
              </motion.p>
            </div>

            {/* RIGHT — 2x2 stat cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {[
                {
                  value: "250+",
                  label: "Acts and labour law obligations across complex regulatory environments.",
                },
                {
                  value: "1500+",
                  label: "Compliance checkpoints, records, filings, and ongoing obligations to manage.",
                },
                {
                  value: "25+",
                  label: "Years of senior experience in employment and labour law advisory.",
                },
                {
                  value: "Pan-India",
                  label: "Coverage across multi-location business operations, contractors, and establishments.",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="bg-paper/5 backdrop-blur-sm border border-paper/10 rounded-2xl p-6 md:p-8 hover:border-accent-blue/50 hover:bg-paper/10 transition"
                >
                  <div className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-paper leading-none">
                    {stat.value}
                  </div>
                  <p className="mt-4 text-[14px] md:text-[15px] text-paper/65 leading-relaxed font-light">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-20 md:mt-28 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[12px] font-light text-paper/55 uppercase tracking-wider"
          >
            <span>Most Promising Company 2022</span>
            <span className="h-1 w-1 rounded-full bg-accent-orange" />
            <span>Top 10 Labour Law Consultants 2024</span>
            <span className="h-1 w-1 rounded-full bg-accent-blue" />
            <span>25+ Years Front-Line Expertise</span>
          </motion.div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section id="challenge" className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-20 md:mb-28">
            <div className="eyebrow mb-6">The challenge</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              Compliance is now a <span className="text-accent-blue">board-level risk.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {challenges.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-paper border border-rule/60 rounded-2xl p-10 min-h-[280px] flex flex-col justify-between hover:border-accent-blue/40 hover:shadow-lg hover:shadow-ink/5 transition"
                >
                  <div className="h-11 w-11 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent-blue stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-lg font-normal leading-snug text-ink">
                      {c.title}
                    </div>
                    <div className="mt-3 text-[14px] text-muted-ink leading-relaxed font-light">
                      {c.impact}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-20 md:mb-28">
            <div className="eyebrow mb-6">What we deliver</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              Four practices.
              <span className="block text-muted-ink">One unbroken standard.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isBlue = s.tone === "blue";
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative bg-bone rounded-3xl p-12 min-h-[340px] flex flex-col justify-between overflow-hidden hover:bg-ink hover:text-paper transition-colors duration-500"
                >
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition ${
                      isBlue
                        ? "bg-accent-blue/10 group-hover:bg-accent-blue"
                        : "bg-accent-orange/10 group-hover:bg-accent-orange"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 stroke-[1.5] transition ${
                        isBlue ? "text-accent-blue" : "text-accent-orange"
                      } group-hover:text-paper`}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl tracking-tight font-light">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-[16px] text-muted-ink group-hover:text-paper/65 transition leading-relaxed max-w-md font-light">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NUMBERS — dark contrast band */}
      <section id="numbers" className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-20 md:mb-28 mx-auto text-center">
            <div className="eyebrow mb-6">By the numbers</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              A quarter century of <span className="text-accent-orange">measured outcomes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <CounterStat value={25} suffix="+" label="Years of specialised front-line experience" />
            <CounterStat value={300} suffix="+" label="Domestic enquiries successfully resolved" />
            <CounterStat value={120} suffix="+" label="Enterprise clients pan-India" />
            <CounterStat value={3} label="Regions served across two continents" />
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="overflow-hidden bg-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-32 pb-16 text-center">
          <div className="eyebrow mb-6">Trusted by</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Counsel to enterprises building across <span className="text-accent-blue">three regions.</span>
          </h2>
        </div>
        <div className="relative py-16 mb-16">
          <div className="flex marquee gap-20 whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl font-light text-muted-ink/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-orange/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12 py-32 md:py-48 text-center">
          <div className="eyebrow mb-8">Engage</div>
          <h2 className="font-display text-5xl md:text-8xl tracking-tight leading-[1.0] font-light">
            Ready to eliminate
            <span className="block text-paper/45">compliance risk?</span>
          </h2>
          <p className="mt-10 text-lg md:text-xl text-paper/70 max-w-2xl mx-auto leading-relaxed font-light">
            A confidential conversation with our partners. No obligation — only a clear read of your exposure.
          </p>
          <div className="mt-14 flex flex-wrap gap-3 justify-center">
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
            {/* <a
              href="mailto:contact@ssacompliance.com"
              className="inline-flex items-center gap-2 text-paper px-8 py-3.5 rounded-full text-[15px] font-normal border border-paper/20 hover:bg-paper/10 transition"
            >
              Download checklist
            </a> */}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
