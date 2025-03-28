"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, OrbitControls, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { MotionConfig } from "framer-motion";
import * as THREE from "three";
import anime from "animejs";

interface Skill {
  id: string;
  name: string;
  level: number;
  lastVerified: string;
  endorsements: number;
}

// Interface for processed skills that includes visualization properties
interface ProcessedSkill extends Skill {
  freshness: number;
  colorMain: string;
  colorLight: string;
  colorDark: string;
  size: number;
  position: [number, number, number];
  orbit: {
    radius: number;
    speed: number;
    phase: number;
  };
}

// Interface for orbit lines
interface OrbitLine {
  radius: number;
  color: string;
}

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Preload Earth textures from URLs
const earthMapTexture = textureLoader.load(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
);
const earthBumpMapTexture = textureLoader.load(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
);
const earthSpecularMapTexture = textureLoader.load(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
);

// Create star glow texture dynamically
const createStarGlowTexture = () => {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) return null;

  // Create radial gradient
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
};

const starGlowTexture = createStarGlowTexture();

// Earth component
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  // Rotate Earth
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthMapTexture}
          bumpMap={earthBumpMapTexture}
          bumpScale={0.05}
          specularMap={earthSpecularMapTexture}
          specular={new THREE.Color("grey")}
          shininess={10}
        />
      </mesh>

      {/* Atmosphere glow - inner layer */}
      <mesh>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshBasicMaterial
          color="#4e85e8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Atmosphere glow - outer layer */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial
          color="#4e85e8"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Individual skill component
