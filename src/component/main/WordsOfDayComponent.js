"use client"
import styled from "styled-components"
import WordsOfDay from "./WordsOfDay";
import WordsOfDayContents from "./WordsOfDayContents";
import axios from "axios";
import { CommonWrapper } from "../common/CommonComponent";

import { useQuery } from "react-query"
import { useEffect, useState } from "react";
const WordOfDayWrapper = styled(CommonWrapper)``


function WordOfDayComponent() {
  const [wordsOfToday, setWordsOfToday] = useState(null);

  const getAdvice = async () => {
    return await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/today/words`,
    })
  }

  useQuery("getAdvice", getAdvice, {
    onSuccess: response => {
      console.log("response", response)
      if (response.data.message === "success") {
        console.log('response.data.words', response.data.words)
        setWordsOfToday(response.data.words);
      }
    },
    onError: error => {
      console.log("Error Occured : ", error);
    }
  });



  useEffect(() => {
    console.log('wordsOfToday', wordsOfToday)
  }, [wordsOfToday])

  return (
    <WordOfDayWrapper>
      {wordsOfToday &&
        <>
          <WordsOfDay wordsOfToday={wordsOfToday.WORDS_OF_TODAY} label={wordsOfToday.WORDS_OF_TODAY_LABEL}></WordsOfDay>
          <WordsOfDayContents wordsOfTodayText={wordsOfToday.WORDS_OF_TODAY_TEXT} ></WordsOfDayContents>
        </>
      }
    </WordOfDayWrapper>
  );
}

export default WordOfDayComponent;