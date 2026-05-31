import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { updatePost, deletePost } from "@/lib/sheets";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const data = await req.json();
    await updatePost(id, data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/posts PUT]", err);
    return NextResponse.json({ error: "수정에 실패했습니다." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deletePost(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/posts DELETE]", err);
    return NextResponse.json({ error: "삭제에 실패했습니다." }, { status: 500 });
  }
}
