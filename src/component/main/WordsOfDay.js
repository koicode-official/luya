"use client"
import styled from "styled-components"
import axios from "axios";

import { useQuery } from "react-query"
import { useEffect, useState } from "react";


const WordsOfDayWrapper = styled.div`
  width: 100%;
`
const WordsOfDayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('/img/wordOfDayBackground.jpg');
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

function WordsOfDay({wordsOfToday , label}) {


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