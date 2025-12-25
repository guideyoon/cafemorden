import { getSignatureItems } from "@/lib/contentLoader";
import Image from "next/image";

export default function SignatureSection() {
  const signatureItems = getSignatureItems();

  return (
    <section className="py-16 bg-cream-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-brown">
          시그니처 메뉴
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {signatureItems.map((item, index) => (
            <div key={index} className="bg-warm-gray rounded-lg overflow-hidden">
              {item.image && (
                <div className="relative h-64 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-brown">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold mb-2 text-text-heading">
                  {item.price.toLocaleString()}원
                </p>
                <p className="text-text-base text-sm">{item.desc}</p>
                {item.options.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    옵션: {item.options.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

