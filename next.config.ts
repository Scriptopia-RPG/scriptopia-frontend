import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
