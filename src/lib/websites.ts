import pool from './db';

export interface Website {
    id: string;
    url: string;
    title: string;
    description?: string;
    image_url?: string;
    sold: boolean;
    created_at: string;
}

export async function getWebsites(): Promise<Website[]> {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM websites ORDER BY created_at DESC');
        return res.rows;
    } finally {
        client.release();
    }
}

export async function addWebsite(url: string, title: string, description?: string): Promise<Website> {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'INSERT INTO websites (url, title, description) VALUES ($1, $2, $3) RETURNING *',
            [url, title, description || null]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

export async function deleteWebsite(id: string): Promise<void> {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM websites WHERE id = $1', [id]);
    } finally {
        client.release();
    }
}

export async function toggleWebsiteSold(id: string): Promise<Website> {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'UPDATE websites SET sold = NOT sold WHERE id = $1 RETURNING *',
            [id]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}
