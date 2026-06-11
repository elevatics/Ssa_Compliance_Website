import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ssaLogo from "@/assets/SSA LOGO.png";
import { useEffect, useState } from "react";

// Order: image.png → image (1).png → image (2).png … image (5).png
import img0 from "@/assets/image.png";
import img1 from "@/assets/image (1).png";
import img2 from "@/assets/image (2).png";
import img3 from "@/assets/image (3).png";
import img4 from "@/assets/image (4).png";
import img5 from "@/assets/image (5).png";

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

export const books = [
  {
    slug: "realm-of-indias-employment-law",
    title: "The Realm Of India's Employment Law",
    author: "Dr. Amitava Ghosh",
    date: "Published 2020",
    image: img2,
    excerpt:
      "Dr. Amitava Ghosh educates readers with facts they may be unaware of — from the day a person is employed to the day they retire.",
    content: `Dr. Amitava Ghosh, in his book, "The Realm of India's Employment Law and the Indian Constitution," educates the readers with the facts that exist, and they may be unaware of them.

As children grow up to become adults, everyone dreams of a settled life with decent employment and the ability to earn enough to fulfill their needs and should know the benefits. In the midst of this, people tend to be unaware of the fact that they live in a world that can exploit them since that is the way of the world after all. An awareness of the rights and the conditions in which a person can and should work would only be beneficial for all the ones who are knowledgeable of it.

The Author begins by briefing about the Constitution of India, which the base of the discussion about the Employment Laws which is to follow in the consecutive 29 chapters.

Author talks of various aspects surrounding employment which begin from the day a person is employed to the day he retires. Therefore, the book is like a complete guide for every person in employment today or someday.

Dr. Ghosh talks in detail about how things should be for a person, shares his knowledge after thorough research, and presents it to the readers in a language that is easy to understand. Reading "The Realm of India's Employment Law and the Indian Constitution" would be helpful and valuable for all readers, whether they read fiction or non-fiction, as it shares practical knowledge which would be beneficial at any stage of life.

Hence, recommending this book to all readers would only be beneficial for them. Another attraction would be the jargon-free language that the author uses and makes the book's language friendly to the readers' understanding.

To conclude, everyone can read the book and enrich their Employment Law knowledge which is of utmost importance in today's competitive time.`,
    buyLink: "https://www.amazon.in/dp/9390586739/ref=cm_sw_r_wa_api_glt_fabc_ZQ5YRQFVY292CW7QTQZ4",
  },
  {
    slug: "women-in-contemporary-india",
    title: "Women in Contemporary India",
    author: "Dr. Amitava Ghosh & Swati Saksena Jha",
    date: "Published March 7, 2022",
    image: img0,
    excerpt:
      "Education is a foundation stone for the empowerment of women and is the dominant tool to change women's position in the world.",
    content: `Education is a foundation stone for the empowerment of women and is the dominant tool to change women's position in the world.

It is vital because they have a colossal role to play in shaping up the future of the world: its economy and society and the youth. Education is a great contributing factor in this respect. To accomplish liberation, women have to be educated and take cognizance of their human rights, constitutional rights and privileges in a modern society.

India is developing as an authority as women begin playing remarkable roles for the expansion of this land with regards to its philosophy and economy.

The evolution in the status of women from the past to the present is worthy of appreciation. Women are now considered to be the forces that develop a country. The economic and welfare condition of a nation is gauged by looking at how it treats its women.`,
    buyLink:
      "https://www.amazon.in/WOMEN-CONTEMPORARY-INDIA-Amitava-Ghosh/dp/9354464866/ref=sr_1_3?crid=3FZA4I4S8UZ0K&keywords=women+in+contemporary+India&qid=1649048930&sprefix=women+in+contemporary+india%2Caps%2C283&sr=8-3",
  },
  {
    slug: "labour-and-environmental-law-in-india",
    title: "Labour & Environmental Law in India",
    author: "Amitava Ghosh & Amir Jafar",
    date: "Published January 1, 2018",
    image: img5,
    excerpt:
      "One of its kind in India — focusing on application of principles, interpretation of Labour & Environmental Laws based on past judgments by various Apex Courts.",
    content: `The commencement of Labour Laws in India can be mapped out back from 1850's when the Apprentice Act was legislated and positioned on the statute manuscript, followed by Fatal Accidents 1855, Factories Act 1881, Mines Act 1842 and series of Labour Legislations thereby. In all, above hundred labour laws & employment issues have been enacted by the Central & State Governments and prior Independence by British regime and rule, many of which have been almost modified or even repealed or replaced. Our Labour & Environmental Law book is one of its kind in India focusing on the application of the principles, interpretation of the provisions Labour & Environmental Laws and Statutes based on past judgments pronounced by various Apex Courts.

This book of ours is exhaustive and covers all the legislations & principles of Labour & Environmental Laws in Indian pretext covering significant modern labour laws such as Payment of Wages Act, 1936, I D Act 1947, Social Security Acts (ESI – 1948 & EPF&MP – 1952 Acts), Maternity Benefits Act 1961, Payment of Bonus Act 1965, Payment of Gratuity Act 1972, Factories Act 1948, among others.

Needless to say, this book is exceptionally comprehensive in so far as several interpretations, transcripts and approaches to issues falling under the ambit of Labour & Environmental laws which have been subjected to exhaustive critical study illustratively attached with illustration of suitable comparisons and evaluations.

Ignorance of Law is no justification hence it often leads to adversity. However, the fact is, both the workforce & businesses tend to give least importance to its compliance primarily because the benefits & purpose these legislations are not properly communicated or made aware.

It is, hence, crucial and critical for everyone whether be an owner, entrepreneurs, employer, manager, supervisor and every employee of any organization, to keep abreast of his/her rights and obligations under the labour and environmental laws. We are confident, this book will be of enormous assistance to HR & Personnel network, management & law students, academicians and also act as a ready reckoner/handbook for working professionals in the fields of human resources, personnel management and compliance management in every establishments.`,
    buyLink: "https://www.amazon.in/dp/B07KYQ1KD4/ref=cm_sw_r_wa_api_glt_fabc_VBKPC0P32D5QCGGVBART",
  },
  {
    slug: "platform-economy-and-workforce",
    title: "Platform Economy and Workforce",
    author: "Dr. Amitava Ghosh",
    date: "Published 2021",
    image: img1,
    excerpt:
      "This book intensifies the consciousness of Industry — aggregators using apps for servicing urban and peri-urban inhabitants to avail all kind of customer services.",
    content: `The objective of this book is to intensify the consciousness of Industry – who are aggregators and are using apps for servicing urban and peri-urban inhabitants to avail all kind of customer services. This book made an effort to catch the eye sights of the services, the providers who reaches at doorstep to deliver desired all kind of goods or services on routine daily basis.

This pandemic has changed the traditional business structure for any kind and type of businesses around the globe and with this epidemic it changed the mind sets of the industry, workforce, society to adopt the new edge of digital platform economy.

Platform Workers, to describe in basic linguistic, are the delivery folks and cab services who provide services at our doorstep. Platform workforce means a person engaged in platform work which means an individual working for a company which provides specific services using online platform directly to customers.

The job is usually temporary and need to be completed during a specified time under a non-standard work agreement with not even one social security. The only advantage associated with such jobs it will encourage individuals in our country to engage themselves in such jobs and avail benefits arising out of it – flexibility, regular engagement with few earnings.

On the other hand, platform economy will have a lesser amount of burden over the employer to not engage in traditional long term employment commitments with the employees. This new concept would help in generating several jobs which will be duly regulated by the Labour Codes and provide social security to the employees the hope of future so that the platform workforces stay protected.`,
    buyLink: "",
  },
  {
    slug: "gig-economy-in-india-rising",
    title: "Gig Economy In India Rising",
    author: "Dr. Amitava Ghosh",
    date: "Published January 1, 2020",
    image: img3,
    excerpt:
      "The rapid evolution in the gig economy suggests that this is the greatest prospect of work for the future.",
    content: `The rapid evolution in the gig economy suggests that this is the greatest prospect of work for the future. The gig economy gets its title from each portion of work being similar to a singular 'gig' – although, such work can fall under manifold titles.

A gig economy encompasses all platforms that hire independent professionals, consultants and workforces in diverse segments, such as IT automation – online and digital, generate content and development, social media platform for promotion and communications, aggregators, food, fintech, retails, creative fields such as art and design.

A gig economy, hence, means an existence of temporary or part-time workforce instead of a conventional workforce.

In concurrent time, e-commerce industries suddenly rose to exploit and capitalize the changed patter of customer habit which customer forced to inherit with the tremendous fast pace of digital marketing where every demand of the consumer has been customized to a 'click away option' to get the service at the doorstep.

It is a principal to principal agreement where both the parties work in their independent capacity ruling out any question of direct control or supervision of the organization on the movement or exclusive association of the gig worker with the organization.

However, by the Legislation of Code of Social Security Bill which is under review and in days it passes and gets nod from Both Houses of Parliament and gets President of India Consent it will be an Act wherein the Gig workforce will be eligible for Provident Fund, Pension, Gratuity, Medical Benefits and Insurances.

The Complete book has been critically studied and written from the perspective of the principles of Gig Economy and the Bill on New Code of Social Security which is in Parliament as Bill and yet to be legislated as Law.

Though every care has been taken to incorporate authentic information, yet some errors might have crept in inadvertently.`,
    buyLink: "https://www.amazon.in/dp/B08FQY1SJH/ref=cm_sw_r_wa_api_glt_fabc_5T4N8TGM1Z033G233VJX",
  },
  {
    slug: "business-strategies-post-pandemic",
    title: "Business Strategies Post Pandemic",
    author: "Swati Saksena Jha",
    date: "Published 2021",
    image: img4,
    excerpt:
      "As the world prepares to head into the post-pandemic era of COVID-19, life is likely to be changed and even the situations that people would face then.",
    content: `As the world prepares to head into the post-pandemic era of COVID-19, life is likely to be changed and even the situations that people would face then. In light of this, there is a necessary homework that everyone needs to do so that when they enter into the COVID-19 free world, they are well-equipped and prepared for the changed circumstances.

Author Swati Saksena Jha, in her unique book, "Business Strategies Post Pandemic: Gearing for a New World," talks about a lot of things that she can think and anticipate for the future.

Many people have suffered because of the Pandemic, whether it is physically, mentally, emotionally, or financially. This book would be helpful for all those who are interested in learning the anticipated dynamics of a business environment and how far a person can prepare to equip himself-herself to tackle the situations.

Through her lucid style and concise manner of writing, the Author captures the interest of the readers in the first few pages.

Hence, reading through the 14 chapters of the book becomes an enriching experience for the readers. At the same time, the book would also become a guide to help people get through the tough times they face. The new world would be about those who have ideas and skills to sail through the troubled waters, and this book is a step in the direction of equipping oneself.

At the beginning of "Business Strategies Post Pandemic," the author discusses the present situation, which adds to the practical approach Swati takes later as the text unfolds and unveils the strategies the author intends to highlight in the latter part of the book.

Author begins with the key to market involvement, which is Sales. In the consecutive chapters, she talks about the strategies involved in sales and marketing and discusses the dynamic of the world of the future.

Simultaneously, author also mentions the role of women in the midst of all this and the difference women can make in this new dynamic world.

"Business Strategies Post Pandemic" is suggested not only to those who are looking for a model-guide to the post-pandemic world but also to those who are interested in changing the professional strategies in their businesses.

Author concludes since everyone has to handle their situations on their own, this book is suggested to all as the world has changed forever.`,
    buyLink: "https://www.amazon.in/dp/939058681X/ref=cm_sw_r_wa_api_glt_fabc_1N1EVJ6Y5E23R00K5QEW",
  },
];

