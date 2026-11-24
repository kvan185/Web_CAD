'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Center, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Grid3X3, Compass, Box, Eye } from 'lucide-react';

interface CadCanvasProps {
  children: React.ReactNode;
  showGrid?: boolean;
}

export default function CadCanvas({ children, showGrid: initialShowGrid = false }: CadCanvasProps) {
  const [showGrid, setShowGrid] = useState(initialShowGrid);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const setView = (type: 'iso' | 'front' | 'top' | 'side') => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    if (type === 'iso') {
      controls.object.position.set(2.2, 1.8, 2.4);
    } else if (type === 'front') {
      controls.object.position.set(0, 0.4, 3.2);
    } else if (type === 'top') {
      controls.object.position.set(0, 3.5, 0.01);
    } else if (type === 'side') {
      controls.object.position.set(3.2, 0.4, 0);
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#eaf0f6] to-[#d6e0ea] overflow-hidden select-none">
      {/* 3D Canvas Edge-to-Edge */}
      <Canvas
        shadows
        camera={{ position: [2.2, 1.8, 2.4], fov: 38 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#dce5ee']} />

        {/* Studio Lighting - 360 Full Illumination */}
        <ambientLight intensity={1.2} />
        <hemisphereLight args={['#ffffff', '#94a3b8', 1.4]} />
        <directionalLight position={[10, 18, 12]} intensity={2.2} castShadow />
        <directionalLight position={[-10, 14, -10]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[0, -8, 0]} intensity={0.9} color="#e2e8f0" />
        <pointLight position={[0, 4, 0]} intensity={0.8} />

        <Suspense fallback={null}>
          <Center top>
            {children}
          </Center>

          {/* Real Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.45}
            scale={8}
            blur={1.8}
            far={3}
            color="#334155"
          />

          {showGrid && (
            <Grid
              position={[0, -0.015, 0]}
              args={[10, 10]}
              cellSize={0.2}
              cellThickness={0.9}
              cellColor="#cbd5e1"
              sectionSize={1}
              sectionThickness={1.8}
              sectionColor="#94a3b8"
              fadeDistance={12}
            />
          )}

          <OrbitControls
            ref={controlsRef}
            makeDefault
            minDistance={0.5}
            maxDistance={10}
            dampingFactor={0.08}
          />
        </Suspense>
      </Canvas>

      {/* Floating Bottom Navigation & Camera Views */}
      <div className="absolute bottom-5 left-5 flex items-center space-x-2 bg-white/90 backdrop-blur-md border border-slate-300/80 rounded-xl px-3 py-2 shadow-xl text-xs text-slate-700">
        {/* Grid Toggle */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition ${
            showGrid ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'hover:bg-slate-100 text-slate-600'
          }`}
          title="Bật/Tắt lưới tọa độ"
        >
          <Grid3X3 className="w-4 h-4" />
          <span>Lưới CAD</span>
        </button>

        <div className="h-5 w-px bg-slate-300" />

        {/* View Angle Presets */}
        <div className="flex items-center space-x-1 font-semibold text-[11px]">
          <span className="text-slate-400 font-mono text-[10px] uppercase mr-1">Góc Nhìn:</span>
          <button
            onClick={() => setView('iso')}
            className="px-2 py-1 rounded hover:bg-slate-100 text-slate-700 active:bg-blue-100 transition"
            title="Góc nhìn Isometric 3D"
          >
            ISO
          </button>
          <button
            onClick={() => setView('front')}
            className="px-2 py-1 rounded hover:bg-slate-100 text-slate-700 active:bg-blue-100 transition"
            title="Hình chiếu đứng (Front)"
          >
            Đứng
          </button>
          <button
            onClick={() => setView('top')}
            className="px-2 py-1 rounded hover:bg-slate-100 text-slate-700 active:bg-blue-100 transition"
            title="Hình chiếu bằng (Top)"
          >
            Bằng
          </button>
          <button
            onClick={() => setView('side')}
            className="px-2 py-1 rounded hover:bg-slate-100 text-slate-700 active:bg-blue-100 transition"
            title="Hình chiếu cạnh (Side)"
          >
            Cạnh
          </button>
        </div>

        <div className="h-5 w-px bg-slate-300" />

        <div className="px-1 text-slate-500 font-medium text-[11px] flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Xoay: Chuột Trái | Trượt: Chuột Phải | Zoom: Con Lăn</span>
        </div>
      </div>
    </div>
  );
}
