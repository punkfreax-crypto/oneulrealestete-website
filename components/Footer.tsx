"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#111111", color: "rgba(255,255,255,0.6)" }}>
      {/* 오렌지 디바이더 */}
      <div style={{ height: 1, background: "#F39800" }} />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 64px 48px",
        }}
        className="px-6 md:px-16"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 64,
          }}
          className="footer-grid"
        >
          {/* 회사 정보 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              오늘부동산 중개법인
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>
              오늘부동산중개법인 주식회사
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>
              서울특별시 도봉구 도봉로180나길 41<br />
              상가1동 224호
            </p>
            <p style={{ fontSize: 13 }}>
              대표: 전덕재
            </p>
            <p style={{ fontSize: 13 }}>
              사업자등록번호: 797-87-04120
            </p>
          </div>

          {/* 지점 연락처 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              지점 연락처
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <p style={{ fontSize: 13, color: "#F39800", marginBottom: 4 }}>도봉점</p>
                <a href="tel:02-956-5030" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>02-956-5030</a>
              </div>
              <div>
                <p style={{ fontSize: 13, color: "#F39800", marginBottom: 4 }}>분당점</p>
                <a href="tel:031-701-4333" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>031-701-4333</a>
              </div>
              <div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                  수원점 (준비 중)
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>COMING SOON</p>
              </div>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              빠른 링크
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "회사 소개", href: "#about" },
                { label: "서비스", href: "#services" },
                { label: "지점 안내", href: "#branches" },
                { label: "고객 후기", href: "#reviews" },
                { label: "상담 문의", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "0.5px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            © 2026 오늘부동산 중개법인. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
