"use client";

import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useEffect } from "react";

interface BridgeProps {
  onRequest: (reqMessage: MessageEventRequestData) => MessageEventResponseData;
}

type Flag = 0 | 1;

interface WebviewHandshake {
  name: "webview-handshake";
  flag: {
    syn: Flag;
    ack: Flag;
  };
}

const TIMEOUT = 1000;

function postMessage<Data>(
  message: MessageEventResponseData<Data> | WebviewHandshake
) {
  window.ReactNativeWebView?.postMessage(JSON.stringify(message));
  document.ReactNativeWebView?.postMessage(JSON.stringify(message));
}

export default function Bridge({ onRequest }: BridgeProps) {
  useEffect(() => {
    const handleMessage = ({ data }: MessageEvent) => {
      try {
        const requestMessage =
          typeof data === "string" ? JSON.parse(data) : data;

        if (requestMessage && requestMessage.method && requestMessage.name) {
          const responseMessage = onRequest(
            requestMessage as MessageEventRequestData
          );
          postMessage(responseMessage);
        }
      } catch (error) {
        console.error("메시지 처리 중 오류 발생:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [onRequest]);

  useEffect(() => {
    const postHandShakeMessage = (syn: Flag, ack: Flag) => {
      postMessage({ name: "webview-handshake", flag: { syn, ack } });
    };
    postHandShakeMessage(1, 0);

    const timeoutId = setTimeout(() => {
      postHandShakeMessage(1, 0);
    }, TIMEOUT);

    const handleMessage = (event: MessageEvent) => {
      event.stopPropagation();
      try {
        const {
          name,
          flag: { syn, ack },
        } =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (name === "webview-handshake" && syn === 1 && ack === 1) {
          postHandShakeMessage(0, 1);

          if (timeoutId) clearTimeout(timeoutId);

          window.removeEventListener("message", handleMessage);
        }
      } catch (error) {
        console.error("handshake 중 에러 발생:", error);
      }
    };

    window.addEventListener("message", handleMessage);
  }, []);

  return null;
}
