"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      id="cta-bottom"
      style={{
        background: "#1A1A1A",
        padding: "160px 0",
      }}
      className="cta-section-padding"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 64px",
          textAlign: "center",
        }}
        className="px-6 md:px-16"
      >
        <ScrollReveal>
          {/* 오렌지 라인 */}
          <div
            style={{
              width: 32,
              height: 1,
              background: "#F39800",
              margin: "0 auto 40px",
            }}
          />

          {/* 헤드라인 */}
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginBottom: 28,
              whiteSpace: "pre-line",
            }}
          >
            {"부동산은 사람의 일입니다.\n지금 시작해 보세요."}
          </h2>

          {/* 서브 텍스트 */}
          <p
            style={{
              fontSize: 17,
              fontWeight: 400,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.7)",
              marginBottom: 48,
              maxWidth: 480,
              margin: "0 auto 48px",
            }}
          >
            지금 고민 중이신가요? 오늘 상담이 가장 빠른 시작입니다.
          </p>

          {/* CTA 버튼 */}
          <a
            href="tel:02-956-5030"
            style={{
              display: "inline-block",
              background: "#F39800",
              color: "#FFFFFF",
              padding: "16px 40px",
              borderRadius: 980,
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "opacity 0.2s ease",
              marginBottom: 64,
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
          >
            상담 신청 →
          </a>

          {/* 연락처 */}
          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={14} color="rgba(255,255,255,0.6)" />
              <a href="tel:02-956-5030" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                02-956-5030 (도봉점)
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={14} color="rgba(255,255,255,0.6)" />
              <a href="tel:031-701-4333" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                031-701-4333 (분당점)
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Mail size={14} color="rgba(255,255,255,0.6)" />
              <a href="mailto:punkfreax@naver.com" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                punkfreax@naver.com
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .cta-section-padding {
            padding: 96px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
