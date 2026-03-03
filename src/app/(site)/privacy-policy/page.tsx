import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Phinehas Adams",
  description:
    "Privacy policy for messages and lead capture workflows for phinehasadams.com.",
};

const details = {
  email: "support@phinehasadams.com",
  company: "Phinehas Adams",
  address: "United States",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ padding: "4rem 1.5rem", maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Privacy Policy</h1>
      <p style={{ marginBottom: "1rem", color: "var(--fg-secondary)" }}>
        This Privacy Policy explains how <strong>{details.company}</strong> collects, uses, and protects personal information
        when visitors interact with our website at {" "}
        <a href="https://phinehasadams.com" style={{ color: "var(--nasa-blue)" }}>
          phinehasadams.com
        </a>
        .
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Information We Collect</h2>
        <p>
          We collect information you submit directly through forms and lead-capture tools, including your name,
          phone number, email address, and message details.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>How We Use Information</h2>
        <p>
          We use collected information to respond to inquiries, deliver requested services, operate message
          notifications, and improve site functionality.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Communications</h2>
        <p>
          By sharing your phone number and consenting, you agree we may send you transactional and campaign-related
          SMS messages, including updates and lead notifications.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>SMS Consent and Opt-Out</h2>
        <p>
          You can opt out of SMS messages at any time by replying <strong>STOP</strong> to any message. We respect your
          preference and will not continue marketing messages after opt-out.
        </p>
      </section>

      <section>
        <h2 style={{ marginBottom: "0.5rem" }}>Contact</h2>
        <p>
          For privacy requests, contact us at <a href={`mailto:${details.email}`} style={{ color: "var(--nasa-blue)" }}>{details.email}</a>.
        </p>
        <p style={{ marginTop: "0.5rem", color: "var(--fg-secondary)" }}>
          Mailing address: {details.address}
        </p>
      </section>
    </main>
  );
}
