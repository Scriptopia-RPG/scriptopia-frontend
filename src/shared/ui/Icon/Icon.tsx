import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: 'close' | 'naver' | 'kakao' | 'google';
  className?: string;
}

const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  const getIconSrc = (iconName: IconProps['name']) => {
    switch (iconName) {
      case 'close':
        return '/icons/close.svg';
      case 'naver':
        return '/icons/naver.svg';
      case 'kakao':
        return '/icons/kakao.svg';
      case 'google':
        return '/icons/google.svg';
      default:
        return '';
    }
  };

  const iconSrc = getIconSrc(name);

  if (!iconSrc) {
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={`${name} icon`}
      className={twMerge('inline-block', className)}
      {...props}
    />
  );
};

export default Icon;