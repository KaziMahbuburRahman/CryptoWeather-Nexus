import { CryptoData } from "@/types/crypto";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_COINMARKETCAP_API_URL ||
  "https://pro-api.coinmarketcap.com/v1";

export const cryptoService = {
  async getCryptoData(): Promise<CryptoData[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cryptocurrency/listings/latest`,
        {
          headers: {
            "X-CMC_PRO_API_KEY":
              process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
      }

      const data = await response.json();
      return data.data.map((crypto: any) => ({
        id: crypto.id?.toString() || "",
        name: crypto.name || "",
        symbol: crypto.symbol || "",
        price: crypto.quote?.USD?.price || 0,
        priceChange24h: crypto.quote?.USD?.percent_change_24h || 0,
        marketCap: crypto.quote?.USD?.market_cap || 0,
        volume24h: crypto.quote?.USD?.volume_24h || 0,
        circulatingSupply: crypto.circulating_supply || 0,
      }));
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      throw error;
    }
  },

  async getTopCryptos(limit: number = 10): Promise<CryptoData[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cryptocurrency/listings/latest?limit=${limit}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY":
              process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top cryptos");
      }

      const data = await response.json();
      return data.data.map((crypto: any) => ({
        id: crypto.id?.toString() || "",
        name: crypto.name || "",
        symbol: crypto.symbol || "",
        price: crypto.quote?.USD?.price || 0,
        priceChange24h: crypto.quote?.USD?.percent_change_24h || 0,
        marketCap: crypto.quote?.USD?.market_cap || 0,
        volume24h: crypto.quote?.USD?.volume_24h || 0,
        circulatingSupply: crypto.circulating_supply || 0,
      }));
    } catch (error) {
      console.error("Error fetching top cryptos:", error);
      throw error;
    }
  },
};
