import type { Meta, StoryObj } from '@storybook/nextjs';

import TagAddButton from './tag-add-button';

const meta = {
  title: 'Shared Game/TagAddButton',
  component: TagAddButton,
  args: { onClick: () => {} },
} satisfies Meta<typeof TagAddButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
