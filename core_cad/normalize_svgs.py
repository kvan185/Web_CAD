import FreeCAD as App
import Part
import os

doc = App.openDocument("/home/kvan185/KhanhVan/CAD/BanVe/rang.FCStd")

clusters = [
    ("mat-bang-day-chuyen", doc.Cum_1_Mat_Bang_Day_Chuyen, "Sơ Đồ Mặt Bằng Dây Chuyền Xưởng", "#0f172a"),
    ("may-rang-tong-the", doc.Cum_2_May_Rang_Tong_The, "Bản Vẽ Máy Rang Cà Phê 120kg/mẻ", "#0f172a"),
    ("bich-dau-hoi-truc", doc.Cum_3_Chi_Tiet_Bich_MR01_MR02, "Chi Tiết Bích Đầu Hồi & Trục Láp", "#0f172a"),
    ("khung-be-bang-ke", doc.Cum_4_Khung_Be_Va_Bang_Ke, "Khung Bệ Máy Rang & Bảng Kê", "#0f172a"),
]

out_dir = "/home/kvan185/KhanhVan/CAD-HST/public/drawings"
os.makedirs(out_dir, exist_ok=True)

TARGET_W = 2400.0

for slug, obj, title, stroke_color in clusters:
    bb = obj.Shape.BoundBox
    pad_x = bb.XLength * 0.03 if bb.XLength > 0 else 500
    pad_y = bb.YLength * 0.03 if bb.YLength > 0 else 500
    
    min_x = bb.XMin - pad_x
    max_x = bb.XMax + pad_x
    min_y = bb.YMin - pad_y
    max_y = bb.YMax + pad_y
    
    cad_w = max_x - min_x
    cad_h = max_y - min_y
    if cad_w <= 0 or cad_h <= 0:
        continue

    scale = TARGET_W / cad_w
    target_h = cad_h * scale

    paths = []
    for edge in obj.Shape.Edges:
        try:
            pts = edge.discretize(Number=14)
            if len(pts) >= 2:
                # Map to pixel coordinate space
                d = f"M {(pts[0].x - min_x)*scale:.2f} {(max_y - pts[0].y)*scale:.2f} " + " ".join([f"L {(p.x - min_x)*scale:.2f} {(max_y - p.y)*scale:.2f}" for p in pts[1:]])
                paths.append(f'<path d="{d}" />')
        except:
            pass

    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{TARGET_W:.0f}" height="{target_h:.0f}" viewBox="0 0 {TARGET_W:.0f} {target_h:.0f}">
  <rect width="100%" height="100%" fill="#ffffff" />
  <g fill="none" stroke="{stroke_color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    {chr(10).join(paths)}
  </g>
</svg>'''

    svg_file = os.path.join(out_dir, f"{slug}.svg")
    with open(svg_file, "w") as f:
        f.write(svg_content)
    print(f"Generated normalized {slug}.svg ({TARGET_W:.0f}x{target_h:.0f}, {len(paths)} paths)")

print("NORMALIZATION_COMPLETE")
