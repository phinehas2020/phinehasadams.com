import styles from './Projects.module.css';
import cardStyles from './ProjectCard.module.css';
import pool from '@/lib/db';

interface Project {
    id: number;
    title: string;
    status: string;
    description: string;
    technologies: string[];
}

async function getProjects() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM projects ORDER BY id ASC');
        return res.rows;
    } finally {
        client.release();
    }
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <section className={styles.section}>
            <span className={styles.label}>
                {"//"} OPERATIONS
            </span>
            <div className={styles.grid}>
                {projects.map((p: Project) => (
                    <div key={p.id} className={cardStyles.card}>
                        <div className={cardStyles.header}>
                            <h3 className={cardStyles.title}>{p.title}</h3>
                            <span className={cardStyles.status}>{p.status}</span>
                        </div>
                        <p className={cardStyles.description}>{p.description}</p>
                        <div className={cardStyles.meta}>
                            {p.technologies.map(t => <span key={t}>[{t}]</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
