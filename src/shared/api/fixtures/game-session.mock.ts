import type { GameSession } from '@/features/game-session/model/types';

let sessionCounter = 1;

const createBaseSession = (): GameSession => ({
  player: {
    sessionId: 'session-1',
    name: 'Um Taejun',
    level: 3,
    job: 'Freshman Student',
    hp: { current: 4, max: 5 },
    exp: { current: 689, max: 1000 },
    stats: [
      { type: 'STRENGTH', value: 3 },
      { type: 'INTELLIGENCE', value: 3 },
      { type: 'AGILITY', value: 3 },
      { type: 'LUCK', value: 3 },
    ],
    inventory: [
      { slotId: 'weapon', name: 'Steel Axe', icon: '/assets/철 도끼.png', equipped: true },
      { slotId: 'armor', name: 'Steel Armor', icon: '/assets/강철 갑옷.png', equipped: true },
      { slotId: 'accessory', name: 'Flame Trace', icon: '/assets/화염의 궤.png', equipped: false },
    ],
    gold: 9999,
  },
  story: {
    title: 'I Beat the Professor and Became One',
    body:
      'Taejun, after finishing the freshman welcome party, walks through the campus late at night. In front of an abandoned building, he encounters Yujinyoung, a legendary figure with explosive strength. Even before he can speak, Yujinyoung swings his axe.\nBarely dodging, Taejun feels a strange power awaken within. As the battle intensifies, his body changes beyond human limits while Yujinyoung watches with a meaningful smile.\nThat moment, Taejun must decide.',
    imageUrl: null,
    progress: 0.35,
  },
  choices: [
    { id: 'choice-1', label: 'Shout loudly for help.', successRate: 0.65, statType: 'INTELLIGENCE' },
    { id: 'choice-2', label: 'Use the awakened power to counterattack.', successRate: 0.65, statType: 'STRENGTH' },
    { id: 'choice-3', label: 'Escape into the building to hide.', successRate: 0.65, statType: 'AGILITY' },
  ],
  logs: [
    {
      id: 'log-1',
      type: 'SYSTEM',
      text: 'The game session has started.',
      createdAt: new Date().toISOString(),
    },
  ],
  isCompleted: false,
});

const sessionStore = new Map<string, GameSession>();

const cloneSession = (session: GameSession): GameSession => JSON.parse(JSON.stringify(session));

export const createSession = () => {
  const sessionId = `session-${sessionCounter++}`;
  const base = cloneSession(createBaseSession());
  base.player.sessionId = sessionId;
  base.logs.push({
    id: `log-${Date.now()}`,
    type: 'SYSTEM',
    text: 'A new adventure begins.',
    createdAt: new Date().toISOString(),
  });
  sessionStore.set(sessionId, base);
  return sessionId;
};

export const updateSession = (sessionId: string, updater: (session: GameSession) => GameSession) => {
  const current = sessionStore.get(sessionId);
  if (!current) return null;
  const updated = updater(cloneSession(current));
  sessionStore.set(sessionId, updated);
  return updated;
};

export const getSession = (sessionId: string) => {
  const session = sessionStore.get(sessionId);
  return session ? cloneSession(session) : null;
};

export const ensureSession = (sessionId: string) => {
  const existing = sessionStore.get(sessionId);
  if (existing) return cloneSession(existing);
  const base = cloneSession(createBaseSession());
  base.player.sessionId = sessionId;
  sessionStore.set(sessionId, base);
  return base;
};
