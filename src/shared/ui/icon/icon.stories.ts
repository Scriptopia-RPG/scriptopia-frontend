import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Shared/UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    name: {
      control: "select",
      options: ["close", "naver", "kakao", "google"],
    },
    className: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Close: Story = {
  args: {
    name: "close",
    className: "w-6 h-6",
  },
};

export const Naver: Story = {
  args: {
    name: "naver",
    className: "w-10 h-10",
  },
};

export const Kakao: Story = {
  args: {
    name: "kakao",
    className: "w-10 h-10",
  },
};

export const Google: Story = {
  args: {
    name: "google",
    className: "w-10 h-10",
  },
};
