export default function BusinessPage() {
  const businesses = [
    {
      icon: "📚",
      title: "청소년을 위한 대안교육사업",
      subtitle: "학교 밖 청소년의 배움과 성장",
      desc: "여러 가지 어려움으로 인해 공교육 내의 학업을 이어가기 어려운 학교 밖 청소년들에게 배움의 기회를 제공하여 자신의 자아를 실현하고 건강한 사회구성원으로 성장할 수 있도록 돕습니다.",
      programs: [
        { name: "도보여행 프로젝트", desc: "DMZ 및 서해안 도보여행을 통한 자아 탐색과 공동체 경험" },
        { name: "기초학력증진프로그램", desc: "학교 밖 청소년들의 기초 학력 향상을 위한 맞춤형 교육" },
        { name: "청소년창작센터", desc: "청소년들의 창의력과 표현력을 키우는 창작 활동 지원" },
        { name: "영어프로젝트", desc: "다양한 활동을 통한 영어 능력 향상 프로그램" },
      ],
      support: "부산시교육청 학업중단학생 교육 및 학업복귀 지원사업",
    },
    {
      icon: "🌱",
      title: "심리·정서, 문화·예술 지원",
      subtitle: "건강한 자아발달을 위한 지원",
      desc: "청소년의 건강한 자아발달을 위해 필요한 긍정적 자기이해와 건강한 부모·교사를 형성하기 위한 문화·예술, 정서·심리 지원 사업을 진행합니다. 청소년들이 자신을 올바르게 이해하고 사회 속에서 건강하게 성장하도록 지원합니다.",
      programs: [
        { name: "성평등 프로젝트", desc: "성평등 의식 함양과 건강한 관계 형성을 위한 교육" },
        { name: "문화예술교육", desc: "다양한 문화·예술 활동을 통한 정서 발달 지원" },
        { name: "심리지원사업", desc: "청소년 심리 상담 및 정서 치유 프로그램 운영" },
        { name: "부모·교사 역량강화", desc: "건강한 양육 환경 조성을 위한 부모·교사 교육" },
      ],
      support: "아름다운가게 나눔사업 공익활동지원사업",
    },
    {
      icon: "📖",
      title: "우다다 작은 도서관",
      subtitle: "지역과 함께하는 배움의 공간",
      desc: "2021년 부산시 금정구에 개관한 우다다 작은 도서관은 지역사회 주민들을 위한 도서관 개방을 통하여 다양한 교육의 기회를 제공하고 지역 공동체가 함께 성장하는 배움의 공간을 운영합니다.",
      programs: [
        { name: "도서관 개방 운영", desc: "지역 주민 누구나 이용 가능한 도서관 공간 제공" },
        { name: "독서 프로그램", desc: "다양한 연령층을 위한 독서 및 문화 프로그램 운영" },
        { name: "지역사회 교육", desc: "지역 주민 대상 다양한 교육 활동 지원" },
        { name: "공동체 활동", desc: "지역 공동체 연결과 나눔의 문화 형성" },
      ],
      support: "부산시청 학교 밖청소년 급식지원",
    },
  ];

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
            Main Business
          </div>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            주요사업
          </h1>
        </div>
      </div>

      {businesses.map((biz, i) => (
        <section
          key={biz.icon}
          style={{ background: i % 2 === 0 ? "white" : "var(--bg)", padding: "80px 0" }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 48, marginBottom: 48 }}>
              <div style={{ width: 72, height: 72, background: "var(--green-light)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                {biz.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--green)", textTransform: "uppercase", marginBottom: 8 }}>
                  {biz.subtitle}
                </div>
                <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 28, fontWeight: 700, color: "var(--text-dark)", marginBottom: 16 }}>
                  {biz.title}
                </h2>
                <p style={{ fontSize: 15.5, color: "var(--text-gray)", lineHeight: 1.9, wordBreak: "keep-all", maxWidth: 680 }}>
                  {biz.desc}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 28 }}>
              {biz.programs.map((prog) => (
                <div key={prog.name} style={{ background: i % 2 === 0 ? "var(--bg)" : "white", borderRadius: 8, padding: "24px 28px", border: "1px solid #e8ede4" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
                    <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 16, fontWeight: 600, color: "var(--text-dark)" }}>
                      {prog.name}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-gray)", lineHeight: 1.7, paddingLeft: 18 }}>{prog.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "var(--green-light)", borderRadius: 6, border: "1px solid #d8e8d0" }}>
              <span style={{ fontSize: 13, color: "var(--green-dark)", fontWeight: 500 }}>📋 {biz.support}</span>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
