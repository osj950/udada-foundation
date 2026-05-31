import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { getHistoryItems, appendHistoryItem } from "@/lib/sheets";

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  try {
    const items = await getHistoryItems();
    items.sort((a, b) => Number(a.year) - Number(b.year));
    return NextResponse.json(items);
  } catch (err) {
    console.error("[admin/history GET]", err);
    return NextResponse.json({ error: "데이터를 불러올 수 없습니다." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "인증 오류" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const id = await appendHistoryItem(data);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[admin/history POST]", err);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}
