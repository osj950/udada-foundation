"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  year: string;
  events: string[];
};

const FALLBACK: HistoryItem[] = [
  { id: "1", year: "2001", events: ["(사)사랑의 도시락보내기 운동본부 부설 비인가 대안교육기관 운영 개시", "학교밖청소년 교육 및 문화, 심리지원"] },
  { id: "2", year: "2009", events: ["2009년 2월 2일 법인 분리", "(사) 우다다청소년재단 공식 설립"] },
  { id: "3", year: "2018", events: ["부산시교육청 학교 밖 청소년 맞춤형 교육지원 사업", "DMZ 도보여행 프로젝트, 기초학력증진프로그램, 청소년문화예술 교육"] },
  { id: "4", year: "2019", events: ["부산시교육청 학업중단학생 교육 및 학업복귀 지원사업", "서해안 도보여행 프로젝트, 성평등 프로젝트"] },
  { id: "5", year: "2020", events: ["부산시교육청 학업중단학생 교육 및 학업복귀 지원사업", "기초학력증진, 영어프로젝트, 청소년창작센터", "아름다운가게 나눔사업 공익활동지원사업"] },
  { id: "6", year: "2021", events: ["부산시교육청 학업중단학생 교육 및 학업복귀 지원사업 진행", "부산시청 학교 밖청소년 급식지원", "부산시 금정구 우다다 작은도서관 개관"] },
];

export default function HistoryClient() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: HistoryItem[]) => {
        setItems(Array.isArray(data) && data.length > 0 ? data : FALLBACK);
      })
      .catch(() => setItems(FALLBACK))
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
            History
          </div>
          <h1 className="page-h1" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 40, fontWeight: 700, color: "white" }}>
            연혁
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginTop: 12 }}>
            우다다청소년재단이 걸어온 발자취입니다.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--bg)", padding: "80px 0", minHeight: "50vh" }} className="mob-sec-pad">
        <div style={{ maxWidth: 800, margin: "0 auto" }} className="pg-pad">
          {loading ? (
            <p style={{ textAlign: "center", padding: "80px 0", color: "var(--text-gray)" }}>불러오는 중...</p>
          ) : (
            <div style={{ position: "relative", paddingLeft: 40 }}>
              <div
                style={{
                  position: "absolute",
                  left: 12,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "var(--green-light)",
                }}
              />
              {items.map((item) => (
                <div key={item.id} style={{ position: "relative", marginBottom: 40 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: -36,
                      top: 4,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--yellow-mid)",
                      border: "3px solid var(--green-dark)",
                      boxShadow: "0 0 0 4px rgba(240,204,48,0.2)",
                    }}
                  />
                  <div
                    className="mob-card-pad"
                    style={{
                      background: "var(--surface)",
                      borderRadius: 8,
                      padding: "28px 32px",
                      border: "1px solid var(--border)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Noto Serif KR', serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "var(--green-dark)",
                        marginBottom: 16,
                        paddingBottom: 12,
                        borderBottom: "2px solid var(--yellow-mid)",
                        display: "inline-block",
                      }}
                    >
                      {item.year}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {item.events.map((event, ei) => (
                        <li
                          key={ei}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "8px 0",
                            borderBottom: ei < item.events.length - 1 ? "1px solid var(--border-light)" : "none",
                            fontSize: 15,
                            color: "var(--text-mid)",
                            lineHeight: 1.7,
                            wordBreak: "keep-all",
                          }}
                        >
                          <span style={{ color: "var(--green)", marginTop: 4, flexShrink: 0 }}>▪</span>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
