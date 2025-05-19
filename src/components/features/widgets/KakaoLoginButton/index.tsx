"use client";

import Flex from "@/components/common/shared/layout/Flex";
import Text from "@/components/common/shared/ui/Text";
import Image from "next/image";
import Kakao_Logo from "@/icons/Kakao_Logo.svg";
import Button from "@/components/common/shared/ui/Button";
import useKakaoLogin from "@/hooks/login/useKakaoLogin";

export default function KakaoLoginButton() {
  const { onKakaoLogin } = useKakaoLogin();

  return (
    <Button
      color="kakaoYellow"
      size="lg"
      fullWidth={true}
      onClick={onKakaoLogin}
    >
      <Flex
        flexDirection="flex-row"
        alignItems="items-center"
        justifyContent="justify-center"
        gap={3}
      >
        <Image src={Kakao_Logo} alt="카카오 로고" />
        <Text fontWeight="font-semibold" fontSize="text-sm">
          카카오톡으로 3초만에 시작하기
        </Text>
      </Flex>
    </Button>
  );
}
