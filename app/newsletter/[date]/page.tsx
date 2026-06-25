import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNewsletterArticle, getNewsletterList } from "@/lib/newsletter";

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const article = getNewsletterArticle(date);
  if (!article) return { title: "뉴스레터 | 오늘부동산" };
  return {
    title: `${article.title} | 오늘부동산 뉴스레터`,
    description: article.excerpt,
  };
}

export function generateStaticParams() {
  return getNewsletterList().map((a) => ({ date: a.slug }));
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dt = new Date(Number(y), Number(m) - 1, Number(d));
  return `${y}년 ${m}월 ${d}일 ${days[dt.getDay()]}요일`;
}

export default async function ArticlePage({ params }: Props) {
  const { date } = await params;
  const article = getNewsletterArticle(date);
  if (!article) notFound();

  return (
    <>
      <Header />

      {/* 히어로 */}
      <section
        style={{
          background: "linear-gradient(180deg, #0a0f1e 0%, #1a2744 100%)",
          padding: "160px 64px 80px",
          position: "relative",
          overflow: "hidden",
        }}
        className="art-hero-pad"
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link href="/newsletter" className="back-link">
            ← 뉴스레터 목록
          </Link>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "#F39800",
              marginBottom: 20,
            }}
          >
            {formatDate(article.date)}
          </p>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </h1>
        </div>
      </section>

      {/* 본문 */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "80px 64px 120px",
        }}
        className="art-section-pad"
      >
        <div
          style={{ maxWidth: 800, margin: "0 auto" }}
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />
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
          margin-bottom: 40px;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .back-link:hover { color: rgba(255,255,255,0.9); }

        .article-body h1 { display: none; }
        .article-body h2 {
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #1A1A1A;
          margin: 48px 0 16px;
        }
        .article-body p {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.85;
          color: #3A3A3C;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .article-body strong { color: #1A1A1A; font-weight: 500; }
        .article-body hr {
          border: none;
          border-top: 0.5px solid #E5E5EA;
          margin: 40px 0;
        }
        .article-body p:last-child {
          font-size: 13px;
          color: #AEAEB2;
          line-height: 1.7;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 0.5px solid #E5E5EA;
        }

        @media (max-width: 767px) {
          .art-hero-pad { padding: 120px 24px 60px !important; }
          .art-section-pad { padding: 60px 24px 80px !important; }
          .article-body h2 { font-size: 18px !important; }
          .article-body p { font-size: 15px !important; }
        }
      `}</style>
    </>
  );
}
