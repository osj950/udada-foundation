"use client";

import Link from "next/link";

const partners = [
  { icon: "🏫", name: "거침없는 우다다학교", desc: "대안교육 운영 기관", url: "http://www.udada.or.kr" },
  { icon: "🏛", name: "국민권익위원회", desc: "공공기관", url: "https://www.acrc.go.kr" },
  { icon: "📋", name: "국세청", desc: "공공기관", url: "https://www.nts.go.kr" },
  { icon: "🌊", name: "부산광역시", desc: "지방자치단체", url: "https://www.busan.go.kr" },
];

const marqueeItems = [...partners, ...partners, ...partners];

export default function Footer() {
  return (
    <>
      {/* 관련기관 슬라이딩 배너 */}
      <div
        style={{
          background: "var(--green-light)",
          borderTop: "2px solid var(--border)",
          borderBottom: "2px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 18s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="hidden md:flex"
            style={{
              flexShrink: 0,
              padding: "0 20px",
              height: 64,
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid var(--border)",
              background: "var(--green-dark)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "white",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              관련기관
            </span>
          </div>

          <div style={{ overflow: "hidden", flex: 1 }}>
            <div className="marquee-track">
              {marqueeItems.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    height: 64,
                    padding: "0 32px",
                    borderRight: "1px solid var(--border)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-mid)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                    (e.currentTarget as HTMLElement).style.color = "var(--green-dark)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-mid)";
                  }}
                >
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <span>{p.name}</span>
                  <span style={{ fontSize: 11, color: "var(--text-gray)", fontWeight: 400, marginLeft: 2 }}>
                    {p.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 본문 */}
      <footer style={{ background: "var(--footer-bg)", padding: "48px 0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 36,
              paddingBottom: 36,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                (사)우다다청소년재단
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                낮은 곳으로의 삶의 지향 · 변화를 두려워하지 않는 용기
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { href: "/about", label: "재단소개" },
                { href: "/business", label: "주요사업" },
                { href: "/news", label: "사업소식" },
                { href: "/contact", label: "오시는길" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
            부산시 금정구 청룡예전로 84 · Tel. 051-582-6101
            <br />
            고유번호 621-82-10354
            <br />
            © 2009 (사)우다다청소년재단. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
