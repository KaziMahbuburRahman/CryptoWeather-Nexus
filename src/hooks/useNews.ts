import { setError, setLoading, setNewsData } from "@/features/news/newsSlice";
import { NewsArticle, newsService } from "@/services";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useNews = (category: string = "crypto", limit: number = 10) => {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        dispatch(setLoading(true));
        const newsData = await newsService.getLatestNews(category, limit);
        dispatch(setNewsData(newsData));
        setArticles(newsData);
      } catch (err) {
        const error =
          err instanceof Error ? err.message : "Failed to fetch news data";
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNews();
  }, [category, limit, dispatch]);

  return articles;
};
