'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ALL_MACHINES } from '@/machines/registry';
import { ALL_DRAWINGS } from '@/drawings/registry';
import { Layers, Box, Cpu, Sparkles, FolderKanban, Terminal, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-slate-200 flex flex-col h-screen select-none transition-all duration-300 z-30 flex-shrink-0 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}
    >
      {/* Brand & Logo */}
      <div className={`p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 ${isCollapsed ? 'px-3 justify-center' : ''}`}>
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <h1 className="font-bold text-sm tracking-wide text-slate-900 flex items-center space-x-1.5">
                <span>CAD-HST</span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-semibold border border-blue-200">
                  v1.0
                </span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Web-to-Factory CAD</p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition"
          title={isCollapsed ? 'Mở rộng thanh menu' : 'Thu gọn thanh menu'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5">
        {/* Main Menu */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Hệ Thống
            </div>
          )}
          <Link
            href="/"
            title="Tổng Quan Dự Án"
            className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
              pathname === '/'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
          >
            <FolderKanban className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Tổng Quan Dự Án</span>}
          </Link>
        </div>

        {/* ======================================================== */}
        {/* MẢNG 2: LÀM VIỆC VỚI BẢN VẼ (DRAWING ANALYSIS) */}
        {/* ======================================================== */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Bản Vẽ Kỹ Thuật (2D/DWG)</span>
              <span className="font-mono text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold border border-indigo-200">
                {ALL_DRAWINGS.length}
              </span>
            </div>
          )}

          <div className="space-y-1.5">
            {ALL_DRAWINGS.map((dwg) => {
              const href = `/drawings/${dwg.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={dwg.slug}
                  href={href}
                  title={`${dwg.name} (${dwg.filename})`}
                  className={`flex p-2.5 rounded-xl text-xs transition border ${
                    isActive
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-sm font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  } ${isCollapsed ? 'justify-center items-center' : 'flex-col'}`}
                >
                  {isCollapsed ? (
                    <FileText className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold truncate text-slate-800">{dwg.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse flex-shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="text-[10px] text-indigo-600 font-mono font-semibold truncate">
                        {dwg.filename}
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MẢNG 3: DANH MỤC MÁY (3D STUDIO) */}
        {/* ======================================================== */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Mô Hình Máy (3D Studio)</span>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold border border-slate-200">
                {ALL_MACHINES.length}
              </span>
            </div>
          )}

          <div className="space-y-1.5">
            {ALL_MACHINES.map((machine) => {
              const href = `/machines/${machine.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={machine.slug}
                  href={href}
                  title={`${machine.name} (${machine.code})`}
                  className={`flex p-2.5 rounded-xl text-xs transition border ${
                    isActive
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  } ${isCollapsed ? 'justify-center items-center' : 'flex-col'}`}
                >
                  {isCollapsed ? (
                    <Box className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold truncate text-slate-800">{machine.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse flex-shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">{machine.code}</div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className={`p-3 border-t border-slate-200 bg-slate-50 text-xs ${isCollapsed ? 'flex justify-center' : ''}`}>
        {isCollapsed ? (
          <Terminal className="w-4 h-4 text-emerald-600" title="FreeCAD Flatpak: Online" />
        ) : (
          <>
            <div className="flex items-center space-x-2 text-slate-700 mb-0.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-medium">FreeCAD Flatpak: <strong className="text-emerald-600 font-bold">Online</strong></span>
            </div>
            <p className="text-[10px] text-slate-500">
              Headless Solid Engine
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
