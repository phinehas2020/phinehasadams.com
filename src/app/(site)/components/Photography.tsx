import Image from "next/image";
import styles from "./Photography.module.css";
import type { PhotoData } from "../utils/getImages";

interface PhotographyProps {
  photos: PhotoData[];
}

export default function Photography({ photos = [] }: PhotographyProps) {
  if (!photos.length) return null;

  return (
    <section className={styles.section} id="photography">
      <header className={styles.head}>
        <span className={styles.index} data-reveal>
          <span className={styles.indexNum}>05</span>
          Field
        </span>
        <h2 className={styles.title} data-reveal>
          Made with the same eye.
        </h2>
      </header>

      <div className={styles.gallery}>
        {photos.map((photo, i) => (
          <figure key={photo.id} className={styles.figure} data-reveal="blur">
            <div className={styles.frame}>
              <div
                className={styles.media}
                data-parallax={i % 2 === 0 ? "0.16" : "0.1"}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 760px) 92vw, 46vw"
                  priority={i === 0}
                />
              </div>
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.capId}>{photo.id}</span>
              <span className={styles.capAlt}>{photo.alt}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
