"use client";

import ScrollReveal from "@/components/ScrollReveal";

const reviews = [
  {
    quote:
      "처음 집을 살 때 막막했는데, 처음부터 끝까지 함께해주셔서 불안감 없이 계약을 마칠 수 있었습니다. 법인이라 그런지 체계가 달라요.",
    author: "30대 직장인 A씨",
    location: "도봉구 아파트 매수",
  },
  {
    quote:
      "전세 사기 걱정이 너무 컸는데 꼼꼼하게 등기부등본부터 확인사항 하나하나 짚어주셔서 안심하고 계약했습니다. 진짜 내 편 같은 느낌이에요.",
    author: "20대 직장인 B씨",
    location: "도봉구 전세 계약",
  },
  {
    quote:
      "수익형 부동산 투자 고민을 오래 했는데 객관적인 수치로 설명해주셔서 결정하기 훨씬 수월했습니다. 감사합니다.",
    author: "40대 자영업자 C씨",
    location: "분당 상가 투자",
  },
];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      style={{
        background: "#FFFFFF",
        padding: "160px 0",
      }}
      className="reviews-section-padding"
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
          <div style={{ marginBottom: 80 }} className="reviews-header-mb">
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 16,
              }}
            >
              REVIEWS
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
              함께한 분들의 이야기.
            </h2>
          </div>
        </ScrollReveal>

        {/* 3열 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="reviews-grid"
        >
          {reviews.map((review, i) => (
            <ScrollReveal key={i} delay={i * 100} style={{ height: "100%" }}>
              <div
                className="card-hover"
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  border: "0.5px solid #D2D2D7",
                  padding: "48px 40px",
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 오렌지 라인 */}
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "#F39800",
                    marginBottom: 28,
                  }}
                />

                {/* 인용문 */}
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.8,
                    color: "#1A1A1A",
                    marginBottom: 32,
                  }}
                >
                  &#34;{review.quote}&#34;
                </p>

                {/* 작성자 */}
                <div style={{ borderTop: "0.5px solid #D2D2D7", paddingTop: 20, marginTop: "auto" }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1A1A1A",
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                    }}
                  >
                    {review.author}
                  </p>
                  <p style={{ fontSize: 12, color: "#6E6E73" }}>{review.location}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .reviews-section-padding {
            padding: 96px 0 !important;
          }
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
          .reviews-header-mb {
            margin-bottom: 48px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
