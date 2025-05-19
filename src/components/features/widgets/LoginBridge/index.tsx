"use client";

import Bridge from "@/components/common/entities/Bridge";
import { useKakaoLoginMutate } from "@/hooks/query/login/useKakaoLoginMutate";
import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";

export default function LoginBridge() {
  const { mutate: kakaoLogin } = useKakaoLoginMutate();

  const onRequest = useCallback(
    (requestMessage: MessageEventRequestData): MessageEventResponseData => {
      const { method, name } = requestMessage;

      if (method !== "POST")
        return { status: "error", name, data: "올바른 메서드가 아닙니다" };

      if (name === "request-kakao") {
        kakaoLogin();
        return { status: "success", name };
      }

      return {
        status: "error",
        name,
        data: "올바른 요청이 아닙니다",
      };
    },
    [kakaoLogin]
  );

  return <Bridge onRequest={onRequest} />;
}
