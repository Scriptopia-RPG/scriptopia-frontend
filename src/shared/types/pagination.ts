export interface CursorRequest {
  isFirstPage?: boolean;
  lastUuid?: string;
  pageSize?: number;
}

export interface CursorResponse {
  hasNextPage?: boolean;
  lastUuid?: string;
}
