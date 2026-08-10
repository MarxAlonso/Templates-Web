"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { useStudio } from "../../context/StudioContext";
import { ORGANOS, rutasOrgano } from "../../app/data";

export default function CompareCard() {
  const { collapsedStates, toggleCollapsed, setModals, compareA, setCompareA, compareB, setCompareB, getOrgano } = useStudio();

  return (
    <article className={`card compare-card collapsible ${collapsedStates.comparar ? "is-collapsed" : ""}`} data-key="comparar">
      <header className="card__head">
        <h2 className="card__title">Comparar órganos</h2>
        <button
          className="card__toggle"
          aria-expanded={!collapsedStates.comparar}
          aria-label="Mostrar u ocultar comparador"
          onClick={() => toggleCollapsed("comparar")}
        >
          <ChevronDown />
        </button>
      </header>
      <div className="card__body">
        <div className="compare-row">
          <div className="compare-chip">
            <img src={rutasOrgano(getOrgano(compareA)).imagen} alt="" />
            <strong>{getOrgano(compareA).nombre}</strong>
            <small>{getOrgano(compareA).sistema}</small>
            <select 
              value={compareA} 
              onChange={(e) => setCompareA(e.target.value)}
            >
              {ORGANOS.map((o) => (
                <option key={o.id} value={o.id}>{o.nombre}</option>
              ))}
            </select>
          </div>
          <div className="compare-vs">VS</div>
          <div className="compare-chip">
            <img src={rutasOrgano(getOrgano(compareB)).imagen} alt="" />
            <strong>{getOrgano(compareB).nombre}</strong>
            <small>{getOrgano(compareB).sistema}</small>
            <select 
              value={compareB} 
              onChange={(e) => setCompareB(e.target.value)}
            >
              {ORGANOS.map((o) => (
                <option key={o.id} value={o.id}>{o.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="compare-open" onClick={() => setModals(m => ({ ...m, compare: true }))}>
          Abrir comparación
        </button>
      </div>
    </article>
  );
}
