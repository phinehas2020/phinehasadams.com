import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "../components/site/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Phinehas Adams",
  description:
    "Privacy policy for lead alerts, messages, and website inquiries for phinehasadams.com.",
};

const sections = [
  {
    heading: "Information we collect",
    body:
      "We collect information you send directly through forms, email, or other inquiry flows, including your name, email address, phone number, website or business name, opt-in preferences, and inquiry details.",
  },
  {
    heading: "How information is used",
    body:
      "That information is used to respond to inquiries, scope work, coordinate services, operate website lead alert notifications, support website clients, and improve the website experience.",
  },
  {
    heading: "Communications and SMS",
    body: (
      <>
        If you choose to share a phone number and consent to messaging through the{" "}
        <Link href="/sms-consent">SMS consent page</Link>, you may receive
        transactional SMS communication about new website leads, inquiries, form
        submissions, site setup, or related support. Message frequency depends on the
        website activity or service being delivered.
      </>
    ),
  },
  {
    heading: "SMS consent and mobile information",
    body:
      "Mobile opt-in data, SMS consent records, and phone numbers collected for messaging are not shared, sold, rented, or disclosed to third parties or affiliates for their marketing or promotional purposes. This includes text messaging originator opt-in data and consent.",
  },
  {
    heading: "Opt-out",
    body:
      "You can opt out of SMS at any time by replying STOP to a message or by emailing support directly. Marketing messages will not continue after an opt-out request is received.",
  },
  {
    heading: "Contact",
    body:
      "For privacy-related questions or requests, email support@phinehasadams.com. This policy applies to interactions with phinehasadams.com and related inquiry workflows.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="DOC / LEGAL-01"
      title="PRIVACY PROTOCOL"
      intro="Minimal collection. Clear use. No theater."
      sections={sections}
      contactEmail="support@phinehasadams.com"
    />
  );
}
