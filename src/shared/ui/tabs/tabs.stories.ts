import type { Meta, StoryObj } from '@storybook/nextjs';

import Tabs from './tabs';
import { SORT_OPTIONS } from '@/entities/shared-game/model/shared-game.constant';

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
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
