"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { Home, GraduationCap, BarChart2 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "부동산 중개",
    desc: "매매·전세·월세 모든 거래를 전문적으로 중개합니다. 지역의 깊은 시장 이해를 바탕으로 최적의 거래를 지원합니다.",
    href: "/services#brokerage",
  },

  {
    icon: GraduationCap,
    title: "부동산 교육",
    desc: "현장 전문가의 경험을 직접 배웁니다. 투자 입문부터 실전 계약까지 수준에 맞는 프로그램을 운영합니다.",
    href: "/services#education",
  },
  {
    icon: BarChart2,
    title: "부동산 컨설팅",
    desc: "데이터 기반의 객관적인 분석으로 투자 전략을 수립합니다. 개인 자산 현황에 맞는 구체적인 로드맵을 제시합니다.",
    href: "/services#consulting",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        background: "#FFFFFF",
        padding: "160px 0",
      }}
      className="services-section-padding"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 64px",
        }}
        className="px-6 md:px-16"
      >
        {/* 헤더 */}
        <ScrollReveal>
          <div style={{ marginBottom: 80 }} className="services-header-mb">
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 16,
              }}
            >
              SERVICES
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
              중개를 넘어,<br />부동산의 모든 것.
            </h2>
          </div>
        </ScrollReveal>

        {/* 3열 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="services-grid"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 80} style={{ height: "100%" }}>
                <div
                  className="card-hover"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    border: "0.5px solid #D2D2D7",
                    padding: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "#F5F5F7",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <Icon size={20} color="#1A1A1A" strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: "#1A1A1A",
                      letterSpacing: "-0.02em",
                      marginBottom: 12,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: "#6E6E73",
                      marginBottom: 28,
                      flex: 1,
                    }}
                  >
                    {service.desc}
                  </p>
                  <Link
                    href={service.href}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#1A1A1A",
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      borderBottom: "0.5px solid #1A1A1A",
                      paddingBottom: 2,
                      alignSelf: "flex-start",
                    }}
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .services-section-padding {
            padding: 96px 0 !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-header-mb {
            margin-bottom: 48px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
