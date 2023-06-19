"use client"
import styled from "styled-components"
import Image from "next/image"
import axios from "axios"
import BackWard from "../common/Backward"
import { CommonWrapper, CommonButton } from "../common/CommonComponent"
import { useQuery } from "react-query"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { prayInfoStateFamily } from "@/state/prayState"
import { useEffect } from "react"
import { commonAlertState } from "@/state/common"
import { commonConfirmState } from "@/state/common"
import { useRouter } from "next/navigation"

const PrayInfoWrapper = styled(CommonWrapper)`
  position: relative;
  width: 100%;

`
const PrayInfoContainer = styled.div`
  width: 100%;
  padding: 0px 20px ;
`
const PrayInfoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  img{
    margin-right: 8px;
  }
  p{
    font-size: 18px;
    color:#e2a26a;
    font-weight: 400;
    text-align: center ;
    }
`

const ParyInfoSubTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color:#a9a9a9;
    text-align: center;
    margin-top: 20px;

`
const PrayInfoGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border:  1px solid #e5e5e5;
  border-radius: 10px;
  padding: 0px 10px;
  margin-bottom: 30px;
  min-height: 150px;

`

const PrayInfo = styled.div`
  
  white-space: pre-wrap;
  font-weight: 500;
  font-size: 20px;

`
const PrayButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  margin: 0 auto;
`

const PrayButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  button{
    background-color: #fefefe;
    border:1px solid #e5e5e5;
    color:#a9a9a9;
    width: 49%
  }
`

const PrayButton = styled(CommonButton)`
  margin : 12px 0;
  width: 100%;
`


function PrayInfoComponent({ id }) {
  const router = useRouter();
  const prayInfoState = useRecoilValue(prayInfoStateFamily(id))
  const setPrayInfoState = useSetRecoilState(prayInfoStateFamily(id))
  const setConfirmState = useSetRecoilState(commonConfirmState)
  const setAlertState = useSetRecoilState(commonAlertState)



  // 기도제목 획득
  const getPrayInfo = async () => {
    return await axios({
      method: "GET",
      params: { prayNo: id },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/pray/info`,
    })
  }

  useQuery(['getPrayInfo', id], getPrayInfo, {
    onSuccess: res => {
      if (res.data.message === "success") {
        setPrayInfoState((prevState) => {
          return {
            ...prevState,
            prayInfo: res.data.prayInfo
          }
        })
      }
    },
    onError: error => {
      console.error("Error Occured : ", error)
    }
  })


  //기도제목 완료처리
  const donePray = async () => {
    return await axios({
      method: "POST",
      data: { prayNo: id },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/pray/done`,
    })
  }

  const { refetch: donePrayRefetch } = useQuery(['donePray', id], donePray, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: false,
    onSuccess: res => {
      if (res.data.message === "success") {
        router.replace("/pray?completed=0");
      }
    },
    onError: error => {
      console.error("Error Occured : ", error)
    }
  })


  //기도제목 삭제처리
  const deletePray = async () => {
    return await axios({
      method: "POST",
      data: { prayNo: id },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/pray/delete`,
    })
  }

  const { refetch: deletePrayRefetch } = useQuery(['deletePray', id], deletePray, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: false,
    onSuccess: res => {
      if (res.data.message === "success") {
        setAlertState(
          {
            active: true,
            text: "기도제목이 삭제되었습니다.",
            callback: function () {
              router.replace("/pray");
            },
          }
        )
      }
    },
    onError: error => {
      console.error("Error Occured : ", error)
      setAlertState(
        {
          active: true,
          text: "기도제목 삭제가 실패했습니다.",
          callback: function () {
            router.replace("/pray");
          },
        }
      )
    }
  })


  const handleDonePray = () => {
    setConfirmState(
      {
        active: true,
        text: "기도제목이 응답되었습니까?",
        confirmText: "예",
        cancelText: "아니오",
        callback: donePrayRefetch,
      }
    )
  }

  const handleDeletePray = () => {
    setConfirmState(
      {
        active: true,
        text: "기도제목을 삭제하시겠습니까?",
        confirmText: "예",
        cancelText: "아니오",
        callback: deletePrayRefetch,
      }
    )
  }

  const handleUpdatePray = () => {
    setAlertState(
      {
        active: true,
        text: "수정하기는 개발중입니다.",
      }
    )
  }

  useEffect(() => {
    console.log('prayInfoState.prayInfo', prayInfoState.prayInfo)
  }, [prayInfoState.prayInfo])


  return (
    <PrayInfoWrapper>
      <PrayInfoContainer>
        <BackWard url={"/pray?completed=0"}>
        </BackWard>
        <ParyInfoSubTitle>기도제목</ParyInfoSubTitle>
        <PrayInfoTitle>
          <Image
            src="/img/cross.png"
            width={24}
            height={24}
            alt="cross icon"
          >
          </Image>
          <p>
            주님께서 여러분과 함께하실 것입니다
          </p>
        </PrayInfoTitle>
        <PrayInfoGroup>
          {
            prayInfoState.prayInfo &&
            <PrayInfo>
              "{prayInfoState.prayInfo}"
            </PrayInfo>
          }
        </PrayInfoGroup>
        <PrayButtonContainer>
          <PrayButton onClick={handleDonePray}>
            기도가 응답되었습니다
          </PrayButton>
          <PrayButtonGroup>
            <PrayButton onClick={handleUpdatePray}>
              수정하기
            </PrayButton>
            <PrayButton onClick={handleDeletePray}>
              삭제하기
            </PrayButton>
          </PrayButtonGroup>
        </PrayButtonContainer>
      </PrayInfoContainer>
    </PrayInfoWrapper >
  );
}

export default PrayInfoComponent;