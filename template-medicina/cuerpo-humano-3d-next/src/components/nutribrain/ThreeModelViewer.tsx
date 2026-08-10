"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Octahedron, Line, useGLTF, Stage, Center } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

function HeartModel() {
  const { scene } = useGLTF('/models/heart.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.03;
    if (groupRef.current) {
      groupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Stage intensity={0.5} environment="city" adjustCamera={true}>
      <Center>
        <group ref={groupRef}>
          <primitive object={scene} />
        </group>
      </Center>
    </Stage>
  );
}

useGLTF.preload('/models/heart.glb');

function NeuronModel() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 20; i++) {
      const radius = 2;
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      p.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(angle),
        radius * Math.sin(phi) * Math.sin(angle),
        radius * Math.cos(phi)
      ));
    }
    return p;
  }, []);

  return (
    <group>
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </Sphere>
      {points.map((p, i) => (
        <Line key={i} points={[new THREE.Vector3(0,0,0), p]} color="#10b981" lineWidth={1} transparent opacity={0.4} />
      ))}
      {points.map((p, i) => (
        <Sphere key={`s-${i}`} position={p} args={[0.1, 16, 16]}>
           <meshStandardMaterial color="#34d399" />
        </Sphere>
      ))}
    </group>
  );
}

function DefenseModel() {
  return (
    <group>
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial speed={2} distort={0.3} color="#6366f1" />
      </Sphere>
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial color="#818cf8" />
      </Torus>
    </group>
  );
}

// New nutrition-related 3D models

function VitaminPillModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Pill capsule shape */}
        <group position={[0, 0, 0]}>
          {/* Top half */}
          <Sphere args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.2} />
          </Sphere>
          {/* Bottom half */}
          <Sphere args={[0.4, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} position={[0, -0.2, 0]}>
            <meshStandardMaterial color="#10b981" metalness={0.3} roughness={0.2} />
          </Sphere>
          {/* Glow effect */}
          <Sphere args={[0.5, 32, 32]}>
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} transparent opacity={0.3} />
          </Sphere>
        </group>
      </Float>
    </group>
  );
}

function FoodPlateModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Plate base */}
        <Cylinder args={[1.2, 1.2, 0.1, 64]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.8} />
        </Cylinder>
        
        {/* Food sections - like a pie chart */}
        {/* Vegetables (green section) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[0.3, 1, 32, 1, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#22c55e" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Proteins (red section) */}
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <ringGeometry args={[0.3, 1, 32, 1, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ef4444" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Carbs (yellow section) */}
        <mesh rotation={[-Math.PI / 2, 0, Math.PI]} position={[0, 0, 0]}>
          <ringGeometry args={[0.3, 1, 32, 1, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#eab308" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Dairy (blue section) */}
        <mesh rotation={[-Math.PI / 2, 0, Math.PI * 1.5]} position={[0, 0, 0]}>
          <ringGeometry args={[0.3, 1, 32, 1, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#3b82f6" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Center */}
        <Sphere args={[0.25, 32, 32]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.5} roughness={0.3} />
        </Sphere>
      </Float>
    </group>
  );
}

import { Cylinder, Cone } from '@react-three/drei';

function IronMoleculeModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
        {/* Central iron atom (larger, red-orange) */}
        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} emissive="#dc2626" emissiveIntensity={0.3} />
        </Sphere>
        
        {/* Surrounding oxygen atoms */}
        {([
          [1.2, 0, 0],
          [-1.2, 0, 0],
          [0, 1.2, 0],
          [0, -1.2, 0],
          [0, 0, 1.2],
          [0, 0, -1.2]
        ] as [number, number, number][]).map((pos, i) => (
          <group key={i}>
            <Sphere args={[0.25, 24, 24]} position={pos}>
              <meshStandardMaterial color="#3b82f6" metalness={0.4} roughness={0.3} />
            </Sphere>
            {/* Bonds */}
            <Line
              points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(pos[0], pos[1], pos[2])]}
              color="#94a3b8"
              lineWidth={2}
              transparent
              opacity={0.6}
            />
          </group>
        ))}
        
        {/* Glow effect */}
        <Sphere args={[0.7, 32, 32]}>
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} transparent opacity={0.2} />
        </Sphere>
      </Float>
    </group>
  );
}

function DNAModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime();
  });

  const steps = 20;
  const elements = useMemo(() => {
     return Array.from({ length: steps }).map((_, i) => {
       const y = (i - steps / 2) * 0.3;
       const angle = i * 0.5;
       return { y, angle };
     });
  }, []);

  return (
    <group ref={groupRef}>
      {elements.map((el, i) => (
        <group key={i} position={[0, el.y, 0]} rotation={[0, el.angle, 0]}>
          <Sphere position={[1, 0, 0]} args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#3b82f6" />
          </Sphere>
          <Sphere position={[-1, 0, 0]} args={[0.15, 16, 16]}>
            <meshStandardMaterial color="#60a5fa" />
          </Sphere>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 2]} />
            <meshStandardMaterial color="white" opacity={0.2} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CrystalModel() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Octahedron args={[1, 0]}>
        <MeshWobbleMaterial factor={0.4} speed={1} color="#f59e0b" metalness={0.9} roughness={0.1} />
      </Octahedron>
    </Float>
  );
}

export default function ThreeModelViewer({ type }: { type: string }) {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-slate-950/20 rounded-3xl border border-white/5 relative overflow-hidden my-8 shadow-inner">
      <div className="absolute top-4 left-6 z-10">
         <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/30 px-2 py-1 rounded">Visualizador Bio-Médico 3D</span>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows shadow-map-type={THREE.PCFSoftShadowMap}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
          <CenterContent type={type} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minDistance={2} 
          maxDistance={10} 
        />
      </Canvas>
    </div>
  );
}

function CenterContent({ type }: { type: string }) {
  switch (type) {
    case 'heart': return <HeartModel />;
    case 'neuron': return <NeuronModel />;
    case 'growth': return <DNAModel />;
    case 'crystal': return <CrystalModel />;
    case 'defense': return <DefenseModel />;
    case 'vitamin': return <VitaminPillModel />;
    case 'plate': return <FoodPlateModel />;
    case 'iron': return <IronMoleculeModel />;
    default: return <HeartModel />;
  }
}
