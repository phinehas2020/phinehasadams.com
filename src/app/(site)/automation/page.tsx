import type { Metadata } from "next";
import { siteSocialImage } from "@/lib/site-metadata";
import Link from "next/link";
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import AutomationExample from "../components/AutomationExample";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Automation & AI Tools | Phinehas Adams",
  description: "Practical business automations and AI tools, built personally by Phinehas Adams. Connect requests, records, and existing tools with clear checks and human review.",
  alternates: { canonical: "/automation" },
  openGraph: {
    images: [siteSocialImage],
    url: "https://phinehasadams.com/automation",
    title: "Automation & AI Tools | Phinehas Adams",
    description: "Practical business automations and AI tools, built personally by Phinehas Adams. Connect requests, records, and existing tools with clear checks and human review.",
  },
};

const workflows = [
  { title: "Requests into something you can review.", input: "An email or form comes in", output: "A prepared draft, with gaps marked", text: "Read a customer request, pull out the useful details, check them against an available source, and prepare a reply or record for someone to approve." },
  { title: "Forms into tidy records.", input: "Someone submits information", output: "A consistent entry in the right place", text: "Validate required fields, format the values, and place them in a spreadsheet or business tool. Agree how repeats and incomplete submissions should be handled." },
  { title: "Tools that share the right information.", input: "A product or record changes", output: "An agreed update in a connected tool", text: "Connect a shop, inventory system, or other tool where its interfaces allow it. Define which system owns each field, how updates are matched, and what happens when values disagree." },
];

const setupDetails = [
  { title: "Where the information comes from", text: "We identify the form, inbox, file, or tool that starts the task, then use sample records to define the fields and the source of truth. Missing information gets a visible path back to a person." },
  { title: "What needs approval", text: "We agree which actions can run from fixed rules and which need a review step. Replies, proposed changes, and anything with a meaningful consequence can be held for approval before it leaves the workflow." },
  { title: "What happens when it cannot finish", text: "An unavailable tool, an incomplete record, or a conflicting value needs a defined response. We agree how to flag the item, where the error is recorded, and who picks it up. Duplicate handling and retries are part of that design." },
  { title: "What access it needs", text: "I check the connections your tools support and the permissions the task requires. Credentials belong in the agreed secure setup; we decide account ownership and who can maintain or disable the connection." },
];

const buildSteps = [
  { title: "Show me one task.", text: "Walk me through what you do now, including the awkward exceptions. A few example requests or records help us see what is consistent and what needs a decision." },
  { title: "Draw the boundaries.", text: "I define the input, the actions, the checks, and the review point with you. We agree the tools involved, access, scope, cost, and timing before implementation." },
  { title: "Build and test the full path.", text: "I build the workflow and check it with representative examples, including missing details, duplicates, and failed connections. You review the outputs and how the exceptions are handled." },
  { title: "Run it with a clear handover.", text: "We agree how it is switched on, monitored, paused, and maintained. I explain the setup and its limits, and hand over the relevant access and instructions." },
];

const questions = [
  { question: "Does every automation need AI?", answer: "No. Moving values between tools, checking required fields, and applying a fixed calculation usually belong to ordinary code or rules. AI is useful when a task involves interpreting varied text or preparing a draft, and its output still needs appropriate checks." },
  { question: "Can you use the tools I already have?", answer: "That is the starting point. I check the tools and the connections they support, such as an API or a structured import/export. Some actions may need extra permissions or a different approach. We confirm that before including them in the build." },
  { question: "Will it send messages or change records by itself?", answer: "Only where that action is part of the agreed workflow. We define what can run automatically and what should wait for a person. A prepared reply can stay as a draft, and a proposed update can wait for review rather than being applied immediately." },
  { question: "What do you need from me to get started?", answer: "One repeated task, the tools involved, and a few examples of the information moving through it. You can describe it in plain language. Use anonymised or made-up examples for an initial conversation; we agree the access needed for the actual build later." },
  { question: "What happens if the workflow needs changing later?", answer: "The handover covers how it works, the tools it depends on, and what can be changed safely. We discuss who will maintain it and whether you need further support. Changes to a connected tool or to the task itself may need the workflow to be updated and checked again." },
];

