"use client"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { FaRobot } from "react-icons/fa";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react"




const CommonFooterWrpper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fafafa;

`

const CommonFooterContainer = styled.div`
  border-top: 1px solid #e5e5e5;
  /* border-top: 1px solid #e2a26a; */

  padding: 20px;
`

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 10px; */
`
const Menu = styled.li`
  width:20%;
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
  p{
  ${props => props.active === true ? "color:var(--color-set04);" : "color:var(--color-set07);"}
  }
`
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  ${props => props.active === true ? "color:var(--color-set04);" : "color:var(--color-set07);"}
`

function CommonFooter() {
  const [activePath, setActivePath] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  console.log('pathname', pathname)


  return (
    <CommonFooterWrpper>
      <CommonFooterContainer>
        <MenuList>
          <Menu active={pathname === "/home"}>
            <Link href="/home">
              <IconContainer active={pathname === "/home"}>
                <AiFillHome size={26}></AiFillHome>
              </IconContainer>
              <p>홈</p>
            </Link>
          </Menu>
          <Menu active={pathname === "/advice"}>
            <Link href="/advice">
              <IconContainer active={pathname === "/advice"}>
                <FaRobot size={26}></FaRobot>
              </IconContainer>
              <p>루야AI</p>
            </Link>
          </Menu>
          <Menu active={pathname === "/pray"}>
            <Link href="/pray?completed=0">
              <IconContainer active={pathname === "/pray"}>
                <PiHandsPrayingDuotone size={26}></PiHandsPrayingDuotone>
              </IconContainer>
              <p>기도제목</p>
            </Link>
          </Menu>
          <Menu active={pathname === "/mypage"}>
            <Link href="/mypage">
              <IconContainer active={pathname === "/mypage"} >
                <FiSettings size={26}></FiSettings>
              </IconContainer>
              <p>마이페이지</p>
            </Link>
          </Menu>
        </MenuList>
      </CommonFooterContainer>
    </CommonFooterWrpper>
  );
}

export default CommonFooter;