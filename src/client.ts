import type { HNItem } from "./types";

export class HackerNewsClient {
  private readonly baseUrl = "https://hacker-news.firebaseio.com/v0";

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

  async getItem(id: number): Promise<HNItem> {
    return this.makeRequest<HNItem>(`/item/${id}.json`);
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
