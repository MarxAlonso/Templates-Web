"use client";

import { useState } from "react";
import Link from "next/link";
import { universidades } from "@/data/universidades";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Devs<span>Codelab</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={styles.dropdownTrigger}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Universidades Perú ▼
            </button>
            <div className={`${styles.dropdownContent} ${dropdownOpen ? styles.visible : ""}`}>
              {universidades.map((u) => (
                <Link key={u.slug} href={`/${u.slug}`} onClick={() => setMenuOpen(false)}>
                  Tesis {u.nombre}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link href="#">Precios</Link>
          </li>
          <li>
            <Link href="#">Contacto</Link>
          </li>
        </ul>

        <Link href="#cotizacion" className={styles.ctaNav}>
          Empezar Tesis
        </Link>
      </div>
    </nav>
  );
}
