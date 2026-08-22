import type { Metadata } from "next";
import LandingForm from "@/components/sections/LandingForm";

export const metadata: Metadata = {
  title: "오늘부동산 | 조건에 맞는 매물, 정확하게 찾아드립니다",
  description: "조건을 남겨주시면 오늘부동산중개법인이 정확하게 찾아드립니다.",
  robots: { index: false, follow: false },
};

export default function LandingPage() {
  return <LandingForm />;
}
