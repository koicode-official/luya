"use client"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"

import { FaRobot } from "react-icons/fa";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";



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
`
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
`

function CommonFooter() {

  return (
    <CommonFooterWrpper>
      <CommonFooterContainer>
        <MenuList>
          <Menu>
            <Link href="/home">
              <IconContainer>
                <AiFillHome size={26}></AiFillHome>
              </IconContainer>
              홈
            </Link>
          </Menu>
          <Menu>
            <Link href="/advice">
              <IconContainer>
                <FaRobot size={26}></FaRobot>
              </IconContainer>
              루야AI
            </Link>
          </Menu>
          <Menu>
            <Link href="/pray?completed=0">
              <IconContainer>
                <PiHandsPrayingDuotone size={26}></PiHandsPrayingDuotone>
              </IconContainer>
              기도제목
            </Link>
          </Menu>
          <Menu>
            <Link href="/mypage">
              <IconContainer>
                <FiSettings size={26}></FiSettings>
              </IconContainer>
              마이페이지
            </Link>
          </Menu>
        </MenuList>
      </CommonFooterContainer>
    </CommonFooterWrpper>
  );
}

export default CommonFooter;