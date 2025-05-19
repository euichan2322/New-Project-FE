import { instance } from "@api/_instances";

export const KAKAO_LOGIN_URI = `api/v1/oauth/kakao`;

const postKakaoLogin = async () => await instance.post(KAKAO_LOGIN_URI, {});

export default postKakaoLogin;
