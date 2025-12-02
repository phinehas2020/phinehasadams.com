import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span>PHINEHAS ADAMS © {new Date().getFullYear()}</span>
            <span>[ SYSTEM STATUS: NORMAL ]</span>
        </footer>
    );
}
