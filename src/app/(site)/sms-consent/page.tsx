import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SMS Consent | Phinehas Adams",
  description:
    "Optional SMS consent form and disclosures for project-related text messages from Phinehas Adams.",
};

export default function SmsConsentPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="sms-consent-title">
        <p className={styles.eyebrow}>SMS / CONSENT-01</p>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <h1 id="sms-consent-title" className={styles.title}>
              SMS PROJECT UPDATES
            </h1>
            <p className={styles.intro}>
              Use this page to request optional one-to-one text updates from Phinehas
              Adams about a project inquiry, estimate, schedule, active job, or support
              follow-up.
            </p>
          </div>

          <aside className={styles.identity} aria-label="Program details">
            <p className={styles.identityLabel}>Program name</p>
            <p className={styles.identityValue}>Phinehas Adams project updates</p>
            <p className={styles.identityLabel}>Support</p>
            <a className={styles.identityLink} href="mailto:support@phinehasadams.com">
              support@phinehasadams.com
            </a>
            <p className={styles.identityFine}>
              Messaging is optional. You can use the site, email, and project services
              without agreeing to SMS.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.contentGrid}>
        <form
          className={styles.form}
          action="mailto:support@phinehasadams.com"
          method="post"
          encType="text/plain"
        >
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input className={styles.input} id="name" name="name" type="text" />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input className={styles.input} id="email" name="email" type="email" />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="phone">
              Mobile phone number
            </label>
            <input className={styles.input} id="phone" name="phone" type="tel" />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="project">
              Project or job details
            </label>
            <textarea className={styles.textarea} id="project" name="project" rows={5} />
          </div>

          <label className={styles.checkboxRow} htmlFor="sms-consent">
            <input
              id="sms-consent"
              name="sms_consent"
              type="checkbox"
              value="I agree to receive optional SMS project updates from Phinehas Adams."
            />
            <span>
              I agree to receive optional SMS messages from Phinehas Adams about my
              inquiry, estimate, schedule, active job, or project follow-up. Message
              frequency varies. Message and data rates may apply. Reply HELP for help
              and STOP to opt out.
            </span>
          </label>

          <p className={styles.disclosure}>
            The SMS checkbox is unchecked by default and is not required. Submitting
            this form without checking the SMS box means email or another non-SMS route
            will be used instead.
          </p>

          <button className={styles.submit} type="submit">
            Send request
          </button>
        </form>

        <div className={styles.details}>
          <section className={styles.detailSection}>
            <h2>What texts are for</h2>
            <p>
              Messages are limited to one-to-one project communication: inquiry
              responses, estimate follow-up, scheduling, job updates, and support
              replies. This program is not used for bulk marketing or third-party lead
              generation.
            </p>
          </section>

          <section className={styles.detailSection}>
            <h2>How consent works</h2>
            <p>
              SMS consent is collected only when you provide a mobile number and check
              the optional SMS consent box. Consent is not bundled with the privacy
              policy, terms, a purchase, or a required agreement.
            </p>
          </section>

          <section className={styles.detailSection}>
            <h2>Opt out and help</h2>
            <p>
              Reply <strong>STOP</strong> to opt out. Reply <strong>HELP</strong> for
              help, or email support@phinehasadams.com. Message frequency varies by
              project and standard carrier message/data rates may apply.
            </p>
          </section>

          <section className={styles.detailSection}>
            <h2>Policies</h2>
            <p>
              Review the{" "}
              <Link href="/privacy-policy">privacy policy</Link> and{" "}
              <Link href="/terms-and-conditions">terms and conditions</Link> for data
              use, SMS program terms, and no-sharing language for mobile opt-in data.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
