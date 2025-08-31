
import { Icon } from '@/shared/ui/Icon';

export function SocialLoginButtons() {
  return (
    <div className="space-y-4">
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                    간편 로그인
                </span>
            </div>
        </div>
        <div className="flex justify-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Icon name="naver" className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Icon name="kakao" className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Icon name="google" className="w-6 h-6" />
            </button>
        </div>
    </div>
  );
}
