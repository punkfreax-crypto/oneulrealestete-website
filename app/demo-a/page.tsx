"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BG_IMAGE = "/images/hero-han-river.jpg";
const OVERLAY =
  "linear-gradient(180deg, rgba(10,15,30,0) 0%, rgba(10,15,30,0) 35%, rgba(10,15,30,0.35) 60%, rgba(10,15,30,0.75) 100%)";
const FALLBACK_BG = "linear-gradient(180deg, #0a0f1e, #1a2744)";

export default function DemoA() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [hasImage, setHasImage] = useState(false);

  // 이미지 존재 확인
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = BG_IMAGE;
  }, []);

  // 패럴랙스: 스크롤 시 배경이 0.4배 속도로 이동
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      // 0.4배 속도 = 스크롤의 40%만큼 배경 이동
      bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ← 메인으로 */}
      <Link
        href="/"
        style={{
          position: "fixed",
          top: 24,
          left: 32,
          zIndex: 100,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "rgba(255,255,255,0.85)",
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "none",
          letterSpacing: "-0.01em",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(8px)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          padding: "8px 16px",
          borderRadius: 980,
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(0,0,0,0.45)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(0,0,0,0.25)";
        }}
      >
        ← 메인으로
      </Link>

      {/* 데모 배지 */}
      <div
        style={{
          position: "fixed",
          top: 24,
          right: 32,
          zIndex: 100,
          background: "rgba(243,152,0,0.9)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          padding: "6px 14px",
          borderRadius: 980,
        }}
      >
        DEMO A — 패럴랙스
      </div>

      {/* ─── 히어로 섹션 ─── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* 배경 이미지 (패럴랙스 div) */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            // 위아래 여유분을 줘서 parallax 이동 시 빈틈 방지
            top: "-20%",
            left: 0,
            right: 0,
            bottom: "-20%",
            backgroundImage: hasImage ? `url(${BG_IMAGE})` : FALLBACK_BG,
            backgroundSize: "cover",
            backgroundPosition: "center",
            background: hasImage ? undefined : FALLBACK_BG,
            willChange: "transform",
          }}
        />

        {/* 그라데이션 오버레이 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: OVERLAY,
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
          }}
          className="demo-hero-content"
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

          <h1
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: 40,
              whiteSpace: "pre-line",
            }}
          >
            {"내일을 여는 부동산.\n오늘, 함께 시작합니다."}
          </h1>

          {/* 버튼 그룹 */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#about-demo")
                  ?.scrollIntoView({ behavior: "smooth" });
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              상담 신청
            </a>
            <a
              href="#services"
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
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
            >
              서비스 보기 →
            </a>
          </div>
        </div>
      </section>

      {/* ─── 다음 섹션 (스크롤 테스트용 About) ─── */}
      <section
        id="about-demo"
        style={{
          background: "#FFFFFF",
          padding: "160px 64px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
        className="demo-about"
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "#F39800",
            marginBottom: 24,
          }}
        >
          ABOUT
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
            lineHeight: 1.25,
            marginBottom: 32,
          }}
        >
          한 팀이 움직일 때,<br />거래가 달라집니다.
        </h2>
        <p
          style={{
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#6E6E73",
            maxWidth: 640,
            marginBottom: 16,
          }}
        >
          오늘부동산중개법인은 도봉구에 뿌리를 두고 분당까지 영역을 넓혀온
          부동산중개법인입니다. 개인 중개사의 한계를 넘어, 분야별 전문가들이
          팀으로 함께 움직입니다.
        </p>
        <p
          style={{
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#6E6E73",
            maxWidth: 640,
          }}
        >
          매매·전세·월세 모든 거래에서 의뢰인의 편에 섭니다. 숫자보다 사람을,
          속도보다 정확함을 먼저 생각하는 투명하고 정직한 거래 문화를 만들어
          나갑니다.
        </p>
      </section>

      <style>{`
        @media (max-width: 767px) {
          .demo-hero-content {
            padding: 0 24px 80px !important;
          }
          .demo-about {
            padding: 96px 24px !important;
          }
        }
      `}</style>
    </>
  );
}
