import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "회사 소개 | 오늘부동산 중개법인",
  description:
    "오늘부동산 중개법인은 2023년 도봉구에서 시작해 분당까지 영역을 넓혀온 부동산 중개법인입니다. 투명하고 정직한 거래 문화를 만들어 나갑니다.",
};

const MILESTONES = [
  {
    year: "2023",
    items: [
      "서울 도봉구 오늘공인중개사사무소 개업",
      "주택 및 오피스텔 중개 서비스 시작",
    ],
  },
  {
    year: "2024",
    items: [
      "오늘부동산 분당점 오픈",
      "상가 전문 중개 서비스 본격화",
      "고객 만족도 95%, 재방문율 80% 돌파",
      "지역정보 콘텐츠 제공 시작",
    ],
  },
  {
    year: "2025",
    items: [
      "고객 맞춤형 매물 제안 방식 강화",
      "월 평균 상담 건수 200건 돌파",
      "\"오늘부동산\" 상표등록 출원",
    ],
  },
  {
    year: "2026",
    items: ["오늘부동산 중개법인 전환"],
    current: true,
  },
];

const OFFICES = [
  {
    label: "오늘부동산 중개법인",
    name: "도봉점",
    address: "서울특별시 도봉구 도봉로180나길 41\n상가1동 224호",
    tel: "02-956-5030",
    hours: "평일 08:00 – 19:00",
  },
  {
    label: "오늘부동산",
    name: "분당점",
    address: "경기도 성남시 분당구 돌마로 481\n1층 104-1호 (서현동 95)",
    tel: "031-701-4333",
    hours: "평일 08:00 – 19:00",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* 페이지 히어로 */}
      <section
        style={{
          background: "linear-gradient(180deg, #0a0f1e 0%, #1a2744 100%)",
          padding: "160px 64px 120px",
          position: "relative",
          overflow: "hidden",
        }}
        className="about-hero-pad"
      >
        {/* 배경 그라데이션 원 */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(243,152,0,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link href="/" className="back-link">
            ← 홈으로
          </Link>

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
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            오늘의 선택이<br />내일의 가치를 만듭니다
          </h1>
          <p
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
            }}
          >
            SINCE 2023 · 도봉 · 분당
          </p>
        </div>
      </section>

      {/* 소개 본문 */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "120px 64px",
        }}
        className="about-section-pad"
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
          className="about-intro-grid"
        >
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
                MISSION
              </p>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#1A1A1A",
                  lineHeight: 1.35,
                }}
              >
                숫자보다 사람을,<br />속도보다 정확함을
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: "#6E6E73",
                  marginBottom: 24,
                }}
              >
                오늘부동산은 도봉구에 뿌리를 두고 분당까지 영역을 넓혀온
                중개법인입니다. 개인 중개사의 한계를 넘어, 분야별 전문가들이
                팀으로 함께 움직입니다.
              </p>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: "#6E6E73",
                }}
              >
                매매·전세·월세 모든 거래에서 의뢰인의 편에 섭니다. 숫자보다
                사람을, 속도보다 정확함을 먼저 생각하는 투명하고 정직한 거래
                문화를 만들어 나갑니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 브랜드 아이덴티티 */}
      <section
        style={{
          background: "#F5F5F7",
          padding: "120px 64px",
        }}
        className="about-section-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 24,
              }}
            >
              BRAND IDENTITY
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#1A1A1A",
                marginBottom: 80,
              }}
            >
              심볼과 브랜드
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="brand-grid"
          >
            {/* 로고 */}
            <ScrollReveal>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  padding: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0.5px solid #E5E5EA",
                }}
                className="brand-logo-pad"
              >
                <img
                  src="/images/logo.png"
                  alt="오늘부동산 로고"
                  style={{ width: "100%", maxWidth: 280 }}
                />
              </div>
            </ScrollReveal>

            {/* 설명 */}
            <ScrollReveal delay={150}>
              <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
                {/* 심볼 설명 */}
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "#AEAEB2",
                      marginBottom: 12,
                    }}
                  >
                    SYMBOL
                  </p>
                  <p
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                      color: "#1A1A1A",
                      letterSpacing: "-0.02em",
                      marginBottom: 10,
                    }}
                  >
                    오 + 늘
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      lineHeight: 1.75,
                      color: "#6E6E73",
                    }}
                  >
                    '오'는 지평선 위로 떠오르는 해를, '늘'은 가로로 돌려 건물을 형상화했습니다.
                    매일 새롭게 떠오르는 태양처럼, 오늘의 선택으로 고객의 자산 가치를 높여나갑니다.
                  </p>
                </div>

                {/* 브랜드 컬러 */}
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "#AEAEB2",
                      marginBottom: 16,
                    }}
                  >
                    BRAND COLOR
                  </p>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #E84545 0%, #F39800 100%)",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: "#1A1A1A",
                          letterSpacing: "-0.01em",
                          marginBottom: 4,
                        }}
                      >
                        선라이즈 오렌지
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#AEAEB2",
                          letterSpacing: "0.04em",
                          fontFamily: "monospace",
                        }}
                      >
                        #F39800
                      </p>
                    </div>
                  </div>
                </div>

                {/* 영문명 */}
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "#AEAEB2",
                      marginBottom: 12,
                    }}
                  >
                    ENGLISH NAME
                  </p>
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      color: "#1A1A1A",
                    }}
                  >
                    ONEUL REAL ESTATE
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 대표 인사말 */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "120px 64px",
        }}
        className="about-section-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 24,
              }}
            >
              GREETING
            </p>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 80,
              alignItems: "center",
            }}
            className="greeting-grid"
          >
            <ScrollReveal>
              {/* 대표 정보 */}
              <div>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    borderRadius: 12,
                    marginBottom: 24,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/images/ceo-jeon-deokjae.jpg"
                    alt="전덕재 대표"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      display: "block",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                  }}
                >
                  전덕재
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6E6E73",
                    letterSpacing: "-0.01em",
                  }}
                >
                  오늘부동산 중개법인 대표
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "#1A1A1A",
                    lineHeight: 1.6,
                    marginBottom: 32,
                  }}
                >
                  "거래 하나가 고객의 삶을 바꿀 수 있다는 사실을 항상
                  기억합니다."
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.85,
                    color: "#6E6E73",
                    marginBottom: 20,
                  }}
                >
                  저는 단순히 계약서를 쓰는 사람이 아니라, 고객의 선택이
                  올바른 방향으로 이어지도록 돕는 파트너가 되고 싶었습니다.
                  2023년 도봉구에서 작게 시작한 오늘부동산이 분당까지 함께하게
                  된 것도, 그 마음이 변하지 않았기 때문이라 생각합니다.
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.85,
                    color: "#6E6E73",
                  }}
                >
                  2026년 법인 전환을 통해 더 넓은 전문성과 더 깊은 책임감으로
                  의뢰인 한 분 한 분의 부동산 여정에 함께하겠습니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "120px 64px",
        }}
        className="about-section-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 16,
              }}
            >
              HISTORY
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#1A1A1A",
                marginBottom: 80,
              }}
            >
              걸어온 길
            </h2>
          </ScrollReveal>

          <div style={{ position: "relative" }}>
            {/* 세로 라인 */}
            <div
              style={{
                position: "absolute",
                left: 80,
                top: 0,
                bottom: 0,
                width: "0.5px",
                background: "#E5E5EA",
              }}
              className="timeline-line"
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
              {MILESTONES.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 100}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "160px 1fr",
                      gap: 48,
                      alignItems: "start",
                    }}
                    className="timeline-row"
                  >
                    {/* 연도 */}
                    <div style={{ position: "relative", paddingTop: 4 }}>
                      {/* 점 */}
                      <div
                        style={{
                          position: "absolute",
                          left: 76,
                          top: 10,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: m.current ? "#F39800" : "#D2D2D7",
                          zIndex: 1,
                        }}
                        className="timeline-dot"
                      />
                      <p
                        style={{
                          fontSize: 28,
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                          color: m.current ? "#F39800" : "#1A1A1A",
                        }}
                      >
                        {m.year}
                      </p>
                      {m.current && (
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: 6,
                            fontSize: 10,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            color: "#FFFFFF",
                            background: "#F39800",
                            padding: "2px 8px",
                            borderRadius: 980,
                          }}
                        >
                          NOW
                        </span>
                      )}
                    </div>

                    {/* 항목들 */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        paddingTop: 6,
                      }}
                    >
                      {m.items.map((item) => (
                        <p
                          key={item}
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: "#3A3A3C",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 지점 안내 */}
      <section
        style={{
          background: "#F5F5F7",
          padding: "120px 64px",
        }}
        className="about-section-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ScrollReveal>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#F39800",
                marginBottom: 16,
              }}
            >
              OFFICES
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#1A1A1A",
                marginBottom: 64,
              }}
            >
              지점 안내
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
            className="offices-grid"
          >
            {OFFICES.map((office, i) => (
              <ScrollReveal key={office.name} delay={i * 100}>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    padding: "48px 48px",
                    border: "0.5px solid #E5E5EA",
                  }}
                  className="office-card-pad"
                >
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "#F39800",
                      marginBottom: 16,
                    }}
                  >
                    {office.label}
                  </p>
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "#1A1A1A",
                      marginBottom: 32,
                    }}
                  >
                    {office.name}
                  </h3>
                  <div
                    style={{
                      width: "100%",
                      height: "0.5px",
                      background: "#E5E5EA",
                      marginBottom: 32,
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          color: "#AEAEB2",
                          marginBottom: 6,
                        }}
                      >
                        주소
                      </p>
                      <p
                        style={{
                          fontSize: 15,
                          color: "#3A3A3C",
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {office.address}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          color: "#AEAEB2",
                          marginBottom: 6,
                        }}
                      >
                        전화
                      </p>
                      <p style={{ fontSize: 15, color: "#3A3A3C" }}>
                        {office.tel}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          color: "#AEAEB2",
                          marginBottom: 6,
                        }}
                      >
                        운영시간
                      </p>
                      <p style={{ fontSize: 15, color: "#3A3A3C" }}>
                        {office.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          margin-bottom: 64px;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .back-link:hover { color: rgba(255,255,255,0.9); }
        @media (max-width: 767px) {
          .about-hero-pad { padding: 120px 24px 80px !important; }
          .about-section-pad { padding: 80px 24px !important; }
          .about-intro-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .greeting-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .timeline-line { left: 0 !important; display: none; }
          .timeline-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          .timeline-dot { display: none; }
          .offices-grid { grid-template-columns: 1fr !important; }
          .office-card-pad { padding: 32px 24px !important; }
          .brand-grid { grid-template-columns: 1fr !important; }
          .brand-logo-pad { padding: 40px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-intro-grid { grid-template-columns: 1fr !important; }
          .greeting-grid { grid-template-columns: 1fr !important; }
          .offices-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
