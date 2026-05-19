import React from "react";
import Link from "next/link";
import { Box, ChevronRight } from "lucide-react";

export function Header() {
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
      </nav>

      <div className="studio-avatar" aria-hidden="true"></div>
    </header>
  );
}
