import Image from "next/image";

export default function SpaceSection() {
  return (
    <section className="py-16 bg-warm-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-8 text-warm-brown">
            공간 소개
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            따뜻한 조명과 모던한 인테리어가 어우러진 카페 모던의 공간에서
            편안하게 커피 한 잔의 여유를 즐겨보세요.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/space-1.jpg"
                alt="카페 모던 실내 공간"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/space-2.jpg"
                alt="카페 모던 좌석 공간"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

