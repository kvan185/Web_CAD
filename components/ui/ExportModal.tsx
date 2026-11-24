'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2, Loader2, FileCode2, Layers, Cpu } from 'lucide-react';

interface ExportModalProps {
  machineSlug: string;
  machineName: string;
  params: Record<string, number>;
}

export default function ExportModal({ machineSlug, machineName, params }: ExportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exportResult, setExportResult] = useState<{
    success: boolean;
    stepUrl?: string;
    dxfUrl?: string;
    bomUrl?: string;
    message?: string;
    details?: any;
  } | null>(null);

  const handleExport = async () => {
    setIsLoading(true);
    setExportResult(null);

    try {
      const response = await fetch('/api/export-cad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          machineSlug,
          params,
        }),
      });

      const data = await response.json();
      setExportResult(data);
    } catch (err: any) {
      setExportResult({
        success: false,
        message: err.message || 'Lỗi kết nối máy chủ FreeCAD Headless',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          if (!exportResult) handleExport();
        }}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
      >
        <Download className="w-4 h-4" />
        <span>Xuất File Xưởng (STEP / DXF)</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Trung Tâm Xuất Bản Vẽ Xưởng</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dòng máy: <span className="text-blue-700 font-semibold">{machineName}</span>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            {/* Status Area */}
            {isLoading && (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-sm text-slate-800 font-semibold">
                  Đang khởi chạy FreeCAD Headless sinh file...
                </p>
                <p className="text-xs text-slate-500">
                  Đang tính toán hình học Solid B-Rep, xuất tọa độ CNC và bản vẽ 2D
                </p>
              </div>
            )}

            {!isLoading && exportResult?.success && (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3 text-emerald-800 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Đã sinh file chế tạo thành công!</div>
                    <div className="text-emerald-600 font-medium">Khối lượng ước tính: {exportResult.details?.massKg || 120} kg</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* STEP Download */}
                  <a
                    href={exportResult.stepUrl || '#'}
                    download
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 text-blue-700 rounded-lg group-hover:bg-blue-200 transition">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Mô hình 3D Solid (STEP)</div>
                        <div className="text-[11px] text-slate-500 font-medium">Chuẩn gia công phay tiện CNC, máy đột dập</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded border border-blue-200">
                      .STEP
                    </span>
                  </a>

                  {/* DXF Download */}
                  <a
                    href={exportResult.dxfUrl || '#'}
                    download
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-200 transition">
                        <FileCode2 className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Bản vẽ 2D Cắt Tôn (DXF)</div>
                        <div className="text-[11px] text-slate-500 font-medium">Chuẩn máy cắt laser tôn, biên dạng chấn bẻ</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded border border-emerald-200">
                      .DXF
                    </span>
                  </a>

                  {/* BOM Download */}
                  <a
                    href={exportResult.bomUrl || '#'}
                    download
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-amber-100 text-amber-700 rounded-lg group-hover:bg-amber-200 transition">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Bảng Bóc Tách Vật Tư (BOM CSV)</div>
                        <div className="text-[11px] text-slate-500 font-medium">Khối lượng tôn Inox, bu-lông, phụ kiện tiêu chuẩn</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded border border-amber-200">
                      .CSV
                    </span>
                  </a>
                </div>
              </div>
            )}

            {!isLoading && exportResult && !exportResult.success && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs space-y-1">
                <div className="font-bold">Lỗi xuất bản vẽ:</div>
                <div>{exportResult.message}</div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-200 space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                Đóng
              </button>
              <button
                onClick={handleExport}
                disabled={isLoading}
                className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50 shadow-sm"
              >
                Sinh lại file mới
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
