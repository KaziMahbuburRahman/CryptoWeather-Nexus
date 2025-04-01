"use client";

import { CryptoData } from "@/types/crypto";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const cryptos = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "cardano", name: "Cardano", symbol: "ADA" },
];

export default function CryptoSection() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: CryptoData[] = cryptos.map((crypto) => ({
          ...crypto,
          price: Math.random() * 50000,
          priceChange24h: Math.random() * 20 - 10,
          marketCap: Math.random() * 1000000000000,
          volume24h: Math.random() * 50000000000,
          circulatingSupply: Math.random() * 21000000,
          isFavorite: favorites.includes(crypto.id),
        }));
        setCryptoData(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch crypto data");
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="card animate-pulse h-64"></div>;
  if (error)
    return <div className="card bg-red-50 text-red-500 p-4">{error}</div>;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Crypto Market</h2>
      <div className="grid gap-4">
        <AnimatePresence>
          {cryptoData.map((crypto) => (
            <motion.div
              key={crypto.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {crypto.name}
                    </h3>
                    <button
                      onClick={() => toggleFavorite(crypto.id)}
                      className="text-yellow-500 hover:text-yellow-600 transition-colors"
                    >
                      {favorites.includes(crypto.id) ? "★" : "☆"}
                    </button>
                  </div>
                  <p className="text-gray-600">{crypto.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {crypto.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`text-sm ${
                      crypto.priceChange24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {crypto.priceChange24h >= 0 ? "↑" : "↓"}
                    {Math.abs(crypto.priceChange24h).toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                <div>
                  <p>Market Cap</p>
                  <p className="font-medium">
                    $
                    {crypto.marketCap.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p>24h Volume</p>
                  <p className="font-medium">
                    $
                    {crypto.volume24h.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
