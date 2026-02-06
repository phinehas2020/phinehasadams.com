import fs from 'fs/promises';
import path from 'path';

export interface Website {
    id: string;
    url: string;
    title: string;
    description?: string;
    createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'websites.json');

export async function getWebsites(): Promise<Website[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            await fs.writeFile(DATA_FILE, '[]', 'utf-8');
            return [];
        }
        throw error;
    }
}

export async function addWebsite(url: string, title: string, description?: string): Promise<Website> {
    const websites = await getWebsites();
    const newWebsite: Website = {
        id: crypto.randomUUID(),
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
    };

    websites.push(newWebsite);
    await fs.writeFile(DATA_FILE, JSON.stringify(websites, null, 2), 'utf-8');
    return newWebsite;
}

export async function deleteWebsite(id: string): Promise<void> {
    const websites = await getWebsites();
    const filtered = websites.filter(w => w.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
}
