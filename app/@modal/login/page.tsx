'use client'; 

import { LoginModal } from '@/features/auth/login/ui/login-modal';
import { useRouter } from 'next/navigation';

const LoginModalPage = () => {
    const router = useRouter();

    const handleOpenChange = (open: boolean) => {
    if (!open) {
        router.back();
    }
};

    return (
        <LoginModal open={true} onOpenChange={handleOpenChange} />
    );
};

export default LoginModalPage;