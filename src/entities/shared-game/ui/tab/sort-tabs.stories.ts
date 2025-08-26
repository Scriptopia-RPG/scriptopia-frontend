import type { Meta, StoryObj } from '@storybook/nextjs';

import SortTabs from './sort-tabs';

const meta = {
  title: 'explore/SortTabs',
  component: SortTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof SortTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
