"use client";

import React from "react";
import { useAssemblyGame, ORDER } from "../../hooks/useAssemblyGame";
import { Header } from "../../components/studio/Header";
import { ToolRail } from "../../components/studio/ToolRail";
import { LessonPanel } from "../../components/studio/LessonPanel";
import { PiecePanel } from "../../components/studio/PiecePanel";
import "./../studio.css";

export default function Studio() {
  const {
    canvasRef,
    activeId,
    placedList,
    hints,
    showGrid,
    showShadows,
    showLabels,
    autoAssembling,
    toastMsg,
    getOrgano,
    selectRandomPending,
    undoLastPlacement,
    resetAssembly,
    autoAssemble,
    centrarVista,
    ajustarZoom,
    setShadows,
    setGridVisible,
    setLabelsVisible,
    setHintsConfig,
    handlePointerDown,
    handleCanvasClick,
    attachCardDragStart,
  } = useAssemblyGame();

  const activeOrgano = getOrgano(activeId || ORDER[0]);

  return (
    <div className="studio-body">
      <div className="studio-app">
        <Header />

        <main className="studio-workspace">
          <ToolRail
            autoAssembling={autoAssembling}
            hints={hints}
            autoAssemble={autoAssemble}
            centrarVista={centrarVista}
            setHintsConfig={setHintsConfig}
            ajustarZoom={ajustarZoom}
          />

          <section className="scene-shell">
            <div className="scene-canvas-wrap">
              <canvas
                ref={canvasRef}
                id="assembly-canvas"
                aria-label="Escena 3D para armar el cuerpo humano"
                onPointerDown={handlePointerDown}
                onClick={handleCanvasClick}
              ></canvas>
            </div>

            <LessonPanel
              activeOrgano={activeOrgano}
              undoLastPlacement={undoLastPlacement}
              resetAssembly={resetAssembly}
            />
          </section>

          <PiecePanel
            activeId={activeId}
            placedList={placedList}
            showShadows={showShadows}
            showGrid={showGrid}
            showLabels={showLabels}
            selectRandomPending={selectRandomPending}
            setShadows={setShadows}
            setGridVisible={setGridVisible}
            setLabelsVisible={setLabelsVisible}
            attachCardDragStart={attachCardDragStart}
            getOrgano={getOrgano}
          />
        </main>
      </div>

      <div className={`toast ${toastMsg ? "is-show" : ""}`} id="studio-toast">
        {toastMsg || "Listo"}
      </div>
    </div>
  );
}
