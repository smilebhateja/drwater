"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Hotspot } from "@/lib/products";
import clsx from "clsx";

const lightColor = "#9bdcff";

type ProductViewerProps = {
  modelUrl?: string;
  hotspots: Hotspot[];
  fallbackShape: "bottle" | "capsule" | "cube" | "pitcher" | "pouch";
  className?: string;
};

function BottleShape() {
  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.32, 1.4, 48]} />
        <meshStandardMaterial color="#1f6fff" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.3, 32]} />
        <meshStandardMaterial color="#1c3dff" metalness={0.5} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.2, 48]} />
        <meshStandardMaterial color="#12497a" roughness={0.45} />
      </mesh>
    </group>
  );
}

function CapsuleShape() {
  return (
    <mesh castShadow receiveShadow>
      <capsuleGeometry args={[0.32, 0.9, 32, 64]} />
      <meshStandardMaterial color="#48baff" roughness={0.25} metalness={0.35} />
    </mesh>
  );
}

function CubeShape() {
  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.2, 1.1]} />
        <meshStandardMaterial color="#1f2e3a" roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.35, 0.55]} castShadow>
        <boxGeometry args={[0.6, 0.25, 0.08]} />
        <meshStandardMaterial color="#2e4b68" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

function PitcherShape() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.55, 1.1, 48]} />
        <meshStandardMaterial color="#1a4a60" roughness={0.35} metalness={0.25} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 6]} position={[0.7, 0.1, 0]}>
        <torusGeometry args={[0.35, 0.07, 16, 60]} />
        <meshStandardMaterial color="#2f95b9" roughness={0.3} />
      </mesh>
    </group>
  );
}

function PouchShape() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.75, 1.1, 0.25]} />
        <meshStandardMaterial color="#4ce1ff" roughness={0.1} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.75, 0.2, 0.27]} />
        <meshStandardMaterial color="#0f6dbd" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Model({ modelUrl, fallbackShape }: { modelUrl?: string; fallbackShape: ProductViewerProps["fallbackShape"]; }) {
  const model = useMemo(() => {
    if (!modelUrl) return null;
    return modelUrl;
  }, [modelUrl]);

  if (!model) {
    return <FallbackModel shape={fallbackShape} />;
  }

  return <GLTFModel url={model} fallbackShape={fallbackShape} />;
}

function GLTFModel({ url, fallbackShape }: { url: string; fallbackShape: ProductViewerProps["fallbackShape"]; }) {
  try {
    const gltf = useGLTF(url, true);
    return <primitive object={gltf.scene} />;
  } catch (error) {
    console.warn(`Falling back to procedural model for ${url}`, error);
    return <FallbackModel shape={fallbackShape} />;
  }
}

function FallbackModel({ shape }: { shape: ProductViewerProps["fallbackShape"]; }) {
  switch (shape) {
    case "bottle":
      return <BottleShape />;
    case "capsule":
      return <CapsuleShape />;
    case "cube":
      return <CubeShape />;
    case "pitcher":
      return <PitcherShape />;
    case "pouch":
      return <PouchShape />;
    default:
      return <CapsuleShape />;
  }
}

useGLTF.preload?.("/models/hydro-sport.glb");

export function ProductViewer({
  modelUrl,
  hotspots,
  fallbackShape,
  className
}: ProductViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b2238] to-[#081520]",
        className
      )}
    >
      <Canvas camera={{ fov: 40, position: [0.6, 0.8, 2.2] }} shadows>
        <color attach="background" args={["#061019"]} />
        <ambientLight intensity={0.6} color={lightColor} />
        <directionalLight position={[3, 6, 6]} intensity={1.2} color={lightColor} castShadow />
        <Suspense fallback={null}>
          <Stage
            preset="rembrandt"
            intensity={0.9}
            environment={null}
            shadows={{ type: "accumulative", color: "#12344f", colorBlend: 0.2 }}
            adjustCamera={false}
          >
            <group position={[0, -0.2, 0]}>
              <Model modelUrl={modelUrl} fallbackShape={fallbackShape} />
            </group>
          </Stage>
          {hotspots.map((hotspot) => (
            <Html
              key={hotspot.id}
              position={hotspot.position}
              transform
              className="pointer-events-none"
            >
              <button
                type="button"
                className={clsx(
                  "pointer-events-auto flex min-w-[130px] max-w-[160px] flex-col gap-1 rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-left text-xs font-medium text-midnight shadow-float transition hover:shadow-glow",
                  activeHotspot === hotspot.id && "shadow-glow"
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveHotspot((prev) => (prev === hotspot.id ? null : hotspot.id));
                }}
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-lagoon">{hotspot.title}</span>
                <span className="text-sm font-semibold text-midnight">{hotspot.description}</span>
              </button>
            </Html>
          ))}
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          minDistance={1.2}
          maxDistance={4}
          maxPolarAngle={Math.PI / 1.9}
          minPolarAngle={Math.PI / 3.5}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,198,255,0.18),rgba(7,18,32,0))]" />
    </div>
  );
}
