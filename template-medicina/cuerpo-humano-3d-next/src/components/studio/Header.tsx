"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Box, ChevronRight, Moon, Sun } from "lucide-react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("chs_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("chs_theme", nextTheme);
  };

  return (
    <header className="studio-topbar">
      <div className="studio-brand">
        <div className="studio-logo" role="img" aria-label="Cuerpo Humano Studio"></div>
        <div className="studio-brand__copy">
          <strong>Cuerpo Humano Studio</strong>
          <span>Arma el cuerpo humano en 3D</span>
        </div>
      </div>

      <nav className="studio-nav">
        <Link href="/studio" className="is-active">
          <Box size={17} />
          <span>Estudio</span>
        </Link>
        <Link href="/">
          <ChevronRight size={17} style={{ transform: "rotate(180deg)" }} />
          <span>Explorador</span>
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema oscuro" style={{ marginLeft: "4px", padding: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--card-soft)" }}>
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
        </button>
      </nav>

      <div className="studio-avatar" aria-hidden="true"></div>
    </header>
  );
}
