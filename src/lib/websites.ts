import pool from './db';

export interface Website {
    id: string;
    url: string;
    title: string;
    description?: string;
    image_url?: string;
    sold: boolean;
    purchase_price?: number;
    monthly_price?: number;
    created_at: string;
}

export interface WebsiteInput {
    url: string;
    title: string;
    description?: string;
    purchase_price?: number;
    monthly_price?: number;
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

export async function getWebsiteById(id: string): Promise<Website | null> {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM websites WHERE id = $1', [id]);
        return res.rows[0] || null;
    } finally {
        client.release();
    }
}

export async function addWebsite(data: WebsiteInput): Promise<Website> {
    const client = await pool.connect();
    try {
        const res = await client.query(
            `INSERT INTO websites (url, title, description, purchase_price, monthly_price) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [data.url, data.title, data.description || null, data.purchase_price || null, data.monthly_price || null]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

export async function updateWebsite(id: string, data: Partial<WebsiteInput>): Promise<Website> {
    const client = await pool.connect();
    try {
        const res = await client.query(
            `UPDATE websites 
             SET url = COALESCE($2, url),
                 title = COALESCE($3, title),
                 description = COALESCE($4, description),
                 purchase_price = $5,
                 monthly_price = $6
             WHERE id = $1 RETURNING *`,
            [id, data.url, data.title, data.description, data.purchase_price ?? null, data.monthly_price ?? null]
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
