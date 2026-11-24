# HƯỚNG DẪN DẠY AI AGENT: KHUNG MẪU & QUY CHUẨN THIẾT KẾ (CAD-HST)

> **Mục đích**: Tài liệu này đóng vai trò là "Cẩm nang huấn luyện" (System Instructions / Agent Prompt) dành cho bất kỳ AI Agent nào khi tham gia phát triển, bảo trì hoặc tạo thêm dòng máy mới trong hệ sinh thái CAD-HST.

---

## ⚡ NGUYÊN TẮC TIÊN QUYẾT & TỐI THƯỢNG: TIẾT KIỆM QUOTA + CHÍNH XÁC TUYỆT ĐỐI
1. **Tiết kiệm Quota tối đa**: Tuyệt đối không giải thích dài dòng, không in code thừa vào chat. Xử lý logic ngầm dưới terminal/script. Phản hồi súc tích, đúng trọng tâm.
2. **Chính xác cơ khí tuyệt đối**: Tính toán đúng từng milimet tọa độ ($X, Y, Z$), đường kính, dung sai và liên kết cơ cấu; không được có sai số làm hỏng phôi gia công.

---

## 0. PHÂN CHIA HỆ THỐNG THÀNH 5 MẢNG ĐỘC LẬP (FOCUS ON ASSIGNED PILLAR)
Hệ thống được chia tách bạch làm 5 mảng chuyên biệt. **Khi Giám Đốc chỉ định mảng nào, Agent CHỈ TẬP TRUNG 100% VÀO MẢNG ĐÓ, tuyệt đối không làm lan man sang mảng khác**:
1. **Thiết kế Giao diện (Frontend UI/UX)**: Giao diện Next.js, Three.js/R3F Canvas, bố cục Dark Mode, thanh trượt Sliders, tương tác người dùng.
2. **Làm Việc Với Bản Vẽ (Drawing Analysis & Projections)**: Đọc hiểu bản vẽ 2D/3D kỹ thuật, bóc tách kích thước hình học, tự động xuất ảnh các góc chiếu chuẩn: hình chiếu đứng (Front), hình chiếu bằng (Top), hình chiếu cạnh (Side).
3. **Thiết kế Máy & Chi Tiết (3D Modeling, Kết cấu & Phôi Gốc)**: Phân tách bạch thành 2 phần liên kết chặt chẽ:
   - **Phần A - Máy (Cụm Máy Hoàn Chỉnh / Assembly)**: Dựng hình tham số cơ cấu cơ khí (máng U, trống 2 lớp, nan giằng, cánh đảo/xoắn, vỏ bồn), logic chuyển động vận hành và kiểm tra không gian lắp ráp.
   - **Phần B - Chi Tiết (Phôi Vật Tư & Xếp Phôi Nesting)**: Bóc tách từng chi tiết đơn lẻ trên khổ phôi kim loại tiêu chuẩn (tôn cuộn, tôn tấm $1000 \times 3000\text{ mm}$, thép hình), tính toán xếp phôi tối ưu vật tư (Nesting) với khe hở cắt laser chuẩn xác ($1.0 \div 2.0\text{ mm}$).
   - ⚡ **Quy tắc Bắt Buộc - Ánh Xạ Phôi Gốc (Stock-to-Part Traceability)**: Cả **Chi Tiết** và **Máy** BẮT BUỘC phải **ánh xạ chính xác $100\%$ vào Phôi Gốc**:
     + Tọa độ từng đường cắt laser, vị trí từng lỗ đục và các vùng biên đặc kỹ thuật (như 2 viền $2.5\text{ cm} = 25\text{ mm}$ không đục lỗ của tôn lưới) trên phôi gốc phải được giữ nguyên vẹn khi chuyển qua cụm máy.
      + Khi ghép các tấm cắt lại thành kết cấu máy (ví dụ chế độ "Xem ghép 2 tấm tròn"), các mép biên đặc phải ráp đúng chuẩn kỹ thuật hàn (tạo thành dải tôn đặc $5\text{ cm}$ chạy dọc đường hàn TIG), từng lỗ đục và đường biên phải trùng khớp tuyệt đối với vị trí cắt laser trên tấm phôi gốc, tuyệt đối không dùng vân giả lập làm sai lệch thực tế xưởng.
      + **Quy chuẩn khe hở đường hàn giáp mí (Welding Seam Clearance)**: Khe hở kỹ thuật giữa các mép tấm hàn nối quy chuẩn chính xác là $0.1\text{ mm}$ (trong tính toán hình học: `jointGap = 0.1mm`).
