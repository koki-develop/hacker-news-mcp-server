import type { HNItem } from "./types";

export class HackerNewsClient {
  private readonly baseUrl = "https://hacker-news.firebaseio.com";

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    return data as T;
  }

  async getItem(id: number): Promise<HNItem | null> {
    return this.makeRequest<HNItem | null>(`/v0/item/${id}.json`);
  }

  async getTopStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/v0/topstories.json");
  }

  async getNewStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/v0/newstories.json");
  }

  async getBestStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/v0/beststories.json");
  }

  async getAskStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/v0/askstories.json");
  }

  async getShowStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/v0/showstories.json");
  }

  async getJobStories(): Promise<number[]> {
    return this.makeRequest<number[]>("/v0/jobstories.json");
  }
}
