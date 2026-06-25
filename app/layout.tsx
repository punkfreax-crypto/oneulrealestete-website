import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘부동산 중개법인 | 내일을 여는 부동산",
  description:
    "오늘의 선택이 내일의 가치를 만듭니다. 도봉구 전문 오늘부동산중개법인입니다. 매매·전세·월세 주거용 상업용 부동산 거래를 책임집니다.",
  keywords: "오늘부동산, 부동산 중개법인, 도봉구 부동산, 공인중개사, 부동산 컨설팅, 분당 부동산, 수유 부동산, 전세, 매매, 부동산 상담",
  metadataBase: new URL("https://www.oneulrealestateagent.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "오늘부동산 중개법인 | 내일을 여는 부동산",
    description: "오늘의 선택이 내일의 가치를 만듭니다. 도봉구 전문 오늘부동산중개법인 — 매매·전세·월세 거래를 책임집니다.",
    url: "https://www.oneulrealestateagent.com",
    siteName: "오늘부동산 중개법인",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    other: {
      "naver-site-verification": "002fdeae00e69f82cc0b807c33e2fc136e004ff8",
    },
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
