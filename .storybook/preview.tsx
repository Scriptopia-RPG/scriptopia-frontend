import type { Preview } from '@storybook/nextjs';
import '../app/globals.css';
import { pretendard } from '../src/shared/styles/fonts';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' },
      ],
    },
  },
};

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.dataset.theme = theme;

      return (
        // body에 붙였던 것처럼 폰트 클래스/변수를 래퍼에 적용
        <div style={pretendard.style}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