4. **Xuất CAD (FreeCAD & Production Files)**: Script FreeCAD Headless, xuất file 3D Solid STEP (CNC), file 2D DXF (cắt laser tôn), quản lý dung sai.
5. **Bóc Tách Chi Tiết Máy & Kiểm Định (BOM & Mechanical Tester)**:
   - **Bóc tách cây chi tiết (Breakdown)**: Khi cụm máy phức tạp, tự động rã ra từng chi tiết đơn lẻ gồm: Tên chi tiết, kích thước quy cách, vật liệu, khối lượng ($kg$), và **hướng dẫn cách tạo/phương pháp gia công chế tạo** (Tiện, Phay CNC, Cắt laser tôn, Chấn bẻ, Hàn ghép).
   - **Mechanical Tester**: Kiểm tra va chạm (Collision Detection), kiểm tra khe hở vận hành/nhiệt, kiểm tra tính khả thi khi lắp ráp thực tế trước khi xuất xưởng.

---

## 0.1. NGUYÊN TẮC GIAO TIẾP & XÁC NHẬN TRƯỚC KHI CHẠY LỆNH
1. **Chưa rõ phải hỏi lại ngay**: Bất kỳ thông số hay yêu cầu nào chưa rõ ràng, phải hỏi lại ngay lập tức, câu hỏi cực kỳ ngắn gọn, trực diện, không dài dòng.
2. **Xác nhận ngắn gọn trước khi thực thi**: Trước khi chạy bất cứ lệnh terminal hoặc thay đổi code nào, Agent **BẮT BUỘC phải xác nhận lại yêu cầu** bằng 1 câu ngắn gọn để đảm bảo đã hiểu đúng 100% ý Giám Đốc.

---

## PHẦN 1. NGUYÊN TẮC CỐT LÕI AI BẮT BUỘC TUÂN THỦ

1. **Tuân thủ triết lý Router độc lập (Zero-Coupling)**:
   - Mọi dòng máy mới phải nằm trong thư mục riêng biệt: `machines/<slug-ten-may>/`.
   - Tuyệt đối không can thiệp hoặc sửa đổi code của các dòng máy khác đã chạy ổn định.
2. **Quy chuẩn tỷ lệ 3D (Scale Rule)**:
   - Thông số cơ khí nhập vào tính bằng **milimet ($mm$)**.
   - Trong Three.js / React Three Fiber, tọa độ hiển thị dùng đơn vị Scene Unit. AI phải chuẩn hóa bằng hằng số tỷ lệ:
     `const scale = 0.002;` hoặc `0.003;` ($1\text{ unit} \approx 300\text{ \div }500\text{ mm}$).
   - Kích thước hiển thị thị giác ($3D$) và kích thước tính toán FreeCAD ($mm$) phải đồng bộ tỷ lệ $100\%$.
3. **Vật liệu kim loại chân thực (Realistic PBR)**:
   - Chi tiết Inox / Thép sáng bóng: `metalness: 0.85 \div 0.95`, `roughness: 0.15 \div 0.25`.
   - Chi tiết khung bệ / gang đúc: `metalness: 0.6 \div 0.7`, `roughness: 0.4 \div 0.5`.
   - Vỏ áo đệm khí / lớp bảo vệ bên ngoài: `transparent: true`, `opacity: 0.65` để nhìn xuyên thấu kết cấu bên trong.
