import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  Compass,
  HeartHandshake,
  Award,
  ShieldCheck,
  ScrollText,
  User,
} from "lucide-react";
import aboutBg from "@/assets/about-boardroom.jpg";
import member1 from "@/assets/Member1.png";
import member2 from "@/assets/Member2.png";
import member3 from "@/assets/Member3.png";
import member4 from "@/assets/Member4.png";
import imgRohitMunjal from "@/assets/advisoryboard/Rohit Munjal.jpg";
import imgManishShroff from "@/assets/advisoryboard/manish shroff.jpeg";
import imgMansij from "@/assets/advisoryboard/mansij.jpg";
import imgSubrata from "@/assets/advisoryboard/subrata.jpeg";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SSA Compliance — India's Premier Employment & Labour Law Advisory" },
      {
        name: "description",
        content:
          "Meet SSA Compliance Services LLP — 25+ years of front-line employment law expertise, led by a senior team of co-founders and an advisory Board of CHROs, CFOs and senior counsel.",
      },
      { property: "og:title", content: "About SSA Compliance Services LLP" },
      {
        property: "og:description",
        content:
          "India's premier employment and labour law advisory. Meet our leadership and advisory Board.",
      },
      { property: "og:image", content: aboutBg },
      { name: "twitter:image", content: aboutBg },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: HeartHandshake, label: "Customer Service" },
  { icon: Award, label: "Exceptional Quality" },
  { icon: ShieldCheck, label: "Integrity" },
  { icon: ScrollText, label: "Responsibility" },
];

const leadership = [
  {
    name: "Dr. Amitava Ghosh",
    role: "Co-Founder & CEO",
    bio: "22 years of specialized experience in Employee Relations, Employment & Labour Law, Policy formulation and Compliance Audit. Practiced in Employment and Labour Law services.",
    image: member1,
    tag: "Employment & Labour Law",
  },
  {
    name: "Swati Jha",
    role: "Co-Founder & COO",
    bio: "Strategic mix of business expertise across industries — strategic planning, execution of sales plans, building relationships and driving organisational growth.",
    image: member2,
    tag: "Strategy & Business",
  },
  {
    name: "Supriyo Banerjee",
    role: "Co-Founder & Chief Regulatory Officer",
    bio: "LLB, MBA (HR) with post-graduate diplomas in HR & Labour. 25+ years of hands-on Labour & Employment exposure across corporate and advisory roles.",
    image: member3,
    tag: "Regulatory Affairs",
  },
  {
    name: "Ajmal Palliyal",
    role: "Principal Consultant",
    bio: "Corporate Legal Counsel with 11 years of MNC experience across IT, Logistics, Retail, Hospitality, Energy and E-commerce sectors.",
    image: member4,
    tag: "Corporate Legal",
  },
];

const advisory: { name: string; role: string; image?: string }[] = [
  { name: "Rohit Munjal", role: "Global CHRO", image: imgRohitMunjal },
  { name: "Manish Shroff", role: "Global CFO & Board Advisor", image: imgManishShroff },
  { name: "Dr. Mahesh Kumar", role: "Senior Advocate,\nKarnataka High Court" },
  { name: "Mansij Majumder", role: "CHRO, UNext", image: imgMansij },
  { name: "Dr. Subrata Chattopadhyay", role: "IIT-ISM", image: imgSubrata },
];

