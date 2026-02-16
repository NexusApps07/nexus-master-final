import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/nexus-master-final' : '',
  // assetPrefix should match basePath for GitHub Pages
  assetPrefix: isProd ? '/nexus-master-final/' : '',
  images: { 
    unoptimized: true 
  },
  // Promotion: reactCompiler is no longer under 'experimental' in v16
  reactCompiler: true, 
  typescript: { 
    ignoreBuildErrors: true 
  },
  // Note: eslint block removed as per v16 requirements
};

export default nextConfig;