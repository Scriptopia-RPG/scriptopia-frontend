import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // CORS 문제 해결을 위한 프록시 설정
  async rewrites() {
    return [
      {
        source: '/api/auth/login',
        destination: 'http://43.202.14.155/api/v1/auth/login',
      },
      {
        source: '/api/games',
        destination: 'http://43.202.14.155/api/v1/games',
      },
      {
        source: '/api/games/me',
        destination: 'http://43.202.14.155/api/v1/games/me',
      },
      {
        source: '/api/games/:gameId',
        destination: 'http://43.202.14.155/api/v1/games/:gameId',
      },
      {
        source: '/api/games/:gameId/select',
        destination: 'http://43.202.14.155/api/v1/games/:gameId/select',
      },
      {
        source: '/api/games/:gameId/progress',
        destination: 'http://43.202.14.155/api/v1/games/:gameId/progress',
      },
      {
        source: '/api/users/me/items/game',
        destination: 'http://43.202.14.155/api/v1/users/me/items/game',
      },
      {
        source: '/api/games/:gameId/history',
        destination: 'http://43.202.14.155/api/v1/games/:gameId/history',
      },
      {
        source: '/api/games/:gameId/items/purchase/:itemId',
        destination: 'http://43.202.14.155/api/v1/games/:gameId/items/purchase/:itemId',
      },
      {
        source: '/api/games/:gameId/items/sell/:itemId',
        destination: 'http://43.202.14.155/api/v1/games/:gameId/items/sell/:itemId',
      },
      {
        source: '/api/games/dropItem/:gameId/:itemId',
        destination: 'http://43.202.14.155/api/v1/games/dropItem/:gameId/:itemId',
      },
      {
        source: '/api/games/equipItem/:gameId/:itemId',
        destination: 'http://43.202.14.155/api/v1/games/equipItem/:gameId/:itemId',
      },
      // 경매장 관련 API
      {
        source: '/api/trades',
        destination: 'http://43.202.14.155/api/v1/trades',
      },
      {
        source: '/api/trades/me',
        destination: 'http://43.202.14.155/api/v1/trades/me',
      },
      {
        source: '/api/trades/history/me',
        destination: 'http://43.202.14.155/api/v1/trades/history/me',
      },
      {
        source: '/api/trades/:auctionId/purchase',
        destination: 'http://43.202.14.155/api/v1/trades/:auctionId/purchase',
      },
      {
        source: '/api/trades/:auctionId/receive',
        destination: 'http://43.202.14.155/api/v1/trades/:auctionId/receive',
      },
      {
        source: '/api/trades/:auctionId',
        destination: 'http://43.202.14.155/api/v1/trades/:auctionId',
      },
      // 사용자 재화 조회 API
      {
        source: '/api/users/me/assets',
        destination: 'http://43.202.14.155/api/v1/users/me/assets',
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  turbopack: {
    // SVGR 로더 (Turbopack용)
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { typescript: true, ext: 'tsx' },
          },
        ],
        as: '*.js',
      },
    },
    resolveAlias: { '@': './src', '@public': './public', '@icons': './public/icons' },
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  // (선택) Webpack 모드에서만 쓰이는 설정: Turbopack 모드에선 무시됨
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    if (fileLoaderRule) {
      config.module.rules.push(
        { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
          use: [{ loader: '@svgr/webpack', options: { typescript: true, ext: 'tsx' } }],
        },
      );
      fileLoaderRule.exclude = /\.svg$/i;
    } else {
      // Fallback: 최소 SVGR 규칙만 추가
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [{ loader: '@svgr/webpack', options: { typescript: true } }],
      });
    }

    return config;
  },
};

export default nextConfig;
