import type { Meta, StoryObj } from '@storybook/nextjs';

import Button from './button';

const meta = {
  title: 'shared/Button',
  component: Button,
  args: { onClick: () => {} },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '검색하기',
  },
};