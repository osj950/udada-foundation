import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="mob-sec-pad"
        style={{
          marginTop: 68,
          minHeight: "88vh",
          background: "linear-gradient(160deg, #1e3a14 0%, #2d5220 40%, #3d6b2e 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "60px 0",
        }}
      >
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "var(--yellow)", opacity: 0.08, right: -100, top: -150 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "var(--yellow)", opacity: 0.08, right: 200, bottom: -100 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.025) 80px, rgba(255,255,255,0.025) 81px)" }} />

        <div className="pg-pad g2" style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", gap: 80, alignItems: "center" }}>
          <div>
            <span
              style={{
                display: "inline-block",
                background: "var(--yellow)",
                color: "var(--text-dark)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                padding: "5px 14px",
                borderRadius: 2,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              사단법인 우다다청소년재단
            </span>
            <h1
              className="hero-h1"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: 48,
                fontWeight: 700,
                color: "white",
                lineHeight: 1.3,
                marginBottom: 20,
                wordBreak: "keep-all",
              }}
            >
              낮은 곳으로의
              <br />
              <span style={{ color: "var(--yellow-mid)" }}>삶의 지향</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.7,
                marginBottom: 40,
                wordBreak: "keep-all",
                fontWeight: 300,
              }}
            >
              변화를 두려워하지 않는 용기로
              <br />
              교육 소외 청소년들의 꿈을 함께 키워갑니다.
            </p>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--yellow-mid)",
                color: "var(--text-dark)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 28px",
                borderRadius: 3,
                letterSpacing: "0.04em",
              }}
            >
              재단 소개 보기 →
            </Link>
          </div>

          <div className="hero-cards" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { num: "SINCE 2001", title: "대안교육사업", desc: "학교 밖 청소년들에게 배움의 기회를 제공합니다" },
              { num: "PROGRAM", title: "심리·정서 지원", desc: "문화·예술 활동으로 건강한 자아발달을 돕습니다" },
              { num: "COMMUNITY", title: "우다다 작은 도서관", desc: "지역사회와 함께하는 배움의 공간을 운영합니다" },
            ].map((card) => (
              <div
                key={card.num}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderLeft: "3px solid var(--yellow-mid)",
                  borderRadius: 4,
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontSize: 11, color: "var(--yellow)", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>{card.num}</div>
                <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 17, color: "white", fontWeight: 600, marginBottom: 6 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT 요약 */}
      <section style={{ background: "var(--surface)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div className="g2" style={{ gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 12 }}>
                About Foundation
              </div>
              <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 34, fontWeight: 700, color: "var(--text-dark)", marginBottom: 16, lineHeight: 1.35 }}>
                사단법인<br />우다다청소년재단
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--text-gray)", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 32 }}>
                2000년 저소득 중퇴청소년들과의 결연 사업을 진행하며 우다다가 시작되었습니다.
                교육기회의 균등기회 박탈과 빈곤의 대물림이 주는 절망을 이겨내고,
                새로운 세상을 이끌어 나갈 청소년에 대한 교육과 복지를 목적으로 설립되었습니다.
              </p>
              <div style={{ borderLeft: "4px solid var(--yellow-mid)", padding: "20px 24px", background: "var(--yellow-light)", borderRadius: "0 4px 4px 0" }}>
                <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 15, color: "var(--text-mid)", lineHeight: 1.9, wordBreak: "keep-all" }}>
                  지역사회 교육소외계층의 청소년들이 건강한 일꾼으로 성장하기 위하여
                  낮은 곳으로의 삶의 지향을 가지고 더불어 살아가는 공동체적 참인간의 전형으로
                  이루어 나갈 수 있게 함을 목적으로 합니다.
                </p>
              </div>
            </div>
            <div className="stats-grid">
              {[
                { num: "25년", label: "설립 이후\n청소년 교육" },
                { num: "2009", label: "사단법인\n공식 설립" },
                { num: "3개", label: "주요\n사업 분야" },
                { num: "부산\n금정구", label: "활동\n지역", small: true },
              ].map((s, i) => (
                <div key={i} style={{ background: "var(--green-light)", borderRadius: 8, padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: s.small ? 26 : 36, fontWeight: 700, color: "var(--green-dark)", lineHeight: 1, marginBottom: 8, whiteSpace: "pre-line" }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-gray)", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS 요약 */}
      <section style={{ background: "var(--bg)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--green)", textTransform: "uppercase", marginBottom: 12 }}>
              Main Business
            </div>
            <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 34, fontWeight: 700, color: "var(--text-dark)" }}>
              주요 사업
            </h2>
          </div>
          <div className="g3" style={{ gap: 24 }}>
            {[
              { icon: "📚", title: "청소년을 위한\n대안교육사업", desc: "여러 가지 어려움으로 인해 공교육 내의 학업을 이어가기 어려운 학교 밖 청소년들에게 배움의 기회를 제공하여 자신의 자아를 실현하고 건강한 사회구성원으로 성장할 수 있도록 합니다.", bottom: "거침없는 우다다학교" },
              { icon: "🌱", title: "심리·정서,\n문화·예술 지원", desc: "청소년의 건강한 자아발달을 위해 필요한 긍정적 자기이해와 건강한 부모·교사를 형성하기 위한 문화·예술, 정서·심리 지원 사업을 진행합니다.", bottom: "소매틱기반 · 문화예술교육 · 심리지원" },
              { icon: "📖", title: "우다다\n작은 도서관", desc: "지역사회 주민들을 위한 도서관 개방을 통하여 다양한 교육의 기회를 제공하고 지역 공동체가 함께 성장하는 배움의 공간을 운영합니다.", bottom: "부산 금정구 · 지역사회 개방 운영" },
            ].map((biz) => (
              <div key={biz.icon} style={{ background: "var(--surface)", borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
                <div style={{ padding: "36px 32px 28px" }}>
                  <div style={{ width: 52, height: 52, background: "var(--green-light)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>
                    {biz.icon}
                  </div>
                  <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 18, fontWeight: 700, color: "var(--text-dark)", marginBottom: 12, lineHeight: 1.4, wordBreak: "keep-all", whiteSpace: "pre-line" }}>
                    {biz.title}
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-gray)", lineHeight: 1.8, wordBreak: "keep-all" }}>{biz.desc}</p>
                </div>
                <div style={{ padding: "18px 32px", background: "var(--green-light)", borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--green-dark)", fontWeight: 500 }}>
                  {biz.bottom}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORY 요약 */}
      <section style={{ background: "var(--green-dark)", padding: "80px 0" }} className="mob-sec-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="pg-pad">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--yellow)", textTransform: "uppercase", marginBottom: 12 }}>
            History
          </div>
          <h2 className="sec-h2" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 34, fontWeight: 700, color: "white", marginBottom: 16 }}>
            연혁
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.65)", marginBottom: 48 }}>
            우다다청소년재단이 걸어온 25년의 발자취입니다.
          </p>
          <div className="g2" style={{ gap: "0 60px" }}>
            {[
              [
                { year: "2001", content: "(사)사랑의 도시락보내기 운동본부 부설 비인가 대안교육기관 운영 개시\n학교밖청소년 교육 및 문화, 심리지원" },
                { year: "2009", content: "2009년 2월 2일 법인 분리\n(사) 우다다청소년재단 공식 설립" },
                { year: "2018", content: "부산시교육청 학교 밖 청소년 맞춤형 교육지원 사업\nDMZ 도보여행 프로젝트, 기초학력증진프로그램, 청소년문화예술 교육" },
                { year: "2019", content: "부산시교육청 학업중단학생 교육 및 학업복귀 지원사업\n서해안 도보여행 프로젝트, 성평등 프로젝트" },
              ],
              [
                { year: "2020", content: "부산시교육청 학업중단학생 교육 및 학업복귀 지원사업\n기초학력증진, 영어프로젝트, 청소년창작센터\n아름다운가게 나눔사업 공익활동지원사업" },
                { year: "2021", content: "부산시교육청 학업중단학생 교육 및 학업복귀 지원사업 진행\n부산시청 학교 밖청소년 급식지원\n부산시 금정구 우다다 작은도서관 개관" },
              ],
            ].map((col, ci) => (
              <div key={ci} style={{ position: "relative", paddingLeft: 28, borderLeft: "2px solid rgba(255,255,255,0.15)" }}>
                {col.map((item) => (
                  <div key={item.year} style={{ marginBottom: 36, position: "relative" }}>
                    <div style={{ position: "absolute", left: -37, top: 7, width: 10, height: 10, borderRadius: "50%", background: "var(--yellow-mid)", border: "2px solid var(--green-dark)", boxShadow: "0 0 0 3px rgba(240,204,48,0.3)" }} />
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--yellow)", letterSpacing: "0.08em", marginBottom: 6 }}>· {item.year}</div>
                    <div style={{ fontSize: 14.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, wordBreak: "keep-all", whiteSpace: "pre-line" }}>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/history" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "white", textDecoration: "none", padding: "12px 28px", borderRadius: 3, fontSize: 14, fontWeight: 500 }}>
              전체 연혁 보기 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
