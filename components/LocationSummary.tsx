import siteData from "@/data/site.json";
import Link from "next/link";
import { MapPin, Car, Train } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LocationSummary() {

  return (
    <section className="py-16 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-8 text-brown">
            오시는 길
          </h2>
          <div className="bg-warm-gray p-8 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brown mt-1" />
              <div>
                <p className="font-semibold mb-1 text-text-heading">주소</p>
                <p className="text-text-base">{siteData.address}</p>
              </div>
            </div>
            {siteData.parking.available && (
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-brown mt-1" />
                <div>
                  <p className="font-semibold mb-1 text-text-heading">주차</p>
                  <p className="text-text-base">{siteData.parking.info}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Train className="w-5 h-5 text-brown mt-1" />
              <div>
                <p className="font-semibold mb-1 text-text-heading">대중교통</p>
                <p className="text-text-base">{siteData.transit.subway}</p>
                <p className="text-text-base">{siteData.transit.bus}</p>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/location">
                <Button variant="outline">자세한 위치 보기</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

