import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK =
  process.env.DISCORD_WEBHOOK_URL ?? process.env.NEXT_PUBLIC_DISCORD_WEBHOOK ?? "";

type LeadBody = {
  propertyType: string;
  dealType: string;
  area: string;
  budget: string;
  moveIn: string;
  name: string;
  phone: string;
  message: string;
  source: string; // t 값 (apt / store / 기본값 없으면 "room")
  videoId: string; // v 값 (유입 유튜브 영상 ID)
};

function isValidPhone(phone: string) {
  return /^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone.replace(/\s/g, ""));
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadBody>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 50);
  const phone = (body.phone ?? "").trim().slice(0, 20);

  if (!name || !phone || !isValidPhone(phone)) {
    return NextResponse.json({ error: "name/phone required" }, { status: 400 });
  }

  const fields = [
    { name: "이름", value: name, inline: true },
    { name: "연락처", value: phone, inline: true },
    { name: "매물유형", value: body.propertyType || "미선택", inline: true },
    { name: "거래유형", value: body.dealType || "미선택", inline: true },
    { name: "지역", value: body.area || "미선택", inline: true },
    { name: "예산", value: body.budget || "미선택", inline: true },
    { name: "이사시기", value: body.moveIn || "미선택", inline: true },
    {
      name: "유입",
      value: `t=${body.source || "room"}${body.videoId ? ` · v=${body.videoId}` : ""}`,
      inline: true,
    },
    { name: "기타 전달내용", value: (body.message || "—").slice(0, 500), inline: false },
  ];

  if (DISCORD_WEBHOOK) {
    try {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🏠 새 문의 (co.kr 랜딩)",
              color: 0xf39800,
              fields,
              timestamp: new Date().toISOString(),
              footer: { text: "오늘부동산 co.kr 랜딩폼" },
            },
          ],
        }),
      });
    } catch {
      // 디스코드 전송 실패는 사용자에게 노출하지 않음 — 폼 제출 자체는 성공 처리
    }
  }

  return NextResponse.json({ ok: true });
}
