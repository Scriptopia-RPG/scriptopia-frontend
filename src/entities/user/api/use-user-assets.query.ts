import { useQuery } from '@tanstack/react-query';
import { getUserAssets, type UserAssets } from './user-assets-api';
import useAuthStore from '@/entities/auth/model/auth.store';

export const useUserAssets = () => {
  const profile = useAuthStore((state) => state.profile);
  
  return useQuery({
    queryKey: ['user-assets'],
    queryFn: getUserAssets,
    enabled: !!profile, // 로그인된 상태에서만 API 호출
    staleTime: 30 * 1000, // 30초 동안 캐시
    refetchInterval: 60 * 1000, // 1분마다 자동 갱신
  });
};