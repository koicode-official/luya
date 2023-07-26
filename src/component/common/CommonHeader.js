"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { BiUserCircle } from "react-icons/bi";

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

function CommonHeader() {

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {/* <Backward>
          <Link href="/">
            <Image
              src="/img/left-arrow.png"
              width={20}
              height={20}
              alt="backward arrow"
            ></Image>
          </Link>
        </Backward> */}
        <HeaderTitle>
          <Image width={80} height={45} src="/img/logo/logo_text06.png" alt="Luya"></Image>
        </HeaderTitle>
        {/* <ProfileContainer>
          <Profile>
           <BiUserCircle size={32}></BiUserCircle>
          </Profile>
        </ProfileContainer> */}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default CommonHeader;