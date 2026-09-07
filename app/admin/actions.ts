"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function makeSlug() {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  return `${date}-${Math.random().toString(36).slice(2, 7)}`;
}

export interface SaveInput {
  id?: string;
  title: string;
  excerpt: string;
  cover_image: string;
  body: string;
  status: "draft" | "published";
}

export async function savePost(input: SaveInput) {
  const supabase = await requireClient();
  const title = input.title.trim() || "제목 없음";
  const base = {
    title,
    excerpt: input.excerpt.trim(),
    cover_image: input.cover_image.trim(),
    body: input.body,
    status: input.status,
  };

  if (input.id) {
    // 수정
    let published_at: string | null | undefined = undefined;
    if (input.status === "published") {
      const { data: cur } = await supabase
        .from("newsletter_posts")
        .select("published_at")
        .eq("id", input.id)
        .maybeSingle();
      published_at = cur?.published_at ?? new Date().toISOString();
    }
    const patch = published_at !== undefined ? { ...base, published_at } : base;
    const { error } = await supabase
      .from("newsletter_posts")
      .update(patch)
      .eq("id", input.id);
    if (error) return { error: error.message };
  } else {
    // 신규
    const { error } = await supabase.from("newsletter_posts").insert({
      ...base,
      slug: makeSlug(),
      published_at: input.status === "published" ? new Date().toISOString() : null,
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/newsletter");
  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}

export async function deletePost(id: string) {
  const supabase = await requireClient();
  const { error } = await supabase.from("newsletter_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/newsletter");
  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
