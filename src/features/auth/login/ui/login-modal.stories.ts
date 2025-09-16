import type { Meta, StoryObj } from '@storybook/nextjs';

import LoginModal from './login-modal';

const meta = {
  title: 'auth/LoginModal',
  component: LoginModal,
} satisfies Meta<typeof LoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
