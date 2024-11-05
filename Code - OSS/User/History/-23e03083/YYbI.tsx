"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function NewModel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF("/models/nec_computer.glb");

  useEffect(() => {
    if (scene) {
      scene.scale.set(2.3, 2.3, 2.3);
      scene.position.set(0, -0.4, 0);
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function NewModelScene() {
  return (
    <div style={{ position: "relative" }}>
     
      <div
        style={{
          width: "100%",
          height: "60vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Canvas
          shadows
          camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 4] }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={0.6} castShadow />
          <spotLight
            position={[-10, 20, 20]}
            intensity={0.5}
            angle={0.3}
            penumbra={0.5}
            castShadow
          />
          <NewModel />
          <OrbitControls enableZoom={true} maxDistance={30} minDistance={7} />
        </Canvas>
      </div>
    </div>
  );
}
