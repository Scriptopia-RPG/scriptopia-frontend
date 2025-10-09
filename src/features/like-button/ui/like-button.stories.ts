import type { Meta, StoryObj } from '@storybook/nextjs';

import LikeButton from './like-button';

const meta = {
  title: 'Feature/LikeButton',
  component: LikeButton,
  args: {
    sharedGameUuid: '1',
    likeCount: 23,
  },
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    isLiked: false,
  },
};

export const On: Story = {
  args: {
    isLiked: true,
  },
};
