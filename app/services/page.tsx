import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "서비스 | 오늘부동산 중개법인",
  description:
    "오늘부동산 중개법인의 부동산 중개, 교육, 컨설팅, 자산관리 서비스를 소개합니다.",
};

const services = [
  {
    id: "brokerage",
    num: "01",
    title: "부동산 중개",
    subtitle: "매매·전세·월세, 모든 거래의 처음부터 끝까지",
    desc: "도봉구와 분당 지역의 주택, 상가, 오피스텔 등 모든 유형의 부동산 거래를 중개합니다. 단순한 물건 소개가 아닌, 의뢰인의 상황에 맞는 최적의 거래를 설계합니다.",
    items: [
      "아파트·빌라·단독주택 매매 및 임대",
      "상가·오피스텔·업무시설 중개",
      "계약서 검토 및 특약 설계",
      "잔금·이사·등기까지 사후 지원",
    ],
    tag: "BROKERAGE",
  },
  {
    id: "education",
    num: "02",
    title: "부동산 교육",
    subtitle: "현장 전문가에게 직접 배우는 실전 부동산",
    desc: "이론이 아닌 현장 경험을 바탕으로 한 교육입니다. 부동산 투자를 처음 시작하는 분부터 계약 실무가 필요한 분까지, 수준에 맞는 프로그램을 운영합니다.",
    items: [
      "부동산 투자 입문 과정",
      "실전 계약서 작성 및 분석",
      "지역별 시장 분석 세미나",
      "1:1 맞춤 멘토링",
    ],
    tag: "EDUCATION",
  },
  {
    id: "consulting",
    num: "03",
    title: "부동산 컨설팅",
    subtitle: "데이터 기반의 객관적인 투자 전략",
    desc: "감이 아닌 데이터로 판단합니다. 개인 자산 현황 분석부터 투자 전략 수립까지, 의뢰인의 재무 상황에 맞는 구체적인 로드맵을 제시합니다.",
    items: [
      "개인 자산 포트폴리오 진단",
      "지역·물건 투자 가치 분석",
      "매도·매수 타이밍 전략",
      "세금·금융 연계 종합 계획",
    ],
    tag: "CONSULTING",
  },
  {
    id: "agency-biz",
    num: "04",
    title: "중개업 경영 지원",
    subtitle: "공인중개사를 위한 경영 노하우와 실전 정보",
    desc: "중개업을 운영하는 공인중개사라면 거래 실력만큼 경영 감각도 필요합니다. 법인 운영 경험을 바탕으로 수익 구조 개선부터 고객 관리까지, 현장에서 바로 쓸 수 있는 경영 정보를 제공합니다.",
    items: [
      "중개업 경영기법 및 수익 구조 분석",
      "시장 정보·트렌드 정기 제공",
      "법인 전환 및 운영 자문",
      "고객 관리·영업 전략 공유",
    ],
    tag: "AGENCY BIZ",
  },
];

export default function ServicesPage() {
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
        className="services-hero-pad"
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(243,152,0,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link href="/" className="back-link-svc">← 홈으로</Link>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "#F39800",
              marginBottom: 24,
            }}
          >
            SERVICES
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
            중개를 넘어,<br />부동산의 모든 것
          </h1>
          <p
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
            }}
          >
            BROKERAGE · EDUCATION · CONSULTING · AGENCY BIZ
          </p>
        </div>
      </section>

      {/* 서비스 상세 */}
      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          style={{
            background: i % 2 === 0 ? "#FFFFFF" : "#F5F5F7",
            padding: "120px 64px",
          }}
          className="services-section-pad"
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
            className="services-detail-grid"
          >
            {/* 좌측 텍스트 */}
            <ScrollReveal>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "#F39800",
                    marginBottom: 20,
                  }}
                >
                  {svc.tag}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#D2D2D7",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {svc.num}
                  </span>
                  <h2
                    style={{
                      fontSize: "clamp(24px, 3vw, 40px)",
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      color: "#1A1A1A",
                    }}
                  >
                    {svc.title}
                  </h2>
                </div>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#6E6E73",
                    letterSpacing: "-0.01em",
                    marginBottom: 40,
                    lineHeight: 1.5,
                  }}
                >
                  {svc.subtitle}
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.8,
                    color: "#6E6E73",
                    marginBottom: 40,
                  }}
                >
                  {svc.desc}
                </p>
                <Link
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#F39800",
                    color: "#FFFFFF",
                    padding: "13px 28px",
                    borderRadius: 980,
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  상담 신청 →
                </Link>
              </div>
            </ScrollReveal>

            {/* 우측 포함 내용 */}
            <ScrollReveal delay={150}>
              <div
                style={{
                  background: i % 2 === 0 ? "#F5F5F7" : "#FFFFFF",
                  borderRadius: 20,
                  padding: "48px",
                }}
                className="services-card-pad"
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "#AEAEB2",
                    marginBottom: 24,
                  }}
                >
                  포함 내용
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {svc.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#F39800",
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                          color: "#3A3A3C",
                          lineHeight: 1.6,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        style={{
          background: "#0a0f1e",
          padding: "120px 64px",
          textAlign: "center",
        }}
        className="services-section-pad"
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
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
              GET STARTED
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                lineHeight: 1.25,
                marginBottom: 40,
              }}
            >
              지금 바로 상담을<br />시작해보세요
            </h2>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#F39800",
                color: "#FFFFFF",
                padding: "16px 40px",
                borderRadius: 980,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              무료 상담 신청 →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      <style>{`
        .back-link-svc {
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
        .back-link-svc:hover { color: rgba(255,255,255,0.9); }
        @media (max-width: 767px) {
          .services-hero-pad { padding: 120px 24px 80px !important; }
          .services-section-pad { padding: 80px 24px !important; }
          .services-detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .services-card-pad { padding: 32px 24px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .services-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
