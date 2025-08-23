import type { Meta, StoryObj } from '@storybook/nextjs';

import Chip from './chip';

const meta = {
  title: 'entities/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md'],
    },
    selected: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
  args: {
    name: '판타지',
    size: 'md',
    selected: false,
    removable: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Removable: Story = { args: { size: 'md', selected: true, removable: true } };
export const Small: Story = { args: { size: 'sm' } };
