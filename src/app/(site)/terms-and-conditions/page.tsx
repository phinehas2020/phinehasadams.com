import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "../components/site/PolicyPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Phinehas Adams",
  description:
    "Terms governing site use, website lead alerts, inquiries, and SMS communications for phinehasadams.com.",
};

const sections = [
  {
    heading: "Use of the site",
    body:
      "By using this website, you agree to use it lawfully and to provide accurate information when reaching out about services, pricing, or availability.",
  },
  {
    heading: "Project and communication terms",
    body:
      "Inquiry responses, website setup, lead alert delivery, project timelines, and availability depend on scope and current workload. Information on the site is provided to help visitors understand the offer and start a conversation.",
  },
  {
    heading: "SMS program terms",
    body: (
      <>
        The Phinehas Adams website lead alerts SMS program sends transactional messages
        to opted-in website clients about new website leads, inquiries, form
        submissions, site setup, and related support follow-up. Message frequency
        varies based on website activity and support needs. Consent is collected through
        the optional{" "}
        <Link href="/sms-consent">SMS consent page</Link>. Standard carrier message and
        data rates may apply. Reply <strong>HELP</strong> for help or contact
        support@phinehasadams.com. Reply <strong>STOP</strong> to opt out.
      </>
    ),
  },
  {
    heading: "Opt-out rights",
    body: (
      <>
        You can stop SMS communication at any time by replying <strong>STOP</strong>{" "}
        or by contacting support directly. That request will be respected going
        forward.
      </>
    ),
  },
  {
    heading: "Contact",
    body:
      "For questions about these terms, reach out at support@phinehasadams.com. If you are discussing a website project or ready-made site, use the contact routes on the main site for the fastest response.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      eyebrow="DOC / LEGAL-02"
      title="TERMS OF ENGAGEMENT"
      intro="Operating rules for custom and ready-made work."
      sections={sections}
      contactEmail="support@phinehasadams.com"
    />
  );
}
