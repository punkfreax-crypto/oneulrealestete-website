import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘부동산 중개법인 | 내일을 여는 부동산",
  description:
    "오늘부동산 중개법인은 도봉구·분당·수유 지역의 부동산 중개, 교육, 컨설팅, 자산관리를 전문으로 합니다. 한 명의 공인중개사가 아닌 법인이 함께합니다.",
  keywords: "오늘부동산, 부동산 중개법인, 도봉구 부동산, 공인중개사, 부동산 컨설팅",
  openGraph: {
    title: "오늘부동산 중개법인",
    description: "내일을 여는 부동산. 오늘, 함께 시작합니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
