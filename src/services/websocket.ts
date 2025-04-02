import { CryptoData, WeatherData } from "@/types";
import { Notification } from "@/types/notifications";

type WebSocketCallback = {
  onCryptoUpdate?: (data: CryptoData) => void;
  onWeatherUpdate?: (data: WeatherData) => void;
  onNotification?: (notification: Notification) => void;
};

export class WebSocketService {
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
          console.log("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.log("WebSocket error:", error);
      };
    } catch (error) {
      console.log("Error creating WebSocket:", error);
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
      console.log("Max reconnection attempts reached");
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

          // Generate price alert notification for significant changes
          this.generatePriceAlert(id, price);
        }
      });
    }
  }

  private generatePriceAlert(id: string, currentPrice: number) {
    // Simulate price alerts for significant changes
    const threshold = 0.02; // 2% change threshold
    const randomChange = (Math.random() - 0.5) * 2 * threshold;

    if (Math.abs(randomChange) > threshold) {
      const notification: Notification = {
        id: `price_${Date.now()}`,
        type: "price_alert",
        title: `${id.charAt(0).toUpperCase() + id.slice(1)} Price Alert`,
        message: `${id.charAt(0).toUpperCase() + id.slice(1)} has ${
          randomChange > 0 ? "increased" : "decreased"
        } by ${Math.abs(randomChange * 100).toFixed(2)}%`,
        timestamp: Date.now(),
        read: false,
      };

      if (this.callbacks.onNotification) {
        this.callbacks.onNotification(notification);
      }
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
