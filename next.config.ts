import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Skip static generation for auth routes
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      }
    ]

  },

  webpack: (config) => {
    // Windows-specific fixes for file system permissions
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        // Windows-specific protected directories
        '**/AppData/**',
        '**/Cookies/**',
        '**/$Recycle.Bin/**',
        '**/System Volume Information/**',
      ],
    };

    // Prevent webpack from following symlinks (common Windows issue)
    config.resolve = {
      ...config.resolve,
      symlinks: false,
    };

    // Add Windows-specific snapshot options to prevent permission errors
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [
        path.resolve(process.cwd(), 'node_modules'),
      ],
      immutablePaths: [],
      // Exclude Prisma generated files from snapshot
      buildDependencies: {
        hash: true,
        timestamp: true,
      },
    };

    return config;
  },
};

export default nextConfig;