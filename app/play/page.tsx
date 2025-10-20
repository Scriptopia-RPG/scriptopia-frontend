"use client";

import Link from 'next/link';

import Header from '@/widgets/header/ui/header';
import Button from '@/shared/ui/button/button';

const PlayLanding = () => {
  return (
    <div className="min-h-screen bg-[#151518] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 pb-24 pt-12 sm:px-8">
        <section className="rounded-3xl border border-[#2a2a32] bg-gradient-to-b from-[#1f1f24] to-[#141419] p-10 text-center sm:p-14">
          <h1 className="text-3xl font-semibold sm:text-4xl">당신의 이야기를 시작할 준비가 되셨나요?</h1>
          <p className="mt-4 text-sm text-gray-300 sm:text-base">
            배경을 설정하고 캐릭터와 아이템을 선택한 뒤, Scriptopia에서 나만의 모험을 만들어보세요.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/play/create">
              <Button type="button">시작하기</Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-[#2a2a32] bg-[#17171c] p-8 sm:grid-cols-3 sm:gap-8 sm:p-10">
          {[
            {
              title: '배경 입력',
              description: '모험의 세계관과 분위기를 정하고, 이야기가 시작될 무대를 설정하세요.',
            },
            {
              title: '캐릭터 생성',
              description: '주인공의 이름과 특징을 입력해 내가 만들 이야기의 주연을 완성합니다.',
            },
            {
              title: '아이템 선택',
              description: '모험에 도움이 될 주요 아이템을 선택하고, 특별한 능력을 부여하세요.',
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl bg-[#1f1f24] p-6 text-left">
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-300">{card.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default PlayLanding;
