import Spacing from "@shared/layout/Spacing";
import AppleLoginButton from "@/components/features/widgets/AppleLoginButton";
import KakaoLoginButton from "@/components/features/widgets/KakaoLoginButton";

export default function LoginButtonSection() {
  return (
    <section>
      <KakaoLoginButton />

      <Spacing size={4} />

      <AppleLoginButton />
    </section>
  );
}
