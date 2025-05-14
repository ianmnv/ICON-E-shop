"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import principalModel from "@/public/images/model-principal.jpg";
import lolaModel from "@/public/images/model-lolita.jpg";
import clothesModel from "@/public/images/model-ropa.jpg";
import clotheRack from "@/public/images/perchero.jpg";
import styles from "@/app/page.module.css";

const carouselInfoObj = [
  { banner: "FEEL ICONIC", imgPath: principalModel },
  { banner: "FEEL STYLISH", imgPath: lolaModel },
  { banner: "FEEL CLASSY", imgPath: clothesModel },
  { banner: "FEEL FRESH", imgPath: clotheRack },
];

export default function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [childHeight, setChildHeight] = useState(0);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childRef.current) {
      setChildHeight(childRef.current.offsetHeight);
    }
  }, [childRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex < 3 ? prevIndex + 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div
      className={styles.section__portrait__wrapper}
      style={{ height: `${childHeight}px` }}
    >
      {carouselInfoObj.map((item, i) => {
        return (
          <div
            key={i}
            className={`${styles.section__portrait__div}
           ${i === slideIndex ? styles.slide__active : undefined}`}
            ref={childRef}
          >
            <Image
              src={item.imgPath}
              alt="modelo de ropa"
              className={styles.section__portrait__img}
              width={500}
              height={700}
            />
            <p className={styles.section__portada__p}>{item.banner}</p>
          </div>
        );
      })}

      <div className={styles.section__container__btns}>
        {carouselInfoObj.map((_, i) => {
          return (
            <button
              key={i}
              className={`${styles.section__btn}
          ${i === slideIndex ? styles.active__btn : undefined}
          `}
              onClick={() => setSlideIndex(i)}
            ></button>
          );
        })}
      </div>

      <div className={styles.section__btns__nav}>
        <button
          className={styles.nav__btns}
          onClick={() =>
            setSlideIndex((prev) =>
              prev <= 0 ? carouselInfoObj.length - 1 : prev - 1
            )
          }
        >
          <ChevronLeft className={styles.icon__btns} />
        </button>

        <button
          className={styles.nav__btns}
          onClick={() => {
            setSlideIndex((prev) =>
              prev >= carouselInfoObj.length - 1 ? 0 : prev + 1
            );
          }}
        >
          <ChevronRight className={styles.icon__btns} />
        </button>
      </div>
    </div>
  );
}
