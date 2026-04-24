/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        // Apuntamos el proxy directo a tu API en Render
        destination: 'https://matchhub-backend-d3hd.onrender.com/api/v1/:path*', 
      },
    ]
  },
};

export default nextConfig;