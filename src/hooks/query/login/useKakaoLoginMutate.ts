import postKakaoLogin, { KAKAO_LOGIN_URI } from "@api/v1/oauth/kakao";
import { useMutation } from "@tanstack/react-query";

export const useKakaoLoginMutate = () => {
  return useMutation({
    mutationKey: [KAKAO_LOGIN_URI],
    mutationFn: postKakaoLogin,
  });
};
