import type { Meta, StoryObj } from '@storybook/nextjs';

import Tabs from './tabs';
import { SORT_OPTIONS } from '@/entities/shared-game/model/constants';

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    options: SORT_OPTIONS,
    current: SORT_OPTIONS[0].key,
    onChange: () => {},
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
