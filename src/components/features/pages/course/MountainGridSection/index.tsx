"use client";

import { useBridge } from "@/hooks/common/useBridge";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { useCallback } from "react";

export default function MountainGridSection() {
  const { request } = useBridge();

  const postNavigateMessage = useCallback(
    (mountainName: string) => {
      request({
        requestMessage: {
          method: "POST",
          name: "request-navigate",
          body: {
            mountainName,
          },
        },
      });
    },
    [request]
  );

  return (
    <section className="flex grow gap-4">
      <div className="flex flex-col w-full h-fit gap-4">
        <button
          className="h-72 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url('/images/mudeungsan.jpg')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => postNavigateMessage("무등산")}
        >
          <div className="absolute top-0 right-0 bg-black opacity-40 w-full h-full" />
          <div className="absolute top-6 right-4">
            <Text
              fontSize="text-4xl"
              fontWeight="font-bold"
              color="text-white"
              zIndex="z-10"
            >
              광주
            </Text>
          </div>
          <Text
            fontSize="text-4xl"
            fontWeight="font-bold"
            color="text-white"
            zIndex="z-10"
          >
            무등산
          </Text>
        </button>

        {/* TODO: 실제 산으로 변경하기 */}
        <div className="h-72 bg-amber-100 rounded-2xl" />
        <div className="h-72 bg-amber-100 rounded-2xl" />
      </div>
      <div className="flex flex-col w-full h-fit gap-4">
        <Spacing size={12} />
        <div className="h-72 bg-amber-100 rounded-2xl" />
        <div className="h-72 bg-amber-100 rounded-2xl" />
        <div className="h-72 bg-amber-100 rounded-2xl" />
      </div>
    </section>
  );
}
