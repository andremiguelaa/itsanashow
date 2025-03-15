const withVideos = require("next-videos");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/logbook",
        destination: "/insights",
      },
      {
        source: "/logbook/:slug",
        destination: "/insights/:slug",
      },
    ];
  },
};

module.exports = withVideos(nextConfig);
