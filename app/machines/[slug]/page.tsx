'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { MACHINE_REGISTRY } from '@/machines/registry';
import CadCanvas from '@/components/viewer/CadCanvas';
import ParameterControl from '@/components/ui/ParameterControl';
import ExportModal from '@/components/ui/ExportModal';
import DrawingViewerModal from '@/components/ui/DrawingViewerModal';
import dynamic from 'next/dynamic';
import { Layers, ShieldCheck, Play, Pause, Sliders } from 'lucide-react';

export default function MachineDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const machine = MACHINE_REGISTRY[slug];

  // Dynamic model loader with graceful fallback
  const DynamicModel = React.useMemo(() => {
    if (!slug) return null;
    return dynamic<any>(
      () =>
        import(`@/machines/${slug}/Model3D`).catch(() => () => (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
          </mesh>
        )),
      { ssr: false }
    );
  }, [slug]);

  if (!machine) {
    notFound();
  }

  // Parameter State for the current machine
  const [currentParams, setCurrentParams] = useState<Record<string, number>>({
    ...(machine.defaultParams || {}),
  });
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isParamsOpen, setIsParamsOpen] = useState<boolean>(true);

  // Reset when machine changes
  useEffect(() => {
    setCurrentParams({ ...(machine.defaultParams || {}) });
  }, [slug, machine]);

  const handleParamChange = (id: string, value: number) => {
    setCurrentParams((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleResetParams = () => {
    setCurrentParams({ ...(machine.defaultParams || {}) });
  };

  return (
    <div className="relative flex-1 h-screen overflow-hidden bg-slate-200">
      {/* 1. Fullscreen Edge-to-Edge 3D Viewport */}
      <div className="absolute inset-0 w-full h-full z-0">
        <CadCanvas>
          {DynamicModel && (
            <DynamicModel params={currentParams} isAnimating={isRotating} />
          )}
        </CadCanvas>
      </div>

      {/* 2. Floating Top Navigation Bar */}
      <header className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between">
        {/* Machine Identity Pill */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-slate-900 text-sm tracking-tight">{machine.name}</h2>
              <span className="font-mono text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                {machine.code}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-medium">
              <span>{machine.category}</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{machine.material}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Floating Quick Action Controls */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3 py-2 shadow-xl flex items-center space-x-2">
          {/* Toggle Animation */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center space-x-1.5 text-xs text-slate-700 font-semibold bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 transition shadow-sm"
            title="Bật/Tắt xoay mô phỏng chuyển động"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isRotating ? 'Dừng Xoay' : 'Mô Phỏng Xoay'}</span>
          </button>

          {/* View 2D Technical Drawing Button */}
          <DrawingViewerModal
            drawingImageUrl="/rang_2d_drawing-1.png"
            dwgDownloadUrl="/exports/rang.dwg"
            dxfDownloadUrl="/exports/rang.dxf"
          />

          {/* Toggle Parameter Panel Button */}
          <button
            onClick={() => setIsParamsOpen(!isParamsOpen)}
            className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition shadow-sm ${
              isParamsOpen
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Bật/Tắt bảng thông số cơ khí"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Thông Số ({machine.params.length})</span>
          </button>

          {/* Export Center Modal */}
          <ExportModal
            machineSlug={machine.slug}
            machineName={machine.name}
            params={currentParams}
          />
        </div>
      </header>

      {/* 3. Floating Right Parameter HUD Drawer */}
      <div
        className={`absolute top-20 right-4 bottom-5 z-20 pointer-events-auto transition-all duration-300 ease-out ${
          isParamsOpen
            ? 'w-[340px] opacity-100 translate-x-0'
            : 'w-0 opacity-0 translate-x-10 pointer-events-none'
        }`}
      >
        <ParameterControl
          params={currentParams}
          definitions={machine.params}
          onChange={handleParamChange}
          onReset={handleResetParams}
          onClose={() => setIsParamsOpen(false)}
        />
      </div>
    </div>
  );
}
