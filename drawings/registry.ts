export interface DrawingMetadata {
  slug: string;
  name: string;
  filename: string;
  filepath: string;
  category: string;
  description: string;
  previewImage: string;
  isVector?: boolean;
  dwgUrl: string;
  dxfUrl: string;
  autodeskUrl?: string;
  specifications: {
    label: string;
    value: string;
    note?: string;
  }[];
}

export const DRAWING_REGISTRY: Record<string, DrawingMetadata> = {
  'rang': {
    slug: 'rang',
    name: 'Bản Vẽ Máy Rang 120kg (rang.dwg)',
    filename: 'rang.dwg',
    filepath: '/home/kvan185/KhanhVan/CAD/BanVe/rang.dwg',
    category: 'AutoCAD DWG Master',
    description:
      'Hồ sơ bản vẽ kỹ thuật máy rang cà phê 120kg/mẻ gốc: Hình chiếu đứng, hình chiếu sau, hình chiếu cạnh mặt cắt, kích thước gia công mm.',
    previewImage: '',
    isVector: true,
    dwgUrl: '/exports/rang.dwg',
    dxfUrl: '',
    autodeskUrl:
      'https://viewer.autodesk.com/id/dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTM2MHZpZXdlci1wcm90ZWN0ZWQvdDE3OTQ5MDE3ODlfMmJkYmVlNDEtNWI4OC00NjFlLWJiYzYtZTdhOGJkNjViYzY5LmR3Zw?sheetId=ODBiNzgzYTctZDNhYi03ODI2LTlkNjctNGE5YzMxMzRmOTA3',
    specifications: [
      { label: 'Tên file bản vẽ gốc', value: 'rang.dwg (AutoCAD AC1021 / 2007)' },
      { label: 'Kích thước chân bệ (Front)', value: 'Rộng 1216 mm x Cao 600 mm' },
      { label: 'Chiều cao tổng thể (Side)', value: 'Cao 2482 mm từ sàn xưởng đến đỉnh phễu' },
      { label: 'Buồng trống rang 2 lớp', value: 'Trống trong Ø864 mm x Vỏ áo ngoài Ø1200 mm' },
      { label: 'Trục láp chính', value: 'Thép hợp kim C45 Ø60 mm' },
      { label: 'Màu nét kích thước (Blue)', value: 'Xanh dương kỹ thuật chuẩn (#0000ff)' },
      { label: 'Màu cổ phễu nạp (Red)', value: 'Đỏ đánh dấu chi tiết quan trọng (#ff0000)' },
    ],
  },
};

export const ALL_DRAWINGS = Object.values(DRAWING_REGISTRY);
