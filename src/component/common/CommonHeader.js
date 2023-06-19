"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
const HeaderWrapper = styled.div`
  width: 100%;
`

const HeaderContainer = styled.div`
  display: flex ;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  min-height: 56px;
  padding: 0 30px;
  border-bottom: 1px solid #e5e5e5;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #fefefe;
  margin-bottom: -10px;
`

const HeaderTitle = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  font-size: 24px;
  font-weight: 800;
  color:#e2a26a;
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
    border-radius: 50%;
    width: 40px;
    height: 40px;
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
        <HeaderTitle>LUYA</HeaderTitle>
        <ProfileContainer>
          <Profile>
            <Image
              src="/img/profile.png"
              width={40}
              height={40}
              alt="header profile"
            >
            </Image>
          </Profile>
        </ProfileContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default CommonHeader;