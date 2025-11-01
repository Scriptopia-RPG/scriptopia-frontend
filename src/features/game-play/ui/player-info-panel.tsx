'use client';

import type { PlayerInfo, InventoryItem } from '@/entities/game/model/game-play.type';

import { EquippedItems } from '@/features/game-play/ui/equipped-items';
import PlayerStatus from '@/features/game-play/ui/player-status';

interface PlayerInfoPanelProps {
  playerInfo: PlayerInfo;
  inventory?: InventoryItem[];
}

const PlayerInfoPanel = ({ playerInfo, inventory }: PlayerInfoPanelProps) => {
  return (
    <div className="flex w-full flex-col border-r border-gray-200 sm:w-72">
      <PlayerStatus playerInfo={playerInfo} />
      <EquippedItems inventory={inventory} />
    </div>
  );
};

export default PlayerInfoPanel;
