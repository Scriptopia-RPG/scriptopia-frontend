import type { Meta, StoryObj } from '@storybook/nextjs';

import GameCard from './game-card';

const meta = {
  title: 'Shared Game/GameCard',
  component: GameCard,
  args: {
    sharedGameUuid: '1',
    thumbnailUrl: '',
    title: '멸망한 왕국의 마지막 검',
    playCount: 12635,
    tags: [
      { tagId: 1, tagName: '판타지' },
      { tagId: 2, tagName: '용사' },
    ],
  },
} satisfies Meta<typeof GameCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
