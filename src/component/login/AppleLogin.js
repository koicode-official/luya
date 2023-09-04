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