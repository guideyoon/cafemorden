import Link from "next/link";
import { Coffee, Utensils, MapPin } from "lucide-react";

const ctaItems = [
  { href: "/menu", label: "메뉴 보기", icon: Coffee },
  { href: "/location", label: "위치 보기", icon: MapPin },
  { href: "/catering", label: "케이터링", icon: Utensils },
];

export default function CTASection() {
  return (
    <section className="py-16 bg-warm-gray">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {ctaItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-warm-brown" />
                  <p className="font-medium text-gray-700">{item.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

