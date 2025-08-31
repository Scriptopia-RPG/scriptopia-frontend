"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { tv, VariantProps } from "tailwind-variants";
import { Button } from "@/shared/ui/Button/Button";
import Icon from "@/shared/ui/Icon/Icon";
import Logo from "@/shared/ui/Logo/Logo";

const loginModalVariants = tv({
  slots: {
    overlay: "fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    content: "fixed left-1/2 top-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    closeButton: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500",
    title: "text-lg font-semibold",
    description: "text-sm text-neutral-500",
    loginForm: "flex flex-col gap-4",
    socialLoginContainer: "relative",
    socialLoginDivider: "absolute inset-0 flex items-center",
    socialLoginText: "relative flex justify-center text-xs uppercase",
    socialButtonContainer: "flex justify-center space-x-4",
    signupText: "text-center text-sm text-gray-500",
  },
});

type LoginModalProps = React.ComponentProps<typeof Dialog.Root> & VariantProps<typeof loginModalVariants>;

const LoginModal = ({ ...props }: LoginModalProps) => {
  const { overlay, content, closeButton, loginForm, socialLoginContainer, socialLoginDivider, socialLoginText, socialButtonContainer, signupText } = loginModalVariants();

  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlay()} />
        <Dialog.Content className={content()}>
          <div className="flex flex-col items-center space-y-8">
            <Logo />
            <div className="w-full space-y-6">
              <form className={loginForm()}>
                <input type="email" placeholder="이메일" className="h-12 w-full rounded-md border px-4 text-gray-800" />
                <input type="password" placeholder="비밀번호" className="h-12 w-full rounded-md border px-4 text-gray-800" />
                <Button type="submit" className="h-12 w-full text-base">
                  로그인
                </Button>
              </form>
              <div className={socialLoginContainer()}>
                <div className={socialLoginDivider()}>
                  <span className="w-full border-t" />
                </div>
                <div className={socialLoginText()}>
                  <span className="bg-white px-2 text-neutral-500">간편 로그인</span>
                </div>
              </div>
              <div className={socialButtonContainer()}>
                <button>
                  <Icon name="naver" className="h-10 w-10" />
                </button>
                <button>
                  <Icon name="kakao" className="h-10 w-10" />
                </button>
                <button>
                  <Icon name="google" className="h-10 w-10" />
                </button>
              </div>
            </div>
            <div className={signupText()}>
              <p>
                아직 회원이 아니신가요? <a href="/signup" className="font-semibold text-orange-500 hover:underline">회원가입</a>
              </p>
            </div>
          </div>
          <Dialog.Close className={closeButton()}>
            <Icon name="close" className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { LoginModal, loginModalVariants };
