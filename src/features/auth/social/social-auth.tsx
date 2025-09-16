import NaverIcon from '@icons/naver.svg';
import KakaoIcon from '@icons/kakao.svg';
import GoogleIcon from '@icons/google.svg';

interface SocialAuthProps {
  mode: 'login' | 'signup';
}

const SocialAuth = ({ mode }: SocialAuthProps) => {
  const label = mode === 'login' ? '로그인' : '회원가입';

  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-bg px-3 text-sm text-gray-400">간편 {label}</span>
        </div>
      </div>

      <div className="flex justify-center gap-x-4">
        <button type="button" aria-label={`네이버로 ${label}`}>
          <NaverIcon className="h-10 w-10" />
        </button>
        <button type="button" aria-label={`카카오로 ${label}`}>
          <KakaoIcon className="h-10 w-10" />
        </button>
        <button type="button" aria-label={`구글로 ${label}`}>
          <GoogleIcon className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
