import { CryptoWebSocketMessage } from "@/types/crypto";

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers: ((message: CryptoWebSocketMessage) => void)[] = [];

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // TODO: Replace with actual WebSocket URL
      this.socket = new WebSocket("wss://api.coincap.io/v2/ws");

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        this.subscribe();
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as CryptoWebSocketMessage;
          this.messageHandlers.forEach((handler) => handler(message));
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.socket.onclose = () => {
        console.log("WebSocket disconnected");
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.handleReconnect();
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
      setTimeout(
        () => this.connect(),
        this.reconnectDelay * this.reconnectAttempts
      );
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  private subscribe() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const subscribeMessage = {
        type: "subscribe",
        channels: ["prices"],
      };
      this.socket.send(JSON.stringify(subscribeMessage));
    }
  }

  public subscribeToUpdates(
    handler: (message: CryptoWebSocketMessage) => void
  ) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const websocketService = new WebSocketService();
