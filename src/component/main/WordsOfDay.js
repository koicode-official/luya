"use client"
import styled from "styled-components"


const WordsOfDayWrapper = styled.div`
  width: 100%;
`
const WordsOfDayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgb(222,94,94);
background: linear-gradient(355deg, rgba(222,94,94,1) 0%, rgba(255,200,101,1) 100%);
  background-size: cover;
  border-bottom: 1px solid #e5e5e5;
  filter: blur(30%);
  color: #fefefe;
  padding:20px;
  min-height: 240px;

`

const WordsOfDayText = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
  white-space: pre-wrap;
`

const TextFrom = styled.span`
 
`

function WordsOfDay({ wordsOfToday, label }) {


  return (
    <WordsOfDayWrapper>
      <WordsOfDayContainer>
        <WordsOfDayText>
          {wordsOfToday}
        </WordsOfDayText>
        <TextFrom>
          {label}
        </TextFrom>
      </WordsOfDayContainer>
    </WordsOfDayWrapper>
  );
}

export default WordsOfDay;