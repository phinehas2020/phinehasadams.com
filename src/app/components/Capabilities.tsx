'use client';

import { motion } from 'framer-motion';
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
            <span className={styles.label}>// CAPABILITIES</span>
            <ul className={styles.list}>
                {capabilities.map((c, i) => (
                    <motion.li
                        key={i}
                        className={styles.item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                    >
                        {c}
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
