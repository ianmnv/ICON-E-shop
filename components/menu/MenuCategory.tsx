"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { ChevronsRight, MoveRight } from "lucide-react";
import styles from "./Menu.module.css";
import { MenuContext } from "@/context/MenuContext";

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
  const { setIsMenuOpen } = useContext(MenuContext);

  function handleLink() {
    setIsMenuOpen(false);
    setIsClosed(true);
  }

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
          <Link
            href={`/category/${category.subRoute}`}
            onClick={handleLink}
            key={i}
          >
            {category.title}
            <MoveRight />
          </Link>
        ))}
      </nav>
    </>
  );
}
