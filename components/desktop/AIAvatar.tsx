"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useStore } from "@/lib/store";
import * as THREE from "three";

const PROMPTS = [
  "Want to know about Swaroop?",
  "Ask me about his 20+ products!",
  "Curious about his tech stack?",
  "Let me tell you his story!",
  "Click me to chat!",
];

function AvatarModel() {
  const { scene } = useGLTF("/model.glb");
  const ref = useRef<THREE.Group>(null);

  // Idle animation — gentle sway
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05 - 0.8;
    }
  });

  return (
    <group ref={ref} position={[0, -1.2, 0]} scale={1.1}>
      <primitive object={scene} />
    </group>
  );
}

export default function AIAvatar() {
  const openWindow = useStore((s) => s.openWindow);
  const [promptIndex, setPromptIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const initialTimer = setTimeout(() => setShowBubble(true), 5000);
    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setPromptIndex((i) => (i + 1) % PROMPTS.length);
        setShowBubble(true);
      }, 300);
    }, 8000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="fixed z-[35] cursor-pointer"
      style={{ bottom: "70px", left: "20px", width: "180px", height: "280px" }}
      onClick={() => openWindow("aichat")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {(showBubble || hovered) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-2xl text-[12px] font-medium"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              color: "#1C1C1E",
            }}
          >
            {hovered ? "Click to chat with me!" : PROMPTS[promptIndex]}
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{
                background: "rgba(255,255,255,0.92)",
                borderRight: "1px solid rgba(255,255,255,0.8)",
                borderBottom: "1px solid rgba(255,255,255,0.8)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Avatar */}
      <Canvas
        camera={{ position: [0, 0.2, 3.5], fov: 35 }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} />
        <directionalLight position={[-2, 1, -1]} intensity={0.4} />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
