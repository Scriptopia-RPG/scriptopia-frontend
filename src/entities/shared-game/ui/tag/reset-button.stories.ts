import type { Meta, StoryObj } from '@storybook/nextjs';

import ResetButton from './reset-button';

const meta = {
  title: 'Shared Game/ResetButton',
  component: ResetButton,
  tags: ['autodocs'],
  // args: { onClick: fn() },
} satisfies Meta<typeof ResetButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
