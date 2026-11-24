# CAD-HST: HỆ SINH THÁI THIẾT KẾ MÁY WEB-TO-FACTORY

> **Dành riêng cho Kỹ sư CNTT & Kỹ sư Cơ khí**: Nền tảng thiết kế mô hình 3D tham số trực quan trên Web bằng Next.js + React Three Fiber, tự động xuất trọn bộ hồ sơ gia công xưởng (file STEP 3D Solid, file DXF 2D cắt laser và bảng BOM vật tư) thông qua nhân FreeCAD Headless.

---

## 1. Giới Thiệu Hệ Thống (Architecture & Concept)

### 1.1. Triết Lý Thiết Kế
Truyền thống thiết kế CAD cơ khí thường nặng nề, khó chia sẻ và đòi hỏi cài đặt phần mềm chuyên dụng phức tạp. **CAD-HST** giải quyết triệt để vấn đề này bằng tư duy của Kỹ sư CNTT:
* **Web First**: Toàn bộ thao tác tinh chỉnh, xem trước và mô phỏng hoạt động diễn ra trực tiếp trên trình duyệt web.
* **Next.js Router = Machine Module**: Mỗi dòng máy công nghiệp là **một Router URL độc lập** (`/machines/[slug]`). Thay đổi hoặc thêm mới một máy không bao giờ làm ảnh hưởng đến các máy khác (Zero Coupling).
* **Cầu Nối Hai Chiều Web-to-CAD**:
  * **Trình duyệt (Three.js / R3F)**: Hiển thị mô hình 3D kim loại bóng bẩy, thời gian thực ($< 16\text{ms}$), hỗ trợ xoay 360°, bật/tắt lưới tọa độ CAD.
  * **Backend (FreeCAD Headless)**: Chạy ngầm qua Flatpak CLI không cần bật GUI, tự động tính toán hình học khối đặc (Solid B-Rep) chuẩn xác $100\%$ theo tham số từ Web để xuất file xưởng.

```text
[Trình Duyệt (Web UI)] ──(JSON Tham Số)──> [Next.js API Route] ──(Subprocess)──> [FreeCAD Flatpak Headless]
   - Three.js / R3F                            /api/export-cad                     - Tính toán Solid B-Rep
   - Tinh chỉnh Sliders                                                            - Xuất: .STEP, .DXF, .CSV
```

---

## 2. Danh Mục Các Dòng Máy Đã Tích Hợp

Hệ thống hiện tại đã tích hợp sẵn 3 dòng máy công nghiệp hoàn chỉnh:

### A. [Máy Trộn Nằm Ngang Inox 150kg](file:///home/kvan185/KhanhVan/CAD-HST/machines/may-tron-150kg)
* **Mã hiệu**: `MT-150KG-INOX`
* **Router URL**: `/machines/may-tron-150kg`
* **Công năng**: Trộn đảo bột khô, nông sản, bột dược liệu công suất 150kg/mẻ theo tiêu chuẩn vệ sinh an toàn thực phẩm.
* **Vật liệu**: Toàn bộ bằng **Inox 304**.
* **Kết cấu chính**:
  * Bồn trộn lòng máng chữ U bo đáy tròn.
  * Trục chính láp đặc $\varnothing 60\text{ mm}$ truyền động qua mô-tơ giảm tốc $3.7\text{ kW}$.
  * Cụm cánh xoắn kép gom tâm đảo chiều giúp trộn đều nguyên liệu.
  * Cửa xả liệu đáy nghiêng $45^\circ$ có ngàm khóa nhanh.
* **Tham số tùy biến trên Web**: Bán kính bồn máng $R$ ($200 \div 500\text{ mm}$), Chiều dài khoang trộn $L$ ($500 \div 1500\text{ mm}$), Đường kính trục láp ($40 \div 90\text{ mm}$), Bước xoắn cánh, Độ dày tôn Inox.

---

### B. [Máy Rang Cà Phê Bằng Củi 2 Lớp](file:///home/kvan185/KhanhVan/CAD-HST/machines/may-rang-cui)
* **Mã hiệu**: `MR-CUI-800`
* **Router URL**: `/machines/may-rang-cui`
* **Công năng**: Trống rang hạt cà phê và nông sản sử dụng nhiệt đốt từ củi, chuyên dụng cho các xưởng chế biến nông sản lớn.
* **Vật liệu**: Thép chịu nhiệt SS400 & Lòng Inox.
* **Kết cấu chính**:
  * **Trống trong $\varnothing 800\text{ mm}$**: Thành tiếp xúc hạt rang, dày $8\text{ mm}$.
  * **Vỏ áo ngoài $\varnothing 830\text{ mm}$**: Lớp đệm khí cách ly ngọn lửa củi trực tiếp, chống cháy khét bề mặt hạt.
  * **Trục láp chính $\varnothing 65\text{ mm}$**: Chịu nhiệt độ cao và tải trọng lớn.
  * **Hệ thống 10 nan giằng trợ lực**: Liên kết vững chắc giữa trục và thành trống.
  * Vành răng truyền động lớn và cánh đảo xoắn ốc bám sát thành trống.
