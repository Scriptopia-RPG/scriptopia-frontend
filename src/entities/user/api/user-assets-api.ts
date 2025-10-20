import customFetch from '@/shared/api/custom-fetch';

export interface UserAssets {
  pia: number;
}

export const getUserAssets = async (): Promise<UserAssets> => {
  return customFetch<UserAssets>('/api/users/me/assets', {
    method: 'GET',
  });
};