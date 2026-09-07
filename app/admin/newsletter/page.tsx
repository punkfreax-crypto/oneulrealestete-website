import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Post {
  id: string;
  title: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
  views: number;
}

function fmt(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("newsletter_posts")
    .select("id,title,status,published_at,updated_at,views")
    .order("updated_at", { ascending: false });
  const posts = (data ?? []) as Post[];
  const pub = posts.filter((p) => p.status === "published").length;
  const draft = posts.length - pub;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7" }}>
      <div
        style={{
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: "linear-gradient(135deg,#F39800,#E24B4A)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 11,
            }}
          >
            오
          </span>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>뉴스레터 관리</span>
        </span>
        <form action={signOut}>
          <button
            type="submit"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer" }}
          >
            {user.email} · 로그아웃
          </button>
        </form>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: "#6E6E73" }}>
            발행 <b style={{ color: "#1A1A1A" }}>{pub}</b> · 임시저장{" "}
            <b style={{ color: "#1A1A1A" }}>{draft}</b>
          </span>
          <Link
            href="/admin/newsletter/new"
            style={{ background: "#F39800", color: "#fff", fontSize: 13, fontWeight: 500, padding: "9px 16px", borderRadius: 8, textDecoration: "none" }}
          >
            ＋ 새 글쓰기
          </Link>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#AEAEB2", fontSize: 14, background: "#fff", borderRadius: 12, border: "0.5px solid #E8E8ED" }}>
            아직 글이 없습니다. “새 글쓰기”로 첫 글을 작성해 보세요.
          </div>
        ) : (
          <div style={{ background: "#fff", border: "0.5px solid #E8E8ED", borderRadius: 12, overflow: "hidden" }}>
            {posts.map((p, i) => (
              <Link
                key={p.id}
                href={`/admin/newsletter/${p.id}/edit`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  borderTop: i === 0 ? "none" : "0.5px solid #F0F0F2",
                  textDecoration: "none",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize: 11, color: "#AEAEB2", margin: 0 }}>
                    {p.status === "published" ? fmt(p.published_at) : fmt(p.updated_at)} · 조회 {p.views}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    borderRadius: 5,
                    padding: "3px 8px",
                    background: p.status === "published" ? "#E7F1E3" : "#F1F1F3",
                    color: p.status === "published" ? "#3A6E2E" : "#6E6E73",
                  }}
                >
                  {p.status === "published" ? "발행됨" : "임시저장"}
                </span>
                <span style={{ color: "#C7C7CC", fontSize: 13 }}>›</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
