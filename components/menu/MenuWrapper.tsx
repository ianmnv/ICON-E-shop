"use client";

import { type ReactNode, useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
import styles from "./Menu.module.css";

export default function MenuWrapper({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useContext(MenuContext);

  return (
    <aside
      className={`${styles.menu} ${
        isMenuOpen ? styles.menu__transition : undefined
      }`}
    >
      {children}
    </aside>
  );
}
