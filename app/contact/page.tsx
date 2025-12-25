import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "문의 및 예약",
  description: "카페 모던에 문의하거나 예약을 신청하세요.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const defaultType = searchParams.type || "일반 문의";

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-12 text-brown">
        문의 및 예약
      </h1>
      <div className="max-w-2xl mx-auto">
        <ContactForm defaultInquiryType={defaultType} />
      </div>
    </div>
  );
}

