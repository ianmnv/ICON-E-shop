"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronsRight, MoveRight } from "lucide-react";
import styles from "./Menu.module.css";

interface Categories {
  title: string;
  subRoute: string;
}

export default function MenuCategory({
  categoryName,
  categories,
}: {
  categoryName: string;
  categories: Categories[];
}) {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <>
      <button
        className={styles.menu__btn}
        onClick={() => setIsClosed(!isClosed)}
      >
        {categoryName}
        <ChevronsRight className={styles.menu__icons} />
      </button>

      <nav
        className={`${styles.menu__accordion__categories} ${
          isClosed ? styles.hide : undefined
        }`}
      >
        {categories.map((category, i) => (
          <Link href={category.subRoute} key={i}>
            {category.title}
            <MoveRight />
          </Link>
        ))}
      </nav>
    </>
  );
}
