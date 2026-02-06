import fs from 'fs/promises';
import path from 'path';

// Import the JSON directly so Next.js bundles it efficiently
import sitesData from '../data/websites.json';

export interface Website {
    id: string;
    url: string;
    title: string;
    description?: string;
    createdAt: string;
}

// In-memory store initialized from the JSON file
// accessible to the server process. Note: In Vercel serverless,
// this state may reset between requests if the lambda is cold-booted.
let currentWebsites: Website[] = [...(sitesData as Website[])];

// Backup file path for purely local persistent storage
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'websites.json');

export async function getWebsites(): Promise<Website[]> {
    // Always return the in-memory data which is fast and crash-proof
    return currentWebsites;
}

export async function addWebsite(url: string, title: string, description?: string): Promise<Website> {
    const newWebsite: Website = {
        id: crypto.randomUUID(),
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
    };

    // Update in-memory
    currentWebsites.push(newWebsite);

    // Try to persist to disk (works locally, silently fails in Prod/Read-Only)
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(currentWebsites, null, 2), 'utf-8');
    } catch (error) {
        console.log('Note: Could not persist website to disk (read-only environment). changes are ephemeral.');
    }

    return newWebsite;
}

export async function deleteWebsite(id: string): Promise<void> {
    // Update in-memory
    currentWebsites = currentWebsites.filter(w => w.id !== id);

    // Try to persist to disk
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(currentWebsites, null, 2), 'utf-8');
    } catch (error) {
        console.log('Note: Could not persist deletion (read-only environment).');
    }
}
