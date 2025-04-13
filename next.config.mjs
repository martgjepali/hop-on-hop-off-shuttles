/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  images: {
    loader: "custom",
    loaderFile: "./ImageLoader.js",
    unoptimized: true,
    domains: ["api.kmgshuttles.al"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.kmgshuttles.al",
        pathname: "/lines/uploads/**",
      },
    ],
  },
};

export default nextConfig;
