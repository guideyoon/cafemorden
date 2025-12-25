"use client";

import { MapPin, Car, Train, Bus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import siteData from "@/data/site.json";

export default function LocationPageContent() {
  const copyAddress = () => {
    navigator.clipboard.writeText(siteData.address);
    alert("주소가 복사되었습니다.");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-12 text-brown">
        오시는 길
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4 text-brown flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              주소
            </h2>
            <p className="text-lg mb-4 text-text-base">{siteData.address}</p>
            <Button onClick={copyAddress}>주소 복사</Button>
            <div className="mt-4 space-y-2">
              {siteData.naverMapUrl && (
                <a
                  href={siteData.naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-brown hover:underline"
                >
                  네이버 지도로 보기 →
                </a>
              )}
              {siteData.googleMapUrl && (
                <a
                  href={siteData.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-brown hover:underline"
                >
                  구글 지도로 보기 →
                </a>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4 text-brown flex items-center gap-2">
              <Car className="w-6 h-6" />
              주차 안내
            </h2>
            {siteData.parking.available ? (
              <p className="text-lg text-text-base">{siteData.parking.info}</p>
            ) : (
              <p className="text-lg text-text-base">주차 공간이 없습니다. 대중교통을 이용해주세요.</p>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-brown flex items-center gap-2">
            <Train className="w-6 h-6" />
            대중교통 안내
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Train className="w-5 h-5 text-brown mt-1" />
              <p className="text-text-base">{siteData.transit.subway}</p>
            </div>
            <div className="flex items-start gap-3">
              <Bus className="w-5 h-5 text-brown mt-1" />
              <p className="text-text-base">{siteData.transit.bus}</p>
            </div>
          </div>
        </div>
        <div className="bg-warm-gray p-6 rounded-lg mb-8">
          <h3 className="font-bold mb-2">근처 랜드마크</h3>
          <p>강남역 도보 5분 거리</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-brown text-center">
            지도
          </h2>
          <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteData.address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="카페 모던 위치"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://maps.app.goo.gl/bGqxVgqZ1JiJeKZ6A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown hover:underline inline-flex items-center gap-2"
            >
              구글맵에서 크게 보기 →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

