import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { updatePost, deletePost } from "@/lib/sheets";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  const { id } = await params;
  const data = await req.json();
  await updatePost(id, data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
