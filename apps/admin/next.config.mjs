/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@donate/ui', '@donate/utils', '@donate/auth'],
};

export default nextConfig;