4. **Chuẩn đầu ra gia công cơ khí (Solid B-Rep)**:
   - FreeCAD script phải dựng hình khối đặc (Solid) thông qua các lệnh boolean (`cut`, `fuse`, `common`) của thư viện `Part`.
   - Xuất file `.step` cho máy CNC và file `.dxf` cho máy cắt laser tôn.
5. **Đồng bộ Ánh Xạ Phôi Gốc vào Cụm Máy (100% Stock-to-Part Reality)**:
   - Mọi chi tiết tôn tấm / lưới kim loại trong cụm máy phải truy nguyên nguồn gốc từ vị trí cắt thực tế trên phôi thương mại.
   - Bản đồ UV texture (lỗ đục, hoa văn, dải biên chừa mép hàn) trên chi tiết máy phải ánh xạ trực tiếp từ tọa độ cắt của tấm phôi gốc; tuyệt đối không dùng hoa văn ngẫu nhiên hoặc giả lập làm biến mất các dải biên kỹ thuật thực tế.
6. **Quy chuẩn khe hở đường hàn ghép tấm (0.1mm Seam Clearance)**:
   - Khi ghép nối các phôi tấm kim loại (tôn xẻ tròn, tôn cuộn, vỏ bồn), khe hở giáp mí giữa 2 mép hàn quy định chuẩn xác là $0.1\text{ mm}$ (`jointGap = 0.1`).
   - Đường hàn TIG / MIG mô phỏng dưới dạng khối trụ hoặc dải hàn chuẩn khớp đúng tọa độ tâm của khe hở $0.1\text{ mm}$ này.

---

## PHẦN 2. CHUYÊN ĐỀ: HƯỚNG DẪN AI THIẾT KẾ CỤM "TRỐNG" (TRỐNG RANG / TRỐNG XOAY)

Khi người dùng yêu cầu AI thiết kế một dòng máy có kết cấu **Trống xoay (Rotating Drum)**, AI cần nắm rõ các tiêu chuẩn cơ khí sau:

```text
       ┌────────────────────────────────────────────────────────┐
       │               VỎ ÁO NGOÀI (Outer Shell)                │
       │   ┌────────────────────────────────────────────────┐   │
       │   │        KHE ĐỆM KHÍ CÁCH NHIỆT (Air Gap)        │   │
───────┼───┼─────────── TRỤC LÁP CHÍNH (Shaft) ─────────────┼───┼───────
       │   │           ▲                        ▲           │   │
       │   │           │ 10 NAN GIẰNG (Ribs)    │           │   │
       │   └────────────────────────────────────────────────┘   │
       │                TRỐNG TRONG (Inner Drum)                │
       └────────────────────────────────────────────────────────┘
```

1. **Trống trong (Inner Drum)**:
   - Dạng hình trụ rỗng. Đường kính thông dụng $\varnothing 600 \div 1000\text{ mm}$.
   - Độ dày tôn thành: $6 \div 10\text{ mm}$ (thép tấm cuộn tròn hàn giáp mí).
2. **Vỏ áo ngoài (Outer Jacket / Shell)**:
   - Bán kính ngoài $= R_{\text{trong}} + \text{Khe đệm khí}$ (thường cách $10 \div 25\text{ mm}$).
   - Tác dụng: Ngăn lửa táp trực tiếp làm cháy cục bộ nguyên liệu; tản nhiệt đều quanh thân trống.
3. **Trục láp chính (Central Heavy Shaft)**:
   - Chạy dọc tâm trống, thò ra 2 đầu để bắt gối đỡ vòng bi UCP/UCF và bánh răng truyền động.
   - Đường kính láp đặc: $\varnothing 50 \div 80\text{ mm}$ bằng thép hợp kim C45.
