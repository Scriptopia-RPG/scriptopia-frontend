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
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiPjwvbGluZT48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+';
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