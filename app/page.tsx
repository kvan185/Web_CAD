import React from 'react';
import Link from 'next/link';
import { ALL_MACHINES } from '@/machines/registry';
import { ALL_DRAWINGS } from '@/drawings/registry';
import { Layers, ArrowRight, Cpu, FileCode, CheckCircle, Sparkles, Workflow, FileText } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-100 p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next.js App Router + FreeCAD Flatpak Headless</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hệ Sinh Thái Thiết Kế Máy Web-to-Factory
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Nền tảng tích hợp chuyên biệt cho Kỹ sư CNTT & Cơ khí: Mô phỏng hình học 3D tương tác thời gian thực
            trên trình duyệt bằng React Three Fiber, tự động biên dịch sang mã hình học khối đặc
            (Solid B-Rep) và xuất file gia công cho xưởng sản xuất trong 1 nốt nhạc.
          </p>
        </div>
      </div>

      {/* Architecture Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Router Mô Hình 3D (Web)</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mỗi dòng máy là 1 route độc lập. Tinh chỉnh bán kính, chiều dài, bước xoắn qua thanh trượt.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Web-to-CAD Bridge (API)</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Next.js API route chuyển đổi thông số JSON thành script tham số Python FreeCAD tự động.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Xuất File Xưởng Gia Công</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            FreeCADCmd chạy ngầm không cần GUI, xuất chuẩn file STEP (CNC), DXF (Cắt laser tôn) và BOM.
          </p>
        </div>
      </div>

      {/* Drawing Showcase Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-wide">
              Hồ Sơ Bản Vẽ Kỹ Thuật 2D/DWG ({ALL_DRAWINGS.length})
            </h3>
          </div>
          <span className="text-xs text-indigo-700 font-mono font-semibold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            Vector SVG Zoom 2000%
          </span>
        </div>

        {ALL_DRAWINGS.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 border-dashed text-center space-y-2">
            <h4 className="font-bold text-slate-700 text-sm">Chưa có bản vẽ nào</h4>
            <p className="text-xs text-slate-400">Danh mục bản vẽ kỹ thuật đang trống.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALL_DRAWINGS.map((dwg) => (
            <Link
              key={dwg.slug}
              href={`/drawings/${dwg.slug}`}
              className="group p-5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {dwg.filename}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dwg.category}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>{dwg.name}</span>
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {dwg.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px] truncate max-w-[260px]">{dwg.filepath}</span>
                <span className="text-indigo-600 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition flex-shrink-0">
                  <span>Mở Bản Vẽ Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>

      {/* Machine Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-wide">
            Các Dòng Máy Đã Tích Hợp ({ALL_MACHINES.length})
          </h3>
          <span className="text-xs text-slate-500 font-mono">Độc lập theo từng Router URL</span>
        </div>

        {ALL_MACHINES.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-slate-200 border-dashed text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">Hệ Thống Sẵn Sàng Thiết Kế Máy Mới</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Toàn bộ các file máy mẫu đã được dọn sạch. Giám Đốc hãy gửi yêu cầu thông số kỹ thuật để tạo dòng máy cơ khí mới theo đúng quy chuẩn AGENTS.md.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ALL_MACHINES.map((m) => (
              <Link
                key={m.slug}
                href={`/machines/${m.slug}`}
                className="group p-5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {m.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{m.category}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {m.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{m.material}</span>
                  <span className="text-blue-600 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition">
                    <span>Mở 3D Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
