import { websocketService } from "@/services/websocket";
import { CryptoWebSocketMessage } from "@/types/crypto";
import { useCallback, useEffect } from "react";

export function useWebSocket(
  onMessage: (message: CryptoWebSocketMessage) => void,
  dependencies: any[] = []
) {
  const handleMessage = useCallback(onMessage, dependencies);

  useEffect(() => {
    websocketService.setCallbacks({
      onCryptoUpdate: (data) => {
        handleMessage({
          type: "price_update",
          data: {
            id: data.id,
            price: data.price,
            priceChange24h: data.priceChange24h,
          },
        });
      },
    });

    return () => {
      websocketService.setCallbacks({});
    };
  }, [handleMessage]);

  return {
    isConnected: websocketService !== null,
  };
}
