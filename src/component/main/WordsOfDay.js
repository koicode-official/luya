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
  background-color: var(--color-set05);
  background-size: cover;
  filter: blur(30%);
  color: #fefefe;
  padding:20px;
  min-height: 170px;

`

const WordsOfDayText = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
  white-space: pre-wrap;
  text-align: center;
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