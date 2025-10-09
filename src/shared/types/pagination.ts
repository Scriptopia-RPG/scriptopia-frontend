export interface CursorRequest {
  lastUuid?: string;
  pageSize?: number;
}

export interface CursorResponse {
  hasNextPage: boolean;
  lastUuid?: string;
}
