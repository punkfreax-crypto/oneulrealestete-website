"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const MILESTONES = [
  { year: "2023", label: "도봉구 개업" },
  { year: "2024", label: "분당점 오픈" },
  { year: "2025", label: "상표등록 출원" },
  { year: "2026", label: "법인 전환", current: true },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#FFFFFF",
        padding: "160px 0",
        position: "relative",
        zIndex: 10,
      }}
      className="section-padding"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 64px",
          display: "grid",
          gridTemplateColumns: "40fr 60fr",
          gap: 80,
          alignItems: "center",
        }}
        className="about-grid px-6 md:px-16"
      >
        {/* 좌측 */}
        <ScrollReveal>
          <div>
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
              }}
            >
              한 팀이 움직일 때,<br />거래가 달라집니다.
            </h2>
          </div>
        </ScrollReveal>

        {/* 우측 */}
        <ScrollReveal delay={150}>
          <div>
            <p
              style={{
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#6E6E73",
                marginBottom: 16,
              }}
            >
              오늘부동산은 도봉구에 뿌리를 두고 분당까지 영역을 넓혀온 중개법인입니다.
              개인 중개사의 한계를 넘어, 분야별 전문가들이 팀으로 함께 움직입니다.
            </p>
            <p
              style={{
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#6E6E73",
                marginBottom: 40,
              }}
            >
              매매·전세·월세 모든 거래에서 의뢰인의 편에 섭니다.
              숫자보다 사람을, 속도보다 정확함을 먼저 생각하는 투명하고 정직한 거래 문화를 만들어 나갑니다.
            </p>
            <Link
              href="/about"
              className="arrow-link"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#1A1A1A",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                borderBottom: "0.5px solid #1A1A1A",
                paddingBottom: 2,
              }}
            >
              회사 소개 →
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* 마일스톤 스트립 */}
      <ScrollReveal delay={250}>
        <div
          style={{
            maxWidth: 1280,
            margin: "80px auto 0",
            padding: "0 64px",
          }}
          className="milestone-wrap"
        >
          {/* 구분선 */}
          <div
            style={{
              width: "100%",
              height: "0.5px",
              background: "#E5E5EA",
              marginBottom: 40,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
            className="milestone-grid"
          >
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                style={{
                  paddingRight: 32,
                  borderLeft: i === 0 ? "none" : "0.5px solid #E5E5EA",
                  paddingLeft: i === 0 ? 0 : 32,
                }}
                className="milestone-item"
              >
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: m.current ? "#F39800" : "#1A1A1A",
                    marginBottom: 8,
                  }}
                >
                  {m.year}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: m.current ? "#F39800" : "#6E6E73",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {m.label}
                  {m.current && (
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: 8,
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: "#FFFFFF",
                        background: "#F39800",
                        padding: "2px 7px",
                        borderRadius: 980,
                        verticalAlign: "middle",
                      }}
                    >
                      NOW
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 767px) {
          .section-padding {
            padding: 96px 0 !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .milestone-wrap {
            padding: 0 24px !important;
          }
          .milestone-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 0 !important;
          }
          .milestone-item {
            border-left: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-bottom: 0.5px solid #E5E5EA;
            padding-bottom: 24px !important;
          }
          .milestone-item:nth-child(3),
          .milestone-item:nth-child(4) {
            border-bottom: none !important;
            padding-top: 24px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
