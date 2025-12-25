"use client";

import { useState } from "react";
import { MenuCategory, MenuItem } from "@/lib/contentLoader";

interface MenuSectionProps {
  categories: MenuCategory[];
  seasonalItems: MenuItem[];
}

export default function MenuSection({ categories, seasonalItems }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter out seasonal category from main categories
  const mainCategories = categories.filter(
    (cat) => cat.categoryName !== "시즌"
  );

  return (
    <div>
      {/* Seasonal Menu Section */}
      {seasonalItems.length > 0 && (
        <div className="mb-12 bg-warm-terra/10 p-6 rounded-lg border-2 border-warm-terra">
          <h2 className="text-2xl font-serif font-bold mb-6 text-warm-terra">
            시즌 메뉴
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {seasonalItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="text-lg font-bold text-warm-brown">
                    {item.price.toLocaleString()}원
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.desc}</p>
                {item.options.length > 0 && (
                  <p className="text-xs text-gray-500">
                    옵션: {item.options.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === null
              ? "bg-warm-brown text-white"
              : "bg-warm-gray text-gray-700 hover:bg-gray-200"
          }`}
        >
          전체
        </button>
        {mainCategories.map((category) => (
          <button
            key={category.categoryName}
            onClick={() => setActiveCategory(category.categoryName)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category.categoryName
                ? "bg-warm-brown text-white"
                : "bg-warm-gray text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-12">
        {mainCategories
          .filter(
            (category) =>
              activeCategory === null || activeCategory === category.categoryName
          )
          .map((category) => (
            <div key={category.categoryName}>
              <h2 className="text-2xl font-serif font-bold mb-6 text-warm-brown">
                {category.categoryName}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {category.items.map((item, index) => (
                  <div key={index} className="bg-warm-gray p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="text-lg font-bold text-warm-brown">
                        {item.price.toLocaleString()}원
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.desc}</p>
                    {item.options.length > 0 && (
                      <p className="text-xs text-gray-500">
                        옵션: {item.options.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

