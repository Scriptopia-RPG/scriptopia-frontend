import type { StorybookConfig } from '@storybook/nextjs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-styling-webpack',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [path.resolve(__dirname, '../public')],
  webpackFinal: async (cfg) => {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.plugins = [...(cfg.resolve.plugins ?? []), new TsconfigPathsPlugin()];

    // (보강) 혹시라도 paths 플러그인이 안 먹는 환경 대비해 alias를 같이 지정
    cfg.resolve.alias = {
      ...(cfg.resolve.alias ?? {}),
      '@icons': path.resolve(__dirname, '../public/icons'),
    };

    // 기존 이미지 rule에서 .svg 제외
    const imgRule = (cfg.module?.rules ?? []).find(
      // @ts-expect-error: webpack rule 타입에 .test가 함수라는 게 보장되지 않음
      (r) => r?.test && r.test.test && r.test.test('.svg'),
    );
    if (imgRule) {
      // @ts-expect-error: webpack rule 타입 정의에 exclude 프로퍼티가 없다고 나오지만 실제로는 존재
      imgRule.exclude = /\.svg$/i;
    }

    // SVGR 적용 (default import로 받도록 통일)
    cfg.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            exportType: 'default',
            svgo: true,
            svgoConfig: { plugins: [{ name: 'removeDimensions' }] },
          },
        },
      ],
    });

    return cfg;
  },
};
export default config;
