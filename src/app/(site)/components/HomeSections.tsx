import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { sanityFetch } from "@/sanity/lib/live";
import { WEBSITES_QUERY, type SanityWebsite } from "@/sanity/lib/queries";
import { WebsitePreview } from "../websites-for-sale/WebsitePreview";
import styles from "./HomeSections.module.css";

export function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.heading}>
        <p className={styles.label}>What I build</p>
        <h2 id="services-title">The website.<br />The work behind it.</h2>
        <p className={styles.intro}>Some businesses need a better place to send customers. Others need to stop moving the same information between five different tools. I can help with both.</p>
      </div>
      <div className={styles.services}>
        <article className={styles.service}>
          <span className={styles.number} aria-hidden="true">01</span>
          <div>
            <h3>Websites people can use.</h3>
            <p>A clear explanation of your business, your actual work, and a sensible next step. Built around what a customer needs to know before they call, book, or buy.</p>
            <ul><li>Business websites and custom designs</li><li>Shopify stores and product pages</li><li>Content, forms, and connections to your other tools</li></ul>
            <Link href="/websites" className={styles.link}>Explore website work <ArrowRightIcon size={24} weight="light" aria-hidden="true" /></Link>
          </div>
        </article>
        <article className={styles.service}>
          <span className={styles.number} aria-hidden="true">02</span>
          <div>
            <h3>Less copying. More doing.</h3>
            <p>Requests, spreadsheets, inventory, and follow-ups. I build the connections between them, using AI when a task needs help with words or messy information.</p>
            <ul><li>Forms and emails into useful records</li><li>Drafts and summaries ready for your review</li><li>Inventory and API connections</li></ul>
            <Link href="/automation" className={styles.link}>Explore automation work <ArrowRightIcon size={24} weight="light" aria-hidden="true" /></Link>
          </div>
        </article>
      </div>
    </section>
  );
}

const steps = [
  ["Understand the job.", "We look at what happens today, who uses it, and where people get stuck. An actual request or screen is more useful than a pitch deck."],
  ["Agree on the build.", "You get a clear scope: what I’m building, what it connects to, what you need to provide, and how we’ll judge whether it works."],
  ["Try it with real work.", "Review the website on your phone. Run the workflow with ordinary requests and missing details. Fix the problems before relying on it."],
  ["Know what you’re getting.", "The handover covers access, editing, running the system, and what happens when something needs attention. Ongoing support is part of the scope we discuss."],
];

export function BuildAndBuilder() {
  return (
    <>
      <section className={styles.section} aria-labelledby="process-title">
        <div className={styles.heading}>
          <p className={styles.label}>How we work</p>
          <h2 id="process-title">Start with the actual job.</h2>
          <p className={styles.intro}>A useful build starts with something specific: a customer who can’t find the right page, an order that gets typed twice, or an inbox nobody can keep up with.</p>
        </div>
        <ol className={styles.steps}>
          {steps.map(([title, description], i) => (
            <li key={title}>
              <span className={styles.stepNumber} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3><p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section id="photography" className={styles.builder} aria-labelledby="builder-title">
        <div className={styles.builderInner}>
          <div><p className={styles.label}>The person doing the work</p><h2 id="builder-title">You work<br />with me.</h2></div>
          <div className={styles.builderCopy}>
            <p>I’m Phinehas. I’m interested in building things that work together: the site out front, the systems behind it, and the details that usually fall between them.</p>
            <p>My work spans websites, Python automations, API integrations, inventory, and infrastructure. I like AI most when it helps someone finish an actual task.</p>
            <Link href="/about" className={styles.link}>More about me and my work <ArrowRightIcon size={24} weight="light" aria-hidden="true" /></Link>
            <Link href="/about#photography" className={styles.photoLink}>See my photographs <ArrowRightIcon size={22} weight="light" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function WebsiteCatalog() {
  const { data } = await sanityFetch<SanityWebsite[]>({ query: WEBSITES_QUERY });
  const sites = (data ?? []).filter((site) => !site.sold).slice(0, 2);
  return (
    <section id="work" className={styles.catalog} aria-labelledby="catalog-title">
      <div className={styles.catalogHead}>
        <div><p className={styles.label}>Website catalog</p><h2 id="catalog-title">A different starting point.</h2></div>
        <p>Alongside custom builds, I keep a catalog of website starting points. They can be rebuilt with your content, photos, and branding.</p>
      </div>
      {sites.length > 0 ? (
        <div className={styles.catalogGrid}>
          {sites.map((site) => (
            <article key={site._id} className={styles.catalogItem}>
              <div className={styles.preview}><WebsitePreview url={site.url} title={site.title} /></div>
              <h3>{site.title}</h3>
              {site.description && <p>{site.description}</p>}
              <a href={site.url} className={styles.link} target="_blank" rel="noopener noreferrer">Open live preview <ArrowRightIcon size={22} weight="light" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </article>
          ))}
        </div>
      ) : <p className={styles.catalogNote}>There are no starting points listed right now. You can still talk to me about a custom build.</p>}
      <Link href="/websites-for-sale" className={styles.link}>Visit the website catalog <ArrowRightIcon size={24} weight="light" aria-hidden="true" /></Link>
    </section>
  );
}
