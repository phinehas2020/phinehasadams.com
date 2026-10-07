import type { Metadata } from "next";
import { siteSocialImage } from "@/lib/site-metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Contact from "../components/Contact";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Phinehas Adams — the person building it",
  description: "My background, the tools I work with, and how I approach websites, AI, and business automation.",
  alternates: { canonical: "/about" },
  openGraph: {
    images: [siteSocialImage],
    title: "About Phinehas Adams — the person building it",
    description: "My background, the tools I work with, and how I approach websites, AI, and business automation.",
    url: "https://phinehasadams.com/about",
  },
};

const capabilities = [
  { title: "Websites & stores", tools: ["Shopify buildout and customization", "Custom website design and development", "Brand and design direction"] },
  { title: "Business systems", tools: ["Python automations and API integrations", "Odoo inventory and manufacturing", "AI tools and workflow building"] },
  { title: "Infrastructure", tools: ["Nginx, Vercel, and server configuration", "Ubiquiti and Tailscale networks", "Connecting services and managing access"] },
  { title: "Other work", tools: ["Photography and video production", "Packaging and label production", "CNC and 3D-printing workflows", "Google and Meta ads"] },
];

const photos = [
  { src: "/images/MAT_3006.jpg", caption: "Hard light, chore coat", alt: "Black-and-white portrait of a man in a felt hat and chore coat, half in shadow" },
  { src: "/images/PM_A2974.jpg", caption: "The lamb", alt: "A boy in a flat cap carrying a lamb" },
  { src: "/images/PM_A5246-Enhanced-NR.jpg", caption: "Chin on the rail", alt: "Black-and-white portrait of a boy resting his chin on his hand over a railing" },
  { src: "/images/PM_A2253.jpg", caption: "The Land camera", alt: "A girl in a gingham dress and sun hat holding a vintage instant camera" },
  { src: "/images/MATL9815.jpg", caption: "Half-light", alt: "Close black-and-white portrait of a boy, half his face in shadow" },
  { src: "/images/PM_A0843.jpg", caption: "You, there", alt: "A woman in a cap pointing toward the camera" },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.cover}>
        <div className={styles.coverInner}>
          <p className={styles.label}>About / Phinehas Adams</p>
          <h1>I like building<br />things that work.</h1>
          <p className={styles.lead}>Websites. Tools. Physical systems. The useful part is figuring out how they fit together.</p>
        </div>
      </header>
      <section className={styles.section} aria-labelledby="background-title">
        <div className={styles.story}>
          <div>
            <p className={styles.label}>Where I started</p>
            <h2 id="background-title">I learned to build<br />before I learned to code.</h2>
          </div>
          <div className={styles.prose}>
            <p>Fences, engines, irrigation, livestock. A homestead is full of systems, and I grew up learning how to keep them working.</p>
            <p>That interest carried over to software. A website, an inventory system, and a small automation each have a job to do. I want to understand that job before deciding what to build.</p>
            <p>AI is a big part of what interests me now: reading a messy request, finding the important details, helping someone prepare a reply. The useful question is what happens next, and whether the person using it can trust the result.</p>
          </div>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="capabilities-title">
        <div className={styles.sectionHead}>
          <div><p className={styles.label}>What I work with</p><h2 id="capabilities-title">Across the whole build.</h2></div>
          <p>The website is often connected to other work. These are the tools and disciplines I bring to that connection. We choose what your project needs.</p>
        </div>
        <div className={styles.capabilities}>
          {capabilities.map(({ title, tools }) => (
            <div key={title} className={styles.capability}>
              <h3>{title}</h3>
              <ul>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className={styles.serviceLinks}>
          <Link href="/websites">Website work <ArrowRightIcon size={24} weight="light" aria-hidden="true" /></Link>
          <Link href="/automation">Automation work <ArrowRightIcon size={24} weight="light" aria-hidden="true" /></Link>
        </div>
      </section>
      <section className={styles.approach} aria-labelledby="approach-title">
        <div className={styles.approachInner}>
          <div><p className={styles.label}>Working with me</p><h2 id="approach-title">Show me the<br />actual problem.</h2></div>
          <div className={styles.prose}>
            <p>A screen that frustrates customers. A spreadsheet someone updates every morning. An email that takes twenty minutes to answer.</p>
            <p>We can work from that. I’ll ask what it needs to do, what already exists, and what could go wrong. Then we can agree on a build you can try and review.</p>
            <p>You’re talking to the person doing the work. That includes the details: editing your site, keeping access to your accounts, and knowing how to use what gets built.</p>
          </div>
        </div>
      </section>
      <section id="photography" className={styles.section} aria-labelledby="photography-title">
        <div className={styles.sectionHead}>
          <div><p className={styles.label}>Outside the software</p><h2 id="photography-title">A few photographs.</h2></div>
          <p>Photography is another part of my work. Light, people, and the small details you only notice when you slow down.</p>
        </div>
        <div className={styles.gallery}>
          {photos.map((photo, i) => (
            <figure key={photo.src}>
              <div className={styles.photoFrame}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 30vw" className={styles.photo} />
              </div>
              <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Contact />
    </main>
  );
}
