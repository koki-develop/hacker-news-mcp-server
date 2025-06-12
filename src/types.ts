export type HNItemType = "job" | "story" | "comment" | "poll" | "pollopt";

export interface HNItem {
  id: number;
  type?: HNItemType;
  by?: string;
  time?: number;
  text?: string;
  url?: string;
  score?: number;
  title?: string;
  kids?: number[];
  parent?: number;
  descendants?: number;
  parts?: number[];
  poll?: number;
  deleted?: boolean;
  dead?: boolean;
}

export interface HNUser {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

export interface HNUpdates {
  items: number[];
  profiles: string[];
}

export interface HNError {
  message: string;
  code?: string | number;
  status?: number;
}
