"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "회사 소개", href: "/about" },
  { label: "서비스", href: "#services" },
  { label: "지점 안내", href: "#branches" },
  { label: "문의", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "0.5px solid #D2D2D7" : "0.5px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 64px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="px-6 md:px-16"
        >
          {/* 로고 */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: scrolled ? "#1A1A1A" : "#FFFFFF",
              transition: "color 0.3s ease",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            오늘부동산 중개법인
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex" style={{ gap: 40 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: scrolled ? "#1A1A1A" : "rgba(255,255,255,0.9)",
                  transition: "color 0.3s ease, opacity 0.2s ease",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.6"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: scrolled ? "#1A1A1A" : "#FFFFFF",
              transition: "color 0.3s ease",
            }}
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 드로어 */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            padding: "40px 24px",
            gap: 8,
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "#1A1A1A",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                padding: "16px 0",
                borderBottom: "0.5px solid #D2D2D7",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
