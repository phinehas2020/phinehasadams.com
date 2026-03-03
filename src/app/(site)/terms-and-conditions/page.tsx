import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Phinehas Adams",
  description:
    "Terms and conditions governing SMS communications and site use for phinehasadams.com.",
};

export default function TermsAndConditionsPage() {
  return (
    <main style={{ padding: "4rem 1.5rem", maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>
        Terms and Conditions
      </h1>
      <p style={{ marginBottom: "1rem", color: "var(--fg-secondary)" }}>
        By using this website or opting into SMS communications, you agree to these terms.
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Use of Services</h2>
        <p>
          You agree to use our website and services only for lawful purposes. You are responsible for ensuring any
          information you submit is accurate.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>SMS Program Terms</h2>
        <p>
          Message frequency varies based on lead activity. Standard message and data rates may apply.
          We do not guarantee a specific response window for all messages.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Opt-Out Rights</h2>
        <p>
          You can reply <strong>STOP</strong> to any SMS to unsubscribe from future messages. You can also contact
          support for assistance at any time.
        </p>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Disclaimer</h2>
        <p>
          Content is provided for information and service coordination only. We are not liable for delays caused by
          third-party carriers or networks.
        </p>
      </section>

      <section>
        <h2 style={{ marginBottom: "0.5rem" }}>Contact</h2>
        <p>
          For policy questions, email <a href="mailto:support@phinehasadams.com" style={{ color: "var(--nasa-blue)" }}>
            support@phinehasadams.com
          </a>.
        </p>
      </section>
    </main>
  );
}
