import { NextResponse } from "next/server";
import { getPosts } from "@/lib/sheets";

export const revalidate = 60;

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[/api/posts]", err);
    return NextResponse.json([]);
  }
}
