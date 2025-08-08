import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcss from '@tailwindcss/postcss';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['..\\public'],
  viteFinal: async (viteConfig) => {
    // TailwindCSS + PostCSS 적용
    viteConfig.css = {
      postcss: {
        plugins: [tailwindcss],
      },
    };
    return viteConfig;
  },
};
export default config;
