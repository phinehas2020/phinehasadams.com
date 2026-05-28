import fs from "fs";
import path from "path";

export interface PhotoData {
  id: string;
  src: string;
  alt: string;
}

export function getImages(): PhotoData[] {
  const imagesDirectory = path.join(process.cwd(), "public/images");

  if (!fs.existsSync(imagesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(imagesDirectory)
    .filter((fileName) =>
      [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(
        path.extname(fileName).toLowerCase()
      )
    )
    .map((fileName, index) => ({
      id: `IMG_${String(index + 1).padStart(3, "0")}`,
      src: `/images/${fileName}`,
      alt: fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
    }));
}
