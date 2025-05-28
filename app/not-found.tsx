import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "NOT FOUND",
};

const styles = {
  parent: {
    margin: "10%",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
    flexDirection: "column" as const,
    gap: "3rem",
  },
  link: {
    fontSize: "var(--font-size-S)",
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "1rem 2rem",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
    textDecoration: "none",
    border: "#b9b9b9 solid 1px",
    borderRadius: "5rem",
  },
};

export default function NotFound() {
  return (
    <div style={styles.parent}>
      Page doesn't exist
      <Link href="/" style={styles.link}>
        <ArrowLeft style={{ height: "2rem", width: "2rem" }} />
        Go back to home
      </Link>
    </div>
  );
}
