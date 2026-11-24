'use client';

import React, { useState } from 'react';
import { FileText, Download, ZoomIn, ZoomOut, RotateCcw, X, Layers, ExternalLink } from 'lucide-react';

interface DrawingViewerModalProps {
  drawingImageUrl: string;
  dwgDownloadUrl?: string;
  dxfDownloadUrl?: string;
  title?: string;
}

export default function DrawingViewerModal({
  drawingImageUrl,
  dwgDownloadUrl = '/exports/rang.dwg',
  dxfDownloadUrl = '/exports/rang.dxf',
  title = 'Bản Vẽ Kỹ Thuật Gốc: rang.dwg',
}: DrawingViewerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.6));
  const handleResetZoom = () => setZoom(1);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition shadow-sm"
        title="Xem bản vẽ kỹ thuật 2D gốc"
      >
        <FileText className="w-3.5 h-3.5 text-indigo-600" />
        <span>Bản Vẽ 2D (DWG)</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Bóc tách hình chiếu đứng, hình chiếu cạnh & bảng kê chi tiết máy rang 120kg
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center space-x-2">
                {/* Zoom Controls */}
                <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-1 text-xs">
                  <button
                    onClick={handleZoomOut}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] px-1 text-slate-600 font-semibold">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                    title="Khôi phục kích thước"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>

                {/* Downloads */}
                <a
                  href={dwgDownloadUrl}
                  download
                  className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition"
                  title="Tải file DWG gốc"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>File .DWG</span>
                </a>

                <a
                  href={dxfDownloadUrl}
                  download
                  className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
                  title="Tải file DXF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>File .DXF</span>
                </a>

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: High Resolution Drawing Viewport */}
            <div className="flex-1 bg-slate-100 overflow-auto p-6 flex items-center justify-center">
              <div
                className="transition-transform duration-200 shadow-xl bg-white p-2 rounded-lg border border-slate-200 max-w-none"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              >
                <img
                  src={drawingImageUrl}
                  alt="Bản vẽ kỹ thuật 2D rang.dwg"
                  className="max-h-[75vh] w-auto object-contain select-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
