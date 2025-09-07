import type { Meta, StoryObj } from "@storybook/react";
import Logo from "./logo";

const meta: Meta<typeof Logo> = {
  title: "Shared/UI/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};
