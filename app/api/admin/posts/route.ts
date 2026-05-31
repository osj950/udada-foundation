import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { getPosts, appendPost } from "@/lib/sheets";

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[admin/posts GET]", err);
    return NextResponse.json({ error: "데이터를 불러올 수 없습니다." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const id = await appendPost(data);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[admin/posts POST]", err);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}