4. **Hệ thống nan giằng trợ lực (Reinforcing Ribs / Spiders)**:
   - Bố trí các thanh thép giằng từ trục láp tỏa đều ra thành trong của trống theo các góc đối xứng ($360^\circ / N$).
   - Số lượng nan giằng: Tối thiểu 6 thanh, tiêu chuẩn 10 đến 12 thanh giằng.
5. **Cánh gom đảo nguyên liệu**:
   - Gắn mặt trong thành trống, uốn lượn hình xoắn ốc để khi trống quay theo chiều thuận thì đảo trộn, quay ngược chiều thì tự động đẩy nguyên liệu ra cửa xả.

---

## PHẦN 3. BỘ KHUNG MẪU TRỐNG (BLANK TEMPLATES) CHO AI TỰ ĐIỀN

Khi được giao tạo một dòng máy mới, AI chỉ cần copy 3 khung mẫu dưới đây và điền logic tương ứng:

### Khung Mẫu 1: `machines/<ten-may>/Model3D.tsx` (Component 3D R3F)
```tsx
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Model3DProps {
  params: Record<string, number>;
  isAnimating?: boolean;
}

export default function [TenMay]Model3D({ params, isAnimating = true }: Model3DProps) {
  const rotatingPartRef = useRef<THREE.Group>(null);

  const scale = 0.0025;
  const R = (params.[paramRadius] || 300) * scale;
  const L = (params.[paramLength] || 1000) * scale;

  useFrame((_, delta) => {
    if (isAnimating && rotatingPartRef.current) {
      rotatingPartRef.current.rotation.x += delta * 1.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* KHỐI CHUYỂN ĐỘNG */}
      <group ref={rotatingPartRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[R, R, L, 36]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* KHỐI CỐ ĐỊNH / BỆ ĐỠ */}
      <mesh position={[0, -R * 1.2, 0]}>
        <boxGeometry args={[L * 1.1, R * 0.4, R * 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}
```

### Khung Mẫu 2: `machines/<ten-may>/generator.py` (Script FreeCAD Solid)
```python
import sys
import json
import argparse

def build_solid_model(params, step_out_path, dxf_out_path):
    try:
        import FreeCAD as App
        import Part

        doc = App.newDocument("[TenMay]")

        R = float(params.get("[paramRadius]", 300))
        L = float(params.get("[paramLength]", 1000))
        thickness = float(params.get("thickness", 5))

        outer_body = Part.makeCylinder(R, L)
        inner_void = Part.makeCylinder(R - thickness, L)
        shell = outer_body.cut(inner_void)

        Part.export([shell], step_out_path)
        print(f">> [FreeCAD Success] Đã xuất: {step_out_path}")

    except Exception as e:
        print(f">> [FreeCAD Error]: {e}", file=sys.stderr)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--params", default="{}")
    parser.add_argument("--step", required=True)
    parser.add_argument("--dxf", required=True)
    args, _ = parser.parse_known_args()

    param_dict = json.loads(args.params)
    build_solid_model(param_dict, args.step, args.dxf)
```

### Khung Mẫu 3: Đăng Ký Máy Mới Trong `machines/registry.ts`
```typescript
'[slug-ten-may]': {
  slug: '[slug-ten-may]',
  name: '[Tên Đầy Đủ Của Máy]',
  code: '[MÃ-HIỆU-MÁY]',
  category: '[Ngành Hàng / Nhóm Máy]',
  description: '[Mô tả công năng]',
  material: '[Quy cách vật liệu: Inox 304 / Thép SS400]',
  params: [
    {
      id: '[paramId]',
      label: '[Tên Tham Số]',
      unit: 'mm',
      min: 100,
      max: 1000,
      step: 10,
      defaultValue: 400,
      description: '[Giải thích kỹ thuật]',
      category: 'Kích Thước',
    },
  ],
  defaultParams: {
    '[paramId]': 400,
  },
},
```
