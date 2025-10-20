import { http, HttpResponse } from 'msw';

import {
  createSession,
  ensureSession,
  updateSession,
} from '@/shared/api/fixtures/game-session.mock';
import type { GameSession } from '@/features/game-session/model/types';

const json = (body: object, status = 200) => HttpResponse.json(body, { status });

const appendLog = (session: GameSession, text: string) => ({
  ...session,
  logs: [
    ...session.logs,
    {
      id: `log-${Date.now()}`,
      type: 'ACTION' as const,
      text,
      createdAt: new Date().toISOString(),
    },
  ],
});

export const gameSessionHandlers = [
  http.post('*/game-sessions', async ({ request }) => {
    const body = (await request.json()) as { background?: string; name?: string; trait?: string; itemId?: string };

    if (!body.background || !body.name || !body.trait || !body.itemId) {
      return HttpResponse.json({ message: 'Missing game creation data.' }, { status: 400 });
    }

    const sessionId = createSession();

    return json({ sessionId }, 201);
  }),

  http.get('*/game-sessions/:sessionId', ({ params }) => {
    const sessionId = params.sessionId as string;
    const session = ensureSession(sessionId);
    return json(session);
  }),

  http.post('*/game-sessions/:sessionId/choices', async ({ params, request }) => {
    const sessionId = params.sessionId as string;
    const body = (await request.json()) as { choiceId?: string };

    if (!body.choiceId) {
      return HttpResponse.json({ message: 'Choice id is required.' }, { status: 400 });
    }

    const updated = updateSession(sessionId, (current) => {
      const nextProgress = Math.min(1, current.story.progress + 0.1);
      return {
        ...appendLog(current, `Selected choice: ${body.choiceId}`),
        story: {
          ...current.story,
          progress: nextProgress,
        },
      };
    });

    if (!updated) {
      return HttpResponse.json({ message: 'Session not found.' }, { status: 404 });
    }

    return json(updated);
  }),

  http.post('*/game-sessions/:sessionId/prompt', async ({ params, request }) => {
    const sessionId = params.sessionId as string;
    const body = (await request.json()) as { prompt?: string };

    if (!body.prompt) {
      return HttpResponse.json({ message: 'Prompt is required.' }, { status: 400 });
    }

    const updated = updateSession(sessionId, (current) => {
      const responseText = `Hero acts: ${body.prompt}`;
      return appendLog(current, responseText);
    });

    if (!updated) {
      return HttpResponse.json({ message: 'Session not found.' }, { status: 404 });
    }

    return json(updated);
  }),
];
