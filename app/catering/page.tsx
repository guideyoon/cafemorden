import { Metadata } from "next";
import CateringPackages from "@/components/CateringPackages";
import { getCateringData } from "@/lib/contentLoader";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "케이터링 및 대관",
  description: "카페 모던의 케이터링 및 대관 서비스를 확인하고 문의하세요.",
};

export default function CateringPage() {
  const cateringData = getCateringData();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8 text-brown">
        케이터링 및 대관
      </h1>
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-center text-text-base mb-8">
          {cateringData.intro}
        </p>
        <div className="bg-warm-gray p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-brown">
            서비스 안내
          </h2>
          <ul className="space-y-2 mb-4">
            <li>• 가능 인원: {cateringData.capacity.min}명 ~ {cateringData.capacity.max}명</li>
            <li>• 최소 주문 금액: {cateringData.minOrder.toLocaleString()}원</li>
            <li>• 준비 기간: 최소 {cateringData.leadTime.min}일 전 문의</li>
          </ul>
          <div className="mt-4">
            <h3 className="font-bold mb-2">제공 서비스:</h3>
            <ul className="space-y-1">
              {cateringData.services.map((service, index) => (
                <li key={index}>• {service}</li>
              ))}
            </ul>
          </div>
        </div>
        {cateringData.formTips && cateringData.formTips.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <h3 className="font-bold mb-2">문의 시 참고사항</h3>
            <ul className="space-y-1 text-sm">
              {cateringData.formTips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <CateringPackages packages={cateringData.packages} />
      <div className="text-center mt-12">
        <Link href="/contact?type=케이터링">
          <Button size="lg">케이터링 문의하기</Button>
        </Link>
      </div>
    </div>
  );
}

