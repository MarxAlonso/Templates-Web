"use client";

import React from "react";
import { ChevronDown, Layers3, Activity, MapPin, Link2 } from "lucide-react";
import { useStudio } from "../context/StudioContext";
import { rutasOrgano } from "../app/data";

export default function RightPanel() {
  const { selectedId, getOrgano, collapsedStates, toggleCollapsed } = useStudio();
  const organoActual = getOrgano(selectedId);
  const rutasActuales = rutasOrgano(organoActual);

  return (
    <aside className="right-column">
      <section className="card detail-card">
        <h2 className="card__title">Detalles del órgano</h2>
        <div className="detail-card__header">
          <img id="detail-avatar" className="detail-card__avatar" src={rutasActuales.imagen} alt={organoActual.nombre} />
          <div className="detail-card__name">
            <strong id="detail-name">{organoActual.nombre}</strong>
            <em id="detail-descriptor">{organoActual.descriptor}</em>
          </div>
        </div>
        <div className="detail-grid" id="detail-grid">
          <div className="detail-row">
            <span className="detail-row__icon"><Layers3 size={18} /></span>
            <div className="detail-row__text">
              <small>Sistema</small>
              <span>{organoActual.sistema}</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-row__icon"><Activity size={18} /></span>
            <div className="detail-row__text">
              <small>Función</small>
              <span>{organoActual.funcion}</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-row__icon"><MapPin size={18} /></span>
            <div className="detail-row__text">
              <small>Ubicación</small>
              <span>{organoActual.ubicacion}</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-row__icon"><Link2 size={18} /></span>
            <div className="detail-row__text">
              <small>Relación</small>
              <span>{organoActual.relacion}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Notes / Clinical data card */}
      <section className={`card notes-card collapsible ${collapsedStates.notas ? "is-collapsed" : ""}`} data-key="notas">
        <header className="card__head">
          <h2 className="card__title">Notas clínicas</h2>
          <button
            className="card__toggle"
            aria-expanded={!collapsedStates.notas}
            aria-label="Mostrar u ocultar notas"
            onClick={() => toggleCollapsed("notas")}
          >
            <ChevronDown />
          </button>
        </header>
        <div className="card__body">
          <p id="notes-text">{organoActual.resumen}</p>
          <p className="dato" id="notes-fact">Dato curioso: {organoActual.datoCurioso}</p>
        </div>
      </section>
    </aside>
  );
}
