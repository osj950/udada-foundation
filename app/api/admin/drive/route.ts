import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { uploadFileToDrive } from "@/lib/drive";

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { url } = await uploadFileToDrive(buffer, file.name, file.type);
    return NextResponse.json({ ok: true, url, name: file.name });
  } catch (err) {
    console.error("Drive upload error:", err);
    return NextResponse.json({ error: "Drive 업로드 실패", detail: String(err) }, { status: 500 });
  }
}
