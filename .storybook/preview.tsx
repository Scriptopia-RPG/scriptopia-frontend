import type { Preview } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import '../src/shared/styles/globals.css';
import { pretendard } from '../src/shared/styles/fonts';
import { handlers } from '../src/shared/api/mocks/handlers';

initialize();

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

const preview: Preview = {
  tags: ['autodocs'],
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
    msw: {
      handlers: [...handlers],
    },
  },
  decorators: [
    mswDecorator,
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.dataset.theme = theme;
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <div style={pretendard.style}>
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