* **Tham số tùy biến trên Web**: Bán kính trống trong, Chiều dài trống ($800 \div 1800\text{ mm}$), Khe hở đệm khí ($10 \div 40\text{ mm}$), Số lượng nan giằng ($6 \div 16\text{ cây}$).

---

### C. [Cụm Hộp Hút Hàng Liệu Chưa Xay](file:///home/kvan185/KhanhVan/CAD-HST/machines/hop-hut-lieu)
* **Mã hiệu**: `HH-LIEU-01`
* **Router URL**: `/machines/hop-hut-lieu`
* **Công năng**: Cụm phễu trung gian tiếp nhận nguyên liệu trước khi đưa vào máy nghiền/xay trong hệ thống cân định lượng tự động.
* **Vật liệu**: Inox 304 dày $2.5\text{ mm}$.
* **Kết cấu chính**:
  * Miệng phễu côn loe rộng có vành bích gia cường chống móp méo.
  * Cổ thu đáy nối ống hút nguyên liệu $\varnothing 90\text{ mm}$.
  * Bệ đỡ 3 chân hình kiềng chữ V triệt tiêu rung động khi đường ống hút chân không hoạt động.
* **Tham số tùy biến trên Web**: Bán kính miệng phễu, Chiều cao thân côn, Đường kính cổ ống xả, Chiều cao chân giá đỡ.

---

## 3. Hướng Dẫn Sử Dụng Chi Tiết

### Bước 1: Khởi Động Hệ Sinh Thái
Chỉ cần chạy script 1-click từ thư mục dự án:
```bash
cd /home/kvan185/KhanhVan/CAD-HST
./run.sh
```
Mở trình duyệt truy cập: **`http://localhost:3000`**

---

### Bước 2: Điều Hướng & Chọn Máy Cần Thiết Kế
* Trên **Sidebar bên trái**, click chọn dòng máy bạn muốn làm việc (ví dụ: *Máy Trộn Nằm Ngang 150kg*).
* URL sẽ chuyển tương ứng sang `/machines/may-tron-150kg`.

---

### Bước 3: Quan Sát & Tương Tác Mô Hình 3D
* **Chuột trái**: Giữ và rê chuột để xoay mô hình 3D $360^\circ$ theo mọi góc nhìn.
* **Chuột phải**: Giữ và rê chuột để trượt (Pan) vị trí khung nhìn.
* **Con lăn chuột (Scroll)**: Phóng to / Thu nhỏ mô hình.
* **Nút "Lưới CAD"**: Bật/tắt lưới tọa độ kỹ thuật sàn.
* **Nút "Mô Phỏng Xoay / Dừng Xoay"**: Bật/tắt chuyển động xoay thực tế của cánh đảo hoặc trống rang.

---

### Bước 4: Tinh Chỉnh Tham Số Cơ Khí Thời Gian Thực
* Ở bảng **"Bảng Thông Số Cơ Khí"** bên phải màn hình:
  * Kéo các thanh trượt (Slider) hoặc nhập số trực tiếp vào ô input.
  * Mô hình 3D trên màn hình sẽ **co giãn, thay đổi kích thước ngay lập tức** tương ứng với từng milimet thay đổi.
  * Nhấn nút **"Mặc định"** nếu muốn quay về kích thước tiêu chuẩn ban đầu của nhà sản xuất.

---

### Bước 5: Xuất File Hồ Sơ Gia Công Cho Xưởng
1. Nhấn nút xanh **"Xuất File Xưởng (STEP / DXF)"** ở góc trên bên phải.
2. Hệ thống sẽ tự động gửi thông số đến FreeCAD Flatpak Headless để xử lý ngầm.
3. Sau 1-2 giây, hộp thoại cung cấp 3 nút tải về:
   * **Tải file `.STEP`**: Đưa trực tiếp vào phần mềm Mastercam / SolidWorks / Fusion 360 để lập trình máy phay, tiện, đột CNC.
   * **Tải file `.DXF`**: Đưa vào máy cắt laser CNC để cắt tôn tấm Inox/Thép.
   * **Tải file `BOM.csv`**: Bảng bóc tách quy cách sắt thép, tôn tấm, bạc đạn, bu-lông và khối lượng thực tế (kg) để báo giá vật tư.

---

## 4. Hướng Dẫn Thêm Máy Mới Vào Hệ Sinh Thái (Dành Cho Lập Trình Viên)

Để thêm 1 dòng máy mới (ví dụ: `may-ep-vien`):
1. **Bước 1**: Tạo thư mục `machines/may-ep-vien/`.
2. **Bước 2**: Tạo component 3D `Model3D.tsx` sử dụng React Three Fiber.
3. **Bước 3**: Khai báo thông số và cấu hình trong file `machines/registry.ts`.
4. **Bước 4**: (Tùy chọn) Viết script FreeCAD `generator.py` để sinh file STEP.
👉 Hệ thống Next.js App Router sẽ **tự động sinh trang mới** tại `/machines/may-ep-vien` mà không cần sửa code giao diện chung!
