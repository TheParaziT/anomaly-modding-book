import React, { useEffect, useRef, useState } from 'react';
import { Engine, Scene } from '@babylonjs/core';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import '@babylonjs/loaders/glTF';

interface ModelViewerProps {
  modelUrl: string;
  fallbackImageUrl: string;
  caption?: string;
  width?: string;
  height?: string;
  animationName?: string;
  autoplay?: boolean;
  loop?: boolean;
  align?: 'left' | 'center' | 'right';
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  fallbackImageUrl,
  caption,
  width = '100%',
  height = 'min(480px, 60vh)',
  animationName,
  autoplay = true,
  loop = true,
  align = 'center',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'slow' | 'fast'>('fast');

  const getAlignmentStyle = () => {
    switch (align) {
      case 'left':
        return { textAlign: 'left' as const, display: 'block' };
      case 'right':
        return { textAlign: 'right' as const, display: 'block' };
      case 'center':
      default:
        return { textAlign: 'center' as const, display: 'block' };
    }
  };

  useEffect(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        setNetworkStatus('slow');
        setIsLoading(false);
        return;
      }
    }

    if (!mountRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', '3D canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    mountRef.current.appendChild(canvas);
    canvasRef.current = canvas;

    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
    engineRef.current = engine;
    const scene = new Scene(engine);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2.5,
      3,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);
    cameraRef.current = camera;
    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    SceneLoader.Append(
      '',
      modelUrl,
      scene,
      () => {
        try {
          const meshes = scene.meshes.filter(m => m && m.isVisible !== false);
          if (meshes.length > 0) {
            const min = meshes.reduce(
              (acc, m) => Vector3.Minimize(acc, m.getBoundingInfo().boundingBox.minimumWorld),
              meshes[0].getBoundingInfo().boundingBox.minimumWorld.clone()
            );
            const max = meshes.reduce(
              (acc, m) => Vector3.Maximize(acc, m.getBoundingInfo().boundingBox.maximumWorld),
              meshes[0].getBoundingInfo().boundingBox.maximumWorld.clone()
            );
            const center = min.add(max).scale(0.5);
            const radius = max.subtract(min).length() * 0.75 + 1;
            camera.setTarget(center);
            camera.radius = radius;
          }

          const groups = scene.animationGroups;
          if (groups && groups.length > 0 && autoplay) {
            const group = animationName
              ? groups.find(g => g.name === animationName) || groups[0]
              : groups[0];
            group.reset();
            group.loopAnimation = !!loop;
            group.start(loop);
          }
          setIsLoading(false);
        } catch (e) {
          setLoadError(true);
          setIsLoading(false);
        }
      },
      undefined,
      () => {
        setLoadError(true);
        setIsLoading(false);
      }
    );

    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    engine.runRenderLoop(() => {
      if (scene.activeCamera) {
        scene.render();
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      try {
        scene.dispose();
        engine.dispose();
      } catch {}
      if (mountRef.current && canvasRef.current) {
        mountRef.current.removeChild(canvasRef.current);
      }
    };
  }, [modelUrl, animationName, autoplay, loop]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const camera = cameraRef.current;
    if (!camera) return;
    const rotateStep = 0.1;
    const zoomStep = 0.25;
    switch (event.key) {
      case 'ArrowLeft':
        camera.alpha -= rotateStep;
        event.preventDefault();
        break;
      case 'ArrowRight':
        camera.alpha += rotateStep;
        event.preventDefault();
        break;
      case 'ArrowUp':
        camera.beta = Math.max(0.1, camera.beta - rotateStep);
        event.preventDefault();
        break;
      case 'ArrowDown':
        camera.beta = Math.min(Math.PI - 0.1, camera.beta + rotateStep);
        event.preventDefault();
        break;
      case '+':
      case '=':
        camera.radius = Math.max(0.5, camera.radius - zoomStep);
        event.preventDefault();
        break;
      case '-':
      case '_':
        camera.radius = camera.radius + zoomStep;
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  if (networkStatus === 'slow') {
    return (
      <figure style={getAlignmentStyle()}>
        <img
          src={fallbackImageUrl}
          alt="Превью модели"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  if (loadError) {
    return (
      <div style={getAlignmentStyle()}>
        Не удалось загрузить 3D-модель.
        <img
          src={fallbackImageUrl}
          alt="Превью модели"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <figure style={getAlignmentStyle()}>
      <div
        ref={mountRef}
        style={{ width, height, position: 'relative', margin: '0 auto' }}
        tabIndex={0}
        role="application"
        aria-label="3D модель (управление: стрелки — вращение, +/- — зум)"
        onKeyDown={handleKeyDown}
      >
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              zIndex: 10,
            }}
          >
            Загрузка модели...
          </div>
        )}
        <div
          aria-live="polite"
          role="status"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            clip: 'rect(1px, 1px, 1px, 1px)',
          }}
        >
          {isLoading
            ? 'Загрузка модели...'
            : loadError
              ? 'Не удалось загрузить 3D-модель.'
              : 'Модель загружена.'}
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default ModelViewer;
