import type { Meta, StoryObj } from '@storybook/nextjs';

import TagAddButton from './tag-add-button';

const meta = {
  title: 'Shared Game/TagAddButton',
  component: TagAddButton,
  tags: ['autodocs'],
  //   parameters: { controls: { exclude: ['onClick'] } },
} satisfies Meta<typeof TagAddButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert('clicked!'),
  },
};
