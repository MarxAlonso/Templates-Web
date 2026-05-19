import React from "react";
import { Shuffle, Layers, Grid3X3, Tag } from "lucide-react";
import { ORDER } from "../../hooks/useAssemblyGame";
import { rutasOrgano, Organo } from "../../app/data";

interface PiecePanelProps {
  activeId: string | null;
  placedList: string[];
  showShadows: boolean;
  showGrid: boolean;
  showLabels: boolean;
  selectRandomPending: () => void;
  setShadows: (enabled: boolean) => void;
  setGridVisible: (enabled: boolean) => void;
  setLabelsVisible: (enabled: boolean) => void;
  attachCardDragStart: (id: string, event: React.PointerEvent<HTMLButtonElement>) => void;
  getOrgano: (id: string) => Organo;
}

export function PiecePanel({
  activeId,
  placedList,
  showShadows,
  showGrid,
  showLabels,
  selectRandomPending,
  setShadows,
  setGridVisible,
  setLabelsVisible,
  attachCardDragStart,
  getOrgano,
}: PiecePanelProps) {
  return (
    <aside className="piece-panel">
      <div className="piece-panel__header">
        <div>
          <h2>Piezas</h2>
          <span id="piece-counter" className="piece-counter">
            {placedList.length} / {ORDER.length} colocadas
          </span>
        </div>
        <button id="btn-shuffle" title="Elegir una pieza pendiente al azar" onClick={selectRandomPending}>
          <Shuffle size={17} />
        </button>
      </div>

      <div className={`completion-banner ${placedList.length === ORDER.length ? "is-visible" : ""}`} id="completion-banner">
        <strong>Cuerpo armado</strong>
        <span>Completaste las {ORDER.length} piezas.</span>
      </div>

      <div className="piece-grid" id="piece-grid">
        {ORDER.map((id) => {
          const organo = getOrgano(id);
          const rutas = rutasOrgano(organo);
          const isActive = id === activeId ? "is-active" : "";
          const isPlaced = placedList.includes(id) ? "is-placed" : "";

          return (
            <button 
              key={id}
              className={`piece-card ${isActive} ${isPlaced}`} 
              data-id={id} 
              draggable="false"
              onPointerDown={(e) => attachCardDragStart(id, e)}
            >
              <img src={rutas.imagen} alt={organo.nombre} draggable="false" />
              <strong>{organo.nombre}</strong>
              <small>{isPlaced ? "Colocado" : "Pendiente"}</small>
            </button>
          );
        })}
      </div>

      <div className="scene-toggles" role="group" aria-label="Ajustes de escena">
        <label className="scene-toggle" onClick={(e) => e.preventDefault()}>
          <span><Layers size={14} /> Sombras</span>
          <input 
            type="checkbox" 
            id="toggle-shadows" 
            checked={showShadows} 
            onChange={(e) => setShadows(e.target.checked)}
          />
          <span className="switch" aria-hidden="true" onClick={() => setShadows(!showShadows)}></span>
        </label>
        <label className="scene-toggle" onClick={(e) => e.preventDefault()}>
          <span><Grid3X3 size={14} /> Cuadrícula</span>
          <input 
            type="checkbox" 
            id="toggle-grid" 
            checked={showGrid}
            onChange={(e) => setGridVisible(e.target.checked)}
          />
          <span className="switch" aria-hidden="true" onClick={() => setGridVisible(!showGrid)}></span>
        </label>
        <label className="scene-toggle" onClick={(e) => e.preventDefault()}>
          <span><Tag size={14} /> Etiquetas</span>
          <input 
            type="checkbox" 
            id="toggle-labels" 
            checked={showLabels}
            onChange={(e) => setLabelsVisible(e.target.checked)}
          />
          <span className="switch" aria-hidden="true" onClick={() => setLabelsVisible(!showLabels)}></span>
        </label>
      </div>
    </aside>
  );
}
