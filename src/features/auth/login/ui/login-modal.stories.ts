import type { Meta, StoryObj } from "@storybook/react";
import { LoginModal } from "./login-modal";

const meta: Meta<typeof LoginModal> = {
  title: "Features/Auth/LoginModal",
  component: LoginModal,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
  args: {
    open: true,
  },
};
