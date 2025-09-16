import { ReactNode } from 'react';

interface ModalProps {
  ariaLabelledby?: string;
  onClose?: () => void;
  children: ReactNode;
}

const Modal = ({ ariaLabelledby, onClose, children }: ModalProps) => {
  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby={ariaLabelledby}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg relative z-40 mx-4 w-full max-w-sm rounded-2xl"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
