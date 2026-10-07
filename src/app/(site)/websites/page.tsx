import type { Metadata } from "next";
import { siteSocialImage } from "@/lib/site-metadata";
import Link from "next/link";
import { ArrowRightIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Websites & Shops | Phinehas Adams",
  description: "Custom websites and online shops, designed and built personally by Phinehas Adams. Clear content, useful enquiries, and a practical handover.",
  alternates: { canonical: "/websites" },
  openGraph: {
    images: [siteSocialImage],
    url: "https://phinehasadams.com/websites",
    title: "Websites & Shops | Phinehas Adams",
    description: "Custom websites and online shops, designed and built personally by Phinehas Adams. Clear content, useful enquiries, and a practical handover.",
  },
};

const deliverables = [
  { title: "A clear structure", text: "The right pages, a sensible order, and content that tells people what you do. We work out what needs writing, what you can supply, and what needs simplifying." },
  { title: "Design that works on a phone", text: "Layouts, navigation, and controls built for the screens your visitors use. I check the actual pages and key actions on both mobile and desktop." },
  { title: "The useful connections", text: "An enquiry form, booking link, shop, or connection to another tool when the project needs it. We agree where information goes and how each connection is checked." },
  { title: "A way to keep it current", text: "Editable content where you need it, with an agreed editing setup. The handover covers the site, account access, everyday changes, and any ongoing services it relies on." },
];

const buildSteps = [
  { title: "Work out what the site needs to do.", text: "You show me the business, your existing site if you have one, and the action you want visitors to take. I put the pages, content, features, and responsibilities into a scope we can both understand." },
  { title: "Put the structure and design in front of you.", text: "I turn that scope into a page structure and visual direction. You can review how your offer reads and where the important actions sit before the full site is built." },
  { title: "Build it and try the actual journeys.", text: "I build the agreed pages and connections. We check things such as sending an enquiry or moving through a shop, alongside navigation, mobile layouts, and the content itself." },
  { title: "Get it live and hand it over.", text: "We check the domain and hosting setup, complete the launch checks, and go through how the site is managed. Any maintenance or further work is discussed as part of the scope." },
];

const questions = [
  { question: "Can you work on a site I already have?", answer: "Yes. Start by showing me the site and what is getting in the way. I can look at whether a targeted change, a redesign, or a fresh build is the sensible approach. Access and the existing platform affect what is possible." },
  { question: "Do I need all the copy and photos ready?", answer: "You do not need a finished content pack to start a conversation. Bring what you have. We identify what can be reused, what needs writing or editing, and whether photography or other assets are needed, then include those responsibilities in the scope." },
  { question: "Will I be able to update it myself?", answer: "If you need to change products, services, articles, or other content, we choose an editing setup for those changes. That might be a shop platform or a content management system. I include the editing and handover requirements in the agreed build." },
  { question: "Can the website connect to my other tools?", answer: "Often, yes. A form might create a useful record or pass an enquiry to your existing process. I check the tools, available connections, and access first. A connection is included only once we have agreed what it does and how it will be tested." },
  { question: "What will it cost, and how long will it take?", answer: "That depends on the pages, content, features, and connections involved. Send me the starting point and what the site needs to do. I work out the scope with you and agree the cost, timing, and responsibilities before the build begins." },
];

export default function WebsitesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Websites &amp; shops</p>
          <div className={styles.heroGrid}>
            <h1>A website built<br />around your work.</h1>
            <div className={styles.heroCopy}>
              <p>I design and build websites that explain your business and give people a clear next step.</p>
              <p className={styles.heroDetail}>You work directly with me, from the first page structure to the finished build.</p>
              <Link href="/contact?type=website" className={styles.primaryLink}>Talk about a website <ArrowRightIcon size={25} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="website-purpose">
        <p className={styles.sectionLabel}>Start with the action</p>
        <div className={styles.introGrid}>
          <h2 id="website-purpose">What should a visitor<br />be able to do?</h2>
          <p className={styles.lead}>A site has to make sense before someone gets in touch or buys. I start with what your customers need to know, then build the path to the action that matters.</p>
        </div>
        <div className={styles.actionRows}>
          <div><h3>Understand.</h3><p>Find the right service, see what is included, and know whether your business can help.</p></div>
          <div><h3>Get in touch.</h3><p>Send a useful enquiry, request a quote, or reach the right booking process.</p></div>
          <div><h3>Buy.</h3><p>For a shop, find a product, understand the options, and move through checkout.</p></div>
        </div>
      </section>

      <section className={styles.scopeSection} aria-labelledby="website-scope">
        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.sectionLabel}>The build</p><h2 id="website-scope">The parts that<br />make it useful.</h2></div>
            <p>These are the things we work through when defining your site. The exact pages, features, and content are agreed before I build.</p>
          </div>
          <ol className={styles.deliverables}>
            {deliverables.map((item, index) => (
              <li key={item.title}><span className={styles.number} aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="website-types">
        <p className={styles.sectionLabel}>Two common starting points</p>
        <h2 id="website-types">A business site.<br />An online shop.</h2>
        <div className={styles.typesGrid}>
          <div><h3>A place to explain your business.</h3><p>For a service business, the job is usually to explain the offer and make an enquiry easy. That can mean service pages, useful answers, examples of your work, and a contact path that collects the right details.</p><p className={styles.smallNote}>The content and next step stay visible. The design gives them room.</p></div>
          <div><h3>A place to sell what you make or stock.</h3><p>For a shop, we work through product information, options, navigation, and the buying process. I can build and customise Shopify shops; the setup depends on your products and how you handle orders.</p><p className={styles.smallNote}>Product setup, payments, delivery rules, and any inventory connection are scoped individually.</p></div>
        </div>
        <Link href="/automation" className={styles.textLink}>Need the information to keep moving after the enquiry? <ArrowRightIcon size={24} aria-hidden="true" /></Link>
      </section>

      <section className={styles.processSection} aria-labelledby="website-process">
        <div className={styles.section}>
          <div className={styles.processHeading}><p className={styles.sectionLabel}>How we work</p><h2 id="website-process">You work with me.</h2><p>I design and build the site myself. You bring the business knowledge; I turn it into pages and working tools.</p></div>
          <ol className={styles.steps}>
            {buildSteps.map((step, index) => (
              <li key={step.title}><span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <aside className={styles.catalog} aria-labelledby="website-catalog">
        <div><p className={styles.sectionLabel}>Another starting point</p><h2 id="website-catalog">Start from a layout<br />you can already see.</h2><p>A custom build starts around your requirements. The website catalog is another option: existing layouts I can rebuild with your copy, photos, and branding. Availability is shown in the catalog.</p></div>
        <Link href="/websites-for-sale" className={styles.catalogLink}>Browse website starting points <ArrowRightIcon size={28} aria-hidden="true" /></Link>
      </aside>

      <section className={styles.section} aria-labelledby="website-questions">
        <div className={styles.faqGrid}><div><p className={styles.sectionLabel}>Before we start</p><h2 id="website-questions">A few useful<br />answers.</h2></div><div className={styles.questions}>
          {questions.map((item) => <details key={item.question}><summary>{item.question}<PlusIcon size={23} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}
        </div></div>
      </section>

      <section className={styles.contact} aria-labelledby="website-contact">
        <div><h2 id="website-contact">What does your<br />site need to do?</h2><p>Send me the business, the starting point, and the next step you want visitors to take.</p></div>
        <Link href="/contact?type=website" className={styles.primaryLink}>Talk about a website <ArrowRightIcon size={26} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
