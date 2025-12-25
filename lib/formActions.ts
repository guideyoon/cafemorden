"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  inquiryType: string;
  name: string;
  phone: string;
  email: string;
  visitDate?: string;
  timeSlot?: string;
  numberOfPeople?: string;
  budget?: string;
  message?: string;
  replyMethod: string;
  // Catering specific fields
  eventLocation?: string;
  eventType?: string;
  setupRequired?: string;
  equipmentNeeded?: string;
  // Honeypot
  website?: string;
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    // Honeypot check
    if (formData.website) {
      return { success: false, message: "스팸으로 감지되었습니다." };
    }

    // Validation
    if (!formData.name || !formData.phone || !formData.email) {
      return { success: false, message: "필수 항목을 모두 입력해주세요." };
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@cafemorden.com";

    // Email to admin
    const adminEmailContent = buildAdminEmail(formData);
    await resend.emails.send({
      from: "카페 모던 <noreply@cafemorden.com>",
      to: adminEmail,
      subject: `[${formData.inquiryType}] 새로운 문의가 접수되었습니다`,
      html: adminEmailContent,
    });

    // Confirmation email to user
    const userEmailContent = buildUserEmail(formData);
    await resend.emails.send({
      from: "카페 모던 <noreply@cafemorden.com>",
      to: formData.email,
      subject: "카페 모던 문의 접수 확인",
      html: userEmailContent,
    });

    return {
      success: true,
      message: "문의가 성공적으로 접수되었습니다. 확인 메일을 발송했습니다.",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

function buildAdminEmail(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B6F47; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8B6F47; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>새로운 문의가 접수되었습니다</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">문의 유형</div>
            <div class="value">${data.inquiryType}</div>
          </div>
          <div class="field">
            <div class="label">이름</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">연락처</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">이메일</div>
            <div class="value">${data.email}</div>
          </div>
          ${data.visitDate ? `
          <div class="field">
            <div class="label">방문 희망일</div>
            <div class="value">${data.visitDate}</div>
          </div>
          ` : ""}
          ${data.timeSlot ? `
          <div class="field">
            <div class="label">희망 시간대</div>
            <div class="value">${data.timeSlot}</div>
          </div>
          ` : ""}
          ${data.numberOfPeople ? `
          <div class="field">
            <div class="label">인원 수</div>
            <div class="value">${data.numberOfPeople}</div>
          </div>
          ` : ""}
          ${data.budget ? `
          <div class="field">
            <div class="label">예산 범위</div>
            <div class="value">${data.budget}</div>
          </div>
          ` : ""}
          ${data.eventLocation ? `
          <div class="field">
            <div class="label">행사 장소</div>
            <div class="value">${data.eventLocation}</div>
          </div>
          ` : ""}
          ${data.eventType ? `
          <div class="field">
            <div class="label">행사 성격</div>
            <div class="value">${data.eventType}</div>
          </div>
          ` : ""}
          ${data.setupRequired ? `
          <div class="field">
            <div class="label">세팅 필요 여부</div>
            <div class="value">${data.setupRequired}</div>
          </div>
          ` : ""}
          ${data.equipmentNeeded ? `
          <div class="field">
            <div class="label">필요 장비</div>
            <div class="value">${data.equipmentNeeded}</div>
          </div>
          ` : ""}
          ${data.message ? `
          <div class="field">
            <div class="label">요청사항</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
          ` : ""}
          <div class="field">
            <div class="label">회신 방법</div>
            <div class="value">${data.replyMethod}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildUserEmail(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B6F47; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>카페 모던</h2>
        </div>
        <div class="content">
          <p>안녕하세요, ${data.name}님</p>
          <p>카페 모던에 문의해주셔서 감사합니다.</p>
          <p>문의 내용이 정상적으로 접수되었으며, 빠른 시일 내에 연락드리겠습니다.</p>
          <p>문의 유형: <strong>${data.inquiryType}</strong></p>
          <p>감사합니다.</p>
        </div>
        <div class="footer">
          <p>카페 모던</p>
          <p>서울시 강남구 테헤란로 123</p>
          <p>02-1234-5678</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

