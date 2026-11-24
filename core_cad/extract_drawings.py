import FreeCAD as App
import Part
import os

doc = App.openDocument("/home/kvan185/KhanhVan/CAD/BanVe/rang.FCStd")

clusters = [
    ("mat-bang-day-chuyen", doc.Cum_1_Mat_Bang_Day_Chuyen, "Sơ Đồ Mặt Bằng Toàn Dây Chuyền Xưởng", "#1e293b"),
    ("may-rang-tong-the", doc.Cum_2_May_Rang_Tong_The, "Bản Vẽ Máy Rang Cà Phê 120kg/mẻ Tổng Thể", "#0f172a"),
    ("bich-dau-hoi-truc", doc.Cum_3_Chi_Tiet_Bich_MR01_MR02, "Chi Tiết Bích Đầu Hồi MR01/MR02 & Trục Láp", "#1e1b4b"),
    ("khung-be-bang-ke", doc.Cum_4_Khung_Be_Va_Bang_Ke, "Khung Bệ Máy Rang & Bảng Kê Vật Liệu Cắt Laser", "#064e3b"),
]

out_dir = "/home/kvan185/KhanhVan/CAD-HST/public/drawings"
os.makedirs(out_dir, exist_ok=True)

for slug, obj, title, stroke_color in clusters:
    bb = obj.Shape.BoundBox
    pad_x = bb.XLength * 0.04 if bb.XLength > 0 else 500
    pad_y = bb.YLength * 0.04 if bb.YLength > 0 else 500
    
    min_x = bb.XMin - pad_x
    max_x = bb.XMax + pad_x
    min_y = bb.YMin - pad_y
    max_y = bb.YMax + pad_y
    
    w = max_x - min_x
    h = max_y - min_y
    
    # Path generation
    paths = []
    for edge in obj.Shape.Edges:
        try:
            pts = edge.discretize(Number=16)
            if len(pts) >= 2:
                d = f"M {pts[0].x - min_x:.1f} {max_y - pts[0].y:.1f} " + " ".join([f"L {p.x - min_x:.1f} {max_y - p.y:.1f}" for p in pts[1:]])
                paths.append(f'<path d="{d}" fill="none" stroke="{stroke_color}" stroke-width="1.3" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" />')
        except:
            pass

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="100%" height="100%">
  <defs>
    <pattern id="grid_{slug}" width="{w/40:.1f}" height="{h/40:.1f}" patternUnits="userSpaceOnUse">
      <path d="M {w/40:.1f} 0 L 0 0 0 {h/40:.1f}" fill="none" stroke="#f1f5f9" stroke-width="0.5" vector-effect="non-scaling-stroke" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />
  <rect width="100%" height="100%" fill="url(#grid_{slug})" />
  <g id="geometry">
    {''.join(paths)}
  </g>
</svg>'''

    svg_file = os.path.join(out_dir, f"{slug}.svg")
    with open(svg_file, "w") as f:
        f.write(svg_content)
    print(f"Generated {svg_file} ({len(paths)} paths, {len(svg_content)/1024:.1f} KB)")

print("ALL_EXTRACTIONS_DONE")
