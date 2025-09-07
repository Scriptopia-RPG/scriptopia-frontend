import type { FC, ImgHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type IconName = 'close' | 'naver' | 'kakao' | 'google';
const ICON_SRC: Record<IconName, string> = {
  close: '/icons/close.svg',
  naver: '/icons/naver.svg',
  kakao: '/icons/kakao.svg',
  google: '/icons/google.svg',
};

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  className?: string;
}

const Icon: FC<IconProps> = ({
    name,
    className,
    alt,
    width = 24,
    height = 24,
    ...props
  }) => {
    const src = ICON_SRC[name];
    return (
      <img
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        className={twMerge('inline-block', className)}
        draggable={props.draggable ?? false}
        {...props}
      />
    );
  };

export default Icon;