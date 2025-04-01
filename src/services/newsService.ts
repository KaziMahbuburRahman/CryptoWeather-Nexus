import api from "./api";

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export const newsService = {
  async getLatestNews(
    category: string = "crypto",
    limit: number = 10
  ): Promise<NewsArticle[]> {
    const response = await api.get(`/news?category=${category}&limit=${limit}`);
    return response.data;
  },

  async searchNews(query: string, limit: number = 10): Promise<NewsArticle[]> {
    const response = await api.get(
      `/news/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    return response.data;
  },
};
