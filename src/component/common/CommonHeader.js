"use client"
import styled, { css } from "styled-components"
import Image from "next/image"
import { usePathname } from "next/navigation";
import { BiSolidUserCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useQuery } from "react-query";
import useCustomAxios from "@/utils/UseCustomAxios";
import { common } from "../../../public/js/common";
import { useRouter } from "next/navigation";
import useLoginInfo from "@/utils/useLoginInfo/useLoginInfo";


const HeaderWrapper = styled.div`
  width: 100%;

`

const HeaderContainer = styled.div`
  display: flex ;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  height: 69px;
  background-color: var(--color-set05);
  padding: 10px 20px;
`

const HeaderTitle = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  font-size: 24px;
  font-weight: 800;
  color: #fefefe;
  height: 45px;
`

const Backward = styled.div`
  img{
    opacity: 0.4;
    
  }
`


const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
`
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #fefefe;
  font-weight: 300;
`

const ProfileMenuListContainer = styled.div`
  width: 100%;
  display: flex;
  
`
const ProfileBackground = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 50%;
  height: calc(100vh - 70px);
  background-color: transparent;
  z-index: 999;
`

const ProfileMenuList = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 69px;
  right: 0%;
  transform: translate(150%, 0);
  background-color: #fefefe;
  width: 40%;
  height: auto;
  /* height: calc(100vh - 70px); */
  padding: 10px 10px 0;
  z-index: 9999;
  transition: all .4s ease;
  border: 1px solid #e5e5e5;

  ${props => props.active === true ?
    css`
    transform: translate(0%, 0);
  `
    :
    css`
      transform: translate(150%, 0);
  `
  }

`

const ProfileMenu = styled.ul`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  color: var(--color-set07);
  font-size: 14px;
  width: 100%;
`

const MenuContainer = styled.li`
   display: flex ;
   justify-content: flex-end;
   align-items: center;
   width: fit-content;
    margin-bottom: 12px;
    p{
      margin-right: 4px;
    }
`

function CommonHeader() {
  const router = useRouter();
  const axios = useCustomAxios();
  const [isLogin, setIsLogin] = useState(false);
  const pathName = usePathname();
  const [profileState, setProfileState] = useState(false);
  const loginHook = useLoginInfo();


  const requestLogout = async () => {
    return await axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/login/logout`,
    })
  }


  const { refetch: requestLogoutRefetch } = useQuery('requestLogout', requestLogout, {
    enabled: false,
    onSuccess: (res) => {
      loginHook.saveLoginInfo(false, 0)

      // common.setItemWithExpireTime("loggedIn", false, 0);
      location.href = "/login"
    },
    onError: (error) => {
      console.error("Error Occured : ", error);
    }
  });


  const logout = () => {
    setIsLogin(false);
    requestLogoutRefetch();
  }




  useEffect(() => {


    const fetchLoginStatus = async () => {
      try {
        const loginInfo = await loginHook.fetchLoginInfo();
        if (loginInfo) {
          setIsLogin(loginInfo);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error fetching login info:", error);
      }
    };
    fetchLoginStatus();

    handelClose();
  }, [pathName])


  const handleProfile = () => {
    setProfileState(prev => {
      return !prev
    });
  }

  const handelClose = () => {
    setProfileState(prev => {
      return false
    });
  }




  useEffect(() => {

    return () => {
      setProfileState(prev => {
        return false
      });
    }
  }, [])

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle onClick={() => { router.push("/") }}>
          <Image priority={true} width={80} height={45} src="/img/logo/logo_text06.png" alt="Luya"></Image>
        </HeaderTitle>
        {isLogin &&
          <ProfileContainer >
            <Profile onClick={handleProfile}>
              <BiSolidUserCircle size={28}></BiSolidUserCircle>
            </Profile>
            <ProfileMenuListContainer>
              <ProfileMenuList active={profileState}>
                <AiFillCloseCircle width={10} onClick={handelClose}> </AiFillCloseCircle>
                <ProfileMenu>
                  <MenuContainer onClick={logout}> <p>로그아웃</p><FiLogOut width={10}></FiLogOut></MenuContainer>
                  <MenuContainer onClick={() => { router.push("/advice/list") }}> <p>고민/질문</p><HiOutlineDocumentText width={10}></HiOutlineDocumentText></MenuContainer>
                </ProfileMenu>
              </ProfileMenuList>
            </ProfileMenuListContainer>
          </ProfileContainer>
        }
      </HeaderContainer>
    </HeaderWrapper >
  );
}

export default CommonHeader;