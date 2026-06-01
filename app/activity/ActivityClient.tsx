"use client";

import { useEffect, useState } from "react";

type InstaPost = {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  media_type: string;
  thumbnail_url?: string;
};

export default function ActivityClient() {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(() => setError("인스타그램 피드를 불러올 수 없습니다."))
      .finally(() => setLoading(false));
  }, []);

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
            Activity
          </div>
          <h1 className="page-h1" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            활동소식
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", marginTop: 12 }}>
            @udadayouth 인스타그램에서 우다다의 활동을 확인하세요
          </p>
        </div>
      </div>

      <section style={{ background: "var(--bg)", padding: "60px 0", minHeight: "60vh" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-gray)", fontSize: 15 }}>
              불러오는 중...
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>📷</div>
              <p style={{ fontSize: 16, color: "var(--text-gray)", marginBottom: 24, wordBreak: "keep-all" }}>
                {error}
              </p>
              <a
                href="https://www.instagram.com/udadayouth"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Instagram @udadayouth 바로가기 →
              </a>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-gray)" }}>
              게시물이 없습니다.
            </div>
          ) : (
            <>
              <div className="insta-grid" style={{ marginBottom: 40 }}>
                {posts.map((post) => {
                  const imgSrc = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
                  return (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        position: "relative",
                        aspectRatio: "1",
                        overflow: "hidden",
                        background: "var(--green-light)",
                      }}
                    >
                      {imgSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imgSrc}
                          alt={post.caption?.slice(0, 50) ?? "우다다 활동"}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                          {post.media_type === "VIDEO" ? "🎬" : "📷"}
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
              <div style={{ textAlign: "center" }}>
                <a
                  href="https://www.instagram.com/udadayouth"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 28px",
                    background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Instagram에서 더보기 →
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
