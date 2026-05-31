"use client";

import { useState, useEffect, useCallback } from "react";

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

// ─── 로그인 화면 ─────────────────────────────────────────
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
          <p style={{ fontSize: 13, color: "var(--text-gray)", marginTop: 6 }}>
            우다다청소년재단 관리자 전용
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>
              비밀번호
            </label>
            <input
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid #d8e8d0",
                borderRadius: 6,
                padding: "10px 14px",
                fontSize: 14,
                outline: "none",
              }}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          {error && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "var(--green-dark)",
              color: "white",
              fontWeight: 700,
              padding: "12px 0",
              borderRadius: 6,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 15,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── 글 폼 ─────────────────────────────────────────────
function PostForm({
  pw,
  initial,
  onDone,
  onCancel,
}: {
  pw: string;
  initial?: Post | null;
  onDone: () => void;
  onCancel: () => void;
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
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await adminFetch("/api/admin/drive", pw, { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      setError("파일 업로드에 실패했습니다.");
      return;
    }
    const data = await res.json();
    setAttachmentUrl(data.url);
    setAttachmentName(data.name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = JSON.stringify({ title, category, content, date, isPinned, attachmentUrl, attachmentName });
    const url = initial ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
    const method = initial ? "PUT" : "POST";
    const res = await adminFetch(url, pw, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });
    setSaving(false);
    if (!res.ok) {
      setError("저장에 실패했습니다.");
      return;
    }
    onDone();
  }

  const inputStyle = {
    width: "100%",
    border: "1px solid #d8e8d0",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 14,
    outline: "none",
  };

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
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>날짜</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>본문</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ ...inputStyle, minHeight: 200, resize: "vertical" }}
          placeholder="본문 내용 입력"
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-mid)" }}>첨부파일</label>
        <input type="file" onChange={handleFile} disabled={uploading} style={{ fontSize: 14 }} />
        {uploading && <p style={{ fontSize: 12, color: "var(--text-gray)", marginTop: 4 }}>업로드 중...</p>}
        {attachmentUrl && (
          <p style={{ fontSize: 12, color: "var(--green-dark)", marginTop: 4 }}>✔ {attachmentName}</p>
        )}
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: "var(--text-mid)" }}>
          <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} />
          공지 고정 (목록 상단 노란 배경)
        </label>
      </div>

      {error && <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 16 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="submit"
          disabled={saving || uploading}
          style={{ flex: 1, background: "var(--green-dark)", color: "white", fontWeight: 700, padding: "12px 0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 15, opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ padding: "12px 24px", background: "white", color: "var(--text-mid)", border: "1px solid #d8e8d0", borderRadius: 6, cursor: "pointer", fontSize: 15 }}
        >
          취소
        </button>
      </div>
    </form>
  );
}

// ─── 메인 관리자 UI ──────────────────────────────────────
function AdminMain({ pw }: { pw: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Post | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminFetch("/api/admin/posts", pw)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setPosts(data); })
      .finally(() => setLoading(false));
  }, [pw]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await adminFetch(`/api/admin/posts/${id}`, pw, { method: "DELETE" });
    load();
  }

  const containerStyle = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 60px",
  };

  if (view === "new" || view === "edit") {
    return (
      <div style={containerStyle}>
        <PostForm
          pw={pw}
          initial={view === "edit" ? editing : null}
          onDone={() => { setView("list"); load(); }}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 26, fontWeight: 700, color: "var(--text-dark)" }}>
          사업소식 관리
        </h1>
        <button
          onClick={() => setView("new")}
          style={{ background: "var(--green-dark)", color: "white", fontWeight: 700, padding: "10px 24px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14 }}
        >
          + 새 글 작성
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: "var(--text-gray)", textAlign: "center", padding: "60px 0" }}>게시글이 없습니다.</p>
      ) : (
        <div style={{ background: "white", borderRadius: 8, border: "1px solid #e8ede4", overflow: "hidden" }}>
          {posts.map((post, idx) => (
            <div
              key={post.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                borderBottom: idx < posts.length - 1 ? "1px solid #f0f4ed" : "none",
                background: post.isPinned ? "#fffdf0" : "white",
              }}
            >
              {post.isPinned && (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#8a6a00", background: "var(--yellow-light)", padding: "2px 8px", borderRadius: 2, flexShrink: 0 }}>
                  공지
                </span>
              )}
              <span style={{ fontSize: 12, color: "var(--text-gray)", flexShrink: 0, background: "#f0f4ed", padding: "2px 8px", borderRadius: 2 }}>
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
              <span style={{ flex: 1, fontSize: 15, color: "var(--text-dark)", fontWeight: post.isPinned ? 600 : 400 }}>
                {post.title}
              </span>
              {post.attachmentUrl && <span style={{ fontSize: 14 }}>📎</span>}
              <span style={{ fontSize: 13, color: "var(--text-gray)", flexShrink: 0 }}>{post.date}</span>
              <button
                onClick={() => { setEditing(post); setView("edit"); }}
                style={{ padding: "6px 14px", background: "white", border: "1px solid #d8e8d0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "var(--text-mid)", flexShrink: 0 }}
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                style={{ padding: "6px 14px", background: "white", border: "1px solid #f0c0c0", borderRadius: 4, cursor: "pointer", fontSize: 13, color: "#c0392b", flexShrink: 0 }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 최상위 컴포넌트 ─────────────────────────────────────
export default function AdminClient() {
  const [pw, setPw] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) setPw(saved);
  }, []);

  return (
    <div style={{ marginTop: 68, minHeight: "80vh" }}>
      {pw ? <AdminMain pw={pw} /> : <LoginScreen onLogin={setPw} />}
    </div>
  );
}
