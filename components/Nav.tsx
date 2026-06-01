"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "재단소개" },
  { href: "/business", label: "주요사업" },
  { href: "/history", label: "연혁" },
  { href: "/news", label: "사업소식" },
  { href: "/activity", label: "활동소식" },
  { href: "http://www.udada.or.kr", label: "우다다학교", external: true },
];

const DONATE_URL = "https://www.cmsbank.com/j_paper/mm/dWRhZGE=";

type NavLink = { href: string; label: string; external?: boolean };

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <>
      <nav
        className="nav-pad"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "var(--nav-bg)",
          borderBottom: "2px solid var(--yellow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/udada-logo.png"
            alt="우다다 로고"
            style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: 10, color: "var(--text-gray)", letterSpacing: "0.05em", fontWeight: 400 }}>
              사단법인
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-dark)",
                fontFamily: "'Noto Serif KR', serif",
              }}
            >
              우다다청소년재단
            </span>
          </div>
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, alignItems: "center" }} className="hidden md:flex">
          {(links as NavLink[]).map(({ href, label, external }) => {
            const active = !external && (pathname === href || pathname.startsWith(href + "/"));
            return (
              <li key={href}>
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  style={{
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    color: external ? "var(--green)" : active ? "var(--green-dark)" : "var(--text-mid)",
                    letterSpacing: "0.03em",
                    position: "relative",
                    paddingBottom: 4,
                    borderBottom: active ? "2px solid var(--yellow-mid)" : "2px solid transparent",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setDonateOpen(true)}
              style={{
                background: "var(--green)",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              후원하기
            </button>
          </li>
        </ul>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
          aria-label="메뉴 열기"
        >
          <div style={{ width: 24, height: 2, background: "var(--text-dark)", marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: "var(--text-dark)", marginBottom: 5 }} />
          <div style={{ width: 24, height: 2, background: "var(--text-dark)" }} />
        </button>

        {/* 모바일 드롭다운 */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: 68,
              left: 0,
              right: 0,
              background: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              padding: "12px 0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {(links as NavLink[]).map(({ href, label, external }) => (
              <Link
                key={href}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: external ? "var(--green)" : "var(--text-mid)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-light)",
                }}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); setDonateOpen(true); }}
              style={{
                display: "block",
                width: "100%",
                padding: "14px 20px",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--green)",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--border-light)",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              후원하기
            </button>
          </div>
        )}
      </nav>

      {/* 후원하기 팝업 모달 */}
      {donateOpen && (
        <div className="donate-overlay" onClick={() => setDonateOpen(false)}>
          <div className="donate-modal" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #eee",
                background: "var(--green)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontWeight: 700, color: "white", fontSize: 16 }}>후원하기</span>
              <button
                onClick={() => setDonateOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 28, lineHeight: 1, padding: "0 4px" }}
                aria-label="닫기"
              >
                ×
              </button>
            </div>
            <iframe
              src={DONATE_URL}
              style={{ width: "100%", flex: 1, minHeight: 400, border: "none" }}
              title="후원하기"
            />
          </div>
        </div>
      )}
    </>
  );
}
