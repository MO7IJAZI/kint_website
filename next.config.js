const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['prisma', '@prisma/client', 'bcryptjs', 'mysql2'],

  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    optimizeCss: false,
    optimizeServerReact: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'kint-group.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
        prisma: 'commonjs prisma',
        bcryptjs: 'commonjs bcryptjs',
        mysql2: 'commonjs mysql2',
      });

      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
