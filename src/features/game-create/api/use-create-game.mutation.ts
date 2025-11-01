import { useMutation } from '@tanstack/react-query';

import customFetch from '@/shared/api/custom-fetch';

interface CreateGameRequest {
  backround: string;
  characterName: string;
  characterDescription: string;
  itemDefId: number;
}

interface CreateGameResponse {
  success: boolean;
  gameId: string;
  message: string;
}

const createGame = async (gameData: CreateGameRequest) => {
  return await customFetch<CreateGameResponse>('/game', {
    method: 'POST',
    body: gameData,
  });
};

export const useCreateGame = () => {
  return useMutation({
    mutationFn: createGame,
    retry: false,
  });
};
