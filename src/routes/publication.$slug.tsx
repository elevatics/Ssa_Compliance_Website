import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowLeft, ShoppingCart, User } from "lucide-react";
import { books } from "./publications";

export const Route = createFileRoute("/publication/$slug")({
  head: ({ params }) => {
    const book = books.find((b) => b.slug === params.slug);
    return {
      meta: [
        { title: book ? `${book.title} — SSA Compliance` : "Publication — SSA Compliance" },
        {
          name: "description",
          content: book?.excerpt ?? "SSA Compliance publication.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const book = books.find((b) => b.slug === params.slug);
    if (!book) throw notFound();
    return { book };
  },
  component: PublicationDetailPage,
});

function PublicationDetailPage() {
  const { book } = Route.useLoaderData();
  const allOthers = books.filter((b) => b.slug !== book.slug).slice(0, 3);
  const paragraphs = book.content.split("\n\n").filter(Boolean);

  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* ARTICLE */}
      <article className="mx-auto max-w-3xl px-6 lg:px-8 pt-32 md:pt-44 pb-20">
        {/* Back + date */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <Link
            to="/publications"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-ink hover:text-accent-blue transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Publications
          </Link>
          <span className="text-[13px] text-muted-ink font-light">{book.date}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] tracking-tight text-balance mb-6"
        >
          {book.title}
        </motion.h1>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="h-10 w-10 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0 ring-1 ring-accent-blue/20">
            <User className="h-5 w-5 text-accent-blue stroke-[1.5]" />
          </div>
          <div>
            <div className="text-[15px] font-normal text-ink tracking-tight">{book.author}</div>
            <div className="text-[12px] text-accent-blue font-normal uppercase tracking-wider mt-0.5">Author</div>
          </div>
        </motion.div>

        {/* Book cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-14 rounded-2xl overflow-hidden border border-rule/60 bg-bone"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-full max-h-[520px] object-contain object-center py-4"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="space-y-5 mb-14"
        >
          {paragraphs.map((para: string, i: number) => (
            <p key={i} className="text-[15px] text-muted-ink font-light leading-[1.8]">
              {para}
            </p>
          ))}
        </motion.div>

        {/* Buy button — only shown when a buy link is provided */}
        {book.buyLink && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-orange text-paper px-8 py-3.5 rounded-full text-[15px] font-normal hover:opacity-90 transition"
            >
              <ShoppingCart className="h-4 w-4" />
              Buy Online Now
            </a>
          </motion.div>
        )}
      </article>

      {/* RELATED ARTICLES */}
      {allOthers.length > 0 && (
        <section className="bg-bone">
          <div className="mx-auto max-w-6xl px-6 lg:px-12 py-20 md:py-28">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-2xl md:text-3xl tracking-tight">Related Articles</h2>
              <Link
                to="/publications"
                className="text-[13px] text-accent-blue hover:text-accent-orange transition inline-flex items-center gap-1"
              >
                Show all articles <ArrowLeft className="h-3 w-3 rotate-180" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allOthers.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  className="group bg-paper border border-rule/60 rounded-2xl overflow-hidden hover:border-accent-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Cover fills card top — no padding, no background gap */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[1rem] tracking-tight leading-snug mb-2 group-hover:text-accent-blue transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-3">
                      <div className="h-5 w-5 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0">
                        <User className="h-2.5 w-2.5 text-accent-blue" />
                      </div>
                      <span className="text-[12px] text-accent-blue font-normal truncate">{related.author}</span>
                    </div>
                    <Link
                      to="/publication/$slug"
                      params={{ slug: related.slug }}
                      className="mt-4 inline-flex items-center gap-1 text-[12px] text-accent-blue hover:text-accent-orange transition"
                    >
                      Read More <ArrowLeft className="h-3 w-3 rotate-180" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
