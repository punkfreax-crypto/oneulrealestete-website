import type { Metadata } from "next";
import LandingForm from "@/components/sections/LandingForm";

export const metadata: Metadata = {
  title: "오늘부동산 | 원하는 매물 리스트 30초 신청",
  description: "조건 입력하고 30초 만에 원하는 매물 리스트 받아보세요. 오늘부동산중개법인.",
  robots: { index: false, follow: false },
};

export default function LandingPage() {
  return <LandingForm />;
}
