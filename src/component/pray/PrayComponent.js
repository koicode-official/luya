"use client"
import styled from "styled-components"
import PrayList from "./PrayList"
import PrayTitle from "./PrayTitle"
import Image from "next/image"
import Link from "next/link"
import { CommonWrapper } from "../common/CommonComponent"
import { FaPen } from "react-icons/fa";



const PrayWrapper = styled(CommonWrapper)``
const PrayContainer = styled.div`

  display: flex;
  /* align-items: center; */
  flex-direction: column;
  margin: 30px 0 60px;
  width: 100%;
  padding: 0 20px;
 
`

const PrayRegButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45%;
  height: 90px;
  background-color: #e2a26a;
  border-radius: 10px;
  color:#fefefe;
  margin-bottom: 30px;
  box-shadow: 0px 2px 5px rgba(120, 120, 120, 0.2);
  svg{
    margin-bottom: 4px;
  }

`

const KaKaoShareButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 45%;
  height: 90px;
  border-radius: 10px;
  background-color: #F7E600;
  padding:  20px;
  color:#3A1D1D ;
  margin-bottom: 24px;
  box-shadow: 0px 2px 5px rgba(120, 120, 120, 0.2);
  cursor: pointer;
  img{
    margin-bottom: 4px;
  }
`

const PrayHeader = styled.div`
  display: flex;
  
    h3{
      margin-bottom: 24px;
      margin-left: 4px;
      font-weight: 400;
    }
`


const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`
function PrayComponent() {
  return (
    <PrayWrapper>
      <PrayContainer>
        <PrayHeader>
          <h3>기도제목</h3>
        </PrayHeader>
        {/* <PrayTitle></PrayTitle> */}
        <PrayList></PrayList>
        <ButtonGroup>
          <PrayRegButton
            href="/pray/add"
          >
            <FaPen size={24}></FaPen>
            작성하기
          </PrayRegButton>
          <KaKaoShareButtonContainer>
            <Image
              src="/img/kakaotalkIcons.png"
              width={24}
              height={24}
              alt="kakaotalk icon"
            ></Image>
            <p>
              공유하기
            </p>
          </KaKaoShareButtonContainer>
        </ButtonGroup>
      </PrayContainer>

    </PrayWrapper>
  );
}

export default PrayComponent;