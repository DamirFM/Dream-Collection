/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // This should be at the root level
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "dream-gallery-aws.s3.us-east-2.amazonaws.com",
    ], // List all allowed domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dream-gallery-aws.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
