"use client"
import styled from "styled-components"
import { CommonWrapper } from "../common/CommonComponent"
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { useEffect } from "react";


const AppleLoginWrapper = styled(CommonWrapper)`
  
`
const AppleLoginContainer = styled.div`
  
`

function AppleLogin() {


  const signup = async () => {
    return await axios({
      method: "POST",
      withCredentials: true,
      data: formData,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/signup/create`,
    })
  }


  const { refetch: signupRefetch } = useQuery('signup', signup, {
    enabled: false,
    onSuccess: (res) => {
      console.log('res', res)

    },
    onError: (error) => {
      alertHook.alert("회원가입에 실패했습니다. 다시 시도해주세요.", () => router.replace('/signup'));
      console.error('회원가입 실패:', error);
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
      console.log(event.detail.data);
    };

    // 인증 실패를 처리하기 위한 이벤트 리스너 추가
    const failureHandler = (event) => {
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