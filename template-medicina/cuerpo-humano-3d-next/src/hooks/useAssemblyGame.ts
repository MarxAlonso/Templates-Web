"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ORGANOS, rutasOrgano, Organo } from "../app/data";

const LAYOUT = {
  cerebro: { position: [0, 2.42, 0], scale: 0.9 },
  nasofaringe: { position: [0, 1.95, 0.02], scale: 0.42 },
  tiroides: { position: [0, 1.58, 0.06], scale: 0.42 },
  timo: { position: [0, 1.25, 0.04], scale: 0.44 },
  pulmones: { position: [0, 1.08, -0.02], scale: 1.02 },
  corazon: { position: [0.06, 1.04, 0.22], scale: 0.54 },
  higado: { position: [-0.34, 0.38, 0.12], scale: 0.92 },
  estomago: { position: [0.42, 0.38, 0.16], scale: 0.66 },
  pancreas: { position: [0.12, 0.46, 0.18], scale: 0.62 },
  rinones: { position: [0, 0.42, -0.08], scale: 0.72 },
  intestinos: { position: [0, -0.04, 0.16], scale: 0.96 },
  vejiga: { position: [0, -0.6, 0.18], scale: 0.56 },
  femenino: { position: [0, -0.8, 0.1], scale: 0.64 },
};

export const ORDER = [
  "cerebro",
  "nasofaringe",
  "tiroides",
  "timo",
  "pulmones",
  "corazon",
  "higado",
  "estomago",
  "pancreas",
  "rinones",
  "intestinos",
  "vejiga",
  "femenino",
];

const SCENE_BG = new THREE.Color(0xf8f5f1);
const SPAWN = new THREE.Vector3(-1.92, 1.32, 0.18);
const DROP_THRESHOLD = 0.72;
const BODY_TEXTURE_PATH = "/app-assets/identidad/cuerpo_modelo.png";
const BODY_HEIGHT = 5.8;
const BODY_CENTER_Y = -0.15;
const BODY_Z = -0.5;

