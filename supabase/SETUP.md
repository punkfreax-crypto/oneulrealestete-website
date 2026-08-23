# 뉴스레터 관리자 — Supabase 준비 (대표님이 하실 일)

관리자 화면·글 저장·이미지 업로드를 위해 Supabase 프로젝트가 하나 필요합니다.
아래 5단계면 됩니다. 다 하시면 **3개 값(①②③)**만 저에게 주세요. 나머지 연결은 제가 합니다.

---

## 1. 프로젝트 만들기
1. https://supabase.com 접속 → 로그인(깃허브 계정으로 가능)
2. **New project** 클릭
3. 이름: `oneul-newsletter` (아무거나) · Region: **Seoul (ap-northeast-2)** 추천
4. Database Password는 아무거나 강하게 설정 후 **따로 메모**(나중에 거의 안 씀)
5. 생성까지 1~2분 대기

## 2. 스키마 넣기
1. 왼쪽 메뉴 **SQL Editor** → **New query**
2. 이 저장소의 `supabase/schema.sql` 내용을 통째로 붙여넣기
3. **Run** (성공 메시지 뜨면 됨)

## 3. 관리자 계정 만들기
1. 왼쪽 메뉴 **Authentication** → **Users** → **Add user** → **Create new user**
2. 이메일(예: `punkfreax@naver.com`)과 비밀번호 입력 → 생성
   - 이게 대표님이 `/admin`에서 로그인할 아이디·비번입니다.
3. (선택) Authentication → Providers → Email 에서 **Confirm email**을 꺼두면 바로 로그인됩니다.

## 4. 키 3개 복사
왼쪽 메뉴 **Project Settings → API** 에서:
- **① Project URL** (예: `https://abcd1234.supabase.co`)
- **② anon public key** (`anon` `public` 라고 적힌 키)
- **③ service_role key** (`service_role` `secret` — 절대 외부 노출 금지, 저에게만)

## 5. 저에게 전달
①②③ 세 값을 채팅에 붙여주세요. 제가 `.env.local`과 Vercel 환경변수에 넣고,
관리자 페이지를 연결·배포한 뒤 실제로 로그인·글쓰기가 되는지 확인해 드립니다.

---

### 참고
- **service_role 키는 비밀**입니다. 코드에 하드코딩하지 않고 환경변수로만 씁니다.
- 뉴스레터 데이터 소스가 기존 `~/content-system/output` 폴더 → 이 Supabase로 바뀝니다.
  (content-system 자체는 그대로 둡니다. 지금 실사이트 뉴스레터가 비어 있던 문제도 이걸로 해결됩니다.)
