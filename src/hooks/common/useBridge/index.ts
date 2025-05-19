"use client";

import type {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useEffect } from "react";

type EventHandler = (event: MessageEvent) => void;

interface RequestProps<T> {
  requestMessage: MessageEventRequestData;
  responseCallback?: (resMessage: MessageEventResponseData<T>) => void;
}

const eventHandlers: EventHandler[] = [];

export const useBridge = () => {
  useEffect(() => {
    return () => {
      eventHandlers.forEach((handler) => {
        window.removeEventListener("message", handler);
      });
      eventHandlers.length = 0;
    };
  }, []);

  const request = <T>({
    requestMessage,
    responseCallback,
  }: RequestProps<T>) => {
    window.ReactNativeWebView?.postMessage(JSON.stringify(requestMessage));

    const handler = (event: MessageEvent) => {
      if (event.data.name !== requestMessage.name) return;
      if (!responseCallback) return;
      responseCallback(event.data);
    };

    eventHandlers.push(handler);

    window.addEventListener("message", handler);
  };

  return { request };
};
