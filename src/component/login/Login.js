"use client"
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { CommonButton, CommonInput } from '../common/CommonComponent';
import { useRouter } from 'next/navigation';
import useCustomAxios from "../../utils/UseCustomAxios";
import useAlert from '@/utils/useAlert/UseAlert';
import { common } from '../../../public/js/common';
import Image from 'next/image';
import useLoginInfo from "@/utils/useLoginInfo/useLoginInfo";
import AppleLogin from './AppleLogin';


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 30px 0;
`;

const LoginTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  width: 100%;
`;

const Input = styled(CommonInput)``;

const LoginButton = styled(CommonButton)`
 font-size:16px;
 height: 40px;

`;
const SignUpButton = styled.div`
  text-decoration: underline;
  text-align: right;
  font-size:16px;
  height: 40px;

`;

const KakaoLogin = styled(CommonButton)`
 display:flex;
 justify-content: center;
 align-items: center;
 color : #000000;
 background : #FEE500;
 border : none;
 font-size:16px;
 height: 40px;

 img{
  margin-right: 12px;
 }
`
const Login = () => {
  const axios = useCustomAxios();
  const router = useRouter();
  const alertHook = useAlert();
  const [useremail, setuseremail] = useState('');
  const [password, setPassword] = useState('');
  const loginHook= useLoginInfo();


  const login = async () => {
    return await axios({
      method: "POST",
      withCredentials: true,
      data: { USER_EMAIL: useremail, USER_PASSWORD: password },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/login`,
    });
  };

  const { refetch: loginRefetch } = useQuery('login', login, {
    enabled: false,
    onSuccess: (res) => {
      const data = res.data;
      if (data.status === "not found") {
        alertHook.alert("아이디가 존재하지 않습니다.", () =>
          router.replace('/login')
        );
      } else if (data.status === "fail" && data.error === "Wrong password") {
        alertHook.alert("비밀번호가 일치하지 않습니다.", () =>
          router.replace('/login')
        );
      } else {
        loginHook.saveLoginInfo(true, 12960000);
        // common.setItemWithExpireTime("loggedIn", true, 12960000);
        router.replace("/");
      }
    },
    onError: (error) => {
      // 로그인 실패 시 에러 처리
      alertHook.alert("로그인에 실패했습니다. 다시 시도해주세요.", () =>
        router.replace('/login')
      );
      console.error('로그인 실패:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRefetch();
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };


  const handleKakaoLogin = (e) => {
    e.stopPropagation(); 
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN + "/login/kakaologin"}`
    location.href = KAKAO_AUTH_URL;
  }


  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="사용자명"
          value={useremail}
          onChange={(e) => setuseremail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handlePasswordKeyPress}
        />
        <LoginButton type="submit">로그인</LoginButton>
        <KakaoLogin
          type='button'
          onClick={handleKakaoLogin}
        >
          <Image width={20} height={20} src="/img/kakaoLogin.png" alt="카카오 로그인"></Image>
          카카오로 시작하기
        </KakaoLogin>
        <AppleLogin></AppleLogin>
        <SignUpButton  onClick={() => router.push("/signup")}>
          회원가입
        </SignUpButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
