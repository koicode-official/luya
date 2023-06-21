"use client"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"

const CommonFooterWrpper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fefefe;
`

const CommonFooterContainer = styled.div`
  border-top: 1px solid #e5e5e5;
  /* border-top: 1px solid #e2a26a; */

  padding: 20px 30px;
`

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const Menu = styled.li`
  
  font-size: 14px;
  cursor: pointer;
  img{
    margin-bottom: 6px;
    object-fit: cover;
  }
  a{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
  }
`

function CommonFooter() {

  return (
    <CommonFooterWrpper>
      <CommonFooterContainer>
        <MenuList>
          <Menu>
            <Link href="/home">
              <Image src="/img/home.png" width={26} height={26} alt="home menu icon"></Image>
              홈
            </Link>
          </Menu>
          <Menu>
            <Link href="/advice">
              <Image src="/img/question.png" width={26} height={26} alt="advice menu icon"></Image>
              루야AI
            </Link>
          </Menu>
          <Menu>
            <Link href="/pray?completed=0">
              <Image src="/img/praying.png" width={26} height={26} alt="pray menu icon"></Image>
              기도제목
            </Link>
          </Menu>
          <Menu>
            <Link href="/mypage">
              <Image src="/img/settings.png" width={26} height={26} alt="mypage menu icon"></Image>
              마이페이지
            </Link>
          </Menu>
        </MenuList>
      </CommonFooterContainer>
    </CommonFooterWrpper>
  );
}

export default CommonFooter;