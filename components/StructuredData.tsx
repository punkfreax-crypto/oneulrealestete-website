// 검색엔진·AI가 읽는 구조화 데이터 (schema.org RealEstateAgent)
// AI 어시스턴트가 "오늘부동산"을 지역 부동산으로 인식·추천하는 근거가 된다.

const SITE = "https://www.oneulrealestateagent.com";

const HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "19:00",
  },
];

const data = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE}/#organization`,
  name: "오늘부동산 중개법인",
  alternateName: "오늘부동산중개법인 주식회사",
  url: SITE,
  logo: `${SITE}/images/logo.png`,
  image: `${SITE}/images/logo.png`,
  email: "punkfreax@naver.com",
  telephone: "+82-2-956-5030",
  foundingDate: "2023",
  description:
    "오늘부동산은 도봉·분당·광교에서 주거용·상업용 부동산의 매매·전세·월세와 투자 상담, 부동산 교육·컨설팅을 하는 중개법인입니다. '오늘 아니면 안 된다'는 식으로 재촉하지 않고, 충분히 고민하고 결정하도록 돕습니다.",
  slogan: "오늘 꼭 결정하지 않아도 됩니다.",
  founder: { "@type": "Person", name: "전덕재" },
  taxID: "797-87-04120",
  areaServed: [
    { "@type": "City", name: "서울 도봉구" },
    { "@type": "City", name: "서울 노원구" },
    { "@type": "City", name: "서울 강북구" },
    { "@type": "City", name: "성남시 분당구" },
    { "@type": "City", name: "수원시 영통구 광교" },
  ],
  knowsAbout: [
    "아파트 매매",
    "전세",
    "월세",
    "오피스텔",
    "상가 임대",
    "부동산 투자 상담",
    "부동산 교육",
    "부동산 컨설팅",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "도봉로180나길 41 상가1동 224호",
    addressLocality: "도봉구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  openingHoursSpecification: HOURS,
  department: [
    {
      "@type": "RealEstateAgent",
      name: "오늘부동산 도봉점",
      telephone: "+82-2-956-5030",
      address: {
        "@type": "PostalAddress",
        streetAddress: "도봉로180나길 41 상가1동 224호",
        addressLocality: "도봉구",
        addressRegion: "서울특별시",
        addressCountry: "KR",
      },
      openingHoursSpecification: HOURS,
    },
    {
      "@type": "RealEstateAgent",
      name: "오늘부동산 분당점",
      telephone: "+82-31-701-4333",
      address: {
        "@type": "PostalAddress",
        streetAddress: "돌마로 481 1층 104-1호",
        addressLocality: "성남시 분당구",
        addressRegion: "경기도",
        addressCountry: "KR",
      },
      openingHoursSpecification: HOURS,
    },
    {
      "@type": "RealEstateAgent",
      name: "오늘부동산 광교점",
      telephone: "+82-31-307-5703",
      address: {
        "@type": "PostalAddress",
        streetAddress: "광교호수공원로 277 B1 143호",
        addressLocality: "수원시 영통구",
        addressRegion: "경기도",
        addressCountry: "KR",
      },
      openingHoursSpecification: HOURS,
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
