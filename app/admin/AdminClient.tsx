"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  attachments: { url: string; name: string }[];
  isPinned: boolean;
};

type HistoryItem = {
  id: string;
  year: string;
  events: string[];
};

type Tab = "news" | "history";

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
  border: "1px solid var(--border)",
  borderRadius: 6,
  padding: "10px 14px",
  fontSize: 14,
  outline: "none",
  background: "var(--surface)",
  color: "var(--text-dark)",
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
      <div style={{ background: "var(--surface)", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", padding: 48, width: "100%", maxWidth: 380, border: "1px solid var(--border)" }}>
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
          {error && <p style={{ color: "#e05050", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ ...btnPrimary, width: "100%", padding: "12px 0", fontSize: 15, opacity: loading ? 0.6 : 1 }}>
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

function PostForm({ pw, initial, onDone, onCancel }: {
  pw: string; initial?: Post | null; onDone: () => void; onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "notice");
  const [content, setContent] = useState(initial?.content ?? "");
  const [date, setDate] = useState(initial?.date ?? today());
  const [isPinned, setIsPinned] = useState(initial?.isPinned ?? false);
  const [attachments, setAttachments] = useState<{ url: string; name: string }[]>(
    initial?.attachments ?? []
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await adminFetch("/api/admin/drive", pw, { method: "POST", body: fd });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setError(`"${file.name}" 업로드 실패: ${errData.detail ?? errData.error ?? res.status}`);
          break;
        }
        const data = await res.json();
        setAttachments((prev) => [...prev, { url: data.url, name: data.name }]);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setUploading(false);
    }
  }

  function removeAttachment(idx: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = initial ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
    const res = await adminFetch(url, pw, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, content, date, isPinned, attachments }),
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
      <div className="g2" style={{ gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
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

      {/* 첨부파일 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--text-mid)" }}>
          첨부파일 {attachments.length > 0 && <span style={{ fontWeight: 400, color: "var(--text-gray)" }}>({attachments.length}개)</span>}
        </label>

        {/* 업로드된 파일 목록 */}
        {attachments.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
            {attachments.map((att, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "var(--green-light)", border: "1px solid var(--border)", borderRadius: 6 }}>
                <span style={{ fontSize: 14 }}>📎</span>
                <span style={{ flex: 1, fontSize: 13, color: "var(--green-dark)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--text-gray)", padding: "0 4px", flexShrink: 0 }}
                  title="삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 파일 추가 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFile}
            disabled={uploading}
            style={{ fontSize: 13, color: "var(--text-dark)", flex: 1 }}
          />
          {uploading && <span style={{ fontSize: 12, color: "var(--text-gray)", flexShrink: 0 }}>업로드 중...</span>}
        </div>
        <p style={{ fontSize: 11, color: "var(--text-gray)", marginTop: 4 }}>Ctrl(Cmd) 또는 Shift로 여러 파일을 동시에 선택할 수 있습니다.</p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: "var(--text-mid)" }}>
          <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} />
          공지 고정 (목록 상단 노란 배경)
        </label>
      </div>
      {error && <p style={{ color: "#e05050", fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={saving || uploading} style={{ ...btnPrimary, flex: 1, padding: "12px 0", fontSize: 15, opacity: saving ? 0.6 : 1 }}>
          {saving ? "저장 중..." : "저장"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "12px 24px", background: "var(--surface)", color: "var(--text-mid)", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", fontSize: 15 }}>
          취소
        </button>
      </div>
    </form>
  );
}

function HistoryForm({ pw, initial, onDone, onCancel }: {
  pw: string; initial?: HistoryItem | null; onDone: () => void; onCancel: () => void;
}) {
  const [year, setYear] = useState(initial?.year ?? "");
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
      {error && <p style={{ color: "#e05050", fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={saving} style={{ ...btnPrimary, flex: 1, padding: "12px 0", fontSize: 15, opacity: saving ? 0.6 : 1 }}>
          {saving ? "저장 중..." : "저장"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "12px 24px", background: "var(--surface)", color: "var(--text-mid)", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", fontSize: 15 }}>
          취소
        </button>
      </div>
    </form>
  );
}

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>사업소식</h2>
        <button onClick={() => setView("new")} style={btnPrimary}>+ 새 글 작성</button>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>게시글이 없습니다.</p>
      ) : (
        <div style={{ background: "var(--bg)", borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden" }}>
          {posts.map((post, idx) => (
            <div
              key={post.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 20px",
                borderBottom: idx < posts.length - 1 ? "1px solid var(--border-light)" : "none",
                background: post.isPinned ? "var(--surface-pinned)" : "var(--surface)",
                flexWrap: "wrap",
              }}
            >
              {post.isPinned && <span style={{ fontSize: 11, fontWeight: 700, color: "#8a6a00", background: "var(--yellow-light)", padding: "2px 8px", borderRadius: 2, flexShrink: 0 }}>공지</span>}
              <span style={{ fontSize: 12, color: "var(--text-gray)", flexShrink: 0, background: "var(--green-light)", padding: "2px 8px", borderRadius: 2 }}>{CATEGORY_LABELS[post.category] ?? post.category}</span>
              <span style={{ flex: 1, fontSize: 15, color: "var(--text-dark)", fontWeight: post.isPinned ? 600 : 400, minWidth: 100 }}>{post.title}</span>
              {post.attachments?.length > 0 && <span style={{ fontSize: 13, color: "var(--text-gray)" }}>📎{post.attachments.length > 1 ? ` ${post.attachments.length}` : ""}</span>}
              <span style={{ fontSize: 13, color: "var(--text-gray)", flexShrink: 0 }}>{post.date}</span>
              <button onClick={() => { setEditing(post); setView("edit"); }} style={{ padding: "6px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "var(--text-mid)", flexShrink: 0 }}>수정</button>
              <button onClick={() => handleDelete(post.id)} style={{ padding: "6px 14px", background: "var(--surface)", border: "1px solid #f0c0c0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "#e05050", flexShrink: 0 }}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
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
            <div key={item.id} style={{ background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
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
                  <button onClick={() => { setEditing(item); setView("edit"); }} style={{ padding: "6px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "var(--text-mid)" }}>수정</button>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: "6px 14px", background: "var(--surface)", border: "1px solid #f0c0c0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "#e05050" }}>삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function AdminMain({ pw }: { pw: string }) {
  const [tab, setTab] = useState<Tab>("news");

  const tabBtn = (t: Tab, label: string) => (
    <button
      onClick={() => setTab(t)}
      style={{
        padding: "10px 24px",
        borderRadius: "6px 6px 0 0",
        border: "1px solid var(--border)",
        borderBottom: tab === t ? `1px solid var(--surface)` : "1px solid var(--border)",
        background: tab === t ? "var(--surface)" : "var(--bg)",
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
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 0" }} className="pg-pad">
      <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 26, fontWeight: 700, color: "var(--text-dark)", marginBottom: 28 }}>
        관리자
      </h1>

      <div style={{ display: "flex", gap: 4, marginBottom: 0, borderBottom: "1px solid var(--border)" }}>
        {tabBtn("news", "사업소식")}
        {tabBtn("history", "연혁")}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "32px" }}>
        {tab === "news" && <NewsTab pw={pw} />}
        {tab === "history" && <HistoryTab pw={pw} />}
      </div>
    </div>
  );
}

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
