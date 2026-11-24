'use client';

import React from 'react';

export default function StandaloneRangViewerPage() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#212830]">
      <iframe
        src="/rang_viewer.html"
        className="w-full h-full border-0 block"
        title="Bản Vẽ Vector Toàn Diện - rang.dwg"
      />
    </div>
  );
}
