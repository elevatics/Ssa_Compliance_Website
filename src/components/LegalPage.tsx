import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <div className="bg-paper text-ink antialiased font-sans">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-6 lg:px-12 pt-28 md:pt-36 pb-20">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-balance">{title}</h1>
        <p className="mt-4 text-sm text-muted-ink">Last updated {updated}</p>
        <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-ink/80 font-light [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-normal [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-accent-blue [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
