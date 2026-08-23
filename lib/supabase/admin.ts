import { createClient } from "@supabase/supabase-js";

// 서버 전용: service_role 키를 쓰는 관리자 클라이언트 (RLS 우회).
// 조회수 증가 등 시스템 작업에만 사용. 절대 클라이언트 번들에 넣지 말 것.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
