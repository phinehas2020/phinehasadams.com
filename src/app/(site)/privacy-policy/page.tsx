import type { Metadata } from "next";
import { PolicyPage } from "../components/site/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Phinehas Adams",
  description:
    "Privacy policy for messages, lead capture, and website inquiries for phinehasadams.com.",
};

const sections = [
  {
    heading: "Information we collect",
    body:
      "We collect information you send directly through forms, email, or other inquiry flows, including your name, email address, phone number, and project details.",
  },
  {
    heading: "How information is used",
    body:
      "That information is used to respond to inquiries, scope work, coordinate services, operate message notifications, and improve the website experience.",
  },
  {
    heading: "Communications and SMS",
    body:
      "If you choose to share a phone number and consent to messaging, you may receive transactional or project-related SMS communication. Message frequency depends on the conversation or service being delivered.",
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
      eyebrow="Legal / Privacy"
      title="Privacy policy"
      intro="This policy explains how inquiry and communication data is handled when someone interacts with phinehasadams.com."
      sections={sections}
      contactEmail="support@phinehasadams.com"
    />
  );
}
