import type { Metadata } from "next";
import { siteSocialImage } from "@/lib/site-metadata";
import ProjectBrief, { type ProjectType } from "./ProjectBrief";
import styles from "./page.module.css";

const description =
  "Tell Phinehas Adams about a website or a task you want to automate. Prepare a project brief and review it in your own email app.";

export const metadata: Metadata = {
  title: "Talk about a project | Phinehas Adams",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    images: [siteSocialImage],
    title: "Talk about a project | Phinehas Adams",
    description,
    url: "/contact",
  },
};

type ContactPageProps = {
  searchParams: Promise<{ type?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { type } = await searchParams;
  const initialType: ProjectType | undefined =
    type === "website" || type === "automation" || type === "both" ? type : undefined;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Contact</p>
          <div className={styles.heroGrid}>
            <h1 className={styles.title}>
              Tell me what
              <br />{" "}
              needs building.
            </h1>
            <div className={styles.heroCopy}>
              <p>
                I&rsquo;m Phinehas. I build websites and tools that help people
                get useful work done.
              </p>
              <p>
                Tell me what your site needs to do, or which task you keep doing
                by hand. You don&rsquo;t need every detail figured out to start.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.briefSection} aria-labelledby="project-brief-title">
        <div className={styles.briefGrid}>
          <aside className={styles.guidance} aria-labelledby="start-with-work-title">
            <p className={styles.sectionLabel}>The starting point</p>
            <h2 id="start-with-work-title" className={styles.guidanceTitle}>
              Start with
              <br />{" "}
              the work.
            </h2>
            <p>
              For a website, tell me who it&rsquo;s for and what they need to do.
              For automation, describe the steps you repeat and the tools you use.
            </p>
            <ul className={styles.promptList}>
              <li>What happens today?</li>
              <li>What would you like to happen instead?</li>
              <li>What needs to connect or stay in place?</li>
            </ul>
            <div className={styles.directContact}>
              <h3>Prefer to write your own email?</h3>
              <a href="mailto:contact@phinehasadams.com">
                contact@phinehasadams.com
              </a>
              <p>The same address works for questions, too.</p>
            </div>
          </aside>

          <div className={styles.briefColumn}>
            <h2 id="project-brief-title" className={styles.briefTitle}>
              A short project brief.
            </h2>
            <p className={styles.briefIntro}>
              Fill this in to prepare an email draft. Then open your email app,
              review it, and send it to me there.
            </p>
            <ProjectBrief key={initialType ?? "unspecified"} initialType={initialType} />
          </div>
        </div>
      </section>
    </main>
  );
}
