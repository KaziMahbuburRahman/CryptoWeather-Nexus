"use client";

import { NewsArticle } from "@/types/news";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=cryptocurrency`;

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        const newsArticles = response.data.results
          .slice(0, 5) // Only take top 5 articles
          .map((article: any) => ({
            id: article.article_id,
            title: article.title,
            description: article.description,
            url: article.link,
            source: article.source_name,
            publishedAt: article.pubDate,
            imageUrl:
              article.image_url || "https://picsum.photos/seed/default/400/200",
          }));
        setArticles(newsArticles);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news articles");
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours > 24) {
      return date.toLocaleDateString();
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  if (loading) return <div className="card animate-pulse h-64"></div>;
  if (error)
    return <div className="card bg-red-50 text-red-500 p-4">{error}</div>;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">
        Latest Crypto News
      </h2>
      <div className="grid gap-4">
        <AnimatePresence>
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              {article.imageUrl && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.source}</span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary-600 hover:text-primary-700 font-medium mt-2"
                >
                  Read more →
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
