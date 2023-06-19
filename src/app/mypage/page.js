"use client"
import styled from "styled-components"
import MypageComponent from "@/component/mypage/MypageComponent";

const MypageMainWrapper = styled.div``


function MypageMain() {
  return (
    <MypageMainWrapper>
      <MypageComponent></MypageComponent>
    </MypageMainWrapper>
  );
}

export default MypageMain;