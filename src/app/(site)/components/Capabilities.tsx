'use client';

import styles from './Capabilities.module.css';

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
    "AI Tools & System-Building"
];

export default function Capabilities() {
    return (
        <section className={styles.section}>
            <span className={styles.label}>
                {"//"} CAPABILITIES
            </span>
            <ul className={styles.list}>
                {capabilities.map((c, i) => (
                    <li
                        key={i}
                        className={styles.item}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        {c}
                    </li>
                ))}
            </ul>
        </section>
    );
}
