import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 시 ESLint 체크를 건너뛰기
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
