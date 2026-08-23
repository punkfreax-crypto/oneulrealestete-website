"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("이메일 또는 비밀번호를 확인해 주세요.");
      setLoading(false);
      return;
    }
    router.replace("/admin/newsletter");
    router.refresh();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F5F7",
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#FFFFFF",
          borderRadius: 18,
          border: "0.5px solid #E8E8ED",
          padding: 40,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "linear-gradient(135deg,#F39800,#E24B4A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            오
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>
            오늘부동산 관리자
          </span>
        </div>

        <label style={{ fontSize: 12, color: "#6E6E73", fontWeight: 500 }}>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={inputStyle}
        />

        <label style={{ fontSize: 12, color: "#6E6E73", fontWeight: 500 }}>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={inputStyle}
        />

        {error && <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            background: loading ? "#D2D2D7" : "#F39800",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "13px 0",
            fontSize: 15,
            fontWeight: 500,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 13px",
  border: "0.5px solid #D2D2D7",
  borderRadius: 9,
  fontSize: 14,
  color: "#1A1A1A",
  boxSizing: "border-box",
};
