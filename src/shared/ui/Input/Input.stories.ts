import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "password", "email", "number"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "이메일",
    id: "email",
    placeholder: "이메일을 입력해주세요.",
    type: "email",
  },
};

export const Password: Story = {
  args: {
    label: "비밀번호",
    id: "password",
    placeholder: "비밀번호를 입력해주세요.",
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성",
    id: "disabled",
    placeholder: "입력할 수 없습니다.",
    disabled: true,
  },
};
