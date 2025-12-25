import { Metadata } from "next";
import MenuSection from "@/components/MenuSection";
import { getMenuData, getSeasonalItems } from "@/lib/contentLoader";

export const metadata: Metadata = {
  title: "메뉴",
  description: "카페 모던의 다양한 커피, 음료, 디저트 메뉴를 확인하세요.",
};

export default function MenuPage() {
  const categories = getMenuData();
  const seasonalItems = getSeasonalItems();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-12 text-brown">
        메뉴
      </h1>
      <MenuSection categories={categories} seasonalItems={seasonalItems} />
    </div>
  );
}

