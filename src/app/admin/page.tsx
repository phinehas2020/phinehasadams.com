import { cookies } from 'next/headers';
import { getWebsites } from '@/lib/websites';
import styles from './admin.module.css';
import { LoginForm, AddWebsiteForm, DeleteButton, ToggleSoldButton } from './client-forms';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('admin_session')?.value === 'true';

    if (!isAuthenticated) {
        return (
            <main className={styles.container}>
                <h1 className={styles.title}>Admin Access</h1>
                <LoginForm />
            </main>
        );
    }

    const websites = await getWebsites();

    return (
        <main className={styles.container}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className={styles.title}>Dashboard</h1>
                {!process.env.ADMIN_PASSWORD && (
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(255, 189, 46, 0.2)', color: '#ffbd2e', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #ffbd2e' }}>
                        Warning: Using default password. Set ADMIN_PASSWORD env var.
                    </div>
                )}
            </header>

            <AddWebsiteForm />

            <section className={styles.addForm}>
                <h2 className={styles.sectionTitle}>Manage Listings ({websites.length})</h2>
                <div className={styles.list}>
                    {websites.map((site) => (
                        <div key={site.id} className={`${styles.listItem} ${site.sold ? styles.soldItem : ''}`}>
                            <div className={styles.itemInfo}>
                                <h3>
                                    {site.title}
                                    {site.sold && <span className={styles.soldBadge}>SOLD</span>}
                                </h3>
                                <p>{site.url}</p>
                            </div>
                            <div className={styles.itemActions}>
                                <ToggleSoldButton id={site.id} sold={site.sold} />
                                <DeleteButton id={site.id} />
                            </div>
                        </div>
                    ))}
                    {websites.length === 0 && (
                        <p style={{ color: '#888', textAlign: 'center' }}>No websites added yet.</p>
                    )}
                </div>
            </section>
        </main>
    );
}
