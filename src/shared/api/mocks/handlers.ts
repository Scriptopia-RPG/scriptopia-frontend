import { sharedGame } from '@/shared/api/handlers/shared-game.handler';
import { authHandlers } from '@/shared/api/handlers/auth.handler';
import { testHandlers } from '@/shared/api/handlers/test.handler';

export const handlers = [
  ...sharedGame,
  ...authHandlers,
  ...testHandlers,
]