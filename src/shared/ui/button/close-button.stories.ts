import type { Meta, StoryObj } from '@storybook/nextjs';

import CloseButton from './close-button';

const meta = {
  title: 'shared/CloseButton',
  component: CloseButton,
  args: { onClick: () => {} },
} satisfies Meta<typeof CloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
