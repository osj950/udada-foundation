import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { getPosts, appendPost } from "@/lib/sheets";

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  const data = await req.json();
  const id = await appendPost(data);
  return NextResponse.json({ ok: true, id });
}
