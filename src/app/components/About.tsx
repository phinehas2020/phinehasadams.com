import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.section}>
            <div className={styles.label}>// IDENTITY</div>
            <div className={styles.content}>
                <p>
                    I engineer systems. My work bridges the gap between <span className={styles.highlight}>automation</span>, <span className={styles.highlight}>infrastructure</span>, and <span className={styles.highlight}>design</span>.
                </p>
            </div>
        </section>
    );
}
