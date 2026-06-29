/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/inspector', destination: '/inspector.html' },
      { source: '/inspector/agent', destination: '/inspector/agent.html' },
      { source: '/inspector/redteam', destination: '/inspector/redteam.html' },
      { source: '/eval-coop-paper', destination: '/eval-coop-paper.pdf' },
      { source: '/warp-paper', destination: '/warp-paper.pdf' },
    ];
  },
};

export default nextConfig;
