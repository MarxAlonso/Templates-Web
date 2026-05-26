"use client";

import React from "react";
import Link from "next/link";
import { Minimize2, RotateCcw, ZoomIn, ZoomOut, Maximize, ChevronDown, X, Layers3, Activity, MapPin, Link2, Moon, Sun, User } from "lucide-react";
import { useStudio } from "../context/StudioContext";

export default function Topbar() {
  const { activeView, handleNavClick, theme, toggleTheme } = useStudio();

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <div className="topbar__logo" role="img" aria-label="Cuerpo Humano Studio"></div>
        <div className="topbar__title">
          <strong>Cuerpo Humano Studio</strong>
          <span>Explora órganos en 3D</span>
        </div>
      </div>

      <nav className="topbar__nav" id="topbar-nav">
        <Link href="/studio" className="nav-link-estudio">Estudio</Link>
        <button 
          className={activeView === "galeria" ? "is-active" : ""} 
          onClick={() => handleNavClick("galeria")}
        >
          Galería
        </button>
        <button 
          className={activeView === "biblioteca" ? "is-active" : ""} 
          onClick={() => handleNavClick("biblioteca")}
        >
          Biblioteca
        </button>
        <button 
          className={activeView === "cuaderno" ? "is-active" : ""} 
          onClick={() => handleNavClick("cuaderno")}
        >
          Cuaderno
        </button>
        <button 
          className={activeView === "ajustes" ? "is-active" : ""} 
          onClick={() => handleNavClick("ajustes")}
        >
          Ajustes
        </button>
        <Link href="/creator" className="topbar__creator-link">
          <User size={14} />
          <span>Creador</span>
        </Link>
        
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema oscuro">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </nav>

      <div className="topbar__avatar" title="Perfil" aria-label="Perfil"></div>
    </header>
  );
}
