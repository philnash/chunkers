/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["onnxruntime-node"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm"],
    },
  },
};

export default nextConfig;
