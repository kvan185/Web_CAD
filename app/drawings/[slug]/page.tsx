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
  } else if (slug === 'chi-tiet-than-bon-va-san-tung-nuoc') {
    viewerSrc = '/than_bon_viewer.html';
  } else if (slug === 'so-do-dau-noi-song-song') {
    viewerSrc = '/song_song_viewer.html';
  } else if (slug === 'than-bon-xu-ly-khoi-a-kuong') {
    viewerSrc = '/than_bon_akuong_viewer.html';
  } else if (slug === 'mang-gom-caramen-dai-hong-thuy') {
    viewerSrc = '/mang_gom_caramen_viewer.html';
  } else if (slug === 'so-do-mat-bang-he-thong-rang') {
    viewerSrc = '/mat_bang_viewer.html';
  } else if (slug === 'so-do-mat-bang-cafe-thu-thao') {
    viewerSrc = '/thu_thao_viewer.html';
  } else if (slug === 'he-thong-hut-khoi-lo-bap-nau-duong') {
    viewerSrc = '/lo_bap_viewer.html';
  } else if (slug === 'thap-xu-ly-khoi-4m-va-xilon-bui') {
    viewerSrc = '/thap_4m_viewer.html';
  } else if (slug === 'thap-xu-ly-khoi-d1500-va-san-nan-200') {
    viewerSrc = '/thap_d1500_viewer.html';
  } else if (slug === 'cum-pheu-nap-va-mang-tron-u-doi') {
    viewerSrc = '/mang_u_viewer.html';
  } else if (slug === 'buong-tron-va-truc-canh-dao') {
    viewerSrc = '/buong_tron_viewer.html';
  } else if (slug === 'co-cau-2-truc-canh-dao-song-song') {
    viewerSrc = '/2_truc_viewer.html';
  } else if (slug === 'mang-thoat-lieu-day-vat') {
    viewerSrc = '/mang_thoat_viewer.html';
  } else if (slug === 'pheu-xa-chia-2-nga') {
    viewerSrc = '/pheu_2_nga_viewer.html';
  } else if (slug === 'mat-bich-truoc-va-sau-may-rang') {
    viewerSrc = '/mat_bich_viewer.html';
  } else if (slug === 'kich-thuoc-be-do-va-mat-bich-16li') {
    viewerSrc = '/be_do_16li_viewer.html';
  } else if (slug === 'tong-the-3-hinh-chieu-cum-may-rang') {
    viewerSrc = '/may_rang_tong_the_viewer.html';
  } else if (slug === 'thanh-cu-truot-cua-xa-mat-bich') {
    viewerSrc = '/thanh_cu_viewer.html';
  } else if (slug === 'hinh-chieu-canh-buong-rang') {
    viewerSrc = '/buong_rang_canh_viewer.html';
  } else if (slug === 'cum-truyen-dong-puly-dai-dinh') {
    viewerSrc = '/puly_dinh_viewer.html';
  } else if (slug === 'cum-pheu-nap-con-va-co-chuyen-vuong-tron') {
    viewerSrc = '/pheu_chuyen_vuong_tron_viewer.html';
  } else if (slug === 'chi-tiet-khai-trien-pheu-con-chuyen-tiep') {
    viewerSrc = '/pheu_con_chuyen_tiep_viewer.html';
  } else if (slug === 'khung-be-hop-3-khoang-va-mat-bich-360') {
    viewerSrc = '/khung_be_3_khoang_viewer.html';
  } else if (slug === 'cum-vit-tai-dung-nap-lieu-tu-dong-h2400') {
    viewerSrc = '/vit_tai_dung_viewer.html';
  } else if (slug === 'bon-chua-va-lam-nguoi-ca-phe-d900') {
    viewerSrc = '/bon_chua_d900_viewer.html';
  } else if (slug === 'can-gat-khoa-va-chot-keo-tay-cua-xa') {
    viewerSrc = '/can_gat_khoa_viewer.html';
  } else if (slug === 'chi-tiet-boc-tach-vit-tai-dung-va-mat-bich') {
    viewerSrc = '/vit_tai_boc_tach_viewer.html';
  } else if (slug === 'chi-tiet-mang-nap-day-va-khai-trien-phoi-ton') {
    viewerSrc = '/mang_nap_day_viewer.html';
  } else if (slug === 'cum-canh-dao-day-cong-va-nan-giang') {
    viewerSrc = '/canh_dao_day_cong_viewer.html';
  } else if (slug === 'xilon-loc-bui-d1000-va-thung-chua-bui') {
    viewerSrc = '/xilon_loc_bui_d1000_viewer.html';
  } else if (slug === 'to-hop-mat-bich-truoc-sau-va-nep-cong') {
    viewerSrc = '/to_hop_mat_bich_viewer.html';
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
