export type ShopItem = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type PiaShopItemsResponse = {
  items: ShopItem[];
};

export type PurchaseRequest = {
  itemId: number;
  quantity: number;
};

export type PurchaseResponse = {
  success: boolean;
  message?: string;
};
