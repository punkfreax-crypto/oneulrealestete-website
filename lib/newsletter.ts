import { createClient } from "@supabase/supabase-js";
import { marked } from "marked";

// 공개 뉴스레터 데이터 소스: Supabase (newsletter_posts 테이블)
// 관리자가 발행한 글만 노출된다. 환경변수가 없으면 빈 목록을 반환(빌드 안전).

export interface NewsletterMeta {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  published_at: string | null;
}

export interface NewsletterArticle extends NewsletterMeta {
  body: string;
  html: string;
  views: number;
}

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getNewsletterList(): Promise<NewsletterMeta[]> {
  const sb = publicClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("newsletter_posts")
    .select("slug,title,excerpt,cover_image,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data as NewsletterMeta[];
}

export async function getNewsletterArticle(
  slug: string
): Promise<NewsletterArticle | null> {
  const sb = publicClient();
  if (!sb) return null;
  const { data } = await sb
    .from("newsletter_posts")
    .select("slug,title,excerpt,cover_image,published_at,body,views")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (!data) return null;
  const html = await marked.parse(data.body || "");
  return { ...(data as Omit<NewsletterArticle, "html">), html };
}
