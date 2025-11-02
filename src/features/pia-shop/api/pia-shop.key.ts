export const piaShopKeys = {
  all: ['pia-shop'] as const,

  items: () => [...piaShopKeys.all, 'items'] as const,
};
