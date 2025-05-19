import Flex from "@/components/common/shared/layout/Flex";
import Text from "@/components/common/shared/ui/Text";
import Image from "next/image";
import Apple_Logo from "@/icons/Apple_Logo.svg";
import Button from "@/components/common/shared/ui/Button";

export default function AppleLoginButton() {
  return (
    <Button color="black" size="lg" fullWidth={true}>
      <Flex
        flexDirection="flex-row"
        alignItems="items-center"
        justifyContent="justify-center"
        gap={3}
      >
        <Image src={Apple_Logo} alt="애플 로고" />
        <Text color="text-white" fontSize="text-sm" fontWeight="font-semibold">
          Apple로 계속하기
        </Text>
      </Flex>
    </Button>
  );
}
