'use client';

import { useState } from 'react';
import Image from 'next/image';

import { usePurchaseItem } from '@/features/pia-shop/api/use-purchase-item.mutation';
import type { ShopItem } from '@/features/pia-shop/model/pia-shop.type';

import Modal from '@/shared/ui/modal/modal';
import CloseButton from '@/shared/ui/button/close-button';
import Button from '@/shared/ui/button/button';

interface ItemDetailModalProps {
  item: ShopItem;
  onClose: () => void;
  onPurchaseSuccess?: () => void;
}

const ItemDetailModal = ({ item, onClose, onPurchaseSuccess }: ItemDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { mutate: purchaseItem, isPending } = usePurchaseItem();

  const handlePurchase = () => {
    purchaseItem(
      { itemId: item.id, quantity },
      {
        onSuccess: () => {
          onPurchaseSuccess?.();
          onClose();
        },
        onError: (error) => {
          alert('구매에 실패했습니다. 잔액을 확인해주세요.');
          console.error('Purchase error:', error);
        },
      },
    );
  };

  const totalPrice = item.price * quantity;

  return (
    <Modal ariaLabelledby="item-detail-title" onClose={onClose}>
      <header className="bg-bg sticky top-0 z-10 flex items-center justify-between px-6 py-3.5">
        <h2 className="text-lg font-medium">아이템 정보</h2>
        <CloseButton onClick={onClose} />
      </header>

      <div className="mb-5 flex flex-col items-stretch px-4">
        {/* 아이템 이미지 영역 */}
        <div className="flex justify-center pt-4 pb-7">
          <Image
            src={'/images/대장간아저씨.png'}
            width={200}
            height={300}
            className="rounded-sm"
            style={{ boxShadow: '4px 6px 20px rgba(0, 0, 0, 0.4)' }}
            alt="아이템 이미지"
          />
        </div>

        <h1 id="item-detail-title" className="mb-4 text-xl font-medium">
          {item.name}
        </h1>

        {/* 아이템 설명 */}
        <div className="mb-4">
          <h3 className="font-medium">설명</h3>
          <p className="bg-surface-subtle rounded-xl px-4 py-3.5">{item.description}</p>
        </div>

        {/* 가격 정보 */}
        <div className="mb-4">
          <h3 className="font-medium">가격</h3>
          <p className="bg-surface-subtle rounded-xl px-4 py-3.5">
            {item.price.toLocaleString('ko-KR')} 피아
          </p>
        </div>

        {/* 수량 선택 */}
        <div className="mb-6">
          <label htmlFor="quantity" className="text-fg mb-2 block text-sm font-semibold">
            구매 수량
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="bg-surface-subtle hover:bg-surface text-fg flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors disabled:opacity-50 dark:border-gray-700"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1) {
                  setQuantity(value);
                }
              }}
              className="text-fg focus:border-primary w-20 rounded-lg border border-gray-200 bg-transparent p-2 text-center text-sm focus:outline-none dark:border-gray-700"
            />
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="bg-surface-subtle hover:bg-surface text-fg flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors dark:border-gray-700"
            >
              +
            </button>
          </div>
        </div>

        {/* 총 가격 */}
        <div className="bg-surface-subtle rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-fg text-sm font-semibold">총 가격</span>
            <span className="text-fg text-lg font-semibold">
              {totalPrice.toLocaleString('ko-KR')} 피아
            </span>
          </div>
        </div>
      </div>

      <div className="bg-bg sticky bottom-0 z-10 flex border-t border-gray-100 px-4 py-3">
        <Button
          label="구매하기"
          onClick={handlePurchase}
          disabled={isPending}
          variant="primary"
          size="full"
        />
      </div>
    </Modal>
  );
};

export default ItemDetailModal;
