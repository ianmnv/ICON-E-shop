"use client";

import { MenuContext } from "@/context/MenuContext";
import { useContext } from "react";

export default function Button({
  children,
  classes,
  ariaLabel,
}: {
  children: React.ReactNode;
  classes?: string[];
  ariaLabel: string;
}) {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  return (
    <button
      aria-label={ariaLabel}
      className={classes?.join(" ")}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {children}
    </button>
  );
}
