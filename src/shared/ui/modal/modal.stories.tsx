import type { Meta, StoryObj } from '@storybook/nextjs';

import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    ariaLabelledby: { control: 'text' },
    onClose: { action: 'closed' },
    children: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ariaLabelledby: 'modal-title',
    children: (
      <div className="w-80 max-w-lg p-4">
        <h2 id="modal-title" className="mb-4 text-lg font-medium">
          모달 제목
        </h2>
        <p>모달 내용</p>
      </div>
    ),
  },
};
