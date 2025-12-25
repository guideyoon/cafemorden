import Link from "next/link";
import { Phone, Instagram, MapPin } from "lucide-react";
import siteData from "@/data/site.json";

export default function Footer() {
  return (
    <footer className="bg-warm-gray border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-brown mb-4">
              {siteData.name}
            </h3>
            <p className="text-text-base">{siteData.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-brown">연락처</h4>
            <div className="space-y-2">
              <a
                href={`tel:${siteData.phone}`}
                className="flex items-center gap-2 text-text-base hover:text-brown transition-colors"
              >
                <Phone className="w-4 h-4" />
                {siteData.phone}
              </a>
              <a
                href={siteData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-base hover:text-brown transition-colors"
              >
                <Instagram className="w-4 h-4" />
                인스타그램
              </a>
              <Link
                href="/location"
                className="flex items-center gap-2 text-text-base hover:text-brown transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {siteData.address}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-brown">영업시간</h4>
            <div className="space-y-1 text-text-base">
              <p>평일: {siteData.hours.weekday.open} - {siteData.hours.weekday.close}</p>
              <p>주말: {siteData.hours.weekend.open} - {siteData.hours.weekend.close}</p>
              <p className="text-sm">라스트오더: {siteData.hours.lastOrder}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8 text-center text-text-base text-sm">
          <p>&copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

