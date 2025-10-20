'use client';

import { useState } from 'react';
import Header from '@/widgets/header/ui/header';
import SearchBar from '@/shared/ui/input/search-bar';
import Tabs from '@/shared/ui/tabs/tabs';
import {
  useAuctionItemsPage,
  useMyAuctions,
  useTradeHistory,
  usePurchaseAuctionItem,
  useCancelAuction,
  useReceivePayment,
  useSellItem,
} from '@/entities/auction/api';
import {
  AuctionTable,
  AuctionFilters,
  TradeHistoryTable,
  MyAuctionsTable,
  SellItemModal,
  AuctionPagination,
} from '@/entities/auction/ui';

type TabKey = '검색' | '판매' | '거래 기록';

const TAB_OPTIONS: Array<{ key: TabKey; label: string }> = [
  { key: '검색', label: '검색' },
  { key: '판매', label: '판매' },
  { key: '거래 기록', label: '거래 기록' },
];

export default function AuctionPage() {
  const [currentTab, setCurrentTab] = useState<TabKey>('검색');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<{
    itemName?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    grade?: string;
    effectGrades?: string[];
    mainStat?: string;
  }>({});
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Queries
  const {
    data: auctionData,
    isLoading: isAuctionLoading,
    refetch: refetchAuction,
  } = useAuctionItemsPage({
    pageIndex: currentPage,
    pageSize: 10,
    itemName: searchQuery || filters.itemName,
    ...filters,
  });

  const {
    data: myAuctionsData,
    isLoading: isMyAuctionsLoading,
    refetch: refetchMyAuctions,
  } = useMyAuctions({
    pageIndex: currentPage,
    pageSize: 10,
  });

  const {
    data: tradeHistoryData,
    isLoading: isTradeHistoryLoading,
    refetch: refetchTradeHistory,
  } = useTradeHistory({
    pageIndex: currentPage,
    pageSize: 10,
  });

  // Mutations
  const purchaseMutation = usePurchaseAuctionItem();
  const cancelMutation = useCancelAuction();
  const receivePaymentMutation = useReceivePayment();
  const sellMutation = useSellItem();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePurchase = async (auctionId: number) => {
    try {
      await purchaseMutation.mutateAsync(auctionId);
      refetchAuction();
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleCancel = async (auctionId: number) => {
    try {
      await cancelMutation.mutateAsync(auctionId);
      refetchMyAuctions();
    } catch (error) {
      console.error('Cancel failed:', error);
    }
  };

  const handleReceivePayment = async (auctionId: number) => {
    try {
      await receivePaymentMutation.mutateAsync(auctionId);
      refetchTradeHistory();
    } catch (error) {
      console.error('Receive payment failed:', error);
    }
  };

  const handleSell = async (itemId: number, price: number) => {
    try {
      await sellMutation.mutateAsync({
        userItemId: itemId,
        price,
      });
      refetchMyAuctions();
      setIsSellModalOpen(false);
    } catch (error) {
      console.error('Sell failed:', error);
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case '검색':
        return (
          <div className="flex gap-6">
            <AuctionFilters onFiltersChange={handleFiltersChange} />
            <div className="flex-1">
              <div className="mb-4">
                <SearchBar
                  placeholder="검색어를 입력해 주세요."
                  onChange={handleSearch}
                  value={searchQuery}
                />
              </div>
              
              {isAuctionLoading ? (
                <div className="text-center py-8 text-gray-400">로딩 중...</div>
              ) : auctionData ? (
                <>
                  <AuctionTable
                    items={auctionData.content}
                    onPurchase={handlePurchase}
                    showPurchaseButton={true}
                  />
                  <AuctionPagination
                    currentPage={auctionData.pageInfo.currentPage}
                    totalPages={auctionData.pageInfo.totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">데이터가 없습니다.</div>
              )}
            </div>
          </div>
        );

      case '판매':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-semibold">판매 목록</h2>
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                판매하기
              </button>
            </div>

            {isMyAuctionsLoading ? (
              <div className="text-center py-8 text-gray-400">로딩 중...</div>
            ) : myAuctionsData ? (
              <>
                <MyAuctionsTable
                  items={myAuctionsData.content.map(item => ({
                    auctionId: item.auctionId,
                    price: item.price,
                    createdAt: item.createdAt,
                    item: {
                      userItemId: 0,
                      itemDefId: item.item.itemDefId,
                      name: item.item.name,
                      description: '',
                      picSrc: item.item.picSrc,
                      remainingUses: 0,
                      tradeStatus: 'ON_SALE' as const,
                      grade: item.item.itemGrade as any,
                      category: item.item.itemType,
                      durability: 5,
                      effectGrades: [],
                      baseStat: 0,
                      strength: 0,
                      agility: 0,
                      intelligence: 0,
                      luck: 0,
                    }
                  }))}
                  onCancel={handleCancel}
                />
                <AuctionPagination
                  currentPage={myAuctionsData.pageInfo.currentPage}
                  totalPages={Math.ceil(myAuctionsData.content.length / myAuctionsData.pageInfo.pageSize) || 1}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">데이터가 없습니다.</div>
            )}
          </div>
        );

      case '거래 기록':
        return (
          <div>
            <h2 className="text-white text-xl font-semibold mb-6">거래 목록</h2>
            
            {isTradeHistoryLoading ? (
              <div className="text-center py-8 text-gray-400">로딩 중...</div>
            ) : tradeHistoryData ? (
              <>
                <TradeHistoryTable
                  items={tradeHistoryData.content}
                  onReceivePayment={handleReceivePayment}
                />
                <AuctionPagination
                  currentPage={tradeHistoryData.pageInfo.currentPage}
                  totalPages={tradeHistoryData.pageInfo.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">데이터가 없습니다.</div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#151518] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10">
        {/* 헤더 섹션 */}
        <section className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">경매장</h1>
          <p className="text-gray-400 text-lg">다른 플레이어들과 아이템을 거래해보세요</p>
        </section>

        {/* 탭 네비게이션 */}
        <nav className="flex justify-center">
          <div className="bg-[#17171c] border border-[#2a2a32] rounded-2xl p-2">
            <Tabs
              options={TAB_OPTIONS}
              current={currentTab}
              onChange={setCurrentTab}
            />
          </div>
        </nav>

        {/* 콘텐츠 섹션 */}
        <section className="bg-[#17171c] border border-[#2a2a32] rounded-3xl p-6">
          {renderTabContent()}
        </section>
      </main>

      <SellItemModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onSell={handleSell}
      />
    </div>
  );
}