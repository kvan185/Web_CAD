'use client';

import React from 'react';
import { ParamDefinition } from '@/machines/registry';
import { RotateCcw, Sliders, Box, Layers } from 'lucide-react';

interface ParameterControlProps {
  params: Record<string, number>;
  definitions: ParamDefinition[];
  onChange: (id: string, value: number) => void;
  onReset: () => void;
  onClose?: () => void;
}

export default function ParameterControl({
  params,
  definitions,
  onChange,
  onReset,
  onClose,
}: ParameterControlProps) {
  // Group by category
  const categories: Array<'Kích Thước' | 'Kết Cấu' | 'Vật Tư'> = [
    'Kích Thước',
    'Kết Cấu',
    'Vật Tư',
  ];

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <div className="flex items-center space-x-2 text-slate-900">
          <Sliders className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm tracking-wide">Bảng Thông Số Cơ Khí</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition"
            title="Khôi phục thông số mặc định"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Mặc định</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition"
              title="Thu gọn bảng thông số"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const catParams = definitions.filter((d) => d.category === cat);
          if (catParams.length === 0) return null;

          return (
            <div key={cat} className="space-y-3">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <Box className="w-3.5 h-3.5 text-blue-600" />
                <span>{cat}</span>
              </div>

              <div className="space-y-3 pl-1">
                {catParams.map((def) => {
                  const val = params[def.id] ?? def.defaultValue;
                  return (
                    <div key={def.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <label
                          htmlFor={def.id}
                          className="text-slate-700 font-medium cursor-pointer"
                          title={def.description}
                        >
                          {def.label}
                        </label>
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            id={def.id}
                            value={val}
                            min={def.min}
                            max={def.max}
                            step={def.step}
                            onChange={(e) => onChange(def.id, Number(e.target.value))}
                            className="w-16 px-1.5 py-0.5 text-right font-mono text-xs bg-slate-50 border border-slate-300 rounded text-blue-700 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                          />
                          <span className="text-slate-400 text-[11px] w-6">{def.unit}</span>
                        </div>
                      </div>

                      {/* Slider Track */}
                      <input
                        type="range"
                        min={def.min}
                        max={def.max}
                        step={def.step}
                        value={val}
                        onChange={(e) => onChange(def.id, Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                      />

                      <div className="flex justify-between text-[10px] text-slate-400 font-mono px-0.5">
                        <span>{def.min}{def.unit}</span>
                        <span>{def.max}{def.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
