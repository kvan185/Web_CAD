'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_DRAWINGS } from '@/drawings/registry';
import { FileText, ArrowRight, Download, Eye, Layers, Compass, CheckCircle2 } from 'lucide-react';

export default function DrawingsOverviewPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-white border border-indigo-100 p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>MẢNG 2: LÀM VIỆC VỚI BẢN VẼ (DRAWING ANALYSIS & PROJECTIONS)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Trung Tâm Đọc & Bóc Tách Bản Vẽ Kỹ Thuật (2D/DWG)
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Phân hệ chuyên biệt dành cho Kỹ sư Cơ khí: Đọc hiểu bản vẽ 2D AutoCAD (.dwg, .dxf), bóc tách
            tự động kích thước hình học, phân tích dung sai và hiển thị các góc chiếu chuẩn:
            <strong> Hình chiếu đứng (Front)</strong>, <strong>Hình chiếu bằng (Top)</strong>, <strong>Hình chiếu cạnh (Side)</strong>.
          </p>
        </div>
      </div>

      {/* Drawing Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-wide">
            Hồ Sơ Bản Vẽ Đang Quản Lý ({ALL_DRAWINGS.length})
          </h3>
          <span className="text-xs text-slate-500 font-mono">Thư mục nguồn: /home/kvan185/KhanhVan/CAD/BanVe/</span>
        </div>

        {ALL_DRAWINGS.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-slate-200 border-dashed text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">Chưa có bản vẽ nào được đăng ký</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Toàn bộ bản vẽ đã được dọn sạch khỏi web theo chỉ đạo của Giám Đốc.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALL_DRAWINGS.map((dwg) => (
            <div
              key={dwg.slug}
              className="bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {dwg.filename}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dwg.category}</span>
                </div>

                <h4 className="text-lg font-bold text-slate-900">{dwg.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{dwg.description}</p>

                {/* Thumbnail Preview */}
                <div className="h-48 w-full bg-[#1e2530] rounded-xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center p-4 relative group">
                  {dwg.previewImage ? (
                    <img
                      src={dwg.previewImage}
                      alt={dwg.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3 text-center">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-mono font-bold text-cyan-300">AutoCAD 2D DWG Vector</p>
                        <p className="text-[10px] text-slate-400">Xem trực tiếp bằng Bàn Soi Bản Vẽ</p>
                      </div>
                    </div>
                  )}
                  <Link
                    href={`/drawings/${dwg.slug}`}
                    className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition flex items-center justify-center space-x-2 text-white font-bold text-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Mở Bàn Soi Bản Vẽ Kỹ Thuật</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <a
                    href={dwg.dwgUrl}
                    download
                    className="flex items-center space-x-1 font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải DWG Gốc</span>
                  </a>
                  <a
                    href={dwg.dxfUrl}
                    download
                    className="flex items-center space-x-1 font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải DXF</span>
                  </a>
                </div>

                <Link
                  href={`/drawings/${dwg.slug}`}
                  className="flex items-center space-x-1.5 font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  <span>Vào Bàn Soi Bản Vẽ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
