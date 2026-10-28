import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
};

export default createMDX({})(nextConfig);