function AboutPage() {
  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={aboutBg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-paper/75 to-paper" />
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-12 pt-36 md:pt-52 pb-28 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-10"
          >
            About SSA Compliance
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-4xl text-balance"
          >
            India&rsquo;s premier employment &
            <span className="block text-accent-blue font-light">labour law advisory.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-muted-ink max-w-3xl leading-relaxed font-light"
          >
            SSA Compliance Services LLP delivers precise, actionable employment law solutions.
            From appointment letters to full-scale HR compliance audits, we combine 25+ years of
            front-line expertise with customised strategies that protect both organisations and people.
          </motion.p>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="bg-paper border border-rule/60 rounded-3xl p-12 min-h-[300px] flex flex-col justify-between"
            >
              <div className="h-12 w-12 rounded-xl bg-accent-orange/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-accent-orange stroke-[1.5]" />
              </div>
              <div>
                <div className="eyebrow mb-4 text-accent-orange">Our Mission</div>
                <p className="font-display text-2xl md:text-3xl tracking-tight leading-snug font-light">
                  Deliver customer delight through value-driven compliance excellence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-ink text-paper rounded-3xl p-12 min-h-[300px] flex flex-col justify-between"
            >
              <div className="h-12 w-12 rounded-xl bg-accent-blue/20 flex items-center justify-center">
                <Compass className="h-5 w-5 text-accent-blue stroke-[1.5]" />
              </div>
              <div>
                <div className="eyebrow mb-4 text-accent-blue">Our Vision</div>
                <p className="font-display text-2xl md:text-3xl tracking-tight leading-snug font-light">
                  Be the most trusted, forward-looking partner in employment law across Asia.
                </p>
              </div>
            </motion.div>
          </div>

          {/* VALUES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ink text-paper border border-paper/10 rounded-3xl p-12 shadow-2xl"
          >
            <div className="eyebrow mb-8">Our Values</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.label} className="flex flex-col items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-accent-blue/15 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent-blue stroke-[1.5]" />
                    </div>
                    <div className="text-lg font-normal tracking-tight text-paper">{v.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="max-w-4xl mb-20 md:mb-24">
            <div className="eyebrow mb-6">Leadership</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              The Experts Behind Every
              <span className="block text-accent-blue font-light">strategic decision.</span>
            </h2>
          </div>

          {/* 2×2 horizontal cards — image left, info right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {leadership.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group flex bg-paper border border-rule/50 rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-colors duration-300"
              >
                {/* Photo — square container, face centred, branding corner hidden by crop */}
                <div className="relative w-[160px] shrink-0 overflow-hidden bg-bone">
                  <img
                    src={p.image}
                    alt={`Portrait of ${p.name}`}
                    loading="lazy"
                    className="absolute inset-0 w-[115%] h-[115%] object-cover object-[40%_18%] grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center px-6 py-7 gap-1.5">
                  <span className="inline-block text-[10px] font-semibold tracking-[0.16em] uppercase text-accent-orange mb-1">
                    {p.tag}
                  </span>
                  <div className="text-[15px] font-semibold tracking-tight text-ink leading-snug">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-accent-blue font-normal">{p.role}</div>
                  <p className="mt-2 text-[12.5px] text-muted-ink font-light leading-relaxed">
                    {p.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY BOARD */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-32 md:py-44">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="eyebrow mb-6">Advisory Board</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Counsel from leaders who have <span className="text-accent-orange">built scale.</span>
              </h2>
            </div>
            <Sparkles className="hidden md:block h-8 w-8 text-accent-blue stroke-[1]" />
          </div>

          <div className="overflow-x-auto -mx-6 lg:-mx-12 px-6 lg:px-12 pb-4 no-scrollbar">
            <div className="flex gap-4 min-w-max">
              {advisory.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="w-[280px] shrink-0 bg-paper border border-rule/60 rounded-2xl p-8 hover:border-accent-blue/40 transition"
                >
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={`Portrait of ${a.name}`}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover mb-6 ring-1 ring-rule/60"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="h-12 w-12 rounded-full mb-6 ring-1 ring-rule/60 bg-bone flex items-center justify-center"
                    >
                      <User className="h-6 w-6 text-muted-ink/60 stroke-[1.5]" />
                    </div>
                  )}
                  <div className="text-base font-normal tracking-tight">{a.name}</div>
                  <div className="mt-1 text-[13px] text-muted-ink font-light leading-relaxed whitespace-pre-line">
                    {a.role}
                  </div>
                </motion.div>
              ))}
            </div>
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
            Speak with our
            <span className="block text-paper/45">Experts</span>
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
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-paper px-8 py-3.5 rounded-full text-[15px] font-normal border border-paper/20 hover:bg-paper/10 transition"
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
