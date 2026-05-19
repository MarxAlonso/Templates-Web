import React from "react";
import { Lightbulb, Undo2, RotateCcw } from "lucide-react";
import { Organo } from "../../app/data";

interface LessonPanelProps {
  activeOrgano: Organo;
  undoLastPlacement: () => void;
  resetAssembly: () => void;
}

export function LessonPanel({
  activeOrgano,
  undoLastPlacement,
  resetAssembly,
}: LessonPanelProps) {
  return (
    <footer className="scene-actions">
      <section className="lesson-panel" aria-live="polite">
        <div className="lesson-panel__main">
          <span className="lesson-panel__eyebrow">Aprende mientras armas</span>
          <h3 id="lesson-title">{activeOrgano.nombre}</h3>
          <p id="lesson-summary">{activeOrgano.resumen}</p>
        </div>
        <dl className="lesson-panel__meta">
          <div>
            <dt>Función</dt>
            <dd id="lesson-function">{activeOrgano.funcion}</dd>
          </div>
          <div>
            <dt>Ubicación</dt>
            <dd id="lesson-location">{activeOrgano.ubicacion}</dd>
          </div>
        </dl>
        <div className="lesson-panel__fact">
          <Lightbulb size={16} />
          <span id="lesson-fact">{activeOrgano.datoCurioso}</span>
        </div>
      </section>

      <div className="scene-actions__buttons">
        <button id="btn-undo" title="Deshacer última pieza" onClick={undoLastPlacement}>
          <Undo2 size={17} />
          <span>Deshacer</span>
        </button>
        <button id="btn-reset" title="Reiniciar armado" onClick={resetAssembly}>
          <RotateCcw size={17} />
          <span>Reiniciar</span>
        </button>
      </div>
    </footer>
  );
}
