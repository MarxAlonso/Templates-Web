"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useStudio } from "../../context/StudioContext";
import { rutasOrgano } from "../../app/data";

export default function GalleryCard() {
  const { collapsedStates, toggleCollapsed, setModals, selectedId, getOrgano } = useStudio();
  const organoActual = getOrgano(selectedId);
  const rutasActuales = rutasOrgano(organoActual);

  return (
    <article className={`card collapsible ${collapsedStates.galeria ? "is-collapsed" : ""}`} data-key="galeria">
      <header className="card__head">
        <h2 className="card__title">Galería educativa</h2>
        <button
          className="card__toggle"
          aria-expanded={!collapsedStates.galeria}
          aria-label="Mostrar u ocultar galería"
          onClick={() => toggleCollapsed("galeria")}
        >
          <ChevronDown />
        </button>
      </header>
      <div className="card__body">
        <div className="gallery">
          <button 
            className="gallery__item" 
            onClick={() => setModals(m => ({
              ...m, 
              image: {
                src: rutasActuales.anatomia,
                title: `Anatomía · ${organoActual.nombre}`,
                caption: organoActual.importancia
              }
            }))}
          >
            <img src={rutasActuales.anatomia} alt="Anatomía" />
            <span>Anatomía</span>
          </button>
          <button 
            className="gallery__item" 
            onClick={() => setModals(m => ({
              ...m, 
              image: {
                src: rutasActuales.ficha,
                title: `Ficha visual · ${organoActual.nombre}`,
                caption: organoActual.resumen
              }
            }))}
          >
            <img src={rutasActuales.ficha} alt="Ficha visual" />
            <span>Ficha visual</span>
          </button>
        </div>
      </div>
    </article>
  );
}
