export default function AboutPage() {
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
            About Foundation
          </div>
          <h1 className="page-h1" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            재단소개
          </h1>
        </div>
      </div>

      {/* 설립 목적 */}
      <section style={{ background: "var(--surface)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 12 }}>
            Mission
          </div>
          <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 32, fontWeight: 700, color: "var(--text-dark)", marginBottom: 32 }}>
            설립 목적
          </h2>
          <div className="g2" style={{ gap: 60, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 16, color: "var(--text-gray)", lineHeight: 1.9, wordBreak: "keep-all", marginBottom: 28 }}>
                2000년 저소득 중퇴청소년들과의 결연 사업을 진행하며 우다다가 시작되었습니다.
                교육기회의 균등기회 박탈과 빈곤의 대물림이 주는 절망을 이겨내고,
                새로운 세상을 이끌어 나갈 청소년에 대한 교육과 복지를 목적으로 설립되었습니다.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-gray)", lineHeight: 1.9, wordBreak: "keep-all" }}>
                2009년 2월 2일 사단법인으로 공식 설립된 우다다청소년재단은
                부산 금정구를 중심으로 교육 소외 청소년들과 함께하고 있습니다.
              </p>
            </div>
            <div
              style={{
                borderLeft: "4px solid var(--yellow-mid)",
                padding: "28px 32px",
                background: "var(--yellow-light)",
                borderRadius: "0 8px 8px 0",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--green)", marginBottom: 16, textTransform: "uppercase" }}>
                설립 목적
              </div>
              <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 16, color: "var(--text-mid)", lineHeight: 2, wordBreak: "keep-all" }}>
                지역사회 교육소외계층의 청소년들이 건강한 일꾼으로 성장하기 위하여
                낮은 곳으로의 삶의 지향을 가지고 더불어 살아가는 공동체적 참인간의 전형으로
                이루어 나갈 수 있게 함을 목적으로 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section style={{ background: "var(--bg)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 12 }}>
            Core Values
          </div>
          <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 32, fontWeight: 700, color: "var(--text-dark)", marginBottom: 48 }}>
            핵심 가치
          </h2>
          <div className="g3" style={{ gap: 24 }}>
            {[
              { icon: "🌿", title: "낮은 곳으로의 지향", desc: "사회의 가장 낮은 곳에 있는 청소년들과 함께하며, 그들의 눈높이에서 생각하고 행동합니다." },
              { icon: "🤝", title: "공동체적 삶", desc: "더불어 살아가는 공동체 의식을 바탕으로, 혼자가 아닌 함께 성장하는 문화를 만들어갑니다." },
              { icon: "💪", title: "변화를 향한 용기", desc: "변화를 두려워하지 않는 용기로, 청소년들이 자신의 가능성을 믿고 도전할 수 있도록 지원합니다." },
            ].map((v) => (
              <div key={v.icon} style={{ background: "var(--surface)", borderRadius: 8, padding: "36px 28px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{v.icon}</div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 18, fontWeight: 700, color: "var(--text-dark)", marginBottom: 12 }}>
                  {v.title}
                </div>
                <p style={{ fontSize: 14, color: "var(--text-gray)", lineHeight: 1.8, wordBreak: "keep-all" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 재단 정보 */}
      <section style={{ background: "var(--surface)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 12 }}>
            Organization
          </div>
          <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 32, fontWeight: 700, color: "var(--text-dark)", marginBottom: 48 }}>
            재단 정보
          </h2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {[
              { label: "단체명", value: "(사)우다다청소년재단" },
              { label: "설립일", value: "2009년 2월 2일" },
              { label: "소재지", value: "부산시 금정구 청룡예전로 84" },
              { label: "전화번호", value: "051-582-6101" },
              { label: "주요 사업", value: "대안교육사업, 심리·정서·문화·예술 지원, 우다다 작은 도서관 운영" },
              { label: "활동 지역", value: "부산광역시 금정구" },
            ].map((item, i) => (
              <div
                key={item.label}
                className="info-row"
                style={{ borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}
              >
                <div style={{ padding: "20px 24px", background: "var(--green-light)", fontSize: 14, fontWeight: 700, color: "var(--green-dark)" }}>
                  {item.label}
                </div>
                <div style={{ padding: "20px 24px", fontSize: 15, color: "var(--text-dark)" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section style={{ background: "var(--bg)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 12 }}>
            Contact
          </div>
          <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 32, fontWeight: 700, color: "var(--text-dark)", marginBottom: 48 }}>
            오시는 길
          </h2>
          <div className="g2" style={{ gap: 60, alignItems: "start" }}>
            <div>
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
                    borderTop: i === 0 ? "1px solid var(--border)" : "none",
                    borderBottom: "1px solid var(--border)",
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
              <div style={{ width: "100%", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
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
                <a href="https://naver.me/xSBB3TMR" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--text-gray)", textDecoration: "none", fontWeight: 500 }}>
                  네이버지도 →
                </a>
                <a href="https://maps.google.com/maps?q=35.2796320,129.0882502" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--green-dark)", textDecoration: "none", fontWeight: 500 }}>
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
