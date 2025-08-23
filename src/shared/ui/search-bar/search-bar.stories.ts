import type { Meta, StoryObj } from '@storybook/nextjs';

import SearchBar from './search-bar';

const meta = {
  title: 'shared/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  // args: { onClick: fn() },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
