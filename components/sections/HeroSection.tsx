"use client";

import { useEffect, useRef, useState } from "react";

const HERO_SCROLL_RANGE = 600;

export default function HeroSection() {
  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / HERO_SCROLL_RANGE));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textOpacity = 1 - progress;
  const textScale = 1 - progress * 0.08;

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `calc(100vh + ${HERO_SCROLL_RANGE}px)`,
        position: "relative",
      }}
    >
      <section
        id="hero"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          minHeight: 600,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* 배경: parallax wrapper → Ken Burns image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${progress * -80}px)`,
            willChange: "transform",
          }}
        >
          <div
            className="hero-bg-kenburns"
            style={{
              position: "absolute",
              top: "-8%",
              right: "-8%",
              bottom: "-8%",
              left: "-8%",
              backgroundColor: "#0a0f1e",
              backgroundImage: "url(/images/hero-han-river.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "kenBurns 22s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* 그라데이션 오버레이 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,15,30,0) 0%, rgba(10,15,30,0) 35%, rgba(10,15,30,0.35) 60%, rgba(10,15,30,0.75) 100%)",
            zIndex: 1,
          }}
        />

        {/* 콘텐츠 */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            width: "100%",
            margin: "0 auto",
            padding: "0 64px 100px",
            textAlign: "center",
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            transformOrigin: "center bottom",
            willChange: "opacity, transform",
          }}
          className="hero-content"
        >
          {/* 오렌지 라인 */}
          <div
            style={{
              width: 32,
              height: 1,
              background: "#F39800",
              margin: "0 auto 32px",
            }}
          />

          {/* 헤드라인 */}
          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: 40,
              whiteSpace: "pre-line",
            }}
          >
            {"내일을 여는 부동산\n오늘 함께 시작합니다"}
          </h1>

          {/* 버튼 그룹 */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 64,
            }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "#F39800",
                color: "#FFFFFF",
                padding: "14px 32px",
                borderRadius: 980,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "opacity 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              상담 신청
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "0.5px solid rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
                color: "#FFFFFF",
                padding: "14px 32px",
                borderRadius: 980,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "background 0.2s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
            >
              서비스 보기 →
            </a>
          </div>

          {/* 하단 캡션 */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
            }}
          >
            SINCE 2023 · 도봉 · 분당
          </p>
        </div>

        {/* 스크롤 힌트 */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: Math.max(0, 1 - progress * 4),
            transition: "opacity 0.1s ease",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 32,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0))",
            }}
          />
        </div>
      </section>

      <style>{`
        @keyframes kenBurns {
          from {
            transform: scale(1.0) translate(0%, 0%);
          }
          to {
            transform: scale(1.12) translate(-1.5%, -1%);
          }
        }
        @media (max-width: 767px) {
          .hero-content {
            padding: 0 24px 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
