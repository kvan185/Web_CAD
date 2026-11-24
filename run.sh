#!/usr/bin/env bash
# ==============================================================
# Script Khởi Động Hệ Sinh Thái Web-to-CAD (CAD-HST)
# ==============================================================

set -e

PORT=${PORT:-3000}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "=============================================================="
echo "🚀 KHỞI ĐỘNG HỆ SINH THÁI CAD-HST (NEXT.JS + FREECAD HEADLESS)"
echo "=============================================================="
echo "📍 Thư mục dự án: $DIR"
echo "🌐 Cổng truy cập: http://localhost:$PORT"
echo "🛠️  Trạng thái FreeCAD Flatpak:"
flatpak list | grep -i freecad || echo "⚠️  Chưa phát hiện Flatpak FreeCAD!"
echo "=============================================================="

# Đảm bảo thư mục export tồn tại
mkdir -p public/exports

# Chạy Next.js Dev Server
npm run dev -- -p "$PORT"
