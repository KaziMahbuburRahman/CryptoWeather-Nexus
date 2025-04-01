export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  isFavorite?: boolean;
}

export interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
  favorites: string[];
}

export interface CryptoWebSocketMessage {
  type: "price_update";
  data: {
    id: string;
    price: number;
    priceChange24h: number;
  };
}
