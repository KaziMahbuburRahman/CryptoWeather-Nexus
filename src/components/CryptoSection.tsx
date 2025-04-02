"use client";

import { websocketService } from "@/services/websocket";
import { CryptoData } from "@/types/crypto";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const cryptos = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "cardano", name: "Cardano", symbol: "ADA" },
];

const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return `${(num / 1000000000000).toFixed(2)}T`;
  }
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  }
  return num.toLocaleString();
};

export default function CryptoSection() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchInitialData = useCallback(async () => {
    try {
      const ids = cryptos.map((c) => c.id).join(",");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true`
      );

      const mappedData: CryptoData[] = cryptos.map((crypto) => {
        const coinData = response.data[crypto.id];
        return {
          ...crypto,
          price: coinData.usd,
          priceChange24h: coinData.usd_24h_change,
          marketCap: coinData.usd_market_cap,
          volume24h: coinData.usd_24h_vol,
          circulatingSupply: 0, // Not available in this endpoint
          isFavorite: favorites.includes(crypto.id),
        };
      });

      setCryptoData(mappedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching initial crypto data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch crypto data"
      );
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    fetchInitialData();

    // Set up WebSocket callbacks
    websocketService.setCallbacks({
      onCryptoUpdate: (update) => {
        setCryptoData((prev) =>
          prev.map((crypto) =>
            crypto.id === update.id
              ? {
                  ...crypto,
                  price: update.price,
                  priceChange24h: crypto.priceChange24h,
                }
              : crypto
          )
        );
      },
    });

    // Cleanup
    return () => {
      websocketService.setCallbacks({});
    };
  }, [fetchInitialData]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Crypto Market</h2>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Crypto Market</h2>
        <div className="card bg-red-50 text-red-500 p-4">
          <p className="font-medium">Error loading crypto data</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline hover:text-red-600"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

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
                    {crypto.symbol === "ADA"
                      ? crypto.price.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })
                      : crypto.price.toLocaleString(undefined, {
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
                    ${formatLargeNumber(crypto.marketCap)}
                  </p>
                </div>
                <div>
                  <p>24h Volume</p>
                  <p className="font-medium">
                    ${formatLargeNumber(crypto.volume24h)}
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
