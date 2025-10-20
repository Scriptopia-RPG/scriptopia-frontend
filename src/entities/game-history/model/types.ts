export interface GameHistory {
  historyUUID: string;
  thumbnailUrl: string | null;
  title: string;
  worldView: string;
  backgroundStory: string;
  epilogue1Title: string | null;
  epilogue1Content: string | null;
  epilogue2Title: string | null;
  epilogue2Content: string | null;
  epilogue3Title: string | null;
  epilogue3Content: string | null;
  score: number;
  createdAt: string; // ISO 8601 date string
  isShared: boolean;
}

export interface GameHistoryResponse {
  data: GameHistory[];
  nextCursor: string | null;
  hasNext: boolean;
}
