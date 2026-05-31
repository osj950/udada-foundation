import Link from "next/link";

export default function Footer() {
  return (
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
          © 2025 (사)우다다청소년재단. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
