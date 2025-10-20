import { useState } from 'react';
import Tabs from '@/shared/ui/tabs/tabs';
import GameHistoryList from '@/features/game-history/ui/game-history-list';
import InventoryList from '@/features/inventory/ui/inventory-list';

const TABS = [
  { key: 'history', label: '게임 히스토리' },
  { key: 'inventory', label: '인벤토리' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('history');

  return (
    <section className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6 sm:p-8">
      <Tabs options={TABS} current={activeTab} onChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === 'history' && <GameHistoryList />}
        {activeTab === 'inventory' && <InventoryList />}
      </div>
    </section>
  );
};

export default ProfileTabs;