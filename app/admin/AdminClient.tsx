"use client";

import { useState, useEffect, useCallback } from "react";

// ─── 타입 ────────────────────────────────────────────────
type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  attachmentUrl: string;
  attachmentName: string;
  isPinned: boolean;
};

type HistoryItem = {
  id: string;
  year: string;
  events: string[];
};

type Tab = "news" | "history";

// ─── 상수 ────────────────────────────────────────────────
const CATEGORY_OPTIONS = [
  { value: "notice", label: "공지사항" },
  { value: "plan", label: "사업계획·결산" },
  { value: "assembly", label: "총회안내" },
  { value: "donation", label: "기부금안내" },
];

const CATEGORY_LABELS: Record<string, string> = {
  notice: "공지사항",
  plan: "사업계획·결산",
  assembly: "총회안내",
  donation: "기부금안내",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function adminFetch(url: string, pw: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: { "x-admin-password": pw, ...(options.headers ?? {}) },
  });
}

const inputStyle = {
  width: "100%",
  border: "1px solid #d8e8d0",
  borderRadius: 6,
  padding: "10px 14px",
  fontSize: 14,
  outline: "none",
} as const;

const btnPrimary = {
  background: "var(--green-dark)",
  color: "white",
  fontWeight: 700,
  padding: "10px 24px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
} as const;

// ─── 로그인 화면 ──────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem("admin_pw", pw);
      onLogin(pw);
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", padding: 48, width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-dark)", fontFamily: "'Noto Serif KR', serif" }}>
            관리자 로그인
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-gray)", marginTop: 6 }}>우다다청소년재단 관리자 전용</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>비밀번호</label>
            <input
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={inputStyle}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          {error && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ ...btnPrimary, width: "100%", padding: "12px 0", fontSize: 15, opacity: loading ? 0.6 : 1 }}>
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── 사업소식 폼 ─────────────────────────────────────────
function PostForm({ pw, initial, onDone, onCancel }: {
  pw: string; initial?: Post | null; onDone: () => void; onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "notice");
  const [content, setContent] = useState(initial?.content ?? "");
  const [date, setDate] = useState(initial?.date ?? today());
  const [isPinned, setIsPinned] = useState(initial?.isPinned ?? false);
  const [attachmentUrl, setAttachmentUrl] = useState(initial?.attachmentUrl ?? "");
  const [attachmentName, setAttachmentName] = useState(initial?.attachmentName ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await adminFetch("/api/admin/drive", pw, { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) { setError("파일 업로드 실패"); return; }
    const data = await res.json();
    setAttachmentUrl(data.url);
    setAttachmentName(data.name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = initial ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
    const res = await adminFetch(url, pw, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, content, date, isPinned, attachmentUrl, attachmentName }),
    });
    setSaving(false);
    if (!res.ok) { setError("저장 실패"); return; }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 28 }}>
        {initial ? "글 수정" : "새 글 작성"}
      </h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>제목 *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="제목 입력" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, background: "white" }}>
            {CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>날짜</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>본문</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{ ...inputStyle, minHeight: 200, resize: "vertical" }} placeholder="본문 내용 입력" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>첨부파일</label>
        <input type="file" onChange={handleFile} disabled={uploading} style={{ fontSize: 14 }} />
        {uploading && <p style={{ fontSize: 12, color: "var(--text-gray)", marginTop: 4 }}>업로드 중...</p>}
        {attachmentUrl && <p style={{ fontSize: 12, color: "var(--green-dark)", marginTop: 4 }}>✔ {attachmentName}</p>}
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: "var(--text-mid)" }}>
          <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} />
          공지 고정 (목록 상단 노란 배경)
        </label>
      </div>
      {error && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={saving || uploading} style={{ ...btnPrimary, flex: 1, padding: "12px 0", fontSize: 15, opacity: saving ? 0.6 : 1 }}>
          {saving ? "저장 중..." : "저장"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "12px 24px", background: "white", color: "var(--text-mid)", border: "1px solid #d8e8d0", borderRadius: 6, cursor: "pointer", fontSize: 15 }}>
          취소
        </button>
      </div>
    </form>
  );
}

// ─── 연혁 폼 ─────────────────────────────────────────────
function HistoryForm({ pw, initial, onDone, onCancel }: {
  pw: string; initial?: HistoryItem | null; onDone: () => void; onCancel: () => void;
}) {
  const [year, setYear] = useState(initial?.year ?? "");
  // 각 항목을 줄바꿈으로 구분해 textarea에서 편집
  const [eventsText, setEventsText] = useState(initial?.events.join("\n") ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const events = eventsText.split("\n").map((s) => s.trim()).filter(Boolean);
    if (events.length === 0) { setError("항목을 한 줄 이상 입력해주세요."); return; }
    setSaving(true);
    setError("");
    const url = initial ? `/api/admin/history/${initial.id}` : "/api/admin/history";
    const res = await adminFetch(url, pw, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, events }),
    });
    setSaving(false);
    if (!res.ok) { setError("저장 실패"); return; }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 28 }}>
        {initial ? "연혁 수정" : "연혁 추가"}
      </h2>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>연도 *</label>
        <input
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ ...inputStyle, maxWidth: 160 }}
          placeholder="예) 2024"
          maxLength={10}
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>
          항목 <span style={{ fontWeight: 400, color: "var(--text-gray)" }}>(한 줄에 하나씩 입력)</span>
        </label>
        <textarea
          required
          value={eventsText}
          onChange={(e) => setEventsText(e.target.value)}
          style={{ ...inputStyle, minHeight: 160, resize: "vertical" }}
          placeholder={"예)\n부산시교육청 학업중단학생 교육 및 학업복귀 지원사업\n기초학력증진, 영어프로젝트, 청소년창작센터"}
        />
        <p style={{ fontSize: 12, color: "var(--text-gray)", marginTop: 6 }}>
          Enter로 줄을 바꾸면 각각 별도 항목으로 저장됩니다.
        </p>
      </div>

      {error && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 16 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={saving} style={{ ...btnPrimary, flex: 1, padding: "12px 0", fontSize: 15, opacity: saving ? 0.6 : 1 }}>
          {saving ? "저장 중..." : "저장"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "12px 24px", background: "white", color: "var(--text-mid)", border: "1px solid #d8e8d0", borderRadius: 6, cursor: "pointer", fontSize: 15 }}>
          취소
        </button>
      </div>
    </form>
  );
}

