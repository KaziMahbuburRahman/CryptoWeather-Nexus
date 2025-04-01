export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  imageUrl?: string;
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}
