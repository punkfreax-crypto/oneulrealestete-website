"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type FormState = {
  name: string;
  phone: string;
  area: string;
  propertyType: string;
  dealType: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
const DISCORD_WEBHOOK = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK ?? "";

async function sendDiscordAlert(form: FormState) {
  if (!DISCORD_WEBHOOK) return;
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "📋 새 상담 신청",
        color: 0xF39800,
        fields: [
          { name: "이름", value: form.name, inline: true },
          { name: "연락처", value: form.phone, inline: true },
          { name: "지역", value: form.area || "미선택", inline: true },
          { name: "매물유형", value: form.propertyType || "미선택", inline: true },
          { name: "거래유형", value: form.dealType || "미선택", inline: true },
          { name: "문의내용", value: form.message || "—", inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "오늘부동산 홈페이지 상담폼" },
      }],
    }),
  }).catch(() => {});
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    area: "",
    propertyType: "",
    dealType: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = k === "phone" ? formatPhone(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [k]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");

    if (!FORMSPREE_ID) {
      // fallback: mailto
      const body = encodeURIComponent(
        `이름: ${form.name}\n연락처: ${form.phone}\n지역: ${form.area}\n매물유형: ${form.propertyType}\n거래유형: ${form.dealType}\n\n${form.message}`
      );
      window.location.href = `mailto:punkfreax@naver.com?subject=${encodeURIComponent(`[오늘부동산 상담신청] ${form.name}`)}&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          이름: form.name,
          연락처: form.phone,
          지역: form.area || "미선택",
          매물유형: form.propertyType || "미선택",
          거래유형: form.dealType || "미선택",
          문의내용: form.message,
        }),
      });
      if (res.ok) {
        await sendDiscordAlert(form);
        setStatus("success");
        setForm({ name: "", phone: "", area: "", propertyType: "", dealType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{ background: "#FFFFFF", padding: "160px 0" }}
      className="contact-section-padding"
    >
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px" }}
        className="px-6 md:px-16"
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}
          className="contact-grid"
        >
          {/* 왼쪽: 헤드라인 */}
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
              CONTACT
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "#1A1A1A",
                lineHeight: 1.25,
                marginBottom: 24,
              }}
            >
              지금 바로<br />상담을 신청하세요.
            </h2>
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                lineHeight: 1.8,
                color: "#6E6E73",
                marginBottom: 40,
              }}
            >
              매매, 전세, 월세, 투자 상담까지.
              <br />
              오늘 부동산 팀이 직접 연락드립니다.
            </p>

            {/* 카카오 채널 */}
            <a
              href="http://pf.kakao.com/_Uxfxiin/chat"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#FEE500",
                color: "#1A1A1A",
                padding: "14px 24px",
                borderRadius: 980,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 1.5C4.858 1.5 1.5 4.134 1.5 7.375c0 2.098 1.32 3.937 3.31 4.99-.14.502-.506 1.818-.579 2.099-.09.34.124.336.26.244.107-.072 1.703-1.155 2.392-1.623.363.05.737.077 1.117.077 4.142 0 7.5-2.634 7.5-5.875C16.5 4.134 13.142 1.5 9 1.5z" fill="#1A1A1A"/>
              </svg>
              카카오로 바로 상담하기
            </a>

            {/* 구분선 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "32px 0",
              }}
            >
              <div style={{ flex: 1, height: 1, background: "#D2D2D7" }} />
              <span style={{ fontSize: 12, color: "#6E6E73" }}>또는</span>
              <div style={{ flex: 1, height: 1, background: "#D2D2D7" }} />
            </div>

            <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>
              폼을 작성하시면 확인 후<br />
              영업일 기준 1일 이내 연락드립니다.
            </p>
          </ScrollReveal>

          {/* 오른쪽: 폼 */}
          <ScrollReveal delay={150}>
            {status === "success" ? (
              <div
                style={{
                  background: "#F5F5F7",
                  borderRadius: 16,
                  padding: "64px 48px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#F39800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4.5 11.5l4.5 4.5 8.5-9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  상담 신청 완료
                </h3>
                <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.75 }}>
                  접수되었습니다.<br />
                  영업일 기준 1일 이내 연락드리겠습니다.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: 32,
                    background: "none",
                    border: "0.5px solid #D2D2D7",
                    borderRadius: 980,
                    padding: "10px 24px",
                    fontSize: 13,
                    color: "#6E6E73",
                    cursor: "pointer",
                  }}
                >
                  다시 작성
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "#F5F5F7",
                  borderRadius: 16,
                  padding: "48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
                className="contact-form-padding"
              >
                {/* 이름 + 연락처 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-name-phone">
                  <div>
                    <label style={labelStyle}>이름 *</label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      value={form.name}
                      onChange={set("name")}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F39800"; e.currentTarget.style.outline = "none"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#D2D2D7"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>연락처 *</label>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      value={form.phone}
                      onChange={set("phone")}
                      required
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F39800"; e.currentTarget.style.outline = "none"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#D2D2D7"; }}
                    />
                  </div>
                </div>

                {/* 지역 + 매물유형 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-name-phone">
                  <div>
                    <label style={labelStyle}>지역</label>
                    <select
                      value={form.area}
                      onChange={set("area")}
                      style={selectStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F39800"; e.currentTarget.style.outline = "none"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#D2D2D7"; }}
                    >
                      <option value="">선택</option>
                      <option value="도봉구">도봉구</option>
                      <option value="노원구">노원구</option>
                      <option value="강북구">강북구</option>
                      <option value="성남시 분당구">성남시 분당구</option>
                      <option value="수원시 영통구">수원시 영통구</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>매물유형</label>
                    <select
                      value={form.propertyType}
                      onChange={set("propertyType")}
                      style={selectStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F39800"; e.currentTarget.style.outline = "none"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#D2D2D7"; }}
                    >
                      <option value="">선택</option>
                      <option value="아파트">아파트</option>
                      <option value="오피스텔">오피스텔</option>
                      <option value="원룸·투룸">원룸·투룸</option>
                      <option value="상가">상가</option>
                      <option value="사무실">사무실</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>

                {/* 거래유형 */}
                <div>
                  <label style={labelStyle}>거래유형</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["매매", "전세", "월세", "투자상담"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, dealType: p.dealType === type ? "" : type }))}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 980,
                          border: `0.5px solid ${form.dealType === type ? "#F39800" : "#D2D2D7"}`,
                          background: form.dealType === type ? "#F39800" : "#FFFFFF",
                          color: form.dealType === type ? "#FFFFFF" : "#6E6E73",
                          fontSize: 13,
                          fontWeight: 400,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 문의내용 */}
                <div>
                  <label style={labelStyle}>문의내용</label>
                  <textarea
                    placeholder="궁금하신 점을 자유롭게 적어주세요."
                    value={form.message}
                    onChange={set("message")}
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "none",
                      lineHeight: 1.7,
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F39800"; e.currentTarget.style.outline = "none"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#D2D2D7"; }}
                  />
                </div>

                {/* 에러 */}
                {status === "error" && (
                  <p style={{ fontSize: 13, color: "#E53935" }}>
                    전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                  </p>
                )}

                {/* 제출 */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background: status === "sending" ? "#D2D2D7" : "#F39800",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 980,
                    padding: "16px 0",
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: status === "sending" ? "default" : "pointer",
                    letterSpacing: "-0.01em",
                    transition: "opacity 0.2s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {status === "sending" ? "전송 중..." : "상담 신청 →"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-section-padding { padding: 96px 0 !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-form-padding { padding: 32px 24px !important; }
          .form-name-phone { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "#1A1A1A",
  letterSpacing: "-0.01em",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "#FFFFFF",
  border: "0.5px solid #D2D2D7",
  borderRadius: 8,
  fontSize: 14,
  color: "#1A1A1A",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236E6E73' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: 36,
  cursor: "pointer",
};
