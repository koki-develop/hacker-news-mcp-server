import type { HNError, HNItem } from "./types.js";

export interface HackerNewsClientConfig {
  baseUrl?: string;
  timeout?: number;
}

export class HackerNewsClient {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(config: HackerNewsClientConfig = {}) {
    this.baseUrl = config.baseUrl ?? "https://hacker-news.firebaseio.com/v0";
    this.timeout = config.timeout ?? 10000;
  }

  private async fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        const errorData: HNError = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: response.status,
        };
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }

  async getItem(id: number): Promise<HNItem | null> {
    try {
      const item = await this.makeRequest<HNItem | null>(`/item/${id}.json`);
      return item;
    } catch (error) {
      console.error(`Failed to fetch item ${id}:`, error);
      return null;
    }
  }

  async getTopStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/topstories.json");
  }

  async getNewStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/newstories.json");
  }

  async getBestStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/beststories.json");
  }

  async getAskStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/askstories.json");
  }

  async getShowStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/showstories.json");
  }

  async getJobStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/jobstories.json");
  }
}
