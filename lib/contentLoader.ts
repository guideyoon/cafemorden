import siteData from "@/data/site.json";
import menuData from "@/data/menu.json";
import galleryData from "@/data/gallery.json";
import cateringData from "@/data/catering.json";

export interface SiteData {
  name: string;
  tagline: string;
  intro: string;
  address: string;
  phone: string;
  instagramUrl: string;
  naverMapUrl?: string;
  googleMapUrl?: string;
  hours: {
    weekday: { open: string; close: string };
    weekend: { open: string; close: string };
    lastOrder: string;
    closedDays: string[];
  };
  parking: {
    available: boolean;
    info: string;
  };
  transit: {
    subway: string;
    bus: string;
  };
  announcements: Array<{
    title: string;
    startDate: string;
    endDate: string;
    enabled: boolean;
  }>;
}

export interface MenuItem {
  name: string;
  price: number;
  desc: string;
  options: string[];
  isSeasonal: boolean;
  isSignature: boolean;
  image?: string;
}

export interface MenuCategory {
  categoryName: string;
  items: MenuItem[];
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface GallerySection {
  title: string;
  images: GalleryImage[];
}

export interface CateringPackage {
  name: string;
  priceFrom: number;
  includes: string[];
  notes: string;
  leadTimeDays: number;
  minOrder: number;
}

export function getSiteData(): SiteData {
  return siteData as SiteData;
}

export function getMenuData(): MenuCategory[] {
  return menuData.categories as MenuCategory[];
}

export function getGalleryData(): GallerySection[] {
  return galleryData.sections as GallerySection[];
}

export function getCateringData() {
  return cateringData;
}

export function getActiveAnnouncements(): Array<{
  title: string;
  startDate: string;
  endDate: string;
}> {
  const site = getSiteData();
  const now = new Date();
  return site.announcements
    .filter((announcement) => {
      if (!announcement.enabled) return false;
      const start = new Date(announcement.startDate);
      const end = new Date(announcement.endDate);
      return now >= start && now <= end;
    })
    .map(({ title, startDate, endDate }) => ({ title, startDate, endDate }));
}

export function getSignatureItems(): MenuItem[] {
  const categories = getMenuData();
  const signatureItems: MenuItem[] = [];
  categories.forEach((category) => {
    category.items.forEach((item) => {
      if (item.isSignature) {
        signatureItems.push(item);
      }
    });
  });
  return signatureItems.slice(0, 3);
}

export function getSeasonalItems(): MenuItem[] {
  const categories = getMenuData();
  const seasonalItems: MenuItem[] = [];
  categories.forEach((category) => {
    category.items.forEach((item) => {
      if (item.isSeasonal) {
        seasonalItems.push(item);
      }
    });
  });
  return seasonalItems;
}

