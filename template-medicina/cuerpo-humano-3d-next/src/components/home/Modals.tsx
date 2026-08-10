"use client";

import React from "react";
import { X } from "lucide-react";
import { useStudio } from "../../context/StudioContext";
import { ORGANOS, rutasOrgano } from "../../app/data";

export default function Modals() {
  const { 
    modals, setModals, compareA, compareB, 
    getOrgano, selectedId, seleccionarOrgano, 
    setActiveView, anatomyBackground, setAnatomyBackground, 
    rotating, setRotating, modelViewerRef 
  } = useStudio();

  return (
    <>
      {/* Image Modal */}
      {modals.image && (
        <div className="modal is-open" onClick={() => setModals(m => ({ ...m, image: null }))}>
          <div className="modal__panel modal__panel--image" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <h2>{modals.image.title}</h2>
              <button className="modal__close" onClick={() => setModals(m => ({ ...m, image: null }))} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <img src={modals.image.src} alt={modals.image.title} />
            <p>{modals.image.caption}</p>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {modals.compare && (
        <div className="modal is-open" onClick={() => setModals(m => ({ ...m, compare: false }))}>
          <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <h2>Comparar órganos</h2>
              <button className="modal__close" onClick={() => setModals(m => ({ ...m, compare: false }))} aria-label="Cerrar">
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
      {modals.view && (
        <div className="modal is-open" onClick={() => { setModals(m => ({ ...m, view: null })); setActiveView("galeria"); }}>
          <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <h2>{modals.view.title}</h2>
              <button className="modal__close" onClick={() => { setModals(m => ({ ...m, view: null })); setActiveView("galeria"); }} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>
            <div id="modal-view-body">
              {modals.view.type === "biblioteca" && (
                <div className="library-grid">
                  {ORGANOS.map((item) => {
                    const rutas = rutasOrgano(item);
                    return (
                      <button 
                        key={item.id}
                        className="library-item" 
                        onClick={() => {
                          seleccionarOrgano(item.id);
                          setModals(m => ({ ...m, view: null }));
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

              {modals.view.type === "cuaderno" && (
                <div className="notebook">
                  <p><strong>Sistema:</strong> {getOrgano(selectedId).sistema}</p>
                  <p><strong>Función:</strong> {getOrgano(selectedId).funcion}</p>
                  <p><strong>Ubicación:</strong> {getOrgano(selectedId).ubicacion}</p>
                  <p><strong>Importancia:</strong> {getOrgano(selectedId).importancia}</p>
                  <p><strong>Dato curioso:</strong> {getOrgano(selectedId).datoCurioso}</p>
                  <textarea placeholder="Escribe aquí tus observaciones…"></textarea>
                </div>
              )}

              {modals.view.type === "ajustes" && (
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
    </>
  );
}
