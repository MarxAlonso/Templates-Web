"use client";

import React, { useEffect } from "react";
import { StudioProvider, useStudio } from "../context/StudioContext";
import Topbar from "../components/home/Topbar";
import Sidebar from "../components/home/Sidebar";
import Viewer3D from "../components/home/Viewer3D";
import GalleryCard from "../components/home/GalleryCard";
import CompareCard from "../components/home/CompareCard";
import RightPanel from "../components/home/RightPanel";
import Modals from "../components/home/Modals";

function StudioApp() {
  const { fullscreen, setFullscreen, setModals, setActiveView, toastMsg } = useStudio();

  // Keypress listener for Escape to close modals and fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModals(m => ({ ...m, image: null, compare: false, view: null }));
        setActiveView("galeria");
        if (fullscreen) setFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreen, setFullscreen, setModals, setActiveView]);

  return (
    <div className={`app ${fullscreen ? "is-fullscreen" : ""}`} id="app">
      <Topbar />

      <main className="workspace">
        <Sidebar />

        <section className="center-column">
          <Viewer3D />

          <div className="center-bottom">
            <GalleryCard />
            <CompareCard />
          </div>
        </section>

        <RightPanel />
      </main>

      <Modals />

      {/* Toast notifications */}
      <div className={`toast ${toastMsg ? "is-show" : ""}`} id="toast">
        {toastMsg || "Listo"}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <StudioProvider>
      <StudioApp />
    </StudioProvider>
  );
}
