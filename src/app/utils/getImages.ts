import fs from 'fs';
import path from 'path';

export interface PhotoData {
    id: string;
    src: string;
    alt: string;
    iso: string;
    shutter: string;
    aperture: string;
    focalLength: string;
    date: string;
    location: string;
}

export function getImages(): PhotoData[] {
    const imagesDirectory = path.join(process.cwd(), 'public/images');

    // Create directory if it doesn't exist
    if (!fs.existsSync(imagesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(imagesDirectory);

    const photos = fileNames
        .filter(fileName => {
            const ext = path.extname(fileName).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
        })
        .map((fileName, index) => {
            // Generate pseudo-random technical data based on filename to keep "Nasa" vibe
            // In a real app, we might read EXIF data here

            return {
                id: `IMG_${String(index + 1).padStart(3, '0')}`,
                src: `/images/${fileName}`,
                alt: fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " "), // Remove extension and replace underscores
                iso: ["100", "200", "400", "800", "1600", "3200"][index % 6],
                shutter: ["1/1000", "1/500", "1/250", "1/125", "1/60", "1/30"][index % 6],
                aperture: ["f/1.4", "f/2.8", "f/4.0", "f/5.6", "f/8.0", "f/11"][index % 6],
                focalLength: ["24mm", "35mm", "50mm", "85mm", "135mm"][index % 5],
                date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
                location: "UNK.LOC.DAT", // Placeholder
            };
        });

    return photos;
}
