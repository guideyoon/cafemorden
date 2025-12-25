"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import siteData from "@/data/site.json";
import { getActiveAnnouncements } from "@/lib/contentLoader";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasAnnouncement = getActiveAnnouncements().length > 0;

  const navItems = [
    { href: "/", label: "홈" },
    { href: "/menu", label: "메뉴" },
    { href: "/gallery", label: "갤러리" },
    { href: "/catering", label: "케이터링" },
    { href: "/location", label: "오시는 길" },
  ];

  return (
    <header className={`fixed left-0 right-0 z-40 bg-cream-light border-b border-gray-200 ${hasAnnouncement ? 'top-10' : 'top-0'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-serif font-bold text-brown">
            {siteData.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-base hover:text-brown transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <a
              href={`tel:${siteData.phone}`}
              className="text-brown"
              aria-label="전화하기"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-base"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4 bg-brown">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-cream-light transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