export default function AutomationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Automation &amp; AI tools</p>
          <div className={styles.heroGrid}>
            <h1>Less copying.<br />Fewer loose ends.</h1>
            <div className={styles.heroCopy}>
              <p>I build tools for the information you keep moving by hand: requests, records, orders, and the follow-up around them.</p>
              <p className={styles.heroDetail}>We start with one task, work out what should happen, and keep a person involved where judgment matters.</p>
              <Link href="/contact?type=automation" className={styles.primaryLink}>Talk about a task <ArrowRightIcon size={25} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="automation-workflows">
        <p className={styles.sectionLabel}>Useful places to start</p>
        <div className={styles.sectionHeading}><h2 id="automation-workflows">Follow the information.</h2><p>Here are three examples of work we can automate. We start with the task you repeat and the tools you already use.</p></div>
        <ol className={styles.workflows}>
          {workflows.map((item, index) => (
            <li key={item.title}>
              <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              <div className={styles.workflowCopy}><h3>{item.title}</h3><p>{item.text}</p></div>
              <div className={styles.inputOutput}><p>{item.input}</p><ArrowRightIcon size={27} aria-hidden="true" /><p>{item.output}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.rulesSection} aria-labelledby="automation-judgment">
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Choose the right tool for the step</p>
          <h2 id="automation-judgment">Rules where they fit.<br />AI where it helps.</h2>
          <div className={styles.rulesGrid}>
            <div><h3>Fixed instructions</h3><p>Use ordinary code for things with a defined answer.</p><ul><li>Check that required fields are present.</li><li>Copy agreed values between records.</li><li>Apply a known calculation or formatting rule.</li><li>Match an update to the correct existing item.</li></ul></div>
            <div><h3>Reading and drafting</h3><p>Use AI where the input is varied language, with checks around the result.</p><ul><li>Suggest fields from a written request.</li><li>Sort or summarise incoming messages.</li><li>Prepare a reply using the available facts.</li><li>Flag unclear details for a person to check.</li></ul></div>
          </div>
          <p className={styles.reviewNote}>The review point is part of the build. Missing prices, conflicting details, and important decisions need a defined check before the next action.</p>
        </div>
      </section>

      <div className={styles.demo}>
        <AutomationExample />
        <p className={styles.demoNote}>This walkthrough runs in your browser with fixed example rules. It shows the reasoning and review step; it is not connected to an inbox, shop, or AI service.</p>
      </div>

      <section className={styles.setupSection} aria-labelledby="automation-details">
        <div className={styles.section}>
          <div className={styles.sectionHeading}><div><p className={styles.sectionLabel}>The practical details</p><h2 id="automation-details">Know what happens<br />at every step.</h2></div><p>We work through the ordinary task and the awkward cases: a missing detail, a duplicate request, or a tool that is unavailable.</p></div>
          <dl className={styles.setupDetails}>
            {setupDetails.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="automation-process">
        <div className={styles.processGrid}>
          <div className={styles.processHeading}><p className={styles.sectionLabel}>How we work</p><h2 id="automation-process">One task.<br />A working path.</h2><p>I build the workflow myself. You bring the real process and check that the result is useful.</p><Link href="/websites" className={styles.textLink}>Need a website too? <ArrowRightIcon size={23} aria-hidden="true" /></Link></div>
          <ol className={styles.steps}>{buildSteps.map((item, index) => <li key={item.title}><span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="automation-questions">
        <div className={styles.section}><div className={styles.faqGrid}><div><p className={styles.sectionLabel}>Before we start</p><h2 id="automation-questions">A few useful<br />answers.</h2></div><div className={styles.questions}>{questions.map((item) => <details key={item.question}><summary>{item.question}<PlusIcon size={23} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></div>
      </section>

      <section className={styles.contact} aria-labelledby="automation-contact">
        <div><h2 id="automation-contact">What do you keep<br />doing by hand?</h2><p>Tell me the task, the tools you use, and where it gets stuck. Plain language is fine.</p></div>
        <Link href="/contact?type=automation" className={styles.primaryLink}>Talk about a task <ArrowRightIcon size={26} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
