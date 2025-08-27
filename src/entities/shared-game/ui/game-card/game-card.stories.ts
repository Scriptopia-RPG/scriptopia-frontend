import type { Meta, StoryObj } from '@storybook/nextjs';

import GameCard from './game-card';

const meta = {
  title: 'Shared Game/GameCard',
  component: GameCard,
  tags: ['autodocs'],
  args: {
    thumbnail: '',
    title: '멸망한 왕국의 마지막 검',
    tags: ['판타지', '용사', '생존', '아포칼립스'],
  },
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
