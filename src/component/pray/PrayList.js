"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "react-query"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { prayStateFamily } from "@/state/prayState"
import axios from "axios"
import { useSearchParams } from 'next/navigation'


const PrayListContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
`
const PrayContentList = styled.ul`
  border-top: 3px solid #e5e5e5;

`

const PrayContent = styled.li`

  padding: 16px 5px;
  border-bottom: 1px dashed #e5e5e5;
  font-size: 16px;
  font-weight: 300;
  line-height: 19px;
  width: 100%;
  a{
    display: flex;
    justify-content: space-between;
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
  font-weight: 400px;
  background-color: #f7f7f7;
`

function PrayList() {
  const prayState = useRecoilValue(prayStateFamily(0))
  const setPrayState = useSetRecoilState(prayStateFamily(0))

  const searchParams = useSearchParams()
  const completed = searchParams.get("completed")
  console.log('completed', completed)


  const getPrayList = async () => {
    return await axios({
      method: "GET",
      params: { userNo: 0, completed: completed ? parseInt(completed) : null },
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/pray/list`,
    })
  }


  useQuery('getPrayList', getPrayList, {
    onSuccess: res => {
      if (res.data.message === "success") {
        console.log('res.data', res.data.prayList)
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
            return (
              <PrayContent key={`pray${pray.PRAY_NO}`}>
                <Link href={`/pray/${pray.PRAY_NO}`}>
                  {text}
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