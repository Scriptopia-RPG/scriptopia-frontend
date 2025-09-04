import type { Meta, StoryObj } from '@storybook/nextjs';

import SearchBar from './search-bar';

const meta = {
  title: 'shared/SearchBar',
  component: SearchBar,
  args: { value: '', onChange: () => {} },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
