import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { BookingDialog } from "@/components/BookingDialog";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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
];

const ITEMS_PER_PAGE = 3;

function BookCard({ book, index }: { book: (typeof books)[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className="group bg-paper border border-rule/60 rounded-2xl overflow-hidden hover:border-accent-blue/30 hover:shadow-lg hover:shadow-ink/6 transition-all duration-300 flex flex-col sm:flex-row"
    >
      {/* Text side */}
      <div className="flex-1 px-8 py-8 flex flex-col justify-between order-2 sm:order-1 min-w-0">
        <div>
          <h2 className="font-display text-[1.2rem] font-normal tracking-tight leading-snug text-ink mb-2 group-hover:text-accent-blue transition-colors duration-300">
            {book.title}
          </h2>
          <p className="text-[12px] text-accent-blue font-normal mb-3">{book.author}</p>
          <p className="text-[13px] text-muted-ink font-light leading-relaxed line-clamp-3">
            {book.excerpt}
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/publication/$slug"
            params={{ slug: book.slug }}
            className="inline-flex items-center gap-1.5 text-[13px] font-normal text-accent-blue hover:text-accent-orange transition-colors duration-200"
          >
            Read More <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Image side — fills the panel edge-to-edge, no visible background gap */}
      <div className="w-full sm:w-52 shrink-0 overflow-hidden order-1 sm:order-2 min-h-[180px] sm:min-h-0">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          style={{ minHeight: "180px" }}
        />
      </div>
    </motion.article>
  );
}

function PublicationsPage() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const visibleBooks = books.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

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
            Comprehensive labour law
            <span className="block text-accent-orange font-light">compliance services.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl text-muted-ink max-w-2xl leading-relaxed font-light"
          >
            Four practices. One unbroken standard. Chosen freely until the moment we reach your
            specific area.
          </motion.p>
        </div>
      </section>

      {/* BOOKS LIST */}
      <section className="bg-bone">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 py-16 md:py-24">
          <div className="space-y-5">
            {visibleBooks.map((book, i) => (
              <BookCard key={book.slug} book={book} index={i} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="h-9 w-9 rounded-full border border-rule/60 flex items-center justify-center text-muted-ink hover:border-accent-blue hover:text-accent-blue disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                    i === page ? "bg-accent-blue scale-125" : "bg-rule hover:bg-accent-blue/40"
                  }`}
                />
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="h-9 w-9 rounded-full border border-rule/60 flex items-center justify-center text-muted-ink hover:border-accent-blue hover:text-accent-blue disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
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
