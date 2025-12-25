"use client";

import { useState, FormEvent } from "react";
import { submitContactForm, ContactFormData } from "@/lib/formActions";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  defaultInquiryType?: string;
}

export default function ContactForm({ defaultInquiryType = "일반 문의" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    inquiryType: defaultInquiryType,
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    timeSlot: "",
    numberOfPeople: "",
    budget: "",
    message: "",
    replyMethod: "전화",
    eventLocation: "",
    eventType: "",
    setupRequired: "",
    equipmentNeeded: "",
    website: "", // Honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const isCateringOrEvent =
    formData.inquiryType === "케이터링" || formData.inquiryType === "대관";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitContactForm(formData);
      setSubmitStatus(result);
      if (result.success) {
        // Reset form
        setFormData({
          inquiryType: defaultInquiryType,
          name: "",
          phone: "",
          email: "",
          visitDate: "",
          timeSlot: "",
          numberOfPeople: "",
          budget: "",
          message: "",
          replyMethod: "전화",
          eventLocation: "",
          eventType: "",
          setupRequired: "",
          equipmentNeeded: "",
          website: "",
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus?.success) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          문의가 접수되었습니다
        </h2>
        <p className="text-green-700 mb-4">{submitStatus.message}</p>
        <Button onClick={() => setSubmitStatus(null)} variant="outline">
          새 문의 작성하기
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitStatus && !submitStatus.success && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700">
          {submitStatus.message}
        </div>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="inquiryType" className="block font-semibold mb-2">
          문의 유형 <span className="text-red-500">*</span>
        </label>
        <select
          id="inquiryType"
          value={formData.inquiryType}
          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
          required
        >
          <option value="일반 문의">일반 문의</option>
          <option value="케이터링">케이터링</option>
          <option value="대관">대관</option>
          <option value="예약">예약</option>
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block font-semibold mb-2">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-semibold mb-2">
          연락처 (휴대폰) <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold mb-2">
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
          required
        />
      </div>

      <div>
        <label htmlFor="visitDate" className="block font-semibold mb-2">
          {isCateringOrEvent ? "행사일" : "방문 희망일"}
        </label>
        <input
          type="date"
          id="visitDate"
          value={formData.visitDate}
          onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
        />
      </div>

      <div>
        <label htmlFor="timeSlot" className="block font-semibold mb-2">
          희망 시간대
        </label>
        <input
          type="text"
          id="timeSlot"
          value={formData.timeSlot}
          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
          placeholder="예: 오후 2시 ~ 4시"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
        />
      </div>

      <div>
        <label htmlFor="numberOfPeople" className="block font-semibold mb-2">
          {isCateringOrEvent ? "예상 인원 수" : "인원 수"}
        </label>
        <input
          type="text"
          id="numberOfPeople"
          value={formData.numberOfPeople}
          onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block font-semibold mb-2">
          예산 범위
        </label>
        <select
          id="budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
        >
          <option value="">선택해주세요</option>
          <option value="50만원 미만">50만원 미만</option>
          <option value="50만원 ~ 100만원">50만원 ~ 100만원</option>
          <option value="100만원 ~ 200만원">100만원 ~ 200만원</option>
          <option value="200만원 이상">200만원 이상</option>
        </select>
      </div>

      {isCateringOrEvent && (
        <>
          <div>
            <label htmlFor="eventLocation" className="block font-semibold mb-2">
              행사 장소 주소
            </label>
            <input
              type="text"
              id="eventLocation"
              value={formData.eventLocation}
              onChange={(e) =>
                setFormData({ ...formData, eventLocation: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
            />
          </div>

          <div>
            <label htmlFor="eventType" className="block font-semibold mb-2">
              행사 성격
            </label>
            <select
              id="eventType"
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
            >
              <option value="">선택해주세요</option>
              <option value="기업 행사">기업 행사</option>
              <option value="생일 모임">생일 모임</option>
              <option value="촬영">촬영</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label htmlFor="setupRequired" className="block font-semibold mb-2">
              세팅 필요 여부
            </label>
            <select
              id="setupRequired"
              value={formData.setupRequired}
              onChange={(e) =>
                setFormData({ ...formData, setupRequired: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
            >
              <option value="">선택해주세요</option>
              <option value="필요함">필요함</option>
              <option value="불필요">불필요</option>
            </select>
          </div>

          <div>
            <label htmlFor="equipmentNeeded" className="block font-semibold mb-2">
              필요 장비 (장비, 테이블, 컵 등)
            </label>
            <input
              type="text"
              id="equipmentNeeded"
              value={formData.equipmentNeeded}
              onChange={(e) =>
                setFormData({ ...formData, equipmentNeeded: e.target.value })
              }
              placeholder="예: 테이블 5개, 컵 100개"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="block font-semibold mb-2">
          원하는 메뉴 또는 요청사항
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
        />
      </div>

      <div>
        <label htmlFor="replyMethod" className="block font-semibold mb-2">
          회신 방법 <span className="text-red-500">*</span>
        </label>
        <select
          id="replyMethod"
          value={formData.replyMethod}
          onChange={(e) => setFormData({ ...formData, replyMethod: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-warm-brown"
          required
        >
          <option value="전화">전화</option>
          <option value="문자">문자</option>
          <option value="이메일">이메일</option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="privacy"
          required
          className="mt-1"
        />
        <label htmlFor="privacy" className="text-sm text-gray-700">
          개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "전송 중..." : "문의하기"}
      </Button>
    </form>
  );
}

