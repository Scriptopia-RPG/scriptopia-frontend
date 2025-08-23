import type { Meta, StoryObj } from '@storybook/nextjs';

import Tag from './tag';

const meta = {
  title: 'tag/Tag',
  component: Tag,
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
  parameters: { controls: { exclude: ['onSelect', 'onRemove'] } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Removable: Story = { args: { size: 'md', selected: true, removable: true } };
export const Small: Story = { args: { size: 'sm' } };
