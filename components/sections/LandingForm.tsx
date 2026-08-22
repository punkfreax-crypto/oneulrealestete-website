"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

type PropertyType = "아파트" | "오피스텔" | "원룸 / 투룸" | "상가" | "사무실" | "기타";
type DealType = "매매" | "전세" | "월세";
type Status = "idle" | "sending" | "success" | "error";

const AREAS = ["도봉구", "노원구", "강북구", "성북구", "수원 광교", "수원 영통", "기타(직접입력)"];
const MOVE_IN_OPTIONS = ["최대한 빨리", "정해진 날짜가 있어요", "정해진 날짜가 없어요", "날짜는 상관없어요"];
const BUDGET_RANGES = ["5천만원 이하", "5000-2억원", "2-5억원", "5-9억원", "9억원 이상"];

const HEADLINE = "조건에 맞는 매물, 정확하게 찾아드립니다";

const HEADLINES: Record<string, { title: string; propertyType: PropertyType }> = {
  apt: { title: HEADLINE, propertyType: "아파트" },
  store: { title: HEADLINE, propertyType: "상가" },
  room: { title: HEADLINE, propertyType: "원룸 / 투룸" },
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function LandingFormInner() {
  const params = useSearchParams();
  const sourceKey = params.get("t") && HEADLINES[params.get("t") as string] ? (params.get("t") as string) : "room";
  const videoId = params.get("v") ?? "";
  const headline = HEADLINES[sourceKey];

  const [propertyType, setPropertyType] = useState<PropertyType>(headline.propertyType);
  const [dealType, setDealType] = useState<DealType>("월세");
  const [area, setArea] = useState("");
  const [areaCustom, setAreaCustom] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthly, setMonthly] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!area) {
      setFormError("지역을 선택해주세요.");
      return;
    }
    if (!name.trim()) {
      setFormError("성함을 입력해주세요.");
      return;
    }
    if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone)) {
      setFormError("연락처를 정확히 입력해주세요.");
      return;
    }

    setStatus("sending");

    const resolvedArea = area === "기타(직접입력)" ? areaCustom || "기타" : area;
    const budget =
      dealType === "월세"
        ? `보증금 ${deposit || "-"} / 월세 ${monthly || "-"}`
        : budgetRange || "미선택";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyType,
          dealType,
          area: resolvedArea,
          budget,
          moveIn,
          name,
          phone,
          message,
          source: sourceKey,
          videoId,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={wrap}>
        <div style={{ ...card, textAlign: "center" as const }}>
          <p style={{ fontSize: 40, marginBottom: 16 }}>✅</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>접수 완료</h1>
          <p style={{ color: "#666" }}>빠르게 연락드리겠습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <form onSubmit={handleSubmit} style={card}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, lineHeight: 1.4 }}>
          {headline.title}
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>
          오늘부동산중개법인
        </p>
        <p style={{ color: "#F39800", fontSize: 12.5, fontWeight: 700, marginBottom: 24 }}>
          가리고 팔지 않습니다 · 구독자가 증인입니다
        </p>

        <Field label="유형">
          <div style={radioRow}>
            {(["아파트", "오피스텔", "원룸 / 투룸", "상가", "사무실", "기타"] as PropertyType[]).map((v) => (
              <RadioChip key={v} label={v} checked={propertyType === v} onClick={() => setPropertyType(v)} />
            ))}
          </div>
        </Field>

        <Field label="거래방식">
          <div style={radioRow}>
            {(["매매", "전세", "월세"] as DealType[]).map((v) => (
              <RadioChip key={v} label={v} checked={dealType === v} onClick={() => setDealType(v)} />
            ))}
          </div>
        </Field>

        <Field label="지역">
          <select value={area} onChange={(e) => setArea(e.target.value)} style={input}>
            <option value="">-지역-</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {area === "기타(직접입력)" && (
            <input
              value={areaCustom}
              onChange={(e) => setAreaCustom(e.target.value)}
              placeholder="희망 지역을 입력해주세요"
              style={{ ...input, marginTop: 8 }}
            />
          )}
        </Field>

        <Field label="예산">
          {dealType === "월세" ? (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="보증금 (만원)"
                inputMode="numeric"
                style={input}
              />
              <input
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                placeholder="월세 (만원)"
                inputMode="numeric"
                style={input}
              />
            </div>
          ) : (
            <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} style={input}>
              <option value="">-예산-</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field label="입주 시기">
          <select value={moveIn} onChange={(e) => setMoveIn(e.target.value)} style={input}>
            <option value="">-입주 시기-</option>
            {MOVE_IN_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>

        <Field label="성함">
          <input value={name} onChange={(e) => setName(e.target.value)} style={input} />
        </Field>

        <Field label="연락처">
          <input
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="010-0000-0000"
            inputMode="numeric"
            style={input}
          />
        </Field>

        <Field label="메모 (선택)">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            style={{ ...input, resize: "vertical" as const }}
          />
        </Field>

        {formError && (
          <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 8, textAlign: "center" }}>
            {formError}
          </p>
        )}
        <button type="submit" disabled={status === "sending"} style={submitBtn}>
          {status === "sending" ? "전송 중" : "매물 받기"}
        </button>
        {status === "error" && (
          <p style={{ color: "#c0392b", fontSize: 13, marginTop: 8, textAlign: "center" }}>
            전송에 실패했습니다. 아래 연락처로 문의해주세요.
          </p>
        )}

        <div style={footer}>
          <p style={{ fontWeight: 700, marginBottom: 4 }}>전화 상담</p>
          <p>02-956-5030 · 카카오톡 상담</p>
          <p style={{ marginTop: 12, color: "#999", fontSize: 12 }}>
            오늘부동산중개법인(주) · 서울 도봉구 도봉로180나길 41 상가1동 224호
          </p>
        </div>
      </form>
    </div>
  );
}

export default function LandingForm() {
  return (
    <Suspense fallback={null}>
      <LandingFormInner />
    </Suspense>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#333" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function RadioChip({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 20,
        border: checked ? "1px solid #F39800" : "1px solid #ddd",
        background: checked ? "#FFF3E0" : "#fff",
        color: checked ? "#F39800" : "#555",
        fontSize: 13,
        fontWeight: checked ? 700 : 400,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background: "#FAFAFA",
  display: "flex",
  justifyContent: "center",
  padding: "32px 16px",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 480,
  background: "#fff",
  borderRadius: 16,
  padding: "32px 24px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
};

const radioRow: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 14,
  boxSizing: "border-box",
};

const submitBtn: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 10,
  border: "none",
  background: "#F39800",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  marginTop: 8,
};

const footer: React.CSSProperties = {
  marginTop: 24,
  paddingTop: 20,
  borderTop: "1px solid #eee",
  textAlign: "center" as const,
  fontSize: 13,
  color: "#666",
};
