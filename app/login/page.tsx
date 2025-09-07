import { LoginModal } from '@/features/auth/login/ui/login-modal'; // 예시: 모달이 아닌 일반 폼 컴포넌트

const LoginPage = () => {
    return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div>
        <h1 className="">로그인</h1>
        <LoginModal /> 
        </div>
    </main>
    );
};

export default LoginPage;