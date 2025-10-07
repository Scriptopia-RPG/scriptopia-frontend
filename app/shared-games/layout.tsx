import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
