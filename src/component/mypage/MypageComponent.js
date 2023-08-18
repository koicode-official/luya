"use client"
import styled from "styled-components"
import { CommonButton, CommonWrapper } from "../common/CommonComponent";
import { useQuery } from "react-query";
import useCustomAxios from "@/utils/UseCustomAxios";
import { useRouter } from "next/navigation";
import { common } from "../../../public/js/common";
import useLoginInfo from "@/utils/useLoginInfo/useLoginInfo";


// import MypageMenuList from "./MypageMenuList";
const MypageWrapper = styled(CommonWrapper)`
`
const MypageContainer = styled.div`
  width: 100%;
  margin: 30px 0 60px;
  h2{
    text-align: center;
  }
`

const LogoutButtonContainer = styled.div`
  display: flex ;
  justify-content: center ;
  width: 100%;
`

const LogoutButton = styled(CommonButton)`
  background-color: var(--color-set02);
  color: var(--color-set07);
`
function MypageComponent() {
  const axios = useCustomAxios();
  const router = useRouter();
  const loginHook = useLoginInfo();



  const logOut = async () => {
    return await axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/login/logout`,
    })
  }

  const { refetch: logOutRefetch } = useQuery("logOut", logOut, {
    enabled: false,
    onSuccess: response => {
      if (response.data.status === "success") {
        loginHook.saveLoginInfo(false,0);
        // common.setItemWithExpireTime("loggedIn", false, 0);
        router.push("/");
      }
    },
    onError: error => {
      console.log("Error Occured : ", error);
    }
  });

  const handleLogOut = () => {
    logOutRefetch();
  }
  return (
    <MypageWrapper>
      <MypageContainer>
        <h2>개발 예정</h2>
        {/* <MypageMenuList></MypageMenuList> */}
      </MypageContainer>
      <LogoutButtonContainer>
        <LogoutButton onClick={handleLogOut}>
          로그아웃
        </LogoutButton>
      </LogoutButtonContainer>
    </MypageWrapper>
  );
}

export default MypageComponent;