import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section className={styles.section}>
            <span className={styles.label}>
                {"//"} COMMS
            </span>
            <a href="mailto:contact@phinehasadams.com" className={styles.link}>
                contact@phinehasadams.com
            </a>
        </section>
    );
}
