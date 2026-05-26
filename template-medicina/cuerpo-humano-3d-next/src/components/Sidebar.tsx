"use client";

import React from "react";
import { useStudio } from "../context/StudioContext";
import { ORGANOS, rutasOrgano } from "../app/data";

export default function Sidebar() {
  const { selectedId, seleccionarOrgano } = useStudio();

  return (
    <aside className="card organ-card">
      <h2 className="card__title">Órganos y sistemas</h2>
      <div className="organ-list" id="organ-list">
        {ORGANOS.map((organo) => {
          const rutas = rutasOrgano(organo);
          const activeClass = organo.id === selectedId ? "is-active" : "";
          return (
            <button 
              key={organo.id}
              className={`organ-item ${activeClass}`}
              onClick={() => seleccionarOrgano(organo.id)}
            >
              <img className="organ-item__thumb" src={rutas.miniatura} alt={organo.nombre} />
              <span className="organ-item__text">
                <span className="organ-item__name">{organo.nombre}</span>
                <span className="organ-item__system">{organo.sistema}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
