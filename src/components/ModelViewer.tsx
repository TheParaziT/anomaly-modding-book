import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ModelViewerProps {
  modelUrl: string;
  fallbackImageUrl: string;
  caption?: string; // Опциональный заголовок
  width?: string;
  height?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  fallbackImageUrl,
  caption,
  width = '400px',
  height = '400px'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'slow' | 'fast'>('fast');

  useEffect(() => {
    // Проверка скорости соединения
    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      // Считаем медленным соединение 2G/3G (slow-2g, 2g, 3g)
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        setNetworkStatus('slow');
        setIsLoading(false);
        return; // Не загружаем 3D-модель на медленном соединении
      }
    }

    // Если соединение хорошее, инициализируем сцену Three.js
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.offsetWidth / mountRef.current.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    renderer.setClearColor(0x000000, 0); // Прозрачный фон
    mountRef.current.appendChild(renderer.domElement);

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Добавляем управление камерой
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        scene.add(gltf.scene);
        // Настраиваем камеру под модель
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.copy(center);
        camera.position.z += maxDim * 1.5;
        camera.lookAt(center);
        controls.update();
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Ошибка загрузки модели:', error);
        setLoadError(true);
        setIsLoading(false);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    // Очистка при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, networkStatus]); // Зависимость от URL модели и статуса сети

  // Показываем заглушку или ошибку
  if (networkStatus === 'slow') {
    return (
      <figure>
        <img src={fallbackImageUrl} alt="Превью модели" style={{ width, height, objectFit: 'contain' }} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  if (loadError) {
    return (
      <div>Не удалось загрузить 3D-модель. <img src={fallbackImageUrl} alt="Превью модели" /></div>
    );
  }

  return (
    <figure>
      <div ref={mountRef} style={{ width, height, position: 'relative' }}>
        {isLoading && <div>Загрузка модели...</div>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default ModelViewer;