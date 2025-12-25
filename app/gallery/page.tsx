import { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryData } from "@/lib/contentLoader";

export const metadata: Metadata = {
  title: "갤러리",
  description: "카페 모던의 따뜻하고 모던한 공간과 메뉴를 사진으로 만나보세요.",
};

export default function GalleryPage() {
  const sections = getGalleryData();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-12 text-warm-brown">
        갤러리
      </h1>
      <GalleryGrid sections={sections} />
    </div>
  );
}

