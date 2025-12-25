import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { getSiteData, getActiveAnnouncements } from "@/lib/contentLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "카페 모던 | 따뜻한 커피와 모던한 공간",
    template: "%s | 카페 모던",
  },
  description: "카페 모던은 따뜻한 조명과 모던한 인테리어가 어우러진 공간에서 최상의 커피와 디저트를 제공합니다.",
  keywords: ["카페", "커피", "디저트", "케이터링", "강남", "카페모던"],
  authors: [{ name: "카페 모던" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://cafemorden.com",
    siteName: "카페 모던",
    title: "카페 모던 | 따뜻한 커피와 모던한 공간",
    description: "따뜻한 커피와 모던한 공간에서 만나는 특별한 하루",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "카페 모던",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "카페 모던 | 따뜻한 커피와 모던한 공간",
    description: "따뜻한 커피와 모던한 공간에서 만나는 특별한 하루",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasAnnouncement = getActiveAnnouncements().length > 0;
  const mainPaddingTop = hasAnnouncement ? 'pt-[104px]' : 'pt-16';
  
  return (
    <html lang="ko" className={inter.variable}>
      <body>
        <AnnouncementBar />
        <Header />
        <main className={`min-h-screen ${mainPaddingTop}`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

