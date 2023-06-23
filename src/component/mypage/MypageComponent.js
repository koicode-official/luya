"use client"
import styled from "styled-components"
import { CommonWrapper } from "../common/CommonComponent";

const MypageWrapper = styled(CommonWrapper)``
const MypageContainer = styled.div`
  margin: 30px 0 60px;

`

function MypageComponent() {
  return (
    <MypageWrapper>
      <MypageContainer>
        <h3>마이페이지 개발예정</h3>
      </MypageContainer>
    </MypageWrapper>
  );
}

export default MypageComponent;