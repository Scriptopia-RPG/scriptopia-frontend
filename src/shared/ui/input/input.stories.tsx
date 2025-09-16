import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from './input';
import { useArgs } from 'storybook/internal/preview-api';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'number'] },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
  args: {
    value: '',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const RenderControlled = (args: Story['args']) => {
  const [{ value }, updateArgs] = useArgs();
  return (
    <Input
      label=""
      {...args}
      value={value ?? ''}
      onChange={(e) => updateArgs({ value: e.target.value })}
    />
  );
};

export const Email: Story = {
  args: {
    label: '이메일',
    id: 'email',
    placeholder: '이메일을 입력해 주세요.',
    type: 'email',
  },
  render: RenderControlled,
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    id: 'password',
    placeholder: '비밀번호를 입력해주 세요.',
    type: 'password',
  },
  render: RenderControlled,
};

export const Disabled: Story = {
  args: {
    label: '비활성',
    id: 'disabled',
    placeholder: '입력할 수 없습니다.',
    disabled: true,
  },
  render: RenderControlled,
};
