import type { Meta, StoryObj } from '@storybook/nextjs';

import SocialAuth from './social-auth';

const meta = {
  title: 'auth/SocialAuth',
  component: SocialAuth,
} satisfies Meta<typeof SocialAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'login',
  },
};
