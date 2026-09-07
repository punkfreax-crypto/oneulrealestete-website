"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import { createClient } from "@/lib/supabase/client";
import { savePost, deletePost, type SaveInput } from "@/app/admin/actions";

interface Props {
  initial?: {
    id: string;
    title: string;
    excerpt: string;
    cover_image: string;
    body: string;
    status: "draft" | "published";
  };
}

export default function PostEditor({ initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [cover, setCover] = useState(initial?.cover_image ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  async function uploadImage(file: File): Promise<string | null> {
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("newsletter").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      setErr("이미지 업로드 실패: " + error.message);
      return null;
    }
    return supabase.storage.from("newsletter").getPublicUrl(path).data.publicUrl;
  }

  async function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr("");
    const url = await uploadImage(file);
    if (url) setCover(url);
    setUploading(false);
  }

  async function handleInlineImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr("");
    const url = await uploadImage(file);
    if (url) insert(`\n![](${url})\n`, "");
    setUploading(false);
    e.target.value = "";
  }

  function insert(before: string, after: string) {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = body.slice(start, end);
    const next = body.slice(0, start) + before + sel + after + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + sel.length;
    });
  }

  function submit(status: "draft" | "published") {
    setErr("");
    const input: SaveInput = {
      id: initial?.id,
      title,
      excerpt,
      cover_image: cover,
      body,
      status,
    };
    startTransition(async () => {
      const res = await savePost(input);
      if (res?.error) setErr("저장 실패: " + res.error);
    });
  }

  function remove() {
    if (!initial?.id) return;
    if (!confirm("이 글을 삭제할까요? 되돌릴 수 없습니다.")) return;
    startTransition(async () => {
      const res = await deletePost(initial.id);
      if (res?.error) setErr("삭제 실패: " + res.error);
    });
  }

  const busy = pending || uploading;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7" }}>
      {/* 상단 바 */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        <button onClick={() => router.push("/admin/newsletter")} style={backBtn}>
          ← {initial ? "글 편집" : "새 글쓰기"}
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {initial && (
            <button onClick={remove} disabled={busy} style={ghostDanger}>
              삭제
            </button>
          )}
          <button onClick={() => submit("draft")} disabled={busy} style={ghostBtn}>
            임시저장
          </button>
          <button onClick={() => submit("published")} disabled={busy} style={primaryBtn}>
            {pending ? "저장 중…" : "발행하기"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>
        {err && (
          <p
            style={{
              background: "#FDECEA",
              color: "#C0392B",
              fontSize: 13,
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            {err}
          </p>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          style={{
            width: "100%",
            border: "none",
            borderBottom: "0.5px solid #D2D2D7",
            background: "transparent",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            padding: "6px 0 14px",
            marginBottom: 20,
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 16, marginBottom: 20 }} className="ed-meta">
          <label style={coverBox}>
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="대표 이미지" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 9 }} />
            ) : (
              <span style={{ fontSize: 11, color: "#AEAEB2" }}>＋ 대표 이미지</span>
            )}
            <input type="file" accept="image/*" onChange={handleCover} style={{ display: "none" }} />
          </label>
          <div style={{ flex: 1 }}>
            <label style={metaLabel}>한 줄 요약 (목록에 노출)</label>
            <input
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="글을 한 줄로 요약해 주세요."
              style={metaInput}
            />
          </div>
        </div>

        {/* 툴바 */}
        <div style={toolbar}>
          <button onClick={() => insert("**", "**")} style={tbtn} title="굵게">B</button>
          <button onClick={() => insert("*", "*")} style={{ ...tbtn, fontStyle: "italic" }} title="기울임">i</button>
          <button onClick={() => insert("## ", "")} style={tbtn} title="제목">H</button>
          <button onClick={() => insert("- ", "")} style={tbtn} title="목록">≣</button>
          <button onClick={() => insert("> ", "")} style={tbtn} title="인용">❝</button>
          <button onClick={() => insert("[", "](https://)")} style={tbtn} title="링크">🔗</button>
          <label style={{ ...tbtn, cursor: "pointer" }} title="이미지">
            🖼
            <input type="file" accept="image/*" onChange={handleInlineImage} style={{ display: "none" }} />
          </label>
          {uploading && <span style={{ fontSize: 12, color: "#6E6E73", marginLeft: 6 }}>업로드 중…</span>}
        </div>

        {/* 에디터 + 미리보기 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ed-grid">
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="본문을 입력하세요. (마크다운 지원)"
            style={{
              width: "100%",
              minHeight: 420,
              border: "0.5px solid #E8E8ED",
              borderTop: "none",
              borderRadius: "0 0 10px 10px",
              padding: 16,
              fontSize: 14,
              lineHeight: 1.8,
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              background: "#fff",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              minHeight: 420,
              border: "0.5px solid #E8E8ED",
              borderRadius: 10,
              padding: "16px 20px",
              background: "#fff",
              overflow: "auto",
            }}
            className="md-preview"
            dangerouslySetInnerHTML={{ __html: marked.parse(body || "*미리보기*") as string }}
          />
        </div>
      </div>

      <style>{`
        .md-preview h2 { font-size: 19px; font-weight: 600; margin: 20px 0 10px; }
        .md-preview p { font-size: 14px; line-height: 1.8; color: #3A3A3C; margin: 0 0 12px; }
        .md-preview img { max-width: 100%; border-radius: 8px; }
        .md-preview blockquote { border-left: 3px solid #F39800; margin: 0 0 12px; padding: 4px 0 4px 14px; color: #6E6E73; }
        .md-preview ul { padding-left: 20px; }
        .md-preview a { color: #C67C00; }
        @media (max-width: 767px) {
          .ed-grid { grid-template-columns: 1fr !important; }
          .ed-meta { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}

const backBtn: React.CSSProperties = { background: "none", border: "none", color: "#fff", fontSize: 13, cursor: "pointer" };
const ghostBtn: React.CSSProperties = { background: "transparent", border: "0.5px solid rgba(255,255,255,0.4)", color: "#fff", borderRadius: 7, padding: "7px 14px", fontSize: 13, cursor: "pointer" };
const ghostDanger: React.CSSProperties = { ...ghostBtn, borderColor: "rgba(255,120,120,0.5)", color: "#FF9B9B" };
const primaryBtn: React.CSSProperties = { background: "#F39800", border: "none", color: "#fff", borderRadius: 7, padding: "7px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" };
const coverBox: React.CSSProperties = { flex: "0 0 130px", height: 86, background: "#fff", border: "1px dashed #D2D2D7", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" };
const metaLabel: React.CSSProperties = { display: "block", fontSize: 11, color: "#6E6E73", marginBottom: 6 };
const metaInput: React.CSSProperties = { width: "100%", border: "0.5px solid #E8E8ED", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" };
const toolbar: React.CSSProperties = { display: "flex", gap: 2, alignItems: "center", background: "#F7F7F9", border: "0.5px solid #E8E8ED", borderRadius: "10px 10px 0 0", padding: "7px 10px" };
const tbtn: React.CSSProperties = { width: 30, height: 28, border: "none", background: "transparent", borderRadius: 6, cursor: "pointer", fontSize: 14, color: "#3A3A3C" };
