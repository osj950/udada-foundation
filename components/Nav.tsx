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
  { href: "/contact", label: "오시는길" },
  { href: "http://www.udada.or.kr", label: "우다다학교", external: true },
];

type NavLink = { href: string; label: string; external?: boolean };

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.96)",
        borderBottom: "2px solid var(--yellow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "68px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div
          style={{
            width: 38,
            height: 38,
            background: "var(--green)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Noto Serif KR', serif",
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-1px",
          }}
        >
          우다
        </div>
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
      <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0 }} className="hidden md:flex">
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
      </ul>

      {/* 모바일 햄버거 */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
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
            background: "white",
            borderBottom: "1px solid #e8ede4",
            padding: "12px 0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                padding: "12px 48px",
                fontSize: 14,
                fontWeight: 500,
                color: external ? "var(--green)" : "var(--text-mid)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
