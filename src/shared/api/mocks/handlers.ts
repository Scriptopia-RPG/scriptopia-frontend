import { auth } from '@/shared/api/handlers/auth.handler';
import { sharedGame } from '@/shared/api/handlers/shared-game.handler';
import { gameSessionHandlers } from '@/shared/api/handlers/game-session.handler';
import { userHandlers } from '@/shared/api/handlers/user.handler';
import { auctionHandlers } from '@/shared/api/handlers/auction.handler';

export const handlers = [...auth, ...sharedGame, ...gameSessionHandlers, ...userHandlers, ...auctionHandlers];
