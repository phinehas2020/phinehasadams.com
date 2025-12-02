import styles from './Projects.module.css';
import cardStyles from './ProjectCard.module.css';

const projects = [
    {
        title: "Homestead Gristmill",
        status: "Active",
        desc: "Automated inventory and processing systems for high-volume grain production.",
        tech: ["PLC", "Python", "IoT"]
    },
    {
        title: "Packaging Automation",
        status: "Deployed",
        desc: "Robotic packaging line integration with real-time quality control vision systems.",
        tech: ["Robotics", "CV", "C++"]
    },
    {
        title: "Odoo Infrastructure",
        status: "Maintenance",
        desc: "Custom ERP module development and server infrastructure optimization.",
        tech: ["Python", "PostgreSQL", "Docker"]
    }
];

export default function Projects() {
    return (
        <section className={styles.section}>
            <span className={styles.label}>// OPERATIONS</span>
            <div className={styles.grid}>
                {projects.map((p, i) => (
                    <div key={i} className={cardStyles.card}>
                        <div className={cardStyles.header}>
                            <h3 className={cardStyles.title}>{p.title}</h3>
                            <span className={cardStyles.status}>{p.status}</span>
                        </div>
                        <p className={cardStyles.description}>{p.desc}</p>
                        <div className={cardStyles.meta}>
                            {p.tech.map(t => <span key={t}>[{t}]</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
