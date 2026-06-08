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
import imgEmployment from "@/assets/employment law advisory.png";
import imgPanIndia from "@/assets/pan india.png";
import imgStatutory from "@/assets/Statutory Records & Filings.png";
import imgPosh from "@/assets/posh.png";
const clientLogoModules = import.meta.glob<string>("../assets/companylogo/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
});

function logoPathToName(path: string): string {
  const file = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Client";
  return file.replace(/[-_]+/g, " ").replace(/\s*logo\s*/gi, " ").replace(/\s+/g, " ").trim();
}

const clients = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, logo]) => ({
    name: logoPathToName(path),
    logo,
  }));

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
  { icon: MapPin, title: "Multi-state variations", impact: "28 States and 8 Union Territories  labour regimes." },
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
    img: imgEmployment,
  },
  {
    icon: ClipboardList,
    title: "Pan-India Compliance Audits",
    desc: "Forensic review of core operations and contractor ecosystems across every state.",
    tone: "orange" as const,
    img: imgPanIndia,
  },
  {
    icon: FolderOpen,
    title: "Statutory Records & Filings",
    desc: "End-to-end implementation of registers, returns and periodic regulatory filings.",
    tone: "blue" as const,
    img: imgStatutory,
  },
  {
    icon: ShieldCheck,
    title: "POSH Compliance",
    desc: "Policy, mandatory training and confidential investigation by certified specialists.",
    tone: "orange" as const,
    img: imgPosh,
  },
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
                   Talk to an Expert
                </a>
               
              </motion.div>
             
            </div>

            {/* RIGHT — 2x2 stat cards (staggered floating columns) */}
            <div className="flex gap-4 md:gap-5">
              {/* Left column */}
              <div className="flex flex-col gap-4 md:gap-5 flex-1">
                {[
                  {
                    value: "29 Laws",
                    label: (
                      <>
                        subsumed to <span className="text-accent-orange">04</span> Labour Codes with{" "}
                        <span className="text-accent-orange">800 +</span> Sections & Rules across
                        complex regulatory environments.
                      </>
                    ),
                  },
                  {
                    value: "25+",
                    label: "Years of senior experience in employment and labour law advisory.",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.value}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    className="bg-paper/8 backdrop-blur-sm border border-paper/12 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/30 hover:border-accent-blue/50 hover:bg-paper/12 hover:-translate-y-1 transition-all duration-300"
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
              {/* Right column — offset downward for staggered float effect */}
              <div className="flex flex-col gap-4 md:gap-5 flex-1 mt-10 md:mt-14">
                {[
                  {
                    value: "1500+",
                    label: "Compliance checkpoints, records, filings, and ongoing obligations to manage.",
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
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="bg-paper/8 backdrop-blur-sm border border-paper/12 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/30 hover:border-accent-blue/50 hover:bg-paper/12 hover:-translate-y-1 transition-all duration-300"
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
      <section id="challenge" className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <div className="eyebrow mb-5">The challenge</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Compliance is now a{" "}
              <span className="text-accent-blue">Board-level risk.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-rule/50">
            {challenges.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center px-8 py-10 gap-5 group"
                >
                  <div className="h-14 w-14 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-accent-blue/10 transition">
                    <Icon className="h-6 w-6 text-ink/50 group-hover:text-accent-blue stroke-[1.5] transition" />
                  </div>
                  <div>
                    <div className="text-lg font-medium leading-snug text-ink">
                      {c.title}
                    </div>
                    <div className="mt-3 text-base text-muted-ink leading-relaxed font-light">
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
      <section id="services" className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 md:pt-36 pb-0">
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-18">
            <div className="eyebrow mb-5">What we deliver</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Four practices.
              <span className="block text-muted-ink">One unbroken standard.</span>
            </h2>
          </div>

          {/* Photo cards — 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pb-24 md:pb-36">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                {/* Photo — blurs on hover */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:[filter:blur(3px)]"
                />
                {/* Base dark overlay — deepens on hover */}
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/60 transition-colors duration-500" />
                {/* Title — top */}
                <div className="absolute top-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="font-display text-[15px] md:text-lg lg:text-xl tracking-tight text-paper leading-snug font-light drop-shadow-sm">
                    {s.title}
                  </h3>
                </div>
                {/* Description — bottom, slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-[12px] md:text-[13px] text-paper/80 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
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
        <div className="relative py-16 mb-16 overflow-hidden">
          <div className="inline-flex marquee items-center gap-12 md:gap-24 whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <img
                key={i}
                src={client.logo}
                alt={client.name}
                className="client-logo h-10 md:h-12 w-auto max-w-[140px] md:max-w-[180px] object-contain shrink-0"
              />
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
