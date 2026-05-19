import React from "react";
import { Box, Scan, Sparkles, ZoomIn, ZoomOut } from "lucide-react";

interface ToolRailProps {
  autoAssembling: boolean;
  hints: boolean;
  autoAssemble: () => void;
  centrarVista: () => void;
  setHintsConfig: (enabled: boolean) => void;
  ajustarZoom: (delta: number) => void;
}

export function ToolRail({
  autoAssembling,
  hints,
  autoAssemble,
  centrarVista,
  setHintsConfig,
  ajustarZoom,
}: ToolRailProps) {
  return (
    <aside className="tool-rail" aria-label="Herramientas">
      <button 
        className={autoAssembling ? "is-active is-running" : "is-active"} 
        id="btn-place" 
        title="Colocar piezas automáticamente"
        onClick={autoAssemble}
        disabled={autoAssembling}
      >
        <Box size={22} />
        <span>{autoAssembling ? "Armando…" : "Colocar"}</span>
      </button>
      <button id="btn-focus" title="Centrar vista" onClick={centrarVista}>
        <Scan size={22} />
        <span>Centrar</span>
      </button>
      <button 
        id="btn-hints" 
        className={hints ? "is-active" : ""} 
        title="Mostrar pistas"
        onClick={() => setHintsConfig(!hints)}
      >
        <Sparkles size={22} />
        <span>Pistas</span>
      </button>
      <button id="btn-zoom-in" title="Acercar" onClick={() => ajustarZoom(-0.6)}>
        <ZoomIn size={22} />
        <span>Zoom +</span>
      </button>
      <button id="btn-zoom-out" title="Alejar" onClick={() => ajustarZoom(0.6)}>
        <ZoomOut size={22} />
        <span>Zoom -</span>
      </button>
    </aside>
  );
}
