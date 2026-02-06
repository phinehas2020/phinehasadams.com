'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, createWebsiteAction, deleteWebsiteAction } from './actions';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

const initialState = {
    success: false,
    error: '',
};

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className={styles.button} disabled={pending}>
            {pending ? 'Processing...' : label}
        </button>
    );
}

export function LoginForm() {
    const [state, formAction] = useActionState(loginAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.refresh();
        }
    }, [state.success, router]);

    return (
        <form action={formAction} className={styles.loginForm}>
            <h2 className={styles.sectionTitle}>Admin Login</h2>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className={styles.input}
                    placeholder="Enter admin password"
                />
            </div>
            {state.error && <p style={{ color: '#ff3b30', marginBottom: '1rem' }}>{state.error}</p>}
            <SubmitButton label="Login" />
        </form>
    );
}

export function AddWebsiteForm() {
    // We can treat createWebsiteAction as void-returning or returning state.
    // For simplicity using a wrapper to reset form on success if needed, 
    // but standard action works fine.

    return (
        <form action={createWebsiteAction} className={styles.addForm}>
            <h2 className={styles.sectionTitle}>Add New Website</h2>

            <div className={styles.inputGroup}>
                <label htmlFor="url" className={styles.label}>Website URL</label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    required
                    className={styles.input}
                    placeholder="https://example.com"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className={styles.input}
                    placeholder="My Awesome Project"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <textarea
                    id="description"
                    name="description"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Brief description of the website..."
                />
            </div>

            <SubmitButton label="Add Website" />
        </form>
    );
}

export function DeleteButton({ id }: { id: string }) {
    const deleteWithId = deleteWebsiteAction.bind(null, id);

    return (
        <form action={deleteWithId}>
            <button type="submit" className={styles.deleteBtn}>
                Delete
            </button>
        </form>
    );
}
