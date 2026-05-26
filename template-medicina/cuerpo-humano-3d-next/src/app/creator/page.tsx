"use client";

import React from "react";
import Link from "next/link";
import { Github, Code2, Cpu, Globe, ChevronLeft } from "lucide-react";
import "./creator.css";

export default function CreatorPage() {
  return (
    <div className="creator-page">
      {/* Back button */}
      <Link href="/" className="creator-back">
        <ChevronLeft size={16} />
        Volver
      </Link>

      <div className="creator-container">
        {/* Hero section */}
        <section className="creator-hero">
          <div className="creator-avatar-wrap">
            <div className="creator-avatar">
              <span>MA</span>
            </div>
            <div className="creator-avatar-ring"></div>
            <div className="creator-avatar-ring creator-avatar-ring--2"></div>
          </div>

          <div className="creator-hero__info">
            <span className="creator-eyebrow">Creador &amp; Desarrollador</span>
            <h1 className="creator-name">Marx Alonso<br />Chipana Belleza</h1>
            <p className="creator-role">
              <Cpu size={16} />
              Ingeniero de Software
            </p>

            <div className="creator-links">
              <a
                href="https://github.com/MarxAlonso"
                target="_blank"
                rel="noopener noreferrer"
                className="creator-link creator-link--github"
              >
                <Github size={18} />
                <span>github.com/MarxAlonso</span>
              </a>
            </div>
          </div>
        </section>

        {/* Project section */}
        <section className="creator-project">
          <div className="creator-project__card">
            <div className="creator-project__icon">
              <Globe size={28} />
            </div>
            <div>
              <h2>Cuerpo Humano Studio</h2>
              <p>
                Aplicación web educativa e interactiva para explorar el cuerpo
                humano en 3D. Diseñada para estudiantes de medicina, docentes y
                curioso exploradores de la anatomía humana.
              </p>
            </div>
          </div>

          <div className="creator-tech-grid">
            {[
              { icon: "⚡", label: "Next.js 16", desc: "Framework React" },
              { icon: "🧊", label: "Three.js", desc: "Modelos 3D" },
              { icon: "🔬", label: "Model Viewer", desc: "Google · AR" },
              { icon: "💅", label: "CSS Nativo", desc: "Modo oscuro" },
              { icon: "🦾", label: "TypeScript", desc: "Tipado estático" },
              { icon: "📦", label: "pnpm", desc: "Gestor de paquetes" },
            ].map((tech) => (
              <div key={tech.label} className="creator-tech-item">
                <span className="creator-tech-item__icon">{tech.icon}</span>
                <strong>{tech.label}</strong>
                <small>{tech.desc}</small>
              </div>
            ))}
          </div>
        </section>

        {/* Signature */}
        <footer className="creator-footer">
          <Code2 size={18} />
          <span>Hecho con pasión en Perú · 2025</span>
        </footer>
      </div>
    </div>
  );
}
