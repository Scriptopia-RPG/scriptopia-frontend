/**
 * 디바이스 고유 ID를 생성하거나 가져옵니다.
 * localStorage에 저장하여 브라우저별로 고유하게 유지합니다.
 */
export const getDeviceId = (): string => {
  const STORAGE_KEY = 'scriptopia_device_id';
  
  // 이미 저장된 deviceId가 있으면 반환
  const existingId = localStorage.getItem(STORAGE_KEY);
  if (existingId) {
    return existingId;
  }
  
  // 새로운 deviceId 생성
  const deviceId = generateDeviceId();
  localStorage.setItem(STORAGE_KEY, deviceId);
  
  return deviceId;
};

/**
 * 고유한 디바이스 ID를 생성합니다.
 * 형식: timestamp-random-browserinfo
 */
const generateDeviceId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  const browserInfo = getBrowserInfo();
  
  return `${timestamp}-${random}-${browserInfo}`;
};

/**
 * 브라우저 정보를 기반으로 한 간단한 핑거프린트를 생성합니다.
 */
const getBrowserInfo = (): string => {
  if (typeof window === 'undefined') {
    return 'server';
  }
  
  const navigator = window.navigator;
  const screen = window.screen;
  
  const info = [
    navigator.userAgent.length,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ].join('-');
  
  // 간단한 해시 생성
  let hash = 0;
  for (let i = 0; i < info.length; i++) {
    const char = info.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32비트 정수로 변환
  }
  
  return Math.abs(hash).toString(36);
};