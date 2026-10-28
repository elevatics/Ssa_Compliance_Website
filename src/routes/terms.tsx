import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { GRIEVANCE_EMAIL } from "@/lib/privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | SSA Compliance Services LLP" },
      {
        name: "description",
        content:
          "Terms for using the SSA Compliance Services LLP website, demo request form, and chat assistant.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.ssahrc.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage eyebrow="Website terms" title="Terms of Service" updated="26 October 2026">
      <p>
        These terms are between you and SSA Compliance Services LLP (“SSA”), Bengaluru, for use of
        this website, the demo request form, and the chat assistant. SSA’s partners should review
        them before relying on them as the firm’s contract. Personal data is handled under the{" "}
        <Link to="/privacy">Privacy Notice</Link>.
      </p>

      <h2>Information, not legal advice</h2>
      <p>
        Content on this website, including replies from the chat assistant, is for information only.
        It is not legal advice, a solicitation, or an advertisement you should act on by itself. A
        client relationship starts only when SSA agrees to one in writing. SSA is not responsible
        for errors or omissions on the site, or for action taken only from material on the site.
      </p>

      <h2>Demo requests</h2>
      <p>
        Submitting the demo form is a request that SSA contact you. It does not book a confirmed
        engagement. SSA may decline or follow up using the details you provide, as described in the
        Privacy Notice.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Use the site and chat for questions about SSA’s services.</li>
        <li>Do not send employee records or another person’s personal data.</li>
        <li>Do not attempt to disrupt the site, the form, or the chat service.</li>
      </ul>

      <h2>Site content</h2>
      <p>
        Text, design, and marks on this website belong to SSA or its licensors. You may read them
        for your own business. You may not copy them for a competing service without SSA’s
        permission.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${GRIEVANCE_EMAIL}`}>{GRIEVANCE_EMAIL}</a>.
        These terms follow the laws of India, and the courts at Bengaluru have jurisdiction. SSA may
        update this page; the date above is the version in force.
      </p>
    </LegalPage>
  );
}
