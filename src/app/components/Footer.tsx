import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span>PHINEHAS ADAMS © {new Date().getFullYear()}</span>
            <a href="/websites-for-sale" style={{ textDecoration: 'none', color: 'inherit' }}>[ WEBSITES ]</a>
            <span>[ SYSTEM STATUS: NORMAL ]</span>
        </footer>
    );
}
