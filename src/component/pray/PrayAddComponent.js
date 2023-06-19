"use client"
import styled from "styled-components"
import BackWard from "../common/Backward"
import axios from "axios"
import { CommonButton, CommonWrapper } from "../common/CommonComponent"
import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { commonAlertState } from "@/state/common"
import { useRecoilValue, useSetRecoilState } from "recoil"

const PrayAddWrapper = styled(CommonWrapper)``
const PrayAddContainer = styled.div`
  width: 100%;
  padding: 0px 20px ;
  margin-bottom: 40px;
`

const ParyAddSubTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color:#a9a9a9;
    text-align: center;
    margin-top: 20px;
`

const PrayAddTitle = styled.div`
  margin-bottom: 50px;
  font-size: 18px;
  color:#e2a26a;
  font-weight: 400;
  text-align: center ;
`

const PrayAddHead = styled.h2`
    text-align: center;
    margin-bottom: 16px;
`


const PrayAddTextArea = styled.textarea`
    position:relative;
    resize : none;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    min-height: 150px;
    width: 100%;
    padding: 20px;
    font-weight: 500;
    font-size: 20px;
    overflow-y: auto;
    ::placeholder{
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center ;
    font-size: 14px;
    color:#777777;
  }
`

const PrayButtonContainer = styled.div`
  display:flex;
  justify-content: center;
`

const PrayAddButton = styled(CommonButton)``

function PrayAddComponent() {
  const router = useRouter();
  const [prayText, setPrayText] = useState("");
  const addAlertState = useRecoilValue(commonAlertState)
  const setAddAlertState = useSetRecoilState(commonAlertState)


  const addPray = async () => {
    return await axios({
      method: "POST",
      data: { text: prayText },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/pray/add`,
    })
  }

  const { refetch: addPrayRefetch } = useQuery(["addPray", prayText], addPray, {
    enabled: false && prayText.length !== 0,
    onSuccess: response => {
      console.log("response", response)
      if (response.data.message === "success") {
        router.replace("/pray?completed=0");
      }
    },
    onError: error => {
      console.log("Error Occured : ", error);
    }
  });

  const handlePrayText = (e) => {
    console.log(e.currentTarget.value)
    setPrayText(e.currentTarget.value);
  }

  const handleAddPray = () => {
    if (!prayText || prayText.length === 0) {
      setAddAlertState(prev => {
        return {
          active: true,
          text: "기도제목을 입력해주세요.",
        }
      })
    } else {
      console.log("here")
      setAddAlertState(prev => {
        return {
          active: true,
          text: "기도제목이 등록되었습니다.",
          callback: addPrayRefetch,
        }
      })
    }
  }

  useEffect(() => {
    console.log('addAlertState', addAlertState)
  }, [addAlertState])

  return (
    <PrayAddWrapper>
      <PrayAddContainer>
        <BackWard url={"/pray"}>
        </BackWard>
        <ParyAddSubTitle>기도제목</ParyAddSubTitle>
        <PrayAddHead>기도제목을 작성해보세요</PrayAddHead>
        <PrayAddTitle>
          주님께서 여러분과 함께하실 것입니다
        </PrayAddTitle>
        <PrayAddTextArea
          placeholder="기도제목을 입력해주세요"
          onChange={(e) => handlePrayText(e)}
        ></PrayAddTextArea>
      </PrayAddContainer>
      <PrayButtonContainer>
        <PrayAddButton onClick={() => handleAddPray()}>등록하기</PrayAddButton>
      </PrayButtonContainer>
    </PrayAddWrapper>
  );
}

export default PrayAddComponent;