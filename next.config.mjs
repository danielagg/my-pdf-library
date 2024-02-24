/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   config.externals.push({ canvas: "commonjs canvas" });
  //   return config;
  // },
  // future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
