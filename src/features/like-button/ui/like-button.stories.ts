import type { Meta, StoryObj } from '@storybook/nextjs';

import LikeButton from './like-button';

const meta = {
  title: 'Feature/LikeButton',
  component: LikeButton,
  args: {
    likeCount: 23,
  },
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLiked: false,
  },
};
