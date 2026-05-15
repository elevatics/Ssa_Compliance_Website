import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — SSA Compliance Services LLP" },
      {
        name: "description",
        content:
          "Explore SSA Compliance's published books on employment law, gig economy, platform workforce, women in India and more.",
      },
      { property: "og:title", content: "Publications — SSA Compliance Services LLP" },
      {
        property: "og:description",
        content:
          "Six authoritative books on India's labour law, workforce policy and compliance landscape by SSA Compliance Services LLP.",
      },
    ],
  }),
  component: PublicationsPage,
});

const books = [
  {
    title: "Women in Contemporary India",
    accent: "from-rose-500/20 via-orange-300/10 to-amber-400/10",
    spine: "bg-rose-600",
    content: `Education is a foundation stone for the empowerment of women and is the dominant tool to change women's position in the world.

It is vital because they have a colossal role to play in shaping up the future of the world: its economy and society and the youth. Education is a great contributing factor in this respect. To accomplish liberation, women have to be educated and take cognizance of their human rights, constitutional rights and privileges in a modern society.

India is developing as an authority as women begin playing remarkable roles for the expansion of this land with regards to its philosophy and economy.

The evolution in the status of women from the past to the present is worthy of appreciation. Women are now considered to be the forces that develop a country. The economic and welfare condition of a nation is gauged by looking at how it treats its women.`,
  },
  {
    title: "Platform Economy and Workforce",
    accent: "from-blue-500/20 via-cyan-300/10 to-sky-400/10",
    spine: "bg-blue-600",
    content: `The objective of this book is to intensify the consciousness of Industry – who are aggregators and are using apps for servicing urban and peri-urban inhabitants to avail all kind of customer services. This book made an effort to catch the eye sights of the services, the providers who reaches at doorstep to deliver desired all kind of goods or services on routine daily basis.

This pandemic has changed the traditional business structure for any kind and type of businesses around the globe and with this epidemic it changed the mind sets of the industry, workforce, society to adopt the new edge of digital platform economy.

Platform Workers, to describe in basic linguistic, are the delivery folks and cab services who provide services at our doorstep. Platform workforce means a person engaged in platform work which means an individual working for a company which provides specific services using online platform directly to customers.

The job is usually temporary and need to be completed during a specified time under a non-standard work agreement with not even one social security. The only advantage associated with such jobs it will encourage individuals in our country to engage themselves in such jobs and avail benefits arising out of it – flexibility, regular engagement with few earnings.

On the other hand, platform economy will have a lesser amount of burden over the employer to not engage in traditional long term employment commitments with the employees. This new concept would help in generating several jobs which will be duly regulated by the Labour Codes and provide social security to the employees the hope of future so that the platform workforces stay protected.`,
  },
  {
    title: "The Realm Of India's Employment Law",
    accent: "from-violet-500/20 via-purple-300/10 to-indigo-400/10",
    spine: "bg-violet-700",
    content: `Dr. Amitava Ghosh, in his book, "The Realm of India's Employment Law and the Indian Constitution," educates the readers with the facts that exist, and they may be unaware of them.

As children grow up to become adults, everyone dreams of a settled life with decent employment and the ability to earn enough to fulfill their needs and should know the benefits. In the midst of this, people tend to be unaware of the fact that they live in a world that can exploit them since that is the way of the world after all. An awareness of the rights and the conditions in which a person can and should work would only be beneficial for all the ones who are knowledgeable of it.

The Author begins by briefing about the Constitution of India, which the base of the discussion about the Employment Laws which is to follow in the consecutive 29 chapters.

Author talks of various aspects surrounding employment which begin from the day a person is employed to the day he retires. Therefore, the book is like a complete guide for every person in employment today or someday. Alongside, he also includes the necessary changes in "The Realm of India's Employment Law and the Indian Constitution" that have been done with time and mentions them wherever needed. This makes the book rich in terms of content and an updated piece of information for all those who would read it today.

Dr. Ghosh talks in detail about how things should be for a person, shares his knowledge after thorough research, and presents it to the readers in a language that is easy to understand. Reading "The Realm of India's Employment Law and the Indian Constitution" would be helpful and valuable for all readers, whether they read fiction or non-fiction, as it shares practical knowledge which would be beneficial at any stage of life.

In light of this, recommending the book to all readers would only imply doing justice to the book's subject matter. Younger readers would find the book enriching to their needs of the times that lie ahead of them, and readers who are already in employment would find the book helpful in updating their existing knowledge and adding on to it further.

Hence, recommending this book to all readers would only be beneficial for them. Another attraction would be the jargon-free language that the author uses and makes the book's language friendly to the readers' understanding.

They attain clarity in one or two readings since there is a lot of content that needs to be closely read and understood.

To conclude, everyone can read the book and enrich their Employment Law knowledge which is of utmost importance in today's competitive time.`,
  },
  {
    title: "Gig Economy In India Rising",
    accent: "from-emerald-500/20 via-teal-300/10 to-green-400/10",
    spine: "bg-emerald-600",
    content: `The rapid evolution in the gig economy suggests that this is the greatest prospect of work for the future. The gig economy gets its title from each portion of work being similar to a singular 'gig' – although, such work can fall under manifold titles.

A gig economy encompasses all platforms that hire independent professionals, consultants and workforces in diverse segments, such as IT automation – online and digital, generate content and development, social media platform for promotion and communications, aggregators, food, fintech, retails, creative fields such as art and design.

A gig economy, hence, means an existence of temporary or part-time workforce instead of a conventional workforce.

In concurrent time, e-commerce industries suddenly rose to exploit and capitalize the changed patter of customer habit which customer forced to inherit with the tremendous fast pace of digital marketing where every demand of the consumer has been customized to a 'click away option' to get the service at the doorstep.

It is a principal to principal agreement where both the parties work in their independent capacity ruling out any question of direct control or supervision of the organization on the movement or exclusive association of the gig worker with the organization.

However, by the Legislation of Code of Social Security Bill which is under review and in days it passes and gets nod from Both Houses of Parliament and gets President of India Consent it will be an Act wherein the Gig workforce will be eligible for Provident Fund, Pension, Gratuity, Medical Benefits and Insurances.

The Complete book has been critically studied and written from the perspective of the principles of Gig Economy and the Bill on New Code of Social Security which is in Parliament as Bill and yet to be legislated as Law. The author has analyzed the legislative and procedural leanings such as constitutional rights, authority, responsibilities and obligations and also the perspectives of Gig economy social security which is now a now a Bill.

Though every care has been taken to incorporate authentic information, yet some errors might have crept in inadvertently.`,
  },
  {
    title: "Business Strategies Post Pandemic",
    accent: "from-amber-500/20 via-yellow-300/10 to-orange-400/10",
    spine: "bg-amber-600",
    content: `As the world prepares to head into the post-pandemic era of COVID-19, life is likely to be changed and even the situations that people would face then. In light of this, there is a necessary homework that everyone needs to do so that when they enter into the COVID-19 free world, they are well-equipped and prepared for the changed circumstances.

Author Swati Saksena Jha, in her unique book, "Business Strategies Post Pandemic: Gearing for a New World," talks about a lot of things that she can think and anticipate for the future.

Many people have suffered because of the Pandemic, whether it is physically, mentally, emotionally, or financially. This book would be helpful for all those who are interested in learning the anticipated dynamics of a business environment and how far a person can prepare to equip himself-herself to tackle the situations.

Through her lucid style and concise manner of writing, the Author captures the interest of the readers in the first few pages.

Hence, reading through the 14 chapters of the book becomes an enriching experience for the readers. At the same time, the book would also become a guide to help people get through the tough times they face. The new world would be about those who have ideas and skills to sail through the troubled waters, and this book is a step in the direction of equipping oneself.

At the beginning of "Business Strategies Post Pandemic," the author discusses the present situation, which adds to the practical approach Swati takes later as the text unfolds and unveils the strategies the author intends to highlight in the latter part of the book.

Author begins with the key to market involvement, which is Sales. In the consecutive chapters, she talks about the strategies involved in sales and marketing and discusses the dynamic of the world of the future.

Simultaneously, author also mentions the role of women in the midst of all this and the difference women can make in this new dynamic world. Women leaders are more empathetic than men leaders as their DNA is different.

Author also brings in the practical aspect of life by mentioning Darwin's theory of survival of the fittest and dedicating a chapter to this. These are the factors that make the book an important one to be read and keep the readers' interest intact.

"Business Strategies Post Pandemic" is suggested not only to those who are looking for a model-guide to the post-pandemic world but also to those who are interested in changing the professional strategies in their businesses.

In addition, people who have plans of starting their business or start-up someday would also want to read this book for a better idea of many things that may have escaped their observations and not thought off.

The book may belong to the non-fiction genre, yet its importance for the readers of fiction cannot be undermined anyhow as everyone has to live in the same world and face situations more or less similar to others.

Author concludes since everyone has to handle their situations on their own, this book is suggested to all as the world has changed forever.`,
  },
  {
    title: "Labour & Environmental Law in India",
    accent: "from-slate-500/20 via-zinc-300/10 to-stone-400/10",
    spine: "bg-slate-700",
    content: `The commencement of Labour Laws in India can be mapped out back from 1850's when the Apprentice Act was legislated and positioned on the statute manuscript, followed by Fatal Accidents 1855, Factories Act 1881, Mines Act 1842 and series of Labour Legislations thereby. In all, above hundred labour laws & employment issues have been enacted by the Central & State Governments and prior Independence by British regime and rule, many of which have been almost modified or even repealed or replaced. Our Labour & Environmental Law book is one of its kind in India focusing on the application of the principles, interpretation of the provisions Labour & Environmental Laws and Statutes based on past judgments pronounced by various Apex Courts.

This book of ours is exhaustive and covers all the legislations & principles of Labour & Environmental Laws in Indian pretext covering significant modern labour laws such as Payment of Wages Act, 1936, I D Act 1947, Social Security Acts (ESI – 1948 & EPF&MP – 1952 Acts), Maternity Benefits Act 1961, Payment of Bonus Act 1965, Payment of Gratuity Act 1972, Factories Act 1948, among others. The authors have thoroughly analyzed the legislative and procedural leanings such as constitutional rights, authority, responsibilities and obligations, etc, and also the perspective of the laws of statutory networks. Labour Law is not solitary legislation, but it's a bunch and cluster of legislations enacted and amended by the government from time to time, covering the gamut of issues relating to Labour and its employment. The provisions are applicable to every organization even if they employ one employee.

Needless to say, this book is exceptionally comprehensive in so far as several interpretations, transcripts and approaches to issues falling under the ambit of Labour & Environmental laws which have been subjected to exhaustive critical study illustratively attached with illustration of suitable comparisons and evaluations. The complete book have been critically studied and written from the perspective of the principles and interpretation of statutes.

Ignorance of Law is no justification hence it often leads to adversity. However, the fact is, both the workforce & businesses tend to give least importance to its compliance primarily because the benefits & purpose these legislations are not properly communicated or made aware.

It is, hence, crucial and critical for everyone whether be an owner, entrepreneurs, employer, manager, supervisor and every employee of any organization, to keep abreast of his/her rights and obligations under the labour and environmental laws. We are confident, this book will be of enormous assistance to HR & Personnel network, management & law students, academicians and also act as a ready reckoner/handbook for working professionals in the fields of human resources, personnel management and compliance management in every establishments.`,
  },
];

