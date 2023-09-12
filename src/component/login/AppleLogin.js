"use client"
import styled from "styled-components"
import { CommonWrapper } from "../common/CommonComponent"
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from "react";
import useCustomAxios from "@/utils/UseCustomAxios";
import useLoginInfo from "@/utils/useLoginInfo/useLoginInfo";


const AppleLoginWrapper = styled.div`
  
`
const AppleLoginContainer = styled.div`
  
`

function AppleLogin() {
  const axios = useCustomAxios();
  const [isExist, setIsExist] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  const loginHook = useLoginInfo();


  const checkId = async () => {
    console.log('loginInfo', loginInfo)
    return await axios({
      method: "GET",
      withCredentials: true,
      params: loginInfo,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/login/applelogin`,
    });
  };


  const { refetch } = useQuery(['checkId', loginInfo], checkId, {
    enabled: false,
    onSuccess: res => {
      if (res.data.status === "exist") {
        console.log('res.data', res.data.data)
        mutate()
      } else {
        router.push("/signup");
      }
    },
    onError: error => {
      console.error('로그인 실패:', error);
    }
  });


  const login = async (authorization) => {
    return await axios({
      method: "POST",
      withCredentials: true,
      data: { auth: authorization },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/login/applelogin`,
    });
  };

  const { mutate } = useMutation((authorization) => login(authorization), {
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


  useEffect(() => {
    AppleID.auth.init({
      clientId: 'kr.co.luya.signup',
      scope: 'name email',
      redirectURI: 'https://luya.co.kr/signup/apple',
      state: 'signin',	//csrf, php의 openssl_random_pseudo_bytes
      usePopup: true	// or false defaults to false
    });
  }, [])

  useEffect(() => {
    // 성공한 인증 응답을 처리하기 위한 이벤트 리스너 추가
    const successHandler = (event) => {
      setLoginInfo(event.detail.authorization);
      refetch();
    };

    // 인증 실패를 처리하기 위한 이벤트 리스너 추가
    const failureHandler = (event) => {
      console.log('event', event)
      console.log(event.detail.error);
    };


    // 이벤트 리스너를 document에 연결
    document.addEventListener('AppleIDSignInOnSuccess', successHandler);
    document.addEventListener('AppleIDSignInOnFailure', failureHandler);

    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('AppleIDSignInOnSuccess', successHandler);
      document.removeEventListener('AppleIDSignInOnFailure', failureHandler);
    };
  }, []);  // 빈 dependency 배열을 사용하여 이 effect를 컴포넌트 마운트시에만 실행




  return (
    <AppleLoginWrapper>
      <AppleLoginContainer>
        <div
          id="appleid-signin"
          data-mode="center-align"
          data-type="sign-in"
          data-color="black"
          data-border="false"
          data-border-radius="14"
          data-width="230"
          data-height="40"
        ></div>
      </AppleLoginContainer>
    </AppleLoginWrapper>
  );
}

export default AppleLogin;