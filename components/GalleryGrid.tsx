"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GallerySection } from "@/lib/contentLoader";

interface GalleryGridProps {
  sections: GallerySection[];
}

export default function GalleryGrid({ sections }: GalleryGridProps) {
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const allImages = sections.flatMap((section) => section.images);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {allImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setLightboxImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="닫기"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

