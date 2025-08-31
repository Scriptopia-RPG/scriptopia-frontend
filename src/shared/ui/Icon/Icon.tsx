import { FC, SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: 'close' | 'naver' | 'kakao' | 'google';
  className?: string;
}

const svgContent: Record<IconProps['name'], string> = {
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  naver: `<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.4746 20.0002V28.889H14.5254V11.1112H25.4746V20.0002Z" fill="#03C75A"/><path d="M19.9999 15.5557L14.5253 11.1112H25.4745L19.9999 15.5557Z" fill="#03C75A"/><path d="M19.9999 15.5557L25.4745 11.1112H14.5253L19.9999 15.5557Z" fill="#03C75A"/><path d="M19.9999 24.4446L14.5253 28.889H25.4745L19.9999 24.4446Z" fill="#03C75A"/></svg>`,
  kakao: `<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FEE500"/><path d="M20.0118 12.889C15.6452 12.889 12.1113 15.8834 12.1113 19.654C12.1113 22.0346 13.553 24.0461 15.582 25.281L14.7388 28.3335L17.954 26.3589C18.6166 26.4886 19.3042 26.5557 20.0118 26.5557C24.3784 26.5557 27.9123 23.5613 27.9123 19.7907C27.9123 15.9482 24.3534 12.889 20.0118 12.889Z" fill="#191919"/></svg>`,
  google: `<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.5227 20.2216C39.5227 18.8352 39.4091 17.4886 39.1818 16.1818H20.2273V23.6705H31.3409C30.8523 26.0909 29.2727 28.125 27.0568 29.5568V34.0795H33.2955C37.2045 30.4545 39.5227 25.7841 39.5227 20.2216Z" fill="#4285F4"/><path d="M20.2273 40C25.6136 40 30.1591 38.2386 33.2955 35.5682L27.0568 31.0455C25.1136 32.3068 22.8409 33.0682 20.2273 33.0682C15.1591 33.0682 10.8523 29.7841 9.35227 25.2955H2.94318V29.8182C6.07955 35.9205 12.6136 40 20.2273 40Z" fill="#34A853"/><path d="M9.35227 23.8182C8.92045 22.5568 8.68182 21.2159 8.68182 19.8182C8.68182 18.4205 8.92045 17.0795 9.35227 15.8182V11.2955H2.94318C1.07955 14.8182 0 19.0795 0 23.8182C0 28.5568 1.07955 32.8182 2.94318 36.3409L9.35227 31.8182V23.8182Z" fill="#FBBC05"/><path d="M20.2273 8.63636C23.1477 8.63636 25.7614 9.64773 27.7955 11.5455L33.4545 5.88636C30.1477 2.82955 25.6136 0.909091 20.2273 0.909091C12.6136 0.909091 6.07955 4.72727 2.94318 9.81818L9.35227 14.3409C10.8523 9.85227 15.1591 8.63636 20.2273 8.63636Z" fill="#EA4335"/></svg>`,
};

const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  const svg = svgContent[name];

  if (!svg) {
    return null;
  }

  return (
    <span
      className={twMerge('inline-block', className)}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
};

export default Icon;