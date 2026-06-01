"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  attachments: { url: string; name: string }[];
  isPinned: boolean;
};

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "notice", label: "공지사항" },
  { value: "plan", label: "사업계획·결산" },
  { value: "assembly", label: "총회안내" },
  { value: "donation", label: "기부금안내" },
];

const CATEGORY_LABELS: Record<string, string> = {
  notice: "공지사항",
  plan: "사업계획·결산",
  assembly: "총회안내",
  donation: "기부금안내",
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  notice: { bg: "#e8f2e3", text: "#4a7a38" },
  plan: { bg: "#fdf6d3", text: "#8a6a00" },
  assembly: { bg: "#e3eef8", text: "#1a5a8a" },
  donation: { bg: "#fde8e8", text: "#8a1a1a" },
};

export default function NewsClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => {
        if (!r.ok) throw new Error("API 오류");
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const pinned = filtered.filter((p) => p.isPinned);
  const regular = filtered.filter((p) => !p.isPinned);
  const display = [...pinned, ...regular];

  return (
    <>
      <div
        className="mob-head-pad"
        style={{
          marginTop: 68,
          background: "linear-gradient(135deg, #1e3a14 0%, #2d5220 100%)",
          padding: "64px 0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: 12 }}>
            News
          </div>
          <h1 className="page-h1" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            사업소식
          </h1>
        </div>
      </div>

      <section style={{ background: "var(--bg)", padding: "60px 0", minHeight: "60vh" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          {/* 카테고리 탭 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: activeCategory === cat.value ? "var(--green-dark)" : "var(--border)",
                  background: activeCategory === cat.value ? "var(--green-dark)" : "var(--surface)",
                  color: activeCategory === cat.value ? "white" : "var(--text-mid)",
                  fontSize: 14,
                  fontWeight: activeCategory === cat.value ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-gray)", fontSize: 15 }}>
              불러오는 중...
            </div>
          ) : display.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-gray)", fontSize: 15 }}>
              게시글이 없습니다.
            </div>
          ) : (
            <div style={{ background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}>
              {display.map((post, idx) => {
                const catColor = CATEGORY_COLORS[post.category] ?? { bg: "#f0f4ed", text: "#4a7a38" };
                return (
                  <Link
                    key={post.id}
                    href={`/news/${post.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "18px 24px",
                      borderBottom: idx < display.length - 1 ? "1px solid var(--border-light)" : "none",
                      background: post.isPinned ? "var(--surface-pinned)" : "var(--surface)",
                      textDecoration: "none",
                      transition: "background 0.15s",
                      flexWrap: "wrap",
                    }}
                  >
                    {post.isPinned && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#8a6a00", background: "var(--yellow-light)", padding: "3px 8px", borderRadius: 2, flexShrink: 0 }}>
                        공지
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 2,
                        background: catColor.bg,
                        color: catColor.text,
                        flexShrink: 0,
                      }}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                    <span style={{ flex: 1, fontSize: 15, color: "var(--text-dark)", fontWeight: post.isPinned ? 600 : 400, wordBreak: "keep-all", minWidth: 120 }}>
                      {post.title}
                    </span>
                    {post.attachments?.length > 0 && (
                      <span style={{ fontSize: 13, color: "var(--text-gray)", flexShrink: 0 }} title="첨부파일 있음">
                        📎{post.attachments.length > 1 ? ` ${post.attachments.length}` : ""}
                      </span>
                    )}
                    <span style={{ fontSize: 13, color: "var(--text-gray)", flexShrink: 0 }}>
                      {post.date}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
