import { ShoppingBag, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__columns}>
        <div className={styles.footer__column_inner}>
          <Link className={styles.footer__logo__container} href="/">
            <ShoppingBag className={styles.footer__icons} />
            <h1>ICON</h1>
          </Link>

          <a
            className={styles.footer__a}
            href="https://www.facebook.com"
            target="_blank"
          >
            <SquareArrowOutUpRight className={styles.footer__ico__social} />
            Facebook
          </a>

          <a
            className={styles.footer__a}
            href="https://www.instagram.com"
            target="_blank"
          >
            <SquareArrowOutUpRight className={styles.footer__ico__social} />
            Instagram
          </a>

          <a
            className={styles.footer__a}
            href="https://www.twitter.com"
            target="_blank"
          >
            <SquareArrowOutUpRight className={styles.footer__ico__social} />
            Twitter
          </a>
        </div>
      </div>

      <div className={styles.footer__columns}>
        <p className={styles.footer__p__contact}>
          <a href="#">Acerca de nosotros</a>
        </p>

        <div
          className={`${styles.footer__p__contact} ${styles.footer__contact__info}`}
        >
          <span>CONTACTO</span>

          <div className={styles.footer__column_inner}>
            <span>Telefono:</span>
            <a href="tel:+1234567890">+1 234 567 890</a>
            <span>Email:</span>
            <a href="mailto:contacto@icon.com">contacto@icon.com</a>
          </div>
        </div>
      </div>

      <div className={styles.footer__columns}>
        <p className={styles.footer__p__contact}>
          <a href="#">Terminos y condiciones</a>
        </p>
        <p className={styles.footer__p__contact}>
          © 2025 ICON. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
