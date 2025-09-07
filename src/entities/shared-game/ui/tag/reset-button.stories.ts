import type { Meta, StoryObj } from '@storybook/nextjs';

import ResetButton from './reset-button';

const meta = {
  title: 'Shared Game/ResetButton',
  component: ResetButton,
  args: { onClick: () => {} },
} satisfies Meta<typeof ResetButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