const ITEMS_PER_PAGE = 3;

type ContentFilter = "all" | "publications" | "newsletter";

export const newsletters = [
  {
    slug: "april-may-2026",
    title: "Labour Law Compliance Developments Every Employer Should Know",
    period: "April–May 2026",
    excerpt:
      "OSHWC break requirements, EPF and High Court rulings, wage structures, and workforce welfare under India's evolving labour law framework.",
    url: "https://www.linkedin.com/posts/ssa-compliance-updates-april-may-2026-ugcPost-7465381836433637376-Renf/",
  },
  {
    slug: "february-march-2026",
    title: "Key Labour Law Developments Every Employer Should Know",
    period: "February–March 2026",
    excerpt:
      "Supreme Court compensation penalties, Punjab & Haryana High Court on no-work-no-pay, and labour code rollout challenges for employers.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7444631717845319680/",
  },
  {
    slug: "january-2026",
    title: "Labour Law Updates: Key Developments & Compliance Implications",
    period: "January 2026",
    excerpt:
      "Workman classification, overtime wage calculations, contractor claims, and preparing for Labour Code implementation from April.",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7422571483094392833/",
  },
];

const contentFilters: { key: ContentFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "publications", label: "Publications" },
  { key: "newsletter", label: "Newsletter" },
];

function BookRow({
  book,
  isActive,
  onSelect,
}: {
  book: (typeof books)[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="border-b border-rule/70 last:border-b-0">
      <button
        type="button"
        onClick={onSelect}
        className={`w-full text-left transition-colors duration-200 ${
          isActive ? "bg-paper" : "bg-transparent hover:bg-bone/50"
        }`}
        aria-expanded={isActive}
        aria-current={isActive ? "true" : undefined}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isActive ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-[2fr_3fr] gap-0"
            >
              {/* Text — ~40% */}
              <motion.div className="flex flex-col justify-center px-0 py-8 md:py-10 md:pr-10">
                <h2 className="font-display text-[1.35rem] md:text-[1.5rem] font-normal tracking-tight leading-snug text-ink underline decoration-ink/30 underline-offset-4 mb-4">
                  {book.title}
                </h2>
                <p className="text-[14px] text-muted-ink font-light leading-relaxed mb-6">
                  {book.excerpt}
                </p>
                <Link
                  to="/publication/$slug"
                  params={{ slug: book.slug }}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[14px] font-normal text-ink hover:text-accent-blue transition-colors duration-200 w-fit"
                >
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>

              {/* Featured cover — ~60%, cream background */}
              <div className="publication-cover-featured flex items-center justify-center min-h-[240px] md:min-h-[300px] p-6 md:p-10">
                <img
                  src={book.image}
                  alt={book.title}
                  className="max-h-[220px] md:max-h-[280px] w-auto object-contain drop-shadow-lg"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-6 py-5 md:py-6"
            >
              <h3 className="font-display text-[1.05rem] md:text-[1.15rem] font-normal tracking-tight text-ink/85 pr-4">
                {book.title}
              </h3>
              <motion.div className="publication-cover-thumb shrink-0 w-[72px] h-[88px] md:w-[80px] md:h-[96px] flex items-center justify-center p-2">
                <img
                  src={book.image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

function NewsletterRow({ item }: { item: (typeof newsletters)[0] }) {
  return (
    <div className="border-b border-rule/70 last:border-b-0">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-6 py-5 md:py-6 transition-colors duration-200 hover:bg-bone/50"
      >
        <div className="min-w-0 pr-4">
          <p className="text-[12px] uppercase tracking-widest text-muted-ink mb-1.5">
            {item.period}
          </p>
          <h3 className="font-display text-[1.05rem] md:text-[1.15rem] font-normal tracking-tight text-ink/85">
            {item.title}
          </h3>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted-ink group-hover:text-accent-blue">
            View on LinkedIn <ExternalLink className="h-3 w-3" />
          </span>
        </div>
        {/* <div className="publication-cover-thumb shrink-0 w-[72px] h-[88px] md:w-[80px] md:h-[96px] flex items-center justify-center p-2">
          <img
            src={ssaLogo}
            alt=""
            className="max-h-full max-w-full object-contain opacity-90"
          />
        </div> */}
      </a>
    </div>
  );
}

function PublicationsPage() {
  const [contentFilter, setContentFilter] = useState<ContentFilter>("all");
  const [page, setPage] = useState(0);
  const [activeSlug, setActiveSlug] = useState(books[0].slug);

  const showPublications = contentFilter === "all" || contentFilter === "publications";
  const showNewsletter = contentFilter === "all" || contentFilter === "newsletter";

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const visibleBooks = books.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  useEffect(() => {
    const firstOnPage = books[page * ITEMS_PER_PAGE];
    if (firstOnPage) setActiveSlug(firstOnPage.slug);
  }, [page]);

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
            Publications
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight max-w-5xl text-balance"
          >
          Titles by the
            <span className="block text-accent-orange font-light">Founders.</span>
          </motion.h1>
        </div>
      </section>

      {/* FILTER + CONTENT */}
      <section className="bg-paper border-t border-rule/40">
        <motion.div className="mx-auto max-w-4xl px-6 lg:px-12 py-16 md:py-24">

          <div className="flex flex-wrap items-center justify-center gap-2 mb-14 md:mb-16">
            {contentFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setContentFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-[15px] font-normal transition-colors ${
                  contentFilter === f.key
                    ? "bg-ink text-paper"
                    : "text-muted-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {showPublications && (
            <div>
              {contentFilter === "all" && (
                <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink mb-8 md:mb-10">
                  Publications
                </h2>
              )}
              {visibleBooks.map((book) => (
                <BookRow
                  key={book.slug}
                  book={book}
                  isActive={activeSlug === book.slug}
                  onSelect={() => setActiveSlug(book.slug)}
                />
              ))}

              {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="text-muted-ink hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPage(i)}
                        className={`text-[15px] transition-colors ${
                          i === page
                            ? "font-medium text-ink"
                            : "text-muted-ink hover:text-ink"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                    className="text-muted-ink hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {showNewsletter && (
            <div className={showPublications ? "mt-20 md:mt-28 pt-20 md:pt-28 border-t border-rule/40" : ""}>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink mb-8 md:mb-10">
                Newsletter
              </h2>
              {newsletters.map((item) => (
                <NewsletterRow key={item.slug} item={item} />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <motion.div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent-blue/20 blur-3xl" />
        <motion.div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent-orange/20 blur-3xl" />
        <motion.div className="relative mx-auto max-w-5xl px-6 lg:px-12 py-32 md:py-40 text-center">
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
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
