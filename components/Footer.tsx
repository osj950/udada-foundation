"use client";

import Link from "next/link";

const partners = [
  { icon: "🏫", name: "거침없는 우다다학교", desc: "대안교육 운영 기관", url: "http://www.udada.or.kr" },
  { icon: "🏛", name: "국민권익위원회", desc: "공공기관", url: "https://www.acrc.go.kr" },
  { icon: "📋", name: "국세청", desc: "공공기관", url: "https://www.nts.go.kr" },
  { icon: "🌊", name: "부산광역시", desc: "지방자치단체", url: "https://www.busan.go.kr" },
];

export default function Footer() {
  return (
    <>
      {/* 관련기관 배너 */}
      <div style={{ background: "var(--green-light)", borderTop: "1px solid #d8e8d0", padding: "36px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--green-dark)",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              관련기관
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
              {partners.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 16px",
                    background: "white",
                    border: "1px solid #c8dcc0",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-mid)",
                    textDecoration: "none",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--green)";
                    (e.currentTarget as HTMLElement).style.background = "var(--green-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#c8dcc0";
                    (e.currentTarget as HTMLElement).style.background = "white";
                  }}
                >
                  <span style={{ fontSize: 15 }}>{p.icon}</span>
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 본문 */}
      <footer style={{ background: "var(--text-dark)", padding: "48px 0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
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
            © 2009 (사)우다다청소년재단. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
