"use client"

import styled from "styled-components"
import useCustomAxios from "../../utils/UseCustomAxios";
import { CommonButton, CommonWrapper } from "../common/CommonComponent"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adviceState } from "@/state/adviceState";
import { useQuery } from "react-query"
import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { useRouter } from "next/navigation";

import { commonAlertState } from "@/state/common"

const AskWrapper = styled(CommonWrapper)`
  background-color: var(--color-set05);
  height: 100%;
`
const AskContainer = styled.div`
  display:  flex;
  justify-content: center;
  align-items: center;
  flex-direction : column;
  width: 100%;
  padding: 60px 30px 0;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background-color: #fefefe;
`

const AskTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* margin: 30px 0 60px; */
  min-height: 190px;
`
const AskTitle = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
  color:#fefefe;
`
const AskSubiitle = styled.p`
  font-size: 13px;
  color: #fefefe;
`

const AskInputGroup = styled.div`
  display:  flex;
  justify-content: space-around;
  align-items : center;
  flex-direction : column;
  width:100%;
`



const AskInput = styled.textarea`
    resize : none;
    border: 1px solid var(--color-set01);
    border-radius: 10px;
    min-height: 150px;
    height: 150px;
    width: 100%;
    padding: 20px;
    font-weight: 500;
    font-size: 20px;
    margin-bottom : 32px;
    overflow-y: auto;
    :focus {
    border: 1px solid var(--color-set05);
  }
    ::placeholder{
    font-size: 14px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    color:#777777;

  }

`
const AskButton = styled(CommonButton)`
  color:#fefefe;
`

const SaveAdviceButton = styled(AskButton)`
  margin: 0 auto;
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fefefe;
  padding-bottom: 60px;
`

const ResultContainer = styled.div`
  width: 100%;
  padding: 0 20px;
`
const ResultText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  white-space: pre-wrap;
  padding: 16px 0 40px;
`

const ConcernText = styled.p`
 font-size: 16px;
  font-weight: 500;
  line-height: 25px;
  white-space: pre-wrap;
  padding: 16px 0;

`

const ResultTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color:#e2a26a;
  /* text-align: center; */
  margin-top: 30px;
`

const LoadingContianer = styled.div`
  display:flex;
  justify-content : center;
  flex-direction : column;
  p{
    text-align: center;
    font-size: 14px;
    z-index:999999;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , 0%);
  }
`

function AskComponent() {
  const axios = useCustomAxios();
  const router = useRouter();
  const adviceStateInfo = useRecoilValue(adviceState);
  const setAdviceState = useSetRecoilState(adviceState);
  const [isLoading, setIsLoading] = useState(false);
  const [resultAdvice, setResultAdvice] = useState({ advice: null, question: null });
  const setAddAlertState = useSetRecoilState(commonAlertState)

  const saveAdvice = async () => {
    return await axios({
      method: "POST",
      withCredentials: true,
      data: resultAdvice,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/advice/save`,
    })
  }

  const { refetch: saveAdviceRefetch } = useQuery("saveAdvice", saveAdvice, {
    enabled: false,
    onSuccess: response => {
      if (response.data.message === "success") {
        setAddAlertState(prev => {
          return {
            active: true,
            text: "저장되었습니다.",
            callback: function () {
              initializeAdviceState();
              router.push("/advice");
            }
          }
        })
      }
    },
    onError: error => {
      console.log("Error Occured : ", error);
    }
  });



  const handleAdviceInput = (e) => {
    setAdviceState((beforeState) => {
      return {
        ...beforeState,
        message: e.currentTarget.value
      }
    });
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            // { role: 'system', content: '당신은 세상에서 제일 훌륭한  목사님입니다. 모든 대답은 성의있고 조언을 하듯이 대답해주시고 실생활에 적용할 수 있게 성경의 내용으로 대답하세요. 성경의 한 구절과 그 구절의 출처를 순서대로 보여주고 2줄 아래에 그 구절을 최소 5문장이상으로 조언 및 해설을 해주세요.' },
            { role: 'system', content: '성경 구절을 활용하여 실생활에 적용 가능한 조언을 해주세요. 구절과 출처를 순서대로 제시하고, 각 구절에 대해 최소 5문장 이상으로 조언과 해설을 부탁드립니다. 당신은 훌륭한 목사님이시며, 목사님의 말투로 성의 있고 현명한 대답으로 도움을 주시기 바랍니다.' },
            { role: "user", content: adviceStateInfo.message },
          ],
          max_tokens: 2048,
          stream: true,
        }),
      });
      setIsLoading(false);

      const reader = response.body.getReader();
      let resultText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const textDecoder = new TextDecoder("utf-8");
        const chunk = textDecoder.decode(value);

        for (const line of chunk.split("\n")) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === "data: [DONE]") {
            continue;
          }

          const json = trimmedLine.replace("data: ", "");
          const obj = JSON.parse(json);
          const delta = obj.choices[0]?.delta;
          const content = delta.content;
          if (content) {
            resultText += content;
            setAdviceState(prev => {
              return {
                ...prev,
                advice: prev.advice + content
              }
            })
          }
        }
      }
      setResultAdvice({
        advice: resultText,
        question: adviceStateInfo.message
      })
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }

  }



  const handleSaveAdvice = () => {
    saveAdviceRefetch();
  }


  const initializeAdviceState = () => {
    setAdviceState(prev => {
      return {
        ...prev,
        message: null,
        advice: ""
      }
    })
    setResultAdvice({
      advice: null,
      question: null
    })
  }


  useEffect(() => {
    initializeAdviceState();
  }, [])


  return (
    <AskWrapper>
      {isLoading === false && adviceStateInfo.advice.length == 0 &&
        <>
          <AskTitleContainer>
            <AskTitle>마음 속 이야기를 털어놓아 보세요</AskTitle>
            <AskSubiitle>고민이나 질문을 자세히 적어주세요</AskSubiitle>
          </AskTitleContainer>
          <AskContainer>
            <AskInputGroup>
              <AskInput
                placeholder="고민을 입력해주세요"
                onChange={(e) => handleAdviceInput(e)}
              ></AskInput>
              <AskButton onClick={handleSubmit}>질문하기</AskButton>
            </AskInputGroup>
          </AskContainer>
        </>
      }
      {
        isLoading === true &&
        <LoadingContianer>
          <LoadingSpinner key="askLoading"></LoadingSpinner>
          <p>요청량이 많아 시간이 소요됩니다. <br></br>잠시만 기다려주세요...</p>
        </LoadingContianer>
      }
      {isLoading === false && adviceStateInfo && adviceStateInfo.advice &&
        <ResultWrapper>
          <ResultContainer>
            <ResultTitle>고민</ResultTitle>
            <ConcernText>
              {adviceStateInfo.message}
            </ConcernText>
          </ResultContainer>
          <ResultContainer>
            <ResultTitle>성경 말씀</ResultTitle>
            <ResultText>
              {adviceStateInfo.advice}
            </ResultText>
          </ResultContainer>
          {/* {resultAdvice && resultAdvice.advice &&
            <SaveAdviceButton SaveAdviceButton onClick={handleSaveAdvice}>저장하기</SaveAdviceButton>
          } */}
        </ResultWrapper>
      }

    </AskWrapper >
  );
}

export default AskComponent;