import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Instagram 토큰이 설정되지 않았습니다. 관리자에게 문의하세요." }, { status: 503 });
  }

  const fields = "id,media_url,permalink,caption,timestamp,media_type,thumbnail_url";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=18`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return NextResponse.json({ error: "Instagram 피드를 불러올 수 없습니다." }, { status: 502 });
  }
  const data = await res.json();
  return NextResponse.json(data.data ?? []);
}
