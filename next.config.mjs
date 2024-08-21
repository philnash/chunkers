/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["onnxruntime-node", "tiktoken"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm"],
    },
    serverActions: {
      allowedOrigins: ["localhost:3000", "blf6rb8p-3000.uks1.devtunnels.ms"],
    },
  },
};

export default nextConfig;
