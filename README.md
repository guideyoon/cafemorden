# 카페 모던 웹사이트

카페 모던의 공식 웹사이트입니다. Next.js, TypeScript, Tailwind CSS로 제작되었습니다.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email@example.com
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트
├── data/             # JSON 데이터 파일
├── lib/              # 유틸리티 함수
└── public/           # 정적 파일 (이미지 등)
```

## 주요 기능

- ✅ 반응형 디자인 (모바일 우선)
- ✅ 메뉴 페이지 (카테고리별 분류)
- ✅ 갤러리 (라이트박스 포함)
- ✅ 케이터링 및 대관 안내
- ✅ 문의 폼 (Resend 이메일 발송)
- ✅ 오시는 길 페이지
- ✅ SEO 최적화
- ✅ 공지 배너

## 배포

Vercel에 배포하는 것을 권장합니다:

1. GitHub에 프로젝트를 푸시
2. Vercel에서 프로젝트 import
3. 환경 변수 설정
4. 배포 완료

## 이미지 준비

다음 이미지들을 `public/images/` 폴더에 준비하세요:

- `hero-1.jpg` - 히어로 이미지
- `space-1.jpg`, `space-2.jpg` - 공간 소개 이미지
- `menu/*.jpg` - 메뉴 이미지 (선택)
- `gallery/*.jpg` - 갤러리 이미지
- `og-image.jpg` - Open Graph 이미지

## 라이선스

© 2024 카페 모던. All rights reserved.

