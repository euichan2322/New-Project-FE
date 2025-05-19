import { useBridge } from "@/hooks/common/useBridge";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSendToken = () => {
  const searchParams = useSearchParams();
  const { request } = useBridge();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (!accessToken && !refreshToken) return;

    request({
      requestMessage: {
        name: "put-token",
        method: "POST",
        body: {
          accessToken,
          refreshToken,
        },
      },
    });
  }, [accessToken, refreshToken, request]);
};

export default useSendToken;
