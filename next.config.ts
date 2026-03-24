/* eslint-disable @typescript-eslint/no-explicit-any */
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "liveblocks.io",
      port: "",
      pathname: "/avatars/**",
    },
  ],
 },
  // Configuration for Webpack (used during production build with `next build`)
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Add the @svgr/webpack loader rule
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
      issuer: {
        and: [/\.(js|ts|tsx|mdx)$/], // apply only to JS/TS/MDX files
      },
    });

    return config;
  },
};

export default nextConfig;
