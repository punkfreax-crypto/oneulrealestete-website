import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getNewsletterList } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "뉴스레터 | 오늘부동산 중개법인",
  description:
    "도봉구·노원구 부동산 시장 동향을 전덕재 대표의 시각으로 정리한 칼럼입니다.",
};

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dt = new Date(Number(y), Number(m) - 1, Number(d));
  return { label: `${y}년 ${m}월 ${d}일 ${days[dt.getDay()]}요일`, short: `${y}.${m}.${d}` };
}

export default function NewsletterPage() {
  const articles = getNewsletterList();

  return (
    <>
      <Header />

      {/* 히어로 */}
      <section
        style={{
          background: "linear-gradient(180deg, #0a0f1e 0%, #1a2744 100%)",
          padding: "160px 64px 120px",
          position: "relative",
          overflow: "hidden",
        }}
        className="nl-hero-pad"
      >
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
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "#F39800",
              marginBottom: 24,
            }}
          >
            NEWSLETTER
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
            도봉·노원 부동산<br />오늘의 이야기
          </h1>
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            매일 아침, 오늘부동산 전덕재 대표가 직접 읽고 고른 부동산 뉴스와
            현장의 시각을 담습니다.
          </p>
        </div>
      </section>

      {/* 아티클 목록 */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "120px 64px",
          minHeight: 400,
        }}
        className="nl-section-pad"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {articles.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#AEAEB2",
                fontSize: 15,
              }}
            >
              아직 발행된 글이 없습니다.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
              className="nl-grid"
            >
              {articles.map((article, i) => {
                const { label, short } = formatDate(article.date);
                return (
                  <ScrollReveal key={article.slug} delay={i * 80}>
                    <Link
                      href={`/newsletter/${article.slug}`}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <article
                        style={{
                          border: "0.5px solid #E5E5EA",
                          borderRadius: 16,
                          padding: "40px 36px",
                          background: "#FFFFFF",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                          cursor: "pointer",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                        }}
                        className="nl-card"
                      >
                        <p
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            color: "#F39800",
                          }}
                        >
                          {short}
                        </p>
                        <h2
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                            letterSpacing: "-0.02em",
                            color: "#1A1A1A",
                            lineHeight: 1.45,
                            flex: 1,
                          }}
                        >
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 400,
                              lineHeight: 1.75,
                              color: "#6E6E73",
                            }}
                          >
                            {article.excerpt}
                          </p>
                        )}
                        <p
                          style={{
                            fontSize: 13,
                            color: "#AEAEB2",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {label}
                        </p>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#1A1A1A",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 4,
                          }}
                        >
                          읽기 →
                        </div>
                      </article>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        .nl-card:hover {
          border-color: #F39800 !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        @media (max-width: 767px) {
          .nl-hero-pad { padding: 120px 24px 80px !important; }
          .nl-section-pad { padding: 80px 24px !important; }
          .nl-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .nl-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
