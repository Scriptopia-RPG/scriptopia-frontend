/**
 * 이미지 URL 관련 유틸리티 함수들
 */

// 유효한 이미지 URL인지 확인하는 함수
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // 빈 문자열이나 유효하지 않은 값 체크
  if (url.trim() === '' || url === 'common item img') return false;
  
  // URL 형식 확인
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return true;
  }
  
  return false;
};

// 아이템 카테고리별 기본 이미지 맵핑
export const getDefaultItemImage = (category: string): string => {
  switch (category?.toUpperCase()) {
    case 'WEAPON':
      return '/assets/철 검.png';
    case 'ARMOR':
      return '/assets/강철 갑옷.png';
    case 'ACCESSORY':
      return '/assets/화염의 궤.png';
    // 게임 생성에서 사용할 수 있는 추가 매핑
    case '무기':
      return '/assets/철 검.png';
    case '방어구':
      return '/assets/강철 갑옷.png';
    case '악세서리':
      return '/assets/화염의 궤.png';
    default:
      return '/assets/게임 티켓.svg';
  }
};

// 안전한 이미지 URL 생성 (fallback 포함)
export const getSafeImageUrl = (originalUrl: string, category?: string): string => {
  if (isValidImageUrl(originalUrl)) {
    return originalUrl;
  }
  
  console.log('🖼️ 유효하지 않은 이미지 URL 감지:', {
    originalUrl,
    category,
    fallback: getDefaultItemImage(category || 'default')
  });
  
  return getDefaultItemImage(category || 'default');
};

// 이미지 로드 에러 핸들러
export const handleImageError = (itemName: string, imageUrl: string, error: React.SyntheticEvent<HTMLImageElement, Event>) => {
  console.error('🚨 이미지 로드 실패:', {
    itemName,
    imageUrl,
    error: error.type,
    timestamp: new Date().toISOString()
  });
};