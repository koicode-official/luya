"use client"
import styled from "styled-components"
import { CommonWrapper } from "../common/CommonComponent";
import MypageMenuList from "./MypageMenuList";
const MypageWrapper = styled(CommonWrapper)`
`
const MypageContainer = styled.div`
  width: 100%;
  margin: 30px 0 60px;
  h2{
    text-align: center;
  }
`

function MypageComponent() {
  return (
    <MypageWrapper>
      <MypageContainer>
        <h2>개발 예정</h2>
        {/* <MypageMenuList></MypageMenuList> */}
      </MypageContainer>
    </MypageWrapper>
  );
}

export default MypageComponent;