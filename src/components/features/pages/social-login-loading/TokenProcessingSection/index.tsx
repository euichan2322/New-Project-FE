"use client";

import Flex from "@shared/layout/Flex";
import Spinner from "@shared/ui/Spinner";
import useSaveAuthToken from "@hooks/feature/useSaveAuthToken";
import useSendToken from "@hooks/common/useSendToken";

export default function TokenProcessingSection() {
  useSaveAuthToken();
  useSendToken();

  return (
    <section className="h-screen">
      <Flex
        flexDirection="flex-row"
        justifyContent="justify-center"
        alignItems="items-center"
        height="full"
      >
        <Spinner size={"md"} />
        <div />
      </Flex>
    </section>
  );
}
