import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { GRIEVANCE_EMAIL } from "@/lib/privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice | SSA Compliance Services LLP" },
      {
        name: "description",
        content:
          "How SSA Compliance Services LLP collects and uses personal data on this website under the Digital Personal Data Protection Act, 2023.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.ssahrc.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage eyebrow="DPDP notice" title="Privacy Notice" updated="26 October 2026">
      <p>
        This notice explains how SSA Compliance Services LLP (“SSA”), #C21, 3rd Floor, Unispace,
        Plot No. 128-P2, near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066,
        handles personal data collected on this website. It is the notice for the Digital Personal
        Data Protection Act, 2023. SSA’s partners should review it before it is treated as the
        firm’s final notice.
      </p>

      <h2>What we collect, and why</h2>
      <ul>
        <li>
          <span className="text-ink">Demo request.</span> Name, work email, mobile number, company,
          designation, location, enquiry type, how you heard about us, and your message. SSA uses
          this only to contact you about that demo request. We ask for your consent before the form
          is sent, and we email a one-time code to confirm the address.
        </li>
        <li>
          <span className="text-ink">Chat.</span> The messages you send to the assistant, and a
          random id stored in this browser so the conversation can continue. We do not ask for your
          email to use the chat. SSA uses the messages only to answer that conversation.
        </li>
        <li>
          <span className="text-ink">This browser.</span> A flag that you accepted the chat notice,
          and a flag that you closed the insights prompt. These are not used to identify you.
        </li>
      </ul>
      <p>
        The insights prompt does not collect an email address. Do not put employee records, wages,
        government ids, or anyone else’s personal data into the demo form or the chat. The assistant
        is for general questions about SSA’s services.
      </p>

      <h2>Who processes it for SSA</h2>
      <p>
        Demo requests and one-time codes are sent to the booking service at api.legum.ai. Chat
        messages are sent to the chat service at legum-website-chat.elevatics.site. Those providers
        process the data for SSA. They are not allowed to use it for their own purposes. SSA remains
        responsible for this data.
      </p>

      <h2>How long it is kept</h2>
      <p>
        Demo details are kept so SSA can respond to that request. Chat messages are kept so you can
        continue the conversation. This website does not set an automatic deletion date on those
        services. When the purpose is finished, or when you withdraw consent, email{" "}
        <a href={`mailto:${GRIEVANCE_EMAIL}`}>{GRIEVANCE_EMAIL}</a> and SSA will ask the provider to
        delete the data. You can also delete chat stored for this browser from the chat panel.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Withdraw consent for a demo request or a chat by emailing {GRIEVANCE_EMAIL}.</li>
        <li>Ask for access, correction, or erasure of your personal data at the same address.</li>
        <li>Use “Delete my chat data” in the assistant to clear this browser and request deletion of its conversations.</li>
        <li>
          Raise a grievance with SSA at {GRIEVANCE_EMAIL}, subject “Privacy grievance”. If you are
          not satisfied, you may approach the Data Protection Board of India.
        </li>
      </ul>
      <p>
        SSA has not published the name of a grievance officer on this page yet. Write to the email
        above until the firm adds that contact.
      </p>

      <h2>Children</h2>
      <p>This website is for businesses and their staff. It is not meant for anyone under 18.</p>

      <p>
        Use of the site is also covered by the <Link to="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
