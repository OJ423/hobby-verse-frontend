/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_UNSPLASH_API_KEY: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
    NEXT_PUBLIC_UNSPLASH_SECRET: process.env.NEXT_PUBLIC_UNSPLASH_SECRET,
    NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    NEXT_PUBLIC_IMAGE_HOST: process.env.NEXT_PUBLIC_IMAGE_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
