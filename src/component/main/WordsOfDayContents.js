"use client"
import styled from "styled-components"


const WordsOfDayContentsWrapper = styled.div`
  padding: 30px;

`
const WordsOfDayContentsContainer = styled.div`
`
const WordsOfDayTitle = styled.h1`
  font-size  : 18px;
  font-weight: 500;
  margin-bottom: 18px;
  color:#e2a26a;
`

const Text = styled.p`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 300;
  line-height: 25px;
  white-space: pre-wrap;
`

function WordsOfDayContents({wordsOfTodayText}) {
  return (
    <WordsOfDayContentsWrapper>
      <WordsOfDayTitle>
        오늘의 말씀
      </WordsOfDayTitle>
      <WordsOfDayContentsContainer>
        <Text>
        {wordsOfTodayText}
        </Text>
      </WordsOfDayContentsContainer>
    </WordsOfDayContentsWrapper>
  );
}

export default WordsOfDayContents;