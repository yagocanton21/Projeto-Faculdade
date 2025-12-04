import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types';

export const useWebSocket = (url?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const attempts = useRef(0);

  // Build default URL if none provided: use current host and /api as WebSocket endpoint
  const buildUrl = () => {
    if (url) return url;
    if (typeof window === 'undefined') return '';
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    // use trailing slash to avoid nginx redirect from /api -> /api/ which breaks WS upgrade
    return `${protocol}://${window.location.host}/api/`;
  };

  useEffect(() => {
    const wsUrl = buildUrl();
    if (!wsUrl) return;

    const connect = () => {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        attempts.current = 0;
        setIsConnected(true);
        console.log('WebSocket conectado', wsUrl);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastMessage(message);
        } catch (error) {
          console.error('Erro ao parsear mensagem:', error);
        }
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket desconectado, tentando reconectar...');
        // reconectar com backoff exponencial simples
        attempts.current += 1;
        const timeout = Math.min(30000, 1000 * 2 ** attempts.current);
        reconnectTimer.current = window.setTimeout(() => connect(), timeout);
      };

      ws.current.onerror = (error) => {
        console.error('Erro no WebSocket:', error);
      };
    };

    connect();

    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      ws.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = (message: WebSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { isConnected, lastMessage, sendMessage };
};
