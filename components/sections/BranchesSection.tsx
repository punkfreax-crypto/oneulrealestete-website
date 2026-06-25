"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone } from "lucide-react";

const branches = [
  {
    name: "도봉점",
    status: "운영 중",
    address: "서울특별시 도봉구 도봉로180나길 41\n상가1동 224호",
    phone: "02-956-5030",
    hours: "평일 08:00 – 19:00",
    soon: false,
  },
  {
    name: "분당점",
    status: "운영 중",
    address: "경기도 성남시 분당구 돌마로 481\n1층 104-1호",
    phone: "031-701-4333",
    hours: "평일 08:00 – 19:00",
    soon: false,
  },
  {
    name: "광교점",
    status: "준비 중",
    address: "경기도 수원시 영통구 광교\n(위치 확인 중)",
    phone: "—",
    hours: "—",
    soon: true,
  },
];

export default function BranchesSection() {
  return (
    <section
      id="branches"
      style={{
        background: "#F5F5F7",
        padding: "160px 0",
      }}
      className="branches-section-padding"
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 64px",
        }}
        className="px-6 md:px-16"
      >
        {/* 타이틀 */}
        <ScrollReveal>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
              marginBottom: 80,
              textAlign: "center",
            }}
            className="branches-title-mb"
          >
            가까운 지점에서 만나세요.
          </h2>
        </ScrollReveal>

        {/* 3열 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="branches-grid"
        >
          {branches.map((branch, i) => (
            <ScrollReveal key={branch.name} delay={i * 100}>
              <div
                className="card-hover"
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  border: "0.5px solid #D2D2D7",
                  padding: "48px 40px",
                  opacity: branch.soon ? 0.7 : 1,
                  position: "relative",
                }}
              >
                {/* OPENING SOON 배지 */}
                {branch.soon && (
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      background: "#1A1A1A",
                      color: "#FFFFFF",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      padding: "4px 10px",
                      borderRadius: 980,
                    }}
                  >
                    OPENING SOON
                  </div>
                )}

                {/* 지점 이름 */}
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    letterSpacing: "-0.02em",
                    marginBottom: 6,
                  }}
                >
                  {branch.name}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: branch.soon ? "#6E6E73" : "#F39800",
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                    marginBottom: 32,
                  }}
                >
                  {branch.status}
                </p>

                {/* 주소 */}
                <div
                  style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 16 }}
                >
                  <MapPin size={14} color="#6E6E73" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: "#6E6E73",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {branch.address}
                  </p>
                </div>

                {/* 전화 */}
                <div
                  style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}
                >
                  <Phone size={14} color="#6E6E73" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: 14, color: "#6E6E73" }}>{branch.phone}</p>
                </div>

                {/* 운영시간 */}
                <p style={{ fontSize: 13, color: "#6E6E73", marginTop: 24, paddingTop: 20, borderTop: "0.5px solid #D2D2D7" }}>
                  {branch.hours}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .branches-section-padding {
            padding: 96px 0 !important;
          }
          .branches-grid {
            grid-template-columns: 1fr !important;
          }
          .branches-title-mb {
            margin-bottom: 48px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .branches-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
