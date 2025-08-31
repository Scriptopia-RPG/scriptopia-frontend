
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <h1 className={twMerge('font-mono text-4xl font-bold text-orange-500 tracking-wider', className)}>
      SCRIPTOPIA
    </h1>
  );
};

export default Logo;
