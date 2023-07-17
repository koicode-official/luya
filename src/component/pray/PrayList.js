"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { prayStateFamily } from "@/state/prayState"
import useCustomAxios from "../../utils/UseCustomAxios"
import { useSearchParams } from 'next/navigation'


const PrayListContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
`
const PrayContentList = styled.ul`

`

const PrayContent = styled.li`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  width: 100%;
  /* height: 100px; */
  box-shadow: 0px 2px 5px rgba(120, 120, 120, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  
  a{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }
  img{
    opacity: 0.2;
  }

`

const NoPrayList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  min-height: 150px;
  font-size: 14px;
  font-weight: 400;
  background-color: #e5e5e5;
  /* box-shadow: 0px 2px 2px rgba(120, 120, 120, 0.2); */

`

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  p{
    font-size: 18px;
  }
  span{
    font-size: 14px;
    font-weight: 300;
  }
`

function PrayList() {
  const axios = useCustomAxios();
  const prayState = useRecoilValue(prayStateFamily(0))
  const setPrayState = useSetRecoilState(prayStateFamily(0))

  const searchParams = useSearchParams()
  const completed = searchParams.get("completed")


  const getPrayList = async () => {
    return await axios({
      method: "GET",
      params: { userNo: 0, completed: completed ? parseInt(completed) : null },
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/pray/list`,
    })
  }


  useQuery('getPrayList', getPrayList, {
    onSuccess: res => {
      if (res.data.message === "success") {
        console.log('res.data', res.data)
        setPrayState((prevState) => {
          return {
            ...prevState,
            prayList: res.data.prayList
          }
        })
      }
    },
    onError: error => {
      console.error("Error Occured : ", error)
    }
  })


  return (
    <PrayListContainer>
      <PrayContentList>
        {
          prayState.prayList && prayState.prayList.map(pray => {
            const text = pray.PRAY_TEXT.length >= 20 ? pray.PRAY_TEXT.slice(0, 20) + "..." : pray.PRAY_TEXT;
            const date = pray.CREATED_AT ? pray.CREATED_AT.split(" ")[0].replace(/\-/g, ".") : ""
            console.log('date ', date)
            return (
              <PrayContent key={`pray${pray.PRAY_NO}`}>
                <Link href={`/pray/${pray.PRAY_NO}`}>
                  <ContentsContainer>
                    <p>{text}</p>
                    <span>{date}</span>
                  </ContentsContainer>
                  <Image
                    src="/img/right-arrow.png"
                    width={20}
                    height={20}
                    alt="right arrow icon"
                  >
                  </Image>
                </Link>
              </PrayContent>
            )
          })
        }
      </PrayContentList>
      {
        (!prayState.prayList || prayState.prayList?.length === 0) &&
        <NoPrayList>작성된 기도제목이 없습니다.</NoPrayList>
      }
    </PrayListContainer>
  );
}

export default PrayList;