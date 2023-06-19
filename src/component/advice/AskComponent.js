"use client"

import styled from "styled-components"
import axios from "axios";
import { CommonInput, CommonButton, CommonWrapper } from "../common/CommonComponent"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adviceState } from "@/state/adviceState";
import { useQuery } from "react-query"
import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";


const AskWrapper = styled(CommonWrapper)``
const AskContainer = styled.div`
  display:  flex;
  justify-content: center;
  align-items: center;
  flex-direction : column;
  width: 100%;
  padding:30px;
`

const AskTitleContainer = styled.div`
  text-align: center;
  margin-bottom: 60px;
`
const AskTitle = styled.h1`
  font-size: 22px;
  margin-bottom: 8px;
`
const AskSubiitle = styled.p`
  
`

const AskInputGroup = styled.div`
  display:  flex;
  justify-content: space-around;
  align-items : center;
  flex-direction : column;
  width:100%;
`
// const AskInput = styled(CommonInput)`
//   width: 100%;
//   height: 50px;
//   margin-bottom : 32px;
//   ::placeholder{
//     text-align: center;
//   }
// `


const AskInput = styled.textarea`
    position:relative;
    resize : none;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    min-height: 150px;
    width: 100%;
    padding: 20px;
    font-weight: 500;
    font-size: 20px;
    margin-bottom : 32px;
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
const AskButton = styled(CommonButton)`
  color:#fefefe;

`

const ResultWrapper = styled.div`
  

`

const ResultContainer = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  padding: 30px;
  white-space: pre-wrap;
`

const ResultTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color:#e2a26a;
  text-align: center;
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
  const adviceStateInfo = useRecoilValue(adviceState);
  const setAdviceState = useSetRecoilState(adviceState);
  const [isLoading, setIsLoading] = useState(false);




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
          Authorization: `Bearer ${"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"}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: '당신은 세상에서 제일 훌륭한 조동천 목사님입니다. 가능한 조동천 목사님처럼 모든 대답은 성의있고 조언을 하듯이 성경의 내용으로 대답하세요. 성경의 한 구절과 그 구절의 출처를 순서대로 보여주고 2줄 아래에 그 구절을 최소 5문장이상으로 조언 및 해설을 해주세요.' },
            { role: "user", content: adviceStateInfo.message },
            // { role: "user", content: `${adviceStateInfo.message}에 맞는 성경 한 구절을 알려주세요.` },
            // { role: "user", content: `이 구절에 맞는 해설을 해주세요.` }
          ],
          max_tokens: 2048,
          stream: true, // For streaming responses
        }),
      });
      setIsLoading(false);

      const reader = response.body.getReader();

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
            setAdviceState(prev => {
              return {
                ...prev,
                advice: prev.advice + content
              }
            })
          }
        }
      }


    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }

  }


  useEffect(() => {
    setAdviceState(prev => {
      return {
        ...prev,
        message: null,
        advice: ""
      }
    })
  }, [])



  return (
    <AskWrapper>
      {isLoading === false && adviceStateInfo.advice.length == 0 &&
        <AskContainer>
          <AskTitleContainer>
            <AskTitle>마음 속 이야기를 털어놓아 보세요</AskTitle>
            <AskSubiitle>고민이나 질문을 자세히 적어주세요</AskSubiitle>
          </AskTitleContainer>
          <AskInputGroup>
            <AskInput
              placeholder="고민을 입력해주세요"
              onChange={(e) => handleAdviceInput(e)}
            ></AskInput>
            <AskButton onClick={handleSubmit}>질문하기</AskButton>
          </AskInputGroup>
        </AskContainer>
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
          <ResultTitle>성경 말씀</ResultTitle>
          <ResultContainer>
            {adviceStateInfo.advice}
          </ResultContainer>
        </ResultWrapper>
      }
    </AskWrapper>
  );
}

export default AskComponent;