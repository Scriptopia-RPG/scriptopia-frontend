'use client';

import { useState } from 'react';

import { usePiaShopItems } from '@/features/pia-shop/api/use-pia-shop-items.query';
import type { ShopItem } from '@/features/pia-shop/model/pia-shop.type';

import ShopBackground from '@/features/pia-shop/ui/shop-background';
import PiaShopHeader from '@/features/pia-shop/ui/pia-shop-header';
import ShopItemCard from '@/features/pia-shop/ui/shop-item-card';
import ItemDetailModal from '@/features/pia-shop/ui/item-detail-modal';
import DialogueBox from '@/features/pia-shop/ui/dialogue-box';
import BlacksmithCharacter from '@/features/pia-shop/ui/blacksmith-character';

const DIALOGUE_TEXT = `오호, 낯선 얼굴이군. 여긴 스크립토피아 최고의 대장간이야. 내
가 직접 고르고 만든 아이템들만 모아놨지.

뭐든 필요한 게 있다면, 천천히 둘러보게나. 가격은 좀 있지만, 영
능은 보장하지!`;

const Page = () => {
  const { data: items, isLoading, isError } = usePiaShopItems();
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  return (
    <div className="relative h-full overflow-y-auto">
      <ShopBackground />

      <main className="relative mx-auto flex h-full max-w-6xl flex-col px-4 py-6 sm:px-8 sm:py-8">
        <h1 className="sr-only">PIA 상점</h1>

        {/* 헤더 (제목, 피아 정보 버튼, 잔액) */}
        <PiaShopHeader />

        {/* 상단 아이템 카드 섹션 */}
        <section className="flex-shrink-0">
          {isLoading && <div className="text-fg text-center">아이템을 불러오는 중...</div>}
          {isError && <div className="text-center">아이템을 불러오는데 실패했습니다.</div>}
          {items && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {items.items.map((item) => (
                <ShopItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          )}
        </section>

        {/* 하단 캐릭터 및 대화 상자 섹션 */}
        <section className="mt-auto flex flex-col-reverse gap-4 sm:flex-row sm:items-end sm:justify-end">
          {/* 대화 상자 */}
          <div className="flex-1 sm:max-w-md">
            <DialogueBox text={DIALOGUE_TEXT} />
          </div>

          {/* 대장장이 캐릭터 */}
          <BlacksmithCharacter />
        </section>
      </main>

      {/* 아이템 상세 모달 */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPurchaseSuccess={() => {
            // 구매 성공 시 추가 처리 (필요 시)
          }}
        />
      )}
    </div>
  );
};

export default Page;
