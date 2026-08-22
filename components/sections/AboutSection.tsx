"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const MILESTONES = [
  { year: "2023", label: "도봉구 개업" },
  { year: "2024", label: "분당점 오픈" },
  { year: "2025", label: "상표등록 출원" },
  { year: "2026", label: "법인 전환 · 광교점 오픈", current: true },
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
              하지만 오늘 꼭 결정하지<br />않아도 됩니다.
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
              부동산 거래는 삶에서 손꼽히는 큰 결정입니다. 큰돈이 오가고, 한번
              정하면 되돌리기 어렵습니다.
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
              충분히 고민하고 결정하세요.
              저희는 그 결정을 돕는 사람들입니다.
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
