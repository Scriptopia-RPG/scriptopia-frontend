import { ReactNode } from 'react';

interface ExploreLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const ExploreLayout = ({ children, modal }: ExploreLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default ExploreLayout;
