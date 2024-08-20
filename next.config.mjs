/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "onnxruntime-node",
      "tiktoken",
      "@xenova/transformers",
    ],
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm"],
    },
  },
};

export default nextConfig;
