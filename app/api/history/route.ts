import { NextResponse } from "next/server";
import { getHistoryItems } from "@/lib/sheets";

export const revalidate = 60;

export async function GET() {
  try {
    const items = await getHistoryItems();
    // 연도 오름차순 정렬
    items.sort((a, b) => Number(a.year) - Number(b.year));
    return NextResponse.json(items);
  } catch (err) {
    console.error("[/api/history]", err);
    return NextResponse.json([]);
  }
}
