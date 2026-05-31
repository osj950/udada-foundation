import { NextResponse } from "next/server";
import { getPosts } from "@/lib/sheets";

export const revalidate = 60;

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}
