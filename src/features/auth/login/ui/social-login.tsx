import NaverIcon from '@icons/naver.svg';
import KakaoIcon from '@icons/kakao.svg';
import GoogleIcon from '@icons/google.svg';

const SocialLogin = () => {
  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-bg px-3 text-sm text-gray-400">간편 로그인</span>
        </div>
      </div>

      <div className="flex justify-center gap-x-4">
        <button type="button" aria-label="네이버로 로그인">
          <NaverIcon className="h-10 w-10" />
        </button>
        <button type="button" aria-label="카카오로 로그인">
          <KakaoIcon className="h-10 w-10" />
        </button>
        <button type="button" aria-label="구글로 로그인">
          <GoogleIcon className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
