import { CateringPackage } from "@/lib/contentLoader";

interface CateringPackagesProps {
  packages: CateringPackage[];
}

export default function CateringPackages({ packages }: CateringPackagesProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {packages.map((pkg, index) => (
        <div key={index} className="bg-white border-2 border-warm-gray rounded-lg p-6">
          <h3 className="text-2xl font-serif font-bold mb-4 text-warm-brown">
            {pkg.name}
          </h3>
          <p className="text-2xl font-bold mb-4 text-warm-terra">
            {pkg.priceFrom.toLocaleString()}원부터
          </p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">포함 사항:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              {pkg.includes.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p>• 최소 주문: {pkg.minOrder.toLocaleString()}원</p>
            <p>• 준비 기간: {pkg.leadTimeDays}일</p>
          </div>
          {pkg.notes && (
            <p className="text-xs text-gray-500 italic">{pkg.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}

