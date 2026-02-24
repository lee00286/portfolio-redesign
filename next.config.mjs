/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  },
  async headers() {
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";

    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          scriptSrc,
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://*.supabase.co",
          "font-src 'self'",
          "connect-src 'self' https://*.supabase.co",
          "frame-ancestors 'none'"
        ].join('; ')
      }
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders
      },
      {
        source: '/admin/:path*',
        headers: [...securityHeaders, { key: 'X-Frame-Options', value: 'DENY' }]
      },
      {
        source: '/api/admin/:path*',
        headers: [...securityHeaders, { key: 'X-Frame-Options', value: 'DENY' }]
      }
    ];
  }
};

export default nextConfig;
