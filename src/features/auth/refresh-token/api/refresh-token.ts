import customFetch from '@/shared/api/custom-fetch';

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  return await customFetch<RefreshTokenResponse>('/token/refresh', {
    method: 'POST',
  });
};
