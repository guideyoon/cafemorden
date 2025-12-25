import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: "#FAF8F5", // 연한 크림색 배경
          base: "#F5F3F0", // 베이지 배경
        },
        text: {
          base: "#4A4A4A", // 기본 텍스트 - 짙은 회색
          heading: "#2C2C2C", // 제목 텍스트 - 더 진한 회색
        },
        brown: {
          DEFAULT: "#8B6F47", // 포인트 컬러 - 브라운 계열
        },
        warm: {
          gray: "#F5F3F0", // 보조 배경 - 연한 웜 그레이
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

