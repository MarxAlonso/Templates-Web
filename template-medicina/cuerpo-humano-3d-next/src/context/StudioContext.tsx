"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { ORGANOS, Organo } from "../app/data";

type ViewMode = "3d" | "ar" | "360";
type ActiveView = "galeria" | "biblioteca" | "cuaderno" | "ajustes";

interface ModalState {
  image: { src: string; title: string; caption: string } | null;
  compare: boolean;
  view: { title: string; type: ActiveView } | null;
}

interface StudioContextProps {
  selectedId: string;
  setSelectedId: (id: string) => void;
  compareA: string;
  setCompareA: (id: string) => void;
  compareB: string;
  setCompareB: (id: string) => void;
  anatomyBackground: boolean;
  setAnatomyBackground: (val: boolean) => void;
  rotating: boolean;
  setRotating: (val: boolean) => void;
  fullscreen: boolean;
  setFullscreen: (val: boolean) => void;
  fieldOfView: number;
  setFieldOfView: (val: number) => void;
  viewMode: ViewMode;
  setViewMode: (val: ViewMode) => void;
  activeView: ActiveView;
  setActiveView: (val: ActiveView) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  collapsedStates: Record<string, boolean>;
  toggleCollapsed: (key: string) => void;
  modals: ModalState;
  setModals: React.Dispatch<React.SetStateAction<ModalState>>;
  toastMsg: string | null;
  showToast: (msg: string) => void;
  modelViewerRef: React.MutableRefObject<any>;
  theme: "light" | "dark";
  toggleTheme: () => void;
  getOrgano: (id: string) => Organo;
  seleccionarOrgano: (id: string) => void;
  resetearVista: () => void;
  ajustarZoom: (delta: number) => void;
  handleModeChange: (mode: ViewMode) => void;
  handleNavClick: (view: ActiveView) => void;
}

const StudioContext = createContext<StudioContextProps | undefined>(undefined);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string>("higado");
  const [compareA, setCompareA] = useState<string>("higado");
  const [compareB, setCompareB] = useState<string>("estomago");
  const [anatomyBackground, setAnatomyBackground] = useState<boolean>(true);
  const [rotating, setRotating] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [fieldOfView, setFieldOfView] = useState<number>(32);
  const [viewMode, setViewMode] = useState<ViewMode>("3d");
  const [activeView, setActiveView] = useState<ActiveView>("galeria");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [collapsedStates, setCollapsedStates] = useState<Record<string, boolean>>({
    galeria: false,
    comparar: false,
    notas: false
  });

  const [modals, setModals] = useState<ModalState>({
    image: null,
    compare: false,
    view: null
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    import("@google/model-viewer").catch(err => console.error("Error loading model-viewer", err));
  }, []);

  useEffect(() => {
    try {
      const savedCollapse = localStorage.getItem("chs_collapse");
      if (savedCollapse) setCollapsedStates(JSON.parse(savedCollapse));
      
      const savedTheme = localStorage.getItem("chs_theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("chs_theme", nextTheme);
  };

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
    const nextStates = { ...collapsedStates, [key]: !collapsedStates[key] };
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

  const handleModeChange = (mode: ViewMode) => {
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

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    if (view === "galeria") {
      setModals(m => ({ ...m, view: null }));
    } else {
      let title = "";
      if (view === "biblioteca") title = "Biblioteca de órganos";
      if (view === "cuaderno") title = `Cuaderno · ${getOrgano(selectedId).nombre}`;
      if (view === "ajustes") title = "Ajustes";
      setModals(m => ({ ...m, view: { title, type: view } }));
    }
  };

  return (
    <StudioContext.Provider value={{
      selectedId, setSelectedId,
      compareA, setCompareA,
      compareB, setCompareB,
      anatomyBackground, setAnatomyBackground,
      rotating, setRotating,
      fullscreen, setFullscreen,
      fieldOfView, setFieldOfView,
      viewMode, setViewMode,
      activeView, setActiveView,
      isLoading, setIsLoading,
      collapsedStates, toggleCollapsed,
      modals, setModals,
      toastMsg, showToast,
      modelViewerRef,
      theme, toggleTheme,
      getOrgano, seleccionarOrgano,
      resetearVista, ajustarZoom,
      handleModeChange, handleNavClick
    }}>
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (context === undefined) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
}
