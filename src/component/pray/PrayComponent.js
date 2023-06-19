"use client"
import styled from "styled-components"
import PrayList from "./PrayList"
import PrayTitle from "./PrayTitle"
import Image from "next/image"
import Link from "next/link"
import { CommonWrapper } from "../common/CommonComponent"

const PrayWrapper = styled(CommonWrapper)``
const PrayContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  width: 100%;
`

const PrayRegButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 45px;
  background-color: #e2a26a;
  border-radius: 10px;
  color:#fefefe;
  margin-bottom: 30px;
`

const KaKaoShareButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: 50px;
  border-radius: 10px;
  background-color: #F7E600;
  padding: 5px 20px;
  color:#3A1D1D ;
  margin-bottom: 24px;

  cursor: pointer;
  img{
  }

`

function PrayComponent() {
  return (
    <PrayWrapper>
      <PrayContainer>
        <PrayTitle></PrayTitle>
        <PrayList></PrayList>
      </PrayContainer>
      <PrayRegButton
        href="/pray/add"
      >
        기도제목 작성하기
      </PrayRegButton>
      <KaKaoShareButtonContainer>
        <Image
          src="/img/kakaotalkIcons.png"
          width={30}
          height={30}
          alt="kakaotalk icon"
        ></Image>
        <p>
          카카오톡으로 공유하기
        </p>
      </KaKaoShareButtonContainer>
    </PrayWrapper>
  );
}

export default PrayComponent;