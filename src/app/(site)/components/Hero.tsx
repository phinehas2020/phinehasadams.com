"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Chicago",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className={styles.hero} data-hero>
      <div className={styles.media}>
        <div className={styles.mediaInner}>
          <Image
            src="/images/PM_A5781.jpg"
            alt="A young farmhand in a cornfield"
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.scrim} />
      <div className={styles.leave} />

      <div className={styles.lower}>
        <span className={styles.eyebrow}>
          <span className={styles.dot} />
          Systems engineer · Builder · Photographer
        </span>

        <h1 className={styles.name}>
          <span className={styles.nameMask}>
            <span className={`${styles.nameLine} ${styles.nameA}`}>
              Phinehas
            </span>
          </span>
          <span className={styles.nameMask}>
            <span className={`${styles.nameLine} ${styles.nameB}`}>Adams</span>
          </span>
        </h1>

        <p className={styles.statement}>
          I build business systems{" "}
          <span className={styles.em}>end to end — no hand-offs.</span>
        </p>
      </div>

      <div className={styles.rail}>
        <a href="#work" className={styles.enter}>
          <span className={styles.enterArrow}>↓</span> Enter
        </a>
        <span className={styles.frameRef} aria-hidden="true">
          FR 5781 — The cornfield
        </span>
        <span className={styles.clock}>{time || "--:--"} CST</span>
      </div>
    </section>
  );
}
