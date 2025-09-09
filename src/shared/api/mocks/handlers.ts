import { auth } from '@/shared/api/handlers/auth.handler';
import { sharedGame } from '@/shared/api/handlers/shared-game.handler';

export const handlers = [...auth, ...sharedGame];
