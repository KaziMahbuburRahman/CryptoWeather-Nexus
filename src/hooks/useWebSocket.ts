import { websocketService } from "@/services/websocket";
import { CryptoWebSocketMessage } from "@/types/crypto";
import { useCallback, useEffect } from "react";

export function useWebSocket(
  onMessage: (message: CryptoWebSocketMessage) => void,
  dependencies: any[] = []
) {
  const handleMessage = useCallback(onMessage, dependencies);

  useEffect(() => {
    const unsubscribe = websocketService.subscribeToUpdates(handleMessage);
    return () => {
      unsubscribe();
    };
  }, [handleMessage]);

  return {
    isConnected: websocketService !== null,
  };
}
