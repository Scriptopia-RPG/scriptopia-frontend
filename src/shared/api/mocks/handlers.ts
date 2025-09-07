import { sharedGame } from '@/shared/api/handlers/shared-game.handler';
import { authHandlers } from '@/shared/api/handlers/auth.handler';

export const handlers = [
  ...sharedGame,
  ...authHandlers,
]