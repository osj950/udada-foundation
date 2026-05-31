export default function ContactPage() {
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
            Contact
          </div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            오시는 길
          </h1>
        </div>
      </div>

      <section style={{ background: "var(--bg)", padding: "80px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 24 }}>
                Contact Info
              </div>

              {[
                { icon: "📍", label: "주소", value: "부산시 금정구 청룡예전로 84" },
                { icon: "📞", label: "전화", value: "051-582-6101" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "20px 0",
                    borderTop: i === 0 ? "1px solid #e4ede0" : "none",
                    borderBottom: "1px solid #e4ede0",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "var(--green-light)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--green)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: "var(--text-dark)" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 36, padding: "24px 28px", background: "var(--yellow-light)", borderLeft: "4px solid var(--yellow-mid)", borderRadius: "0 8px 8px 0" }}>
                <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.8, wordBreak: "keep-all" }}>
                  🚇 부산 지하철 1호선 <strong>범어사역</strong> 하차 후 걸어서 15분
                </p>
              </div>
            </div>

            <div>
              <div
                style={{
                  width: "100%",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid #d8e8d0",
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=35.2796320,129.0882502&z=16&output=embed&hl=ko"
                  style={{ width: "100%", height: 360, border: "none", display: "block" }}
                  title="우다다청소년재단 위치"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 16 }}>
                <a
                  href="https://naver.me/xSBB3TMR"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--text-gray)", textDecoration: "none", fontWeight: 500 }}
                >
                  네이버지도 →
                </a>
                <a
                  href="https://maps.google.com/maps?q=35.2796320,129.0882502"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--green-dark)", textDecoration: "none", fontWeight: 500 }}
                >
                  구글지도에서 보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
