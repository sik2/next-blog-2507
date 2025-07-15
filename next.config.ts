import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 시 ESLint 체크를 건너뛰기
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 에러도 무시하려면 추가
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
