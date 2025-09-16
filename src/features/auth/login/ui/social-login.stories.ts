import type { Meta, StoryObj } from '@storybook/nextjs';

import SocialLogin from './social-login';

const meta = {
  title: 'auth/SocialLogin',
  component: SocialLogin,
} satisfies Meta<typeof SocialLogin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
