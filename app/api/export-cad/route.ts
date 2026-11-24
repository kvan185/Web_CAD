import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { machineSlug, params } = body;

    if (!machineSlug) {
      return NextResponse.json(
        { success: false, message: 'Thiếu machineSlug' },
        { status: 400 }
      );
    }

    const runnerPath = path.join(process.cwd(), 'core_cad', 'runner.py');
    const paramsStr = JSON.stringify(params || {});

    // Gọi Python Runner
    const child = spawn('python3', [
      runnerPath,
      '--machine',
      machineSlug,
      '--params',
      paramsStr,
    ]);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    const exitCode = await new Promise<number>((resolve) => {
      child.on('close', resolve);
    });

    if (exitCode !== 0) {
      console.error('Runner error:', stderr);
      return NextResponse.json(
        { success: false, message: `Lỗi runner FreeCAD: ${stderr || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Parse JSON result từ stdout
    try {
      const result = JSON.parse(stdout.trim());
      return NextResponse.json(result);
    } catch (e) {
      return NextResponse.json({
        success: true,
        message: 'Xuất file hoàn tất (raw output)',
        stdout,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Lỗi xử lý API' },
      { status: 500 }
    );
  }
}
