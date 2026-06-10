import Image from "next/image";
import styles from "./Photography.module.css";

/* Curated — frame ids come from the camera's own file numbers. */
const photos = [
  {
    id: "FR 3006",
    src: "/images/MAT_3006.jpg",
    caption: "Hard light, chore coat",
    alt: "Black-and-white portrait of a man in a felt cowboy hat and chore coat, half in shadow",
  },
  {
    id: "FR 2974",
    src: "/images/PM_A2974.jpg",
    caption: "The lamb",
    alt: "A freckled boy in a herringbone flat cap carrying a lamb in his arms",
  },
  {
    id: "FR 5246",
    src: "/images/PM_A5246-Enhanced-NR.jpg",
    caption: "Chin on the rail",
    alt: "Black-and-white portrait of a boy resting his chin on his hand over an iron railing",
  },
  {
    id: "FR 2253",
    src: "/images/PM_A2253.jpg",
    caption: "The Land camera",
    alt: "A girl in a red gingham dress and sun hat holding a vintage instant camera",
  },
  {
    id: "FR 9815",
    src: "/images/MATL9815.jpg",
    caption: "Half-light",
    alt: "Close black-and-white portrait of a boy, half his face in shadow",
  },
  {
    id: "FR 0843",
    src: "/images/PM_A0843.jpg",
    caption: "You, there",
    alt: "A red-haired woman in a camo cap pointing straight at the camera",
  },
];

export default function Photography() {
  return (
    <section className={styles.section} id="photography">
      <header className={styles.head}>
        <span className={styles.index} data-reveal>
          <span className={styles.indexNum}>05</span>
          Field
        </span>
        <h2 className={styles.title} data-reveal>
          The part I don&rsquo;t bill for.
        </h2>
      </header>

      <div className={styles.gallery}>
        {photos.map((photo, i) => (
          <figure key={photo.id} className={styles.figure}>
            <div
              className={styles.frame}
              data-reveal="clip"
              style={
                { "--reveal-delay": `${(i % 2) * 0.12}s` } as React.CSSProperties
              }
            >
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
                />
              </div>
            </div>
            <figcaption
              className={styles.caption}
              data-reveal
              style={
                {
                  "--reveal-delay": `${(i % 2) * 0.12 + 0.25}s`,
                } as React.CSSProperties
              }
            >
              <span className={styles.capId}>{photo.id}</span>
              <span className={styles.capAlt}>{photo.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
