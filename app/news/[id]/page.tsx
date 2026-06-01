import { getPosts } from "@/lib/sheets";
import Link from "next/link";
import { notFound } from "next/navigation";

const CATEGORY_LABELS: Record<string, string> = {
  notice: "공지사항",
  plan: "사업계획·결산",
  assembly: "총회안내",
  donation: "기부금안내",
};

export const revalidate = 60;

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = await getPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) notFound();

  const post = posts[idx];
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <>
      <div
        className="mob-head-pad"
        style={{
          marginTop: 68,
          background: "linear-gradient(135deg, #1e3a14 0%, #2d5220 100%)",
          padding: "48px 0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }} className="pg-pad">
          <Link href="/news" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← 목록으로
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            {post.isPinned && (
              <span style={{ fontSize: 11, fontWeight: 700, color: "#8a6a00", background: "var(--yellow)", padding: "3px 8px", borderRadius: 2 }}>
                공지
              </span>
            )}
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 2 }}>
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 26, fontWeight: 700, color: "white", lineHeight: 1.4, wordBreak: "keep-all" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 12 }}>{post.date}</p>
        </div>
      </div>

      <section style={{ background: "var(--bg)", padding: "60px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 800, margin: "0 auto" }} className="pg-pad">
          <div
            className="mob-content-pad"
            style={{
              background: "var(--surface)",
              borderRadius: 8,
              padding: "40px 48px",
              border: "1px solid var(--border)",
              minHeight: 300,
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: "var(--text-mid)",
                lineHeight: 1.9,
                wordBreak: "keep-all",
                whiteSpace: "pre-wrap",
              }}
            >
              {post.content || <span style={{ color: "var(--text-gray)", fontSize: 14 }}>내용이 없습니다.</span>}
            </div>

            {post.attachments?.length > 0 && (
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                  첨부파일 ({post.attachments.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {post.attachments.map((att, i) => (
                    <a
                      key={i}
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 18px",
                        background: "var(--green-light)",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        fontSize: 14,
                        color: "var(--green-dark)",
                        fontWeight: 500,
                        textDecoration: "none",
                        alignSelf: "flex-start",
                      }}
                    >
                      📎 {att.name || "첨부파일 다운로드"}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 이전글/다음글 */}
          <div style={{ marginTop: 24, background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}>
            {next && (
              <Link
                href={`/news/${next.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 24px",
                  borderBottom: "1px solid var(--border-light)",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--text-gray)", fontWeight: 700, flexShrink: 0 }}>다음글</span>
                <span style={{ fontSize: 14, color: "var(--text-dark)" }}>{next.title}</span>
              </Link>
            )}
            {prev && (
              <Link
                href={`/news/${prev.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 24px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--text-gray)", fontWeight: 700, flexShrink: 0 }}>이전글</span>
                <span style={{ fontSize: 14, color: "var(--text-dark)" }}>{prev.title}</span>
              </Link>
            )}
          </div>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link
              href="/news"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background: "var(--green-dark)",
                color: "white",
                textDecoration: "none",
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
