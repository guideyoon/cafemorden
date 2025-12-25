import { Metadata } from "next";
import LocationPageContent from "@/components/LocationPageContent";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "카페 모던의 위치와 주차, 대중교통 안내를 확인하세요.",
};

export default function LocationPage() {
  return <LocationPageContent />;
}