function BookCard({ book, index }: { book: (typeof books)[0]; index: number }) {
  const paragraphs = book.content.split("\n\n").filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className="group bg-paper border border-rule/60 rounded-3xl overflow-hidden hover:border-accent-blue/30 hover:shadow-xl hover:shadow-ink/6 transition-all duration-300"
    >
      {/* Book cover band */}
      <div
        className={`h-28 bg-gradient-to-br ${book.accent} flex items-end justify-between px-8 pb-5`}
      >
        <div className={`w-1.5 h-16 rounded-full ${book.spine} opacity-70`} />
        <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="px-8 pt-7 pb-8">
        <h2 className="font-display text-[1.35rem] font-normal tracking-tight leading-snug text-ink mb-6">
          {book.title}
        </h2>

        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-[14px] text-muted-ink font-light leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function PublicationsPage() {
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
            Knowledge &amp; Research
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
            Publications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-muted-ink max-w-2xl leading-relaxed font-light"
          >
            Six authoritative books on India&rsquo;s labour law, workforce policy and compliance
            landscape — authored by our partners and published for practitioners, HR leaders and
            policymakers.
          </motion.p>
        </div>
      </section>

      {/* BOOKS */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-36">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-2xl">
              <div className="eyebrow mb-6">Our Books</div>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Six perspectives shaping
                <span className="block text-accent-orange">India&rsquo;s workforce policy.</span>
              </h2>
            </div>
            <div className="text-[13px] text-muted-ink font-light">
              {books.length} publications · SSA Compliance Services LLP
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {books.map((book, i) => (
              <BookCard key={book.title} book={book} index={i} />
            ))}
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
            <span className="block text-paper/45">on a specific topic?</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <BookingDialog
              trigger={(open) => (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex items-center gap-2 bg-accent-orange text-paper px-8 py-3.5 rounded-full text-[15px] font-normal hover:opacity-90 transition"
                >
                  Request a consultation
                </button>
              )}
            />
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-paper px-8 py-3.5 rounded-full text-[15px] font-normal border border-paper/20 hover:bg-paper/10 transition"
            >
              Explore insights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
