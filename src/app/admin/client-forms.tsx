'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, createWebsiteAction, deleteWebsiteAction, toggleSoldAction, updateWebsiteAction } from './actions';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { Website } from '@/lib/websites';

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

            <div className={styles.priceRow}>
                <div className={styles.inputGroup}>
                    <label htmlFor="purchase_price" className={styles.label}>Purchase Price ($)</label>
                    <input
                        type="number"
                        id="purchase_price"
                        name="purchase_price"
                        step="0.01"
                        min="0"
                        className={styles.input}
                        placeholder="1000.00"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="monthly_price" className={styles.label}>Monthly Price ($)</label>
                    <input
                        type="number"
                        id="monthly_price"
                        name="monthly_price"
                        step="0.01"
                        min="0"
                        className={styles.input}
                        placeholder="20.00"
                    />
                </div>
            </div>

            <SubmitButton label="Add Website" />
        </form>
    );
}

export function EditWebsiteForm({ website, onClose }: { website: Website; onClose: () => void }) {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        await updateWebsiteAction(formData);
        router.refresh();
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.sectionTitle}>Edit Website</h2>
                    <button onClick={onClose} className={styles.closeBtn}>×</button>
                </div>
                <form action={handleSubmit} className={styles.editForm}>
                    <input type="hidden" name="id" value={website.id} />

                    <div className={styles.inputGroup}>
                        <label htmlFor="edit-url" className={styles.label}>Website URL</label>
                        <input
                            type="url"
                            id="edit-url"
                            name="url"
                            required
                            className={styles.input}
                            defaultValue={website.url}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="edit-title" className={styles.label}>Title</label>
                        <input
                            type="text"
                            id="edit-title"
                            name="title"
                            required
                            className={styles.input}
                            defaultValue={website.title}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="edit-description" className={styles.label}>Description</label>
                        <textarea
                            id="edit-description"
                            name="description"
                            className={`${styles.input} ${styles.textarea}`}
                            defaultValue={website.description || ''}
                        />
                    </div>

                    <div className={styles.priceRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="edit-purchase_price" className={styles.label}>Purchase Price ($)</label>
                            <input
                                type="number"
                                id="edit-purchase_price"
                                name="purchase_price"
                                step="0.01"
                                min="0"
                                className={styles.input}
                                defaultValue={website.purchase_price || ''}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="edit-monthly_price" className={styles.label}>Monthly Price ($)</label>
                            <input
                                type="number"
                                id="edit-monthly_price"
                                name="monthly_price"
                                step="0.01"
                                min="0"
                                className={styles.input}
                                defaultValue={website.monthly_price || ''}
                            />
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
                        <SubmitButton label="Save Changes" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export function WebsiteCard({ website }: { website: Website }) {
    const [isEditing, setIsEditing] = useState(false);
    const deleteWithId = deleteWebsiteAction.bind(null, website.id);
    const toggleWithId = toggleSoldAction.bind(null, website.id);

    const formatPrice = (price: number | undefined) => {
        if (!price) return null;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(price);
    };

    return (
        <>
            <div className={`${styles.item} ${website.sold ? styles.soldItem : ''}`}>
                <div className={styles.itemContent}>
                    <h3>
                        {website.title}
                        {website.sold && <span className={styles.soldBadge}>SOLD</span>}
                    </h3>
                    <a href={website.url} target="_blank" rel="noopener noreferrer" className={styles.itemUrl}>
                        {website.url}
                    </a>
                    {website.description && (
                        <p className={styles.itemDesc}>{website.description}</p>
                    )}
                    <div className={styles.pricing}>
                        {website.purchase_price && (
                            <span className={styles.priceTag}>
                                {formatPrice(website.purchase_price)}
                            </span>
                        )}
                        {website.monthly_price && (
                            <span className={styles.monthlyTag}>
                                +{formatPrice(website.monthly_price)}/mo
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.itemActions}>
                    <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                        Edit
                    </button>
                    <form action={toggleWithId}>
                        <button
                            type="submit"
                            className={website.sold ? styles.markAvailableBtn : styles.markSoldBtn}
                        >
                            {website.sold ? 'Mark Available' : 'Mark Sold'}
                        </button>
                    </form>
                    <form action={deleteWithId}>
                        <button type="submit" className={styles.deleteBtn}>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
            {isEditing && (
                <EditWebsiteForm website={website} onClose={() => setIsEditing(false)} />
            )}
        </>
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

export function ToggleSoldButton({ id, sold }: { id: string; sold: boolean }) {
    const toggleWithId = toggleSoldAction.bind(null, id);

    return (
        <form action={toggleWithId}>
            <button
                type="submit"
                className={sold ? styles.markAvailableBtn : styles.markSoldBtn}
            >
                {sold ? 'Mark Available' : 'Mark Sold'}
            </button>
        </form>
    );
}
