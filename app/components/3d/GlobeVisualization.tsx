"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  Html,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
// Import textures directly from three-globe package
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Current user data
const currentDateTime = "2025-03-03 19:23:58";
const currentUser = "vkhare2909";

// Performance configuration
const CONFIG = {
  pointCount: 2000,
  globeDetail: 64,
  showStats: process.env.NODE_ENV === "development",
  enableSelect: true,
};

// Using textures from the three-globe package
// These paths will be resolved from the node_modules folder
const TEXTURE_PATHS = {
  // These paths come from the three-globe package
  earthMap: "/textures/earth-blue-marble.jpg", // From three-globe package
  earthBumpMap: "/textures/earth-topology.png", // From three-globe package
  earthSpecularMap: "/textures/earth-water.png", // From three-globe package
};

interface PointData {
  id: number;
  position: [number, number, number];
  color: [number, number, number];
  name?: string;
}

// User activity tracking component
const UserActivity = ({ visible = true }) => {
  const [activity, setActivity] = useState({
    rotations: 0,
    interactions: 0,
    lastActive: currentDateTime,
  });

  useEffect(() => {
    const trackInteraction = () => {
      setActivity((prev) => ({
        ...prev,
        interactions: prev.interactions + 1,
        lastActive: new Date().toISOString(),
      }));
    };

    window.addEventListener("mousedown", trackInteraction);
    window.addEventListener("touchstart", trackInteraction);

    return () => {
      window.removeEventListener("mousedown", trackInteraction);
      window.removeEventListener("touchstart", trackInteraction);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute bottom-2 left-2 z-10 bg-black/30 backdrop-blur-sm text-xs text-white/70 p-2 rounded-md border border-white/10">
      <div>User: {currentUser}</div>
      <div>Session: {currentDateTime}</div>
      <div>Interactions: {activity.interactions}</div>
    </div>
  );
};

// Texture loading helper with built-in error handling
const useGlobeTextures = () => {
  // Use React Three Fiber's useLoader to load textures
  const [earthMap, earthBumpMap, earthSpecularMap] = useLoader(TextureLoader, [
    TEXTURE_PATHS.earthMap,
    TEXTURE_PATHS.earthBumpMap,
    TEXTURE_PATHS.earthSpecularMap,
  ]);

  return { earthMap, earthBumpMap, earthSpecularMap };
};

// Loadable Globe component
const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const { viewport } = useThree();

  // Load textures using our custom hook
  const { earthMap, earthBumpMap, earthSpecularMap } = useGlobeTextures();

  // Effect for cursor style
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Animate globe rotation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Slow down rotation when hovered
      const speed = hovered ? 0.05 : 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  // Calculate appropriate scale based on viewport
  const scale = useMemo(() => {
    return viewport.width > 10 ? 2 : viewport.width / 5;
  }, [viewport.width]);

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => CONFIG.enableSelect && setSelected(!selected)}
    >
      <sphereGeometry args={[1, CONFIG.globeDetail, CONFIG.globeDetail]} />
      <meshPhongMaterial
        map={earthMap}
        bumpMap={earthBumpMap}
        bumpScale={0.05}
        specularMap={earthSpecularMap}
        shininess={5}
        specular={new THREE.Color(0x4f46e5)} // Using indigo color to match other components
      />

      {/* Interactive label */}
      {hovered && (
        <Html position={[0, 1.2, 0]} center>
          <div className="px-2 py-1 rounded bg-gray-900/80 text-white text-xs border border-indigo-500/30">
            Interactive Career Globe • {currentUser}
          </div>
        </Html>
      )}

      {/* Selection indicator */}
      {selected && (
        <mesh>
          <sphereGeometry args={[1.02, 32, 32]} />
          <meshBasicMaterial
            color="#4f46e5"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      )}
    </mesh>
  );
};

// Career opportunity points
const CareerPoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);

  // Animate points rotation
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Generate point data with a more optimized approach
  const { positions, colors, pointsData } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const pointsData: PointData[] = [];
    const color = new THREE.Color();

    for (let i = 0; i < CONFIG.pointCount; i++) {
      // Random spherical coordinates
      const r = 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      // Convert to Cartesian coordinates
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.push(x, y, z);

      // Color based on position (create meaningful clusters)
      const hue = (theta / (Math.PI * 2)) * 0.3 + 0.5;
      color.setHSL(hue, 1, 0.5);

      colors.push(color.r, color.g, color.b);

      // Store point data for interactions
      pointsData.push({
        id: i,
        position: [x, y, z],
        color: [color.r, color.g, color.b],
        name: `Career Point ${i}`,
      });
    }

    return { positions, colors, pointsData };
  }, []);

  // Create and memoize geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, [positions, colors]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        size={0.015}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

// Main scene component
const GlobeScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <Suspense fallback={<LoadingFallback />}>
        <Globe />
        <CareerPoints />
      </Suspense>

      {CONFIG.showStats && <Stats className="stats" />}
    </>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-white">Loading Globe...</p>
        <p className="text-xs text-gray-400 mt-2">User: {currentUser}</p>
      </div>
    </Html>
  );
};

// Main component wrapper
export default function GlobeVisualization() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canvasHeight, setCanvasHeight] = useState("500px");
  const [isTextureLoading, setIsTextureLoading] = useState(true);

  // Adjust canvas height based on container
  useEffect(() => {
    if (!wrapperRef.current) return;

    const updateHeight = () => {
      if (wrapperRef.current) {
        setCanvasHeight(`${wrapperRef.current.clientWidth * 0.75}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Install required packages

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Setup for displaying texture information
  useEffect(() => {
    const timer = setTimeout(() => setIsTextureLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden rounded-lg border border-gray-800"
      style={{ height: canvasHeight }}
      data-user={currentUser}
      data-timestamp={currentDateTime}
    >
      <Canvas dpr={[1, 2]}>
        <GlobeScene />
      </Canvas>

      <UserActivity />
    </div>
  );
}
