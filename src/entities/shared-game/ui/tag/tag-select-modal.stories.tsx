import type { Meta, StoryObj } from '@storybook/nextjs';

import { useState } from 'react';

import TagSelectModal from './tag-select-modal';
import TagAddButton from './tag-add-button';

const meta: Meta<typeof TagSelectModal> = {
  title: 'Shared Game/TagSelectModal',
  component: TagSelectModal,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    initialSelected: [1, 3, 12],
    onClose: () => {},
  },
};

const PlaygroundWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <TagAddButton onClick={() => setIsOpen(true)} />
      <TagSelectModal isOpen={isOpen} initialSelected={[1, 3]} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Playground: Story = {
  render: () => <PlaygroundWrapper />,
};
