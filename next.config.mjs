/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://sentimetrics.zapier.app https://*.zapier.app https://interfaces.zapier.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
