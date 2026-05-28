import styles from "./Capabilities.module.css";

const capabilities = [
  "Shopify Buildout & Customization",
  "Odoo Inventory & Manufacturing",
  "Python Automations & API Integrations",
  "Nginx, Vercel, Server Config",
  "Packaging & Label Production",
  "CNC & 3D-Printing Workflow",
  "Photography & Video Production",
  "Brand & Design Direction",
  "Google & Meta Ads",
  "Network Setup (Ubiquiti, Tailscale)",
  "AI Tools & System-Building",
];

export default function Capabilities() {
  return (
    <section className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>06</span>
        Capabilities
      </span>

      <ul className={styles.list}>
        {capabilities.map((c, i) => (
          <li
            key={c}
            className={styles.item}
            data-reveal
            style={{ "--reveal-delay": `${i * 0.04}s` } as React.CSSProperties}
          >
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.label}>{c}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