export function useAssemblyGame() {
  const [activeId, setActiveId] = useState<string | null>("cerebro");
  const [placedList, setPlacedList] = useState<string[]>([]);
  const [hints, setHints] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showShadows, setShowShadows] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const [autoAssembling, setAutoAssembling] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Refs for ThreeJS objects
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const pieceLayerRef = useRef<THREE.Group | null>(null);
  const burstLayerRef = useRef<THREE.Group | null>(null);

  const stateRef = useRef({
    activeId: "cerebro" as string | null,
    placed: new Set<string>(),
    placementOrder: [] as string[],
    hints: true,
    zoom: 7.4,
    showGrid: true,
    showShadows: false,
    showLabels: false,
    bodyOpacity: 1.0,
    autoAssembling: false,
  });

  const piecesRef = useRef<Map<string, any>>(new Map());
  const markersRef = useRef<Map<string, THREE.Group>>(new Map());
  const bodyMeshesRef = useRef<THREE.Mesh[]>([]);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const animationFrameIdRef = useRef<number | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Interaction State
  const pointer = useRef(new THREE.Vector2()).current;
  const raycaster = useRef(new THREE.Raycaster()).current;
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)).current;
  const dragPoint = useRef(new THREE.Vector3()).current;
  const dragStateRef = useRef({
    piece: null as any,
    offset: new THREE.Vector3(),
    lastClient: { x: 0, y: 0 },
  });

  const selectTokenRef = useRef<number>(0);

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

  // Helper Functions
  const createBodyScaffold = () => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      BODY_TEXTURE_PATH,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        if (rendererRef.current) {
          texture.anisotropy = rendererRef.current.capabilities.getMaxAnisotropy();
        }

        const aspect = texture.image ? texture.image.width / texture.image.height : 0.74;
        const width = BODY_HEIGHT * aspect;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: stateRef.current.bodyOpacity,
          depthWrite: false,
          side: THREE.DoubleSide,
          toneMapped: false,
        });

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, BODY_HEIGHT), material);
        plane.position.set(0, BODY_CENTER_Y, BODY_Z);
        plane.renderOrder = -1;
        bodyMeshesRef.current.push(plane);
        if (stageGroupRef.current) stageGroupRef.current.add(plane);
      },
      undefined,
      (error) => {
        console.error(`No se pudo cargar la imagen del cuerpo en ${BODY_TEXTURE_PATH}`, error);
      }
    );
  };

  const normalizeModel = (root: THREE.Object3D, scaleFactor: number) => {
    const clone = root.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scalar = scaleFactor / maxDimension;
    clone.scale.setScalar(scalar);

    const centeredBox = new THREE.Box3().setFromObject(clone);
    const center = centeredBox.getCenter(new THREE.Vector3());
    clone.position.sub(center);

    clone.traverse((node) => {
      if (!(node as THREE.Mesh).isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;
    });

    return clone;
  };

  const cloneAsGhost = (object: THREE.Object3D) => {
    const ghost = object.clone(true);
    ghost.traverse((node) => {
      if (!(node as THREE.Mesh).isMesh) return;
      (node as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: 0x8bb7ff,
        transparent: true,
        opacity: 0.2,
        roughness: 0.4,
        emissive: 0x1957b7,
        emissiveIntensity: 0.1,
      });
    });
    return ghost;
  };

  const createTargetMarkers = () => {
    ORDER.forEach((id) => {
      const config = LAYOUT[id as keyof typeof LAYOUT];
      const marker = new THREE.Group();
      marker.position.fromArray(config.position);

      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.014, 12, 48),
        new THREE.MeshBasicMaterial({
          color: 0x7aa8f4,
          transparent: true,
          opacity: 0.42,
        })
      );
      halo.rotation.x = Math.PI / 2;

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 18, 18),
        new THREE.MeshBasicMaterial({
          color: 0x2368d9,
          transparent: true,
          opacity: 0.28,
        })
      );

      marker.add(halo, core);
      marker.userData = { halo, core };
      if (stageGroupRef.current) stageGroupRef.current.add(marker);
      markersRef.current.set(id, marker);
    });
  };

  const updateMarkerStates = () => {
    markersRef.current.forEach((marker, id) => {
      const isPlaced = stateRef.current.placed.has(id);
      const isActive = id === stateRef.current.activeId;
      marker.visible = stateRef.current.hints && stateRef.current.showLabels && !isPlaced;
      marker.scale.setScalar(isActive ? 1.3 : 1);
      marker.userData.halo.material.opacity = isActive ? 0.95 : 0.32;
      marker.userData.core.material.opacity = isActive ? 0.65 : 0.18;
    });
  };

  const ensurePieceLoaded = (id: string): Promise<any> => {
    const existing = piecesRef.current.get(id);
    if (existing) return Promise.resolve(existing);

    const organo = getOrgano(id);
    const config = LAYOUT[id as keyof typeof LAYOUT];
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(
        rutasOrgano(organo).modelo,
        (gltf) => {
          const normalized = normalizeModel(gltf.scene, config.scale);

          const live = new THREE.Group();
          live.add(normalized.clone(true));
          live.position.copy(SPAWN);
          live.visible = false;
          live.userData = { id };

          const ghost = new THREE.Group();
          ghost.add(cloneAsGhost(normalized));
          ghost.position.fromArray(config.position);
          ghost.visible = false;

          if (pieceLayerRef.current) {
            pieceLayerRef.current.add(ghost, live);
          }

          const piece = {
            id,
            live,
            ghost,
            target: new THREE.Vector3(...config.position),
            placed: false,
          };
          piecesRef.current.set(id, piece);
          resolve(piece);
        },
        undefined,
        (error) => {
          console.error(`Error loading GLB for piece: ${id}`, error);
          reject(error);
        }
      );
    });
  };

  const preloadPieces = () => {
    ORDER.forEach((id) => {
      ensurePieceLoaded(id).catch((error) => {
        console.warn(`No se pudo precargar ${id}`, error);
      });
    });
  };

  const selectPiece = async (id: string) => {
    if (stateRef.current.placed.has(id)) {
      showToast(`${getOrgano(id).nombre} ya está colocado`);
      return;
    }

    stateRef.current.activeId = id;
    setActiveId(id);

    const currentToken = ++selectTokenRef.current;
    updateMarkerStates();

    let active;
    try {
      active = await ensurePieceLoaded(id);
    } catch (error) {
      showToast(`No se pudo cargar ${getOrgano(id).nombre}`);
      return;
    }

    if (currentToken !== selectTokenRef.current) return;

    piecesRef.current.forEach((piece) => {
      if (piece.placed) return;
      piece.live.visible = piece.id === id;
      piece.ghost.visible = stateRef.current.hints && piece.id === id;
      piece.ghost.traverse((node: any) => {
        if (node.isMesh && node.material) {
          node.material.opacity = 0.34;
          node.material.emissiveIntensity = 0.34;
        }
      });
    });

    active.live.position.copy(SPAWN);
    active.ghost.visible = stateRef.current.hints;
  };

  const selectNextPending = async () => {
    const pending = ORDER.filter((id) => !stateRef.current.placed.has(id));
    if (!pending.length) return;
    const nextId = pending[0];
    await selectPiece(nextId);
  };

  const selectRandomPending = async () => {
    const pending = ORDER.filter((id) => !stateRef.current.placed.has(id));
    if (!pending.length) {
      showToast("Todas las piezas están colocadas");
      return;
    }
    const randId = pending[Math.floor(Math.random() * pending.length)];
    await selectPiece(randId);
  };

  const pulsePiece = (group: THREE.Group) => {
    group.userData.pulse = 1;
  };

  const celebrate = () => {
    if (!burstLayerRef.current) return;
    burstLayerRef.current.clear();
    const geometry = new THREE.BufferGeometry();
    const points = [];
    const colors = [];
    const palette = [0x2368d9, 0x1f9d72, 0xf5a524, 0xd84f70];

    for (let i = 0; i < 120; i += 1) {
      points.push(
        (Math.random() - 0.5) * 2.6,
        0.8 + Math.random() * 2.1,
        (Math.random() - 0.5) * 1.2
      );
      const color = new THREE.Color(palette[i % palette.length]);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });
    const burst = new THREE.Points(geometry, material);
    burst.userData = { createdAt: performance.now() };
    burstLayerRef.current.add(burst);
  };

  const placePiece = (piece: any) => {
    piece.placed = true;
    piece.live.position.copy(piece.target);
    piece.live.visible = true;
    piece.ghost.visible = false;

    stateRef.current.placed.add(piece.id);
    stateRef.current.placementOrder.push(piece.id);
    stateRef.current.activeId = null;

    setPlacedList(Array.from(stateRef.current.placed));
    setActiveId(null);

    updateMarkerStates();
    showToast(`${getOrgano(piece.id).nombre} colocado`);
    pulsePiece(piece.live);

    if (stateRef.current.placed.size === ORDER.length) {
      celebrate();
    } else {
      selectNextPending();
    }
  };

  const undoLastPlacement = () => {
    const lastId = stateRef.current.placementOrder.pop();
    if (!lastId) {
      showToast("No hay piezas para deshacer");
      return;
    }

    const piece = piecesRef.current.get(lastId);
    if (piece) {
      piece.placed = false;
      piece.live.position.copy(SPAWN);
      piece.live.visible = true;
      piece.ghost.visible = stateRef.current.hints;
    }

    stateRef.current.placed.delete(lastId);
    stateRef.current.activeId = lastId;

    setPlacedList(Array.from(stateRef.current.placed));
    setActiveId(lastId);

    updateMarkerStates();
    selectPiece(lastId);
  };

  const resetAssembly = () => {
    stateRef.current.autoAssembling = false;
    stateRef.current.placed.clear();
    stateRef.current.placementOrder = [];

    piecesRef.current.forEach((piece) => {
      piece.placed = false;
      piece.live.visible = false;
      piece.live.position.copy(SPAWN);
      piece.ghost.visible = false;
    });

    stateRef.current.activeId = ORDER[0];

    setPlacedList([]);
    setActiveId(ORDER[0]);
    setAutoAssembling(false);

    updateMarkerStates();
    selectPiece(ORDER[0]);
    showToast("Armado reiniciado");
  };

  const animatePieceToTarget = (piece: any, duration = 650): Promise<void> => {
    return new Promise((resolve) => {
      const start = piece.live.position.clone();
      const end = piece.target.clone();
      const startTime = performance.now();

      const step = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        piece.live.position.lerpVectors(start, end, eased);

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  };

  const autoAssemble = async () => {
    if (stateRef.current.autoAssembling) return;
    if (stateRef.current.placed.size === ORDER.length) {
      showToast("El cuerpo ya está armado");
      return;
    }

    stateRef.current.autoAssembling = true;
    setAutoAssembling(true);
    showToast("Armando el cuerpo…");

    try {
      const pending = ORDER.filter((id) => !stateRef.current.placed.has(id));
      for (const id of pending) {
        if (!stateRef.current.autoAssembling) break;
        await selectPiece(id);
        const piece = piecesRef.current.get(id);
        if (!piece || piece.placed) continue;
        await animatePieceToTarget(piece);
        placePiece(piece);
        await new Promise((resolve) => setTimeout(resolve, 450));
      }
    } finally {
      stateRef.current.autoAssembling = false;
      setAutoAssembling(false);
    }
  };

  // Scene Controls
  const setShadows = (enabled: boolean) => {
    stateRef.current.showShadows = enabled;
    setShowShadows(enabled);
    if (rendererRef.current) rendererRef.current.shadowMap.enabled = enabled;
    if (keyLightRef.current) keyLightRef.current.castShadow = enabled;
    if (sceneRef.current) {
      sceneRef.current.traverse((obj: any) => {
        if (obj.isMesh && obj.material) {
          obj.material.needsUpdate = true;
        }
      });
    }
  };

  const setGridVisible = (visible: boolean) => {
    stateRef.current.showGrid = visible;
    setShowGrid(visible);
    if (gridRef.current) gridRef.current.visible = visible;
  };

  const setLabelsVisible = (visible: boolean) => {
    stateRef.current.showLabels = visible;
    setShowLabels(visible);
    updateMarkerStates();
  };

  const setHintsConfig = (enabled: boolean) => {
    stateRef.current.hints = enabled;
    setHints(enabled);
    piecesRef.current.forEach((piece) => {
      piece.ghost.visible = enabled && !piece.placed && piece.id === stateRef.current.activeId;
    });
    updateMarkerStates();
  };

  const centrarVista = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(4.7, 2.7, stateRef.current.zoom);
      controlsRef.current.target.set(0, 0.18, 0);
      controlsRef.current.update();
    }
  };

  const ajustarZoom = (delta: number) => {
    stateRef.current.zoom = Math.min(18, Math.max(2.5, stateRef.current.zoom + delta));
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.setLength(stateRef.current.zoom);
      controlsRef.current.update();
    }
  };

  // Input Handlers
  const setPointer = (event: MouseEvent | Touch) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (stateRef.current.autoAssembling) return;
    if (!stateRef.current.activeId) return;

    const piece = piecesRef.current.get(stateRef.current.activeId);
    if (!piece || piece.placed || !piece.live.visible) return;

    setPointer(event.nativeEvent);
    raycaster.setFromCamera(pointer, cameraRef.current!);

    const activeMarker = markersRef.current.get(stateRef.current.activeId);
    const markerHits = activeMarker ? raycaster.intersectObject(activeMarker, true) : [];
    if (markerHits.length) {
      placePiece(piece);
      return;
    }

    const hits = raycaster.intersectObject(piece.live, true);
    if (!hits.length) return;

    raycaster.ray.intersectPlane(dragPlane, dragPoint);
    dragStateRef.current.piece = piece;
    dragStateRef.current.lastClient = { x: event.clientX, y: event.clientY };
    dragStateRef.current.offset.copy(piece.live.position).sub(dragPoint);
    if (controlsRef.current) controlsRef.current.enabled = false;
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (stateRef.current.autoAssembling) return;
    const piece = piecesRef.current.get(stateRef.current.activeId || "");
    if (!piece || piece.placed) return;

    setPointer(event.nativeEvent);
    raycaster.setFromCamera(pointer, cameraRef.current!);

    const activeMarker = markersRef.current.get(stateRef.current.activeId || "");
    if (!activeMarker) return;

    const markerHits = raycaster.intersectObject(activeMarker, true);
    if (markerHits.length) placePiece(piece);
  };

  // Drag and drop setup inside useEffect
  useEffect(() => {
    const handlePointerMoveGlobal = (event: PointerEvent) => {
      if (!dragStateRef.current.piece || !canvasRef.current || !cameraRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      dragStateRef.current.lastClient = { x: event.clientX, y: event.clientY };
      raycaster.setFromCamera(pointer, cameraRef.current);
      raycaster.ray.intersectPlane(dragPlane, dragPoint);

      const piece = dragStateRef.current.piece;
      piece.live.position.copy(dragPoint).add(dragStateRef.current.offset);
      piece.live.position.x = THREE.MathUtils.clamp(piece.live.position.x, -2.25, 2.25);
      piece.live.position.y = THREE.MathUtils.clamp(piece.live.position.y, -1.45, 2.8);
    };

    const handlePointerUpGlobal = (event: PointerEvent) => {
      if (!dragStateRef.current.piece || !canvasRef.current || !cameraRef.current) return;
      const piece = dragStateRef.current.piece;
      const distance = piece.live.position.distanceTo(piece.target);

      const screenTarget = piece.target.clone().project(cameraRef.current);
      const canvasWidth = canvasRef.current.clientWidth;
      const canvasHeight = canvasRef.current.clientHeight;
      const targetX = (screenTarget.x * 0.5 + 0.5) * canvasWidth;
      const targetY = (-screenTarget.y * 0.5 + 0.5) * canvasHeight;
      const rect = canvasRef.current.getBoundingClientRect();

      const clientX = event.clientX ?? dragStateRef.current.lastClient.x;
      const clientY = event.clientY ?? dragStateRef.current.lastClient.y;

      const screenDistance = Math.hypot(
        clientX - rect.left - targetX,
        clientY - rect.top - targetY
      );

      if (distance <= DROP_THRESHOLD || screenDistance <= 90) {
        placePiece(piece);
      } else {
        piece.live.position.copy(SPAWN);
        showToast("Acércala más a la silueta");
      }

      dragStateRef.current.piece = null;
      if (controlsRef.current) controlsRef.current.enabled = true;
    };

    window.addEventListener("pointermove", handlePointerMoveGlobal);
    window.addEventListener("pointerup", handlePointerUpGlobal);

    return () => {
      window.removeEventListener("pointermove", handlePointerMoveGlobal);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    };
  }, []);

  const attachCardDragStart = (id: string, event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (stateRef.current.autoAssembling) return;
    if (stateRef.current.placed.has(id)) return;

    let dragTransferred = false;
    const startX = event.clientX;
    const startY = event.clientY;

    const onMove = (moveEvent: PointerEvent) => {
      if (dragTransferred) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (Math.hypot(dx, dy) < 6) return;

      dragTransferred = true;
      selectPiece(id).then(() => {
        const piece = piecesRef.current.get(id);
        if (!piece || piece.placed || !canvasRef.current || !cameraRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        pointer.x = ((moveEvent.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((moveEvent.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, cameraRef.current);
        raycaster.ray.intersectPlane(dragPlane, dragPoint);

        piece.live.position.copy(dragPoint);
        piece.live.visible = true;

        dragStateRef.current.piece = piece;
        dragStateRef.current.lastClient = { x: moveEvent.clientX, y: moveEvent.clientY };
        dragStateRef.current.offset.set(0, 0, 0);

        if (controlsRef.current) controlsRef.current.enabled = false;
      });
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    selectPiece(id);
  };

  // Canvas context creation
  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(SCENE_BG, 1);
    renderer.shadowMap.enabled = stateRef.current.showShadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = SCENE_BG;
    scene.fog = new THREE.Fog(SCENE_BG, 7.6, 11.5);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(4.7, 2.7, stateRef.current.zoom);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 18;
    controls.target.set(0, 0.18, 0);
    controlsRef.current = controls;

    const ambient = new THREE.HemisphereLight(0xffffff, 0xded5cb, 2.3);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = stateRef.current.showShadows;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xbfd8ff, 1.8);
    fillLight.position.set(-4, 3, 4);
    scene.add(fillLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);
    stageGroupRef.current = stageGroup;

    const pieceLayer = new THREE.Group();
    scene.add(pieceLayer);
    pieceLayerRef.current = pieceLayer;

    const burstLayer = new THREE.Group();
    scene.add(burstLayer);
    burstLayerRef.current = burstLayer;

    const grid = new THREE.GridHelper(6.8, 22, 0xd8d6d1, 0xe7e2db);
    grid.position.y = -1.66;
    grid.rotation.x = Math.PI / 2;
    grid.visible = stateRef.current.showGrid;
    stageGroup.add(grid);
    gridRef.current = grid;

    const plinth = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 0.12, 2.2),
      new THREE.MeshStandardMaterial({
        color: 0xf4f0ea,
        roughness: 0.78,
        metalness: 0.02,
      })
    );
    plinth.position.set(0, -1.69, 0);
    plinth.receiveShadow = true;
    stageGroup.add(plinth);

    createBodyScaffold();
    createTargetMarkers();

    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current) return;
      const { clientWidth, clientHeight } = canvasRef.current.parentElement!;
      rendererRef.current.setSize(clientWidth, clientHeight, false);
      cameraRef.current.aspect = clientWidth / clientHeight;
      cameraRef.current.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    selectPiece(stateRef.current.activeId!);
    preloadPieces();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();

      if (controlsRef.current) controlsRef.current.update();

      piecesRef.current.forEach((piece) => {
        if (piece.live.userData.pulse) {
          piece.live.userData.pulse = Math.max(0, piece.live.userData.pulse - delta * 1.8);
          const scale = 1 + piece.live.userData.pulse * 0.08;
          piece.live.scale.setScalar(scale);
          if (!piece.live.userData.pulse) piece.live.scale.setScalar(1);
        }
      });

      if (burstLayerRef.current) {
        burstLayerRef.current.children.forEach((burst: any) => {
          const age = performance.now() - burst.userData.createdAt;
          burst.position.y += delta * 0.35;
          burst.material.opacity = Math.max(0, 1 - age / 1800);
          if (age > 1800) burstLayerRef.current!.remove(burst);
        });
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (controlsRef.current) controlsRef.current.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
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
    selectPiece,
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
  };
}
