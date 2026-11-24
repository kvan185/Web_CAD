import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
  title: 'CAD-HST | Web-to-Factory CAD Ecosystem',
  description: 'Nền tảng thiết kế mô hình 3D trên Web và tự động sinh bản vẽ cơ khí STEP/DXF cho xưởng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
