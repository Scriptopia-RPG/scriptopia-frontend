import { auth } from '@/shared/api/handlers/auth.handler';
import { sharedGame } from '@/shared/api/handlers/shared-game.handler';
import { piaShop } from '@/shared/api/handlers/pia-shop.handler';

export const handlers = [...auth, ...sharedGame, ...piaShop];
