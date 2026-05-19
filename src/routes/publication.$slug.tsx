import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowLeft, ExternalLink, User } from "lucide-react";
import { books } from "./publications";
import { useState } from "react";

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
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />

      {/* ARTICLE */}
      <article className="mx-auto max-w-3xl px-6 lg:px-8 pt-32 md:pt-44 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/publications"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-ink hover:text-accent-blue transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Publications
          </Link>
        </motion.div>

        {/* Centered header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[13px] text-muted-ink font-light mb-6">{book.date}</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] tracking-tight text-balance mb-6">
            {book.title}
          </h1>
          <motion.div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted-ink">
            {book.author.split(/\s*&\s*/).map((name) => (
              <span key={name} className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 shrink-0" />
                {name.trim()}
              </span>
            ))}
          </motion.div>
        </motion.header>

        {/* Featured book cover — cream background, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="publication-cover-featured flex items-center justify-center min-h-[320px] md:min-h-[380px] p-8 md:p-12 mb-14"
        >
          <img
            src={book.image}
            alt={book.title}
            className="max-h-[300px] md:max-h-[360px] w-auto object-contain drop-shadow-xl"
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

        {/* Buy button — black, left-aligned */}
        {book.buyLink && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 text-[13px] font-medium uppercase tracking-wider hover:opacity-90 transition"
            >
              Buy Online
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </article>

      {/* RELATED ARTICLES */}
      {allOthers.length > 0 && (
        <section className="bg-paper border-t border-rule/40">
          <div className="mx-auto max-w-5xl px-6 lg:px-12 py-20 md:py-28">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-rule/60">
              <h2 className="font-display text-xl md:text-2xl tracking-tight font-normal">
                Related Articles
              </h2>
              <Link
                to="/publications"
                className="text-[13px] text-muted-ink hover:text-accent-blue transition"
              >
                Browse all articles
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {allOthers.map((related, i) => {
                const isHighlighted = highlightedSlug === related.slug;
                return (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.07 }}
                  >
                    <Link
                      to="/publication/$slug"
                      params={{ slug: related.slug }}
                      onClick={() => setHighlightedSlug(related.slug)}
                      className={`group block transition-all duration-200 ${
                        isHighlighted
                          ? "ring-2 ring-ink ring-offset-2 ring-offset-paper"
                          : ""
                      }`}
                    >
                      <div
                        className={`publication-cover-thumb flex items-center justify-center h-48 md:h-52 p-6 mb-4 transition-colors duration-200 ${
                          isHighlighted ? "bg-rule/80" : ""
                        }`}
                      >
                        <img
                          src={related.image}
                          alt={related.title}
                          className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-display text-[1rem] tracking-tight leading-snug mb-2 group-hover:text-accent-blue transition-colors">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3 w-3 text-muted-ink" />
                        <span className="text-[12px] text-muted-ink font-light">Author</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
