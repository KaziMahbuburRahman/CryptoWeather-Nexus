import { CryptoData } from "@/types/crypto";
import { WeatherData } from "@/types/weather";

type WebSocketCallback = {
  onCryptoUpdate?: (data: CryptoData) => void;
  onWeatherAlert?: (data: WeatherData) => void;
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 3000;
  private callbacks: WebSocketCallback = {};

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // Connect to CoinCap WebSocket
      this.ws = new WebSocket(
        "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano"
      );

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleCryptoUpdate(data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );
      setTimeout(() => this.connect(), this.reconnectTimeout);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  private handleCryptoUpdate(data: any) {
    if (this.callbacks.onCryptoUpdate) {
      Object.entries(data).forEach(([id, priceData]: [string, any]) => {
        // CoinCap WebSocket sends price directly as a number
        const price = parseFloat(priceData);
        if (!isNaN(price)) {
          this.callbacks.onCryptoUpdate({
            id,
            price,
            // Don't update priceChange24h from WebSocket, keep existing value
            priceChange24h: 0,
            // Other fields will be updated from REST API
            name:
              id === "cardano"
                ? "Cardano"
                : id.charAt(0).toUpperCase() + id.slice(1),
            symbol: id === "cardano" ? "ADA" : id.toUpperCase(),
            marketCap: 0,
            volume24h: 0,
            circulatingSupply: 0,
            isFavorite: false,
          });
        }
      });
    }
  }

  // Simulate weather alerts
  public simulateWeatherAlert(weatherData: WeatherData) {
    if (this.callbacks.onWeatherAlert) {
      this.callbacks.onWeatherAlert(weatherData);
    }
  }

  public setCallbacks(callbacks: WebSocketCallback) {
    this.callbacks = callbacks;
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const websocketService = new WebSocketService();