// ─── 사업소식 탭 ──────────────────────────────────────────
function NewsTab({ pw }: { pw: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Post | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminFetch("/api/admin/posts", pw)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { if (Array.isArray(data)) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pw]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await adminFetch(`/api/admin/posts/${id}`, pw, { method: "DELETE" });
    load();
  }

  if (view === "new" || view === "edit") {
    return (
      <PostForm
        pw={pw}
        initial={view === "edit" ? editing : null}
        onDone={() => { setView("list"); load(); }}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>사업소식</h2>
        <button onClick={() => setView("new")} style={btnPrimary}>+ 새 글 작성</button>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>게시글이 없습니다.</p>
      ) : (
        <div style={{ background: "white", borderRadius: 8, border: "1px solid #e8ede4", overflow: "hidden" }}>
          {posts.map((post, idx) => (
            <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", borderBottom: idx < posts.length - 1 ? "1px solid #f0f4ed" : "none", background: post.isPinned ? "#fffdf0" : "white" }}>
              {post.isPinned && <span style={{ fontSize: 11, fontWeight: 700, color: "#8a6a00", background: "var(--yellow-light)", padding: "2px 8px", borderRadius: 2, flexShrink: 0 }}>공지</span>}
              <span style={{ fontSize: 12, color: "var(--text-gray)", flexShrink: 0, background: "#f0f4ed", padding: "2px 8px", borderRadius: 2 }}>{CATEGORY_LABELS[post.category] ?? post.category}</span>
              <span style={{ flex: 1, fontSize: 15, color: "var(--text-dark)", fontWeight: post.isPinned ? 600 : 400 }}>{post.title}</span>
              {post.attachmentUrl && <span style={{ fontSize: 14 }}>📎</span>}
              <span style={{ fontSize: 13, color: "var(--text-gray)", flexShrink: 0 }}>{post.date}</span>
              <button onClick={() => { setEditing(post); setView("edit"); }} style={{ padding: "6px 14px", background: "white", border: "1px solid #d8e8d0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "var(--text-mid)", flexShrink: 0 }}>수정</button>
              <button onClick={() => handleDelete(post.id)} style={{ padding: "6px 14px", background: "white", border: "1px solid #f0c0c0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "#c0392b", flexShrink: 0 }}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── 연혁 탭 ─────────────────────────────────────────────
function HistoryTab({ pw }: { pw: string }) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<HistoryItem | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminFetch("/api/admin/history", pw)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { if (Array.isArray(data)) setItems(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pw]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await adminFetch(`/api/admin/history/${id}`, pw, { method: "DELETE" });
    load();
  }

  if (view === "new" || view === "edit") {
    return (
      <HistoryForm
        pw={pw}
        initial={view === "edit" ? editing : null}
        onDone={() => { setView("list"); load(); }}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>연혁 관리</h2>
        <button onClick={() => setView("new")} style={btnPrimary}>+ 연혁 추가</button>
      </div>

      <div style={{ marginBottom: 20, padding: "14px 18px", background: "var(--yellow-light)", borderLeft: "3px solid var(--yellow-mid)", borderRadius: "0 6px 6px 0", fontSize: 13, color: "var(--text-mid)" }}>
        💡 Google Sheets <strong>history</strong> 시트에 저장됩니다. 컬럼: <code>id | year | events</code> (항목은 | 로 구분)
      </div>

      {loading ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>불러오는 중...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>연혁이 없습니다. 추가해 주세요.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: "white", borderRadius: 8, border: "1px solid #e8ede4", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 18, fontWeight: 700, color: "var(--green-dark)", marginBottom: 10, paddingBottom: 8, borderBottom: "2px solid var(--yellow-mid)", display: "inline-block" }}>
                    {item.year}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {item.events.map((ev, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7, padding: "4px 0" }}>
                        <span style={{ color: "var(--green)", flexShrink: 0, marginTop: 3 }}>▪</span>
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button onClick={() => { setEditing(item); setView("edit"); }} style={{ padding: "6px 14px", background: "white", border: "1px solid #d8e8d0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "var(--text-mid)" }}>수정</button>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: "6px 14px", background: "white", border: "1px solid #f0c0c0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "#c0392b" }}>삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── 메인 관리자 UI ──────────────────────────────────────
function AdminMain({ pw }: { pw: string }) {
  const [tab, setTab] = useState<Tab>("news");

  const tabBtn = (t: Tab, label: string) => (
    <button
      onClick={() => setTab(t)}
      style={{
        padding: "10px 24px",
        borderRadius: "6px 6px 0 0",
        border: "1px solid",
        borderBottom: tab === t ? "1px solid white" : "1px solid #e8ede4",
        borderColor: tab === t ? "#e8ede4" : "#e8ede4",
        background: tab === t ? "white" : "var(--bg)",
        color: tab === t ? "var(--green-dark)" : "var(--text-gray)",
        fontWeight: tab === t ? 700 : 400,
        fontSize: 14,
        cursor: "pointer",
        marginBottom: -1,
        position: "relative" as const,
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 60px" }}>
      <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 26, fontWeight: 700, color: "var(--text-dark)", marginBottom: 28 }}>
        관리자
      </h1>

      {/* 탭 */}
      <div style={{ display: "flex", gap: 4, marginBottom: 0, borderBottom: "1px solid #e8ede4" }}>
        {tabBtn("news", "사업소식")}
        {tabBtn("history", "연혁")}
      </div>

      <div style={{ background: "white", border: "1px solid #e8ede4", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "32px" }}>
        {tab === "news" && <NewsTab pw={pw} />}
        {tab === "history" && <HistoryTab pw={pw} />}
      </div>
    </div>
  );
}

// ─── 최상위 ──────────────────────────────────────────────
export default function AdminClient() {
  const [pw, setPw] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) setPw(saved);
  }, []);

  return (
    <div style={{ marginTop: 68, minHeight: "80vh", background: "var(--bg)", paddingBottom: 60 }}>
      {pw ? <AdminMain pw={pw} /> : <LoginScreen onLogin={setPw} />}
    </div>
  );
}
