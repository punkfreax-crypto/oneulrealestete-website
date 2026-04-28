"use client";

import ScrollReveal from "@/components/ScrollReveal";

const differentiators = [
  {
    num: "01",
    title: "풍부한 현장 경험",
    desc: "수백 건의 거래 경험. 현장에서 쌓은 인사이트",
  },
  {
    num: "02",
    title: "분야별 팀워크",
    desc: "매매·임대·컨설팅. 각 분야 전문가가 한 팀에",
  },
  {
    num: "03",
    title: "투명한 거래 원칙",
    desc: "숨겨진 조건은 없습니다. 모든 정보를 사전에 공개",
  },
];

export default function WhySection() {
  return (
    <section
      id="why"
      style={{
        background: "#F5F5F7",
        padding: "160px 0",
      }}
      className="why-section-padding"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 64px",
        }}
        className="px-6 md:px-16"
      >
        {/* 타이틀 영역 — 2컬럼 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
            marginBottom: 80,
          }}
          className="why-title-grid"
        >
          <ScrollReveal>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 20,
              }}
            >
              WHY US
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "#1A1A1A",
                lineHeight: 1.2,
              }}
            >
              오늘 부동산을<br />선택하는 이유
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#6E6E73",
              }}
              className="why-subtitle"
            >
              전문성과 신뢰도를 갖춘 중개사무소, 판단하기 쉽지 않습니다.
            </p>
          </ScrollReveal>
        </div>

        {/* 3열 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="why-grid"
        >
          {differentiators.map((item, i) => (
            <div
              key={item.num}
              className={`card-hover why-card-anim why-card-delay-${i}`}
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "0.5px solid #D2D2D7",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: "#F39800",
                  letterSpacing: "-0.03em",
                  marginBottom: 40,
                  lineHeight: 1,
                }}
              >
                {item.num}
              </p>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#1A1A1A",
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "#6E6E73",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .why-section-padding { padding: 96px 0 !important; }
          .why-title-grid { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 48px !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .why-subtitle { white-space: normal !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .why-title-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