function SkillStar({
  skill,
  isHovered,
  isSelected,
  onHover,
  onClick,
}: {
  skill: ProcessedSkill;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (skill: ProcessedSkill | null) => void;
  onClick: (skill: ProcessedSkill) => void;
}) {
  const starRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const glowRef = useRef<THREE.PointLight>(null);

  // Animation for the star
  useFrame(({ clock }) => {
    if (starRef.current) {
      // Update position based on orbit
      const t = clock.getElapsedTime();
      const angle = skill.orbit.phase + t * skill.orbit.speed;
      starRef.current.position.x = Math.cos(angle) * skill.orbit.radius;
      starRef.current.position.z = Math.sin(angle) * skill.orbit.radius;

      // Make the star always face the camera
      starRef.current.quaternion.copy(camera.quaternion);

      // Pulse effect for selected or hovered stars
      if (isSelected || isHovered) {
        if (glowRef.current) {
          glowRef.current.intensity = 0.5 + Math.sin(t * 5) * 0.2;
        }
      } else {
        if (glowRef.current) {
          glowRef.current.intensity = 0;
        }
      }
    }
  });

  return (
    <group
      ref={starRef}
      position={[skill.orbit.radius, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(skill);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(skill);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Skill point */}
      <mesh>
        <sphereGeometry args={[isSelected ? 0.07 : 0.05, 16, 16]} />
        <meshBasicMaterial color={skill.colorMain} />
      </mesh>

      {/* Glow effect */}
      <pointLight
        ref={glowRef}
        distance={2}
        intensity={0}
        color={skill.colorLight}
      />

      {/* Label - only show when hovered or selected */}
      {(isHovered || isSelected) && (
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {skill.name} ({skill.level})
        </Text>
      )}

      {/* Star sprite for additional glow */}
      <sprite scale={[0.3, 0.3, 0.3]}>
        <spriteMaterial
          map={starGlowTexture}
          color={skill.colorLight}
          transparent
          opacity={isSelected ? 1 : isHovered ? 0.8 : 0.4}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

// Orbit circles
function OrbitLines({ orbits }: { orbits: OrbitLine[] }) {
  return (
    <group>
      {orbits.map((orbit, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[orbit.radius, orbit.radius + 0.01, 64]} />
          <meshBasicMaterial
            color={orbit.color}
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scene component that contains our 3D scene
function SkillScene({
  skills,
  hoveredSkill,
  setHoveredSkill,
  selectedSkill,
  setSelectedSkill,
  setTooltipPosition,
  setTooltipData,
}) {
  const [orbits, setOrbits] = useState<OrbitLine[]>([]);
  const sceneRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const { camera, size } = useThree();

  // Mouse position for parallax effect
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Extract unique orbit radii for orbit lines
    const uniqueRadii = [...new Set(skills.map((skill) => skill.orbit.radius))];

    // Create orbit lines with different colors
    const orbitLines = uniqueRadii.map((radius, index) => ({
      radius,
      color: `hsl(${(index * 30) % 360}, 70%, 60%)`,
    }));

    setOrbits(orbitLines);
  }, [skills]);

  // Handle skill hover
  const handleSkillHover = (skill: ProcessedSkill | null) => {
    setHoveredSkill(skill?.id || null);
    setTooltipData(skill);

    if (skill) {
      // Convert 3D position to screen coordinates for tooltip
      // First get the current position of the star
      const angle = skill.orbit.phase + camera.position.x * 0.01;
      const x = Math.cos(angle) * skill.orbit.radius;
      const y = skill.position[1];
      const z = Math.sin(angle) * skill.orbit.radius;

      // Create a vector from this position
      const vector = new THREE.Vector3(x, y, z);

      // Project to screen coordinates
      vector.project(camera);

      // Convert to pixel coordinates
      const screenX = (vector.x * 0.5 + 0.5) * size.width;
      const screenY = (vector.y * -0.5 + 0.5) * size.height;

      setTooltipPosition({ x: screenX, y: screenY });
    }
  };

  // Handle skill selection
  const handleSkillClick = (skill: ProcessedSkill) => {
    // Toggle selection
    if (selectedSkill === skill.id) {
      setSelectedSkill(null);

      // Reset camera position
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    } else {
      setSelectedSkill(skill.id);

      // Animate camera to focus on the selected skill
      if (controlsRef.current) {
        // Get the current position of the star
        const angle = skill.orbit.phase;
        const targetX = Math.cos(angle) * skill.orbit.radius * 0.8;
        const targetY = skill.position[1] * 0.8;
        const targetZ = Math.sin(angle) * skill.orbit.radius * 0.8;

        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);

        controlsRef.current.target.copy(targetPosition);
        controlsRef.current.update();
      }
    }
  };

  // Mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply parallax effect to stars background
  useFrame(({ clock }) => {
    if (sceneRef.current) {
      // Subtle rotation based on mouse position
      sceneRef.current.rotation.x +=
        (mousePosition.current.y * 0.01 - sceneRef.current.rotation.x) * 0.01;
      sceneRef.current.rotation.y +=
        (mousePosition.current.x * 0.01 - sceneRef.current.rotation.y) * 0.01;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Background stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Earth */}
      <Earth />

      {/* Orbit lines */}
      <OrbitLines orbits={orbits} />

      {/* Skills as stars */}
      {skills.map((skill) => (
        <SkillStar
          key={skill.id}
          skill={skill}
          isHovered={hoveredSkill === skill.id}
          isSelected={selectedSkill === skill.id}
          onHover={handleSkillHover}
          onClick={handleSkillClick}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={1.5}
        maxDistance={10}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
      />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1} castShadow />
    </group>
  );
}

interface SkillGraphProps {
  skills: Skill[];
}

export function SkillGraph({ skills }: SkillGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState<ProcessedSkill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Current user info
  const currentTime = "2025-03-28 07:38:40";
  const currentUser = "vkhare2909";

  // Create a color palette that works well with our space theme
  const colorPalette = useMemo(
    () => [
      { main: "#38bdf8", light: "#7dd3fc", dark: "#0284c7" }, // Sky
      { main: "#818cf8", light: "#a5b4fc", dark: "#4f46e5" }, // Indigo
      { main: "#c084fc", light: "#d8b4fe", dark: "#9333ea" }, // Purple
      { main: "#2dd4bf", light: "#5eead4", dark: "#0d9488" }, // Teal
      { main: "#fb7185", light: "#fda4af", dark: "#e11d48" }, // Rose
      { main: "#fcd34d", light: "#fde68a", dark: "#d97706" }, // Amber
    ],
    []
  );

  // Process the skills data for visualization
  const processedSkills = useMemo(() => {
    return skills.map((skill, index) => {
      const now = new Date();
      const lastVerified = new Date(skill.lastVerified);
      const daysSinceVerification = Math.floor(
        (now.getTime() - lastVerified.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate a freshness score (0-1) where 1 is very fresh and 0 is over a year old
      const freshness = Math.max(0, 1 - daysSinceVerification / 365);

      // Assign a color from the palette
      const colorIndex = index % colorPalette.length;
      const colors = colorPalette[colorIndex];

      // Calculate position on a sphere
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      // Calculate orbit radius based on skill level
      const orbitRadius = 1.5 + skill.level / 25;

      // Calculate initial position
      const initialAngle = Math.random() * Math.PI * 2;
      const x = Math.cos(initialAngle) * orbitRadius;
      const y = (Math.random() * 2 - 1) * 0.5; // Some variation in height
      const z = Math.sin(initialAngle) * orbitRadius;

      return {
        ...skill,
        freshness,
        colorMain: colors.main,
        colorLight: colors.light,
        colorDark: colors.dark,
        size: 0.05 + skill.level / 1000,
        position: [x, y, z],
        orbit: {
          radius: orbitRadius,
          speed: 0.1 + Math.random() * 0.1,
          phase: initialAngle,
        },
      } as ProcessedSkill;
    });
  }, [skills, colorPalette]);

  // Hide loading screen after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Create ripple effect
  const createRipple = (x: number, y: number, color: string) => {
    if (!containerRef.current) return;

    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.position = "absolute";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = `radial-gradient(circle, ${color}20 0%, transparent 70%)`;
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.width = "0px";
    ripple.style.height = "0px";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";

    containerRef.current.appendChild(ripple);

    anime({
      targets: ripple,
      width: ["0px", "400px"],
      height: ["0px", "400px"],
      opacity: [0.5, 0],
      easing: "easeOutExpo",
      duration: 1500,
      complete: () => {
        if (containerRef.current && containerRef.current.contains(ripple)) {
          containerRef.current.removeChild(ripple);
        }
      },
    });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full relative bg-black overflow-hidden"
    >
      {/* User info overlay */}
      <div className="absolute top-2 left-2 z-10">
        <span className="px-4 py-2 rounded-full bg-black/40 text-white/90 text-sm font-medium border border-white/10 inline-flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          {currentTime} • {currentUser}
        </span>
      </div>

      {/* 3D scene */}
      <MotionConfig transition={{ duration: 0.5 }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <SkillScene
              skills={processedSkills}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
              setTooltipPosition={setTooltipPosition}
              setTooltipData={setTooltipData}
            />
          </Suspense>
        </Canvas>
      </MotionConfig>

      {/* Tooltip */}
      {tooltipData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 130}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-black/50 backdrop-blur-md border border-white/20 p-3 rounded-lg shadow-xl text-white text-sm min-w-[200px]">
            <div className="font-bold text-lg mb-1">
              <span className="mr-2">{tooltipData.name}</span>
              <span
                className="inline-block"
                style={{ color: tooltipData.colorMain }}
              >
                •
              </span>
            </div>
            <div className="mb-1 flex justify-between items-center">
              <span className="text-gray-300">Skill Level:</span>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-16 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${tooltipData.level}%`,
                      background: `linear-gradient(to right, ${tooltipData.colorLight}, ${tooltipData.colorMain})`,
                    }}
                  ></div>
                </div>
                <span className="font-semibold">{tooltipData.level}</span>
              </div>
            </div>
            <div className="mb-1 flex justify-between">
              <span className="text-gray-300">Endorsements:</span>
              <span className="font-semibold">{tooltipData.endorsements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Last Verified:</span>
              <span className="font-semibold">
                {new Date(tooltipData.lastVerified).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions overlay */}
      <div className="absolute bottom-2 left-2 text-gray-300 text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md z-10">
        <span>
          Drag to rotate • Scroll to zoom • Click skills to select • Hover for
          details
        </span>
      </div>

      {/* Selected skill indicator */}
      {selectedSkill && (
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-2 rounded-lg text-sm z-10">
          <div className="flex items-center gap-2">
            <span className="text-white">Selected:</span>
            <span className="font-bold text-white">
              {processedSkills.find((s) => s.id === selectedSkill)?.name}
            </span>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-white/70 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-black z-20 transition-opacity duration-500"
        style={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-white">
            Loading skill universe...
          </p>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        .ripple-effect {
          z-index: 20;
          position: absolute;
          border-radius: 50%;
          transform-origin: center;
          pointer-events: none;
        }
      `}</style>
    </motion.div>
  );
}
