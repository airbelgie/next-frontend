import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      new URL(
        "https://imgproc.airliners.net/photos/airliners/1/3/3/4534331.jpg?v=v4b0f91a7af8",
      ),
    ],
  },
};

export default nextConfig;
