
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, open, onClose }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              >
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Modal;
