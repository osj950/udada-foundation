"use client";

const partners = [
  {
    icon: "🏫",
    name: "거침없는 우다다학교",
    desc: "대안교육 운영 기관",
    url: "http://www.udada.or.kr",
  },
  {
    icon: "🏛",
    name: "국민권익위원회",
    desc: "공공기관",
    url: "https://www.acrc.go.kr",
  },
  {
    icon: "📋",
    name: "국세청",
    desc: "공공기관",
    url: "https://www.nts.go.kr",
  },
  {
    icon: "🌊",
    name: "부산광역시",
    desc: "지방자치단체",
    url: "https://www.busan.go.kr",
  },
];

export default function PartnersPage() {
  return (
    <>
      <div
        style={{
          marginTop: 68,
          background: "linear-gradient(135deg, #1e3a14 0%, #2d5220 100%)",
          padding: "64px 0",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: 12 }}>
            Partners
          </div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            관련기관
          </h1>
        </div>
      </div>

      <section style={{ background: "white", padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: "1.5px solid #e0e8d8",
                  borderRadius: 8,
                  padding: "36px 20px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--green)";
                  (e.currentTarget as HTMLElement).style.background = "var(--green-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e0e8d8";
                  (e.currentTarget as HTMLElement).style.background = "white";
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: "var(--green-light)",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {p.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)", marginBottom: 6 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-gray)" }}>{p.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
