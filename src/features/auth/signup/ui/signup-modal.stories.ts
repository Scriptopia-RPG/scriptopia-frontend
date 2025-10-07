import type { Meta, StoryObj } from '@storybook/nextjs';

import SignupModal from './signup-modal';

const meta = {
  title: 'auth/SignupModal',
  component: SignupModal,
} satisfies Meta<typeof SignupModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
