'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DRAWING_REGISTRY } from '@/drawings/registry';

export default function DrawingDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'rang';
  const drawing = DRAWING_REGISTRY[slug];

  let viewerSrc = '/rang_viewer.html';
  if (slug === 'so-do-dau-noi-truc-tiep') {
    viewerSrc = '/so_do_viewer.html';
  }

  const title = drawing?.name || 'Bản Vẽ Kỹ Thuật CAD-HST';

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#212830]">
      <iframe
        src={viewerSrc}
        className="w-full h-full border-0 block"
        title={title}
      />
    </div>
  );
}
