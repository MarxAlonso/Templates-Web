"use client";

import React from "react";
import { Minimize2, RotateCcw, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useStudio } from "../context/StudioContext";
import { rutasOrgano } from "../app/data";

export default function Viewer3D() {
  const { 
    selectedId, getOrgano, viewMode, handleModeChange, anatomyBackground, setAnatomyBackground,
    isLoading, setIsLoading, modelViewerRef, rotating, setFullscreen,
    resetearVista, ajustarZoom, showToast
  } = useStudio();

  const organoActual = getOrgano(selectedId);
  const rutasActuales = rutasOrgano(organoActual);

  return (
    <section className="card viewer-card" id="viewer-card">
      <div className="viewer-header">
        <div className="viewer-title">
          <h1 id="viewer-name">{organoActual.nombre}</h1>
          <p id="viewer-system">{organoActual.sistema}</p>
        </div>

        <div className="viewer-mode">
          <div className="viewer-mode__label">Modo de vista</div>
          <div className="viewer-mode__tabs" id="mode-tabs">
            <button 
              className={viewMode === "3d" ? "is-active" : ""} 
              onClick={() => handleModeChange("3d")}
            >
              3D
            </button>
            <button 
              className={viewMode === "ar" ? "is-active" : ""} 
              onClick={() => handleModeChange("ar")}
            >
              AR
            </button>
            <button 
              className={viewMode === "360" ? "is-active" : ""} 
              onClick={() => handleModeChange("360")}
            >
              360°
            </button>
          </div>
          <label className="viewer-mode__toggle">
            <span
              className={`switch ${anatomyBackground ? "is-on" : ""}`}
              role="switch"
              aria-checked={anatomyBackground}
              onClick={() => setAnatomyBackground(!anatomyBackground)}
            ></span>
            Fondo anatómico
          </label>
        </div>
      </div>

      <div className={`viewer-stage ${anatomyBackground ? "with-anatomy" : ""} ${isLoading ? "is-loading" : ""}`} id="viewer-stage">
        <div className="viewer-stage__art" aria-hidden="true"></div>
        <div className="viewer-stage__loading">Cargando modelo 3D…</div>

        <model-viewer
          ref={modelViewerRef}
          id="model-viewer"
          src={rutasActuales.modelo}
          alt={`Modelo 3D de ${organoActual.nombre}`}
          camera-controls
          touch-action="pan-y"
          shadow-intensity="0.8"
          exposure="1"
          environment-image="neutral"
          auto-rotate-delay="500"
          interaction-prompt="auto"
          ar={viewMode === "ar"}
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate={rotating ? true : undefined}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            showToast("No se pudo cargar el modelo 3D");
          }}
        ></model-viewer>

        <button
          id="btn-exit-fullscreen"
          className="exit-fullscreen"
          title="Salir de pantalla completa"
          onClick={() => setFullscreen(false)}
        >
          <Minimize2 size={16} />
          <span>Salir</span>
        </button>
      </div>

      <div className="viewer-actions">
        <div className="viewer-actions__group">
          <button id="btn-reset" title="Restablecer vista" onClick={resetearVista}>
            <RotateCcw size={15} />
            <span>Restablecer</span>
          </button>
          <button id="btn-zoom-in" title="Acercar" onClick={() => ajustarZoom(-4)}>
            <ZoomIn size={15} />
            <span>Acercar</span>
          </button>
          <button id="btn-zoom-out" title="Alejar" onClick={() => ajustarZoom(4)}>
            <ZoomOut size={15} />
            <span>Alejar</span>
          </button>
        </div>
        <div className="viewer-actions__group">
          <button id="btn-fullscreen" title="Pantalla completa" onClick={() => setFullscreen(true)}>
            <Maximize size={15} />
            <span>Pantalla completa</span>
          </button>
        </div>
      </div>
    </section>
  );
}
