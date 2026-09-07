import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("newsletter_posts")
    .select("id,title,excerpt,cover_image,body,status")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <PostEditor
      initial={{
        id: data.id,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        cover_image: data.cover_image ?? "",
        body: data.body ?? "",
        status: data.status,
      }}
    />
  );
}
