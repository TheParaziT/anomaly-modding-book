import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

interface ModelViewerProps {
  modelPath: string; // Путь вида "/models/model.glb"
  scale?: number;
  position?: [number, number, number];
  autoRotate?: boolean;
}

function Model({ modelPath, scale = 1, position = [0, 0, 0] }: ModelViewerProps) {
  // Просто используем путь как есть - Docusaurus автоматически обслуживает
  // файлы из папки static по корневому пути
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} position={position} />;
}

export default function ModelViewer({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  autoRotate = true,
}: ModelViewerProps) {
  return (
    <div
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '20px 0',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows>
        <Suspense fallback={null}>
          <Model modelPath={modelPath} scale={scale} position={position} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
          />
          <Environment preset="sunset" />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
