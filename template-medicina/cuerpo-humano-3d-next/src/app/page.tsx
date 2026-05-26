"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Minimize2, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  ChevronDown, 
  X, 
  Layers3, 
  Activity, 
  MapPin, 
  Link2
} from "lucide-react";
import { ORGANOS, rutasOrgano, Organo } from "./data";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>("higado");
  const [compareA, setCompareA] = useState<string>("higado");
  const [compareB, setCompareB] = useState<string>("estomago");
  const [anatomyBackground, setAnatomyBackground] = useState<boolean>(true);
  const [rotating, setRotating] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [fieldOfView, setFieldOfView] = useState<number>(32);
  const [viewMode, setViewMode] = useState<"3d" | "ar" | "360">("3d");
  const [activeView, setActiveView] = useState<"galeria" | "biblioteca" | "cuaderno" | "ajustes">("galeria");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Collapse state for cards, loaded from local storage
  const [collapsedStates, setCollapsedStates] = useState<Record<string, boolean>>({
    galeria: false,
    comparar: false,
    notas: false
  });

  // Modal States
  const [imageModal, setImageModal] = useState<{ src: string; title: string; caption: string } | null>(null);
  const [compareModalOpen, setCompareModalOpen] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<{ title: string; type: "biblioteca" | "cuaderno" | "ajustes" } | null>(null);
  
  // Toast state
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Model-viewer reference
  const modelViewerRef = useRef<any>(null);

  // Load model-viewer dynamically client-side only
  useEffect(() => {
    import("@google/model-viewer").catch(err => console.error("Error loading model-viewer", err));
  }, []);

  // Sync collapsed state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chs_collapse");
      if (saved) {
        setCollapsedStates(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Keypress listener for Escape to close modals and fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImageModal(null);
        setCompareModalOpen(false);
        setViewModal(null);
        setActiveView("galeria");
        if (fullscreen) setFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreen]);

  const showToast = (message: string) => {
    setToastMsg(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMsg(null);
    }, 1800);
  };

  const getOrgano = (id: string): Organo => {
    return ORGANOS.find((o) => o.id === id) || ORGANOS[0];
  };

  const seleccionarOrgano = (id: string) => {
    if (!ORGANOS.some((o) => o.id === id)) return;
    setSelectedId(id);
    setCompareA(id);
    setIsLoading(true);

    if (compareB === id) {
      const alterno = ORGANOS.find((o) => o.id !== id);
      if (alterno) setCompareB(alterno.id);
    }
  };

  const toggleCollapsed = (key: string) => {
    const nextStates = {
      ...collapsedStates,
      [key]: !collapsedStates[key]
    };
    setCollapsedStates(nextStates);
    try {
      localStorage.setItem("chs_collapse", JSON.stringify(nextStates));
    } catch (e) {}
  };

  const resetearVista = () => {
    setFieldOfView(32);
    if (modelViewerRef.current) {
      modelViewerRef.current.setAttribute("camera-orbit", "0deg 75deg 135%");
      modelViewerRef.current.setAttribute("field-of-view", "32deg");
      if (modelViewerRef.current.resetTurntableRotation) {
        modelViewerRef.current.resetTurntableRotation();
      }
    }
    showToast("Vista restablecida");
  };

  const ajustarZoom = (delta: number) => {
    const nextFov = Math.min(48, Math.max(18, fieldOfView + delta));
    setFieldOfView(nextFov);
    if (modelViewerRef.current) {
      modelViewerRef.current.setAttribute("field-of-view", `${nextFov}deg`);
    }
  };

  const handleModeChange = (mode: "3d" | "ar" | "360") => {
    setViewMode(mode);
    if (mode === "ar") {
      if (modelViewerRef.current && modelViewerRef.current.canActivateAR) {
        modelViewerRef.current.activateAR();
      } else {
        showToast("AR no disponible en este dispositivo");
      }
    } else if (mode === "360") {
      setRotating(true);
      showToast("Vista 360° activada");
    } else if (mode === "3d") {
      setRotating(false);
    }
  };

  const handleNavClick = (view: "galeria" | "biblioteca" | "cuaderno" | "ajustes") => {
    setActiveView(view);
    if (view === "galeria") {
      setViewModal(null);
    } else {
      let title = "";
      if (view === "biblioteca") title = "Biblioteca de órganos";
      if (view === "cuaderno") title = `Cuaderno · ${getOrgano(selectedId).nombre}`;
      if (view === "ajustes") title = "Ajustes";
      setViewModal({ title, type: view });
    }
  };

  const organoActual = getOrgano(selectedId);
  const rutasActuales = rutasOrgano(organoActual);

  return (
    <div className={`app ${fullscreen ? "is-fullscreen" : ""}`} id="app">
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
        </nav>

        <div className="topbar__avatar" title="Perfil" aria-label="Perfil"></div>
      </header>

      <main className="workspace">
        {/* Sidebar list of organs */}
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

        {/* Center column: Viewer and Bottom panels */}
        <section className="center-column">
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
                auto-rotate={rotating}
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

          <div className="center-bottom">
            {/* Gallery card */}
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
                    onClick={() => setImageModal({
                      src: rutasActuales.anatomia,
                      title: `Anatomía · ${organoActual.nombre}`,
                      caption: organoActual.importancia
                    })}
                  >
                    <img src={rutasActuales.anatomia} alt="Anatomía" />
                    <span>Anatomía</span>
                  </button>
                  <button 
                    className="gallery__item" 
                    onClick={() => setImageModal({
                      src: rutasActuales.ficha,
                      title: `Ficha visual · ${organoActual.nombre}`,
                      caption: organoActual.resumen
                    })}
                  >
                    <img src={rutasActuales.ficha} alt="Ficha visual" />
                    <span>Ficha visual</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Compare organs card */}
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
                <button className="compare-open" onClick={() => setCompareModalOpen(true)}>
                  Abrir comparación
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Right column: Detail cards */}
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
      </main>

      {/* Image Modal */}
      {imageModal && (
        <div className="modal is-open" onClick={() => setImageModal(null)}>
          <div className="modal__panel modal__panel--image" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <h2>{imageModal.title}</h2>
              <button className="modal__close" onClick={() => setImageModal(null)} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <img src={imageModal.src} alt={imageModal.title} />
            <p>{imageModal.caption}</p>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {compareModalOpen && (
        <div className="modal is-open" onClick={() => setCompareModalOpen(false)}>
          <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <h2>Comparar órganos</h2>
              <button className="modal__close" onClick={() => setCompareModalOpen(false)} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <div className="compare-grid" id="compare-grid">
              {[getOrgano(compareA), getOrgano(compareB)].map((organo, idx) => {
                const rutas = rutasOrgano(organo);
                return (
                  <article key={organo.id + idx} className="compare-col">
                    <div className="compare-col__hero">
                      <img src={rutas.imagen} alt={organo.nombre} />
                      <div>
                        <strong>{organo.nombre}</strong>
                        <em>{organo.descriptor}</em>
                      </div>
                    </div>
                    <dl>
                      <div><dt>Sistema</dt><dd>{organo.sistema}</dd></div>
                      <div><dt>Función</dt><dd>{organo.funcion}</dd></div>
                      <div><dt>Ubicación</dt><dd>{organo.ubicacion}</dd></div>
                      <div><dt>Relación</dt><dd>{organo.relacion}</dd></div>
                      <div><dt>Tamaño</dt><dd>{organo.tamano}</dd></div>
                      <div><dt>Importancia</dt><dd>{organo.importancia}</dd></div>
                      <div><dt>Dato curioso</dt><dd>{organo.datoCurioso}</dd></div>
                    </dl>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View Modal (Biblioteca, Cuaderno, Ajustes) */}
      {viewModal && (
        <div className="modal is-open" onClick={() => { setViewModal(null); setActiveView("galeria"); }}>
          <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <h2>{viewModal.title}</h2>
              <button className="modal__close" onClick={() => { setViewModal(null); setActiveView("galeria"); }} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <div id="modal-view-body">
              {viewModal.type === "biblioteca" && (
                <div className="library-grid">
                  {ORGANOS.map((item) => {
                    const rutas = rutasOrgano(item);
                    return (
                      <button 
                        key={item.id}
                        className="library-item" 
                        onClick={() => {
                          seleccionarOrgano(item.id);
                          setViewModal(null);
                          setActiveView("galeria");
                        }}
                      >
                        <img src={rutas.imagen} alt="" />
                        <strong>{item.nombre}</strong>
                        <span>{item.sistema}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {viewModal.type === "cuaderno" && (
                <div className="notebook">
                  <p><strong>Sistema:</strong> {getOrgano(selectedId).sistema}</p>
                  <p><strong>Función:</strong> {getOrgano(selectedId).funcion}</p>
                  <p><strong>Ubicación:</strong> {getOrgano(selectedId).ubicacion}</p>
                  <p><strong>Importancia:</strong> {getOrgano(selectedId).importancia}</p>
                  <p><strong>Dato curioso:</strong> {getOrgano(selectedId).datoCurioso}</p>
                  <textarea placeholder="Escribe aquí tus observaciones…"></textarea>
                </div>
              )}

              {viewModal.type === "ajustes" && (
                <div className="settings">
                  <label>
                    <span>Fondo anatómico por defecto</span>
                    <input 
                      type="checkbox" 
                      id="cfg-anatomy" 
                      checked={anatomyBackground} 
                      onChange={(e) => setAnatomyBackground(e.target.checked)}
                    />
                  </label>
                  <label>
                    <span>Auto-rotación al activar 360°</span>
                    <input 
                      type="checkbox" 
                      id="cfg-rotate" 
                      checked={rotating} 
                      onChange={(e) => {
                        setRotating(e.target.checked);
                        if (modelViewerRef.current) {
                          if (e.target.checked) {
                            modelViewerRef.current.setAttribute("auto-rotate", "");
                          } else {
                            modelViewerRef.current.removeAttribute("auto-rotate");
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div className={`toast ${toastMsg ? "is-show" : ""}`} id="toast">
        {toastMsg || "Listo"}
      </div>
    </div>
  );
}
