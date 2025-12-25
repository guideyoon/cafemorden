"use client";

import { getSiteData } from "@/lib/contentLoader";
import { Clock } from "lucide-react";

export default function TodayHours() {
  const siteData = getSiteData();
  const today = new Date();
  const dayOfWeek = today.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const hours = isWeekend ? siteData.hours.weekend : siteData.hours.weekday;

  const getCurrentStatus = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const openTime = hours.open;
    const closeTime = hours.close;

    if (currentTime >= openTime && currentTime < closeTime) {
      return { status: "영업 중", color: "text-green-600" };
    } else {
      return { status: "영업 종료", color: "text-gray-500" };
    }
  };

  const status = getCurrentStatus();

  return (
    <section className="py-12 bg-cream-light">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-warm-gray p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-brown" />
            <h2 className="text-2xl font-serif font-bold text-brown">
              오늘 영업 정보
            </h2>
          </div>
          <div className="space-y-2">
            <p className={`text-lg font-semibold ${status.color}`}>
              {status.status}
            </p>
            <p className="text-text-base">
              {isWeekend ? "주말" : "평일"}: {hours.open} - {hours.close}
            </p>
            <p className="text-sm text-gray-600">
              라스트오더: {siteData.hours.lastOrder}
            </p>
            {siteData.hours.closedDays.length > 0 && (
              <p className="text-sm text-gray-600">
                휴무일: {siteData.hours.closedDays.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

