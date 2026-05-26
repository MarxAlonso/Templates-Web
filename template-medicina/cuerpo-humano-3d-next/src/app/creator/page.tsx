"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiThreedotjs, SiTypescript } from "react-icons/si";
import { MdOutlineScience } from "react-icons/md";
import { TbBrandGoogleFilled } from "react-icons/tb";
import { VscPackage } from "react-icons/vsc";
import { IoArrowBack, IoPersonCircleOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { BiMicrochip } from "react-icons/bi";
import "./creator.css";

const TECH_STACK = [
  { Icon: SiNextdotjs,       label: "Next.js 16",    desc: "Framework React" },
  { Icon: SiThreedotjs,      label: "Three.js",      desc: "Modelos 3D" },
  { Icon: TbBrandGoogleFilled, label: "Model Viewer", desc: "Google · AR" },
  { Icon: FaCode,            label: "CSS Nativo",    desc: "Modo oscuro" },
  { Icon: SiTypescript,      label: "TypeScript",    desc: "Tipado estático" },
  { Icon: VscPackage,        label: "pnpm",          desc: "Gestor de paquetes" },
];

export default function CreatorPage() {
  return (
    <div className="creator-page">
      <Link href="/" className="creator-back">
        <IoArrowBack size={16} />
        Volver
      </Link>

      <div className="creator-container">
        {/* Hero */}
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
              <BiMicrochip size={18} />
              Ingeniero de Software
            </p>

            <div className="creator-links">
              <a
                href="https://github.com/MarxAlonso"
                target="_blank"
                rel="noopener noreferrer"
                className="creator-link creator-link--github"
              >
                <FaGithub size={18} />
                <span>github.com/MarxAlonso</span>
              </a>
            </div>
          </div>
        </section>

        {/* Project */}
        <section className="creator-project">
          <div className="creator-project__card">
            <div className="creator-project__icon">
              <BsGlobe2 size={28} />
            </div>
            <div>
              <h2>Cuerpo Humano Studio</h2>
              <p>
                Aplicación web educativa e interactiva para explorar el cuerpo
                humano en 3D. Diseñada para estudiantes de medicina, docentes y
                curiosos exploradores de la anatomía humana.
              </p>
            </div>
          </div>

          <div className="creator-tech-grid">
            {TECH_STACK.map(({ Icon, label, desc }) => (
              <div key={label} className="creator-tech-item">
                <span className="creator-tech-item__icon">
                  <Icon size={26} />
                </span>
                <strong>{label}</strong>
                <small>{desc}</small>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="creator-footer">
          <MdOutlineScience size={18} />
          <span>Hecho con pasión en Perú · 2025</span>
        </footer>
      </div>
    </div>
  );
}
