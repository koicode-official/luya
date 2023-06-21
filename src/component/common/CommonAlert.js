"use client"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { commonAlertState } from "@/state/common"
import { CommonButton } from "./CommonComponent"

const CommonAlertWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background-color: rgba(255,255,255,0.8);
  
`
const CommonAlertContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 280px;
    min-height: 150px;
    background-color: #fefefe;
    border: 1px solid #e2a26a;
    border-radius: 5px;
    padding: 30px 0;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.15);

  
`
const CommonAlertText = styled.p`
  white-space: pre-wrap;
  padding: 30px 0;
`

const CommonAlertButton = styled(CommonButton)``

function CommonAlert() {
  const addAlertState = useRecoilValue(commonAlertState)
  const setAddAlertState = useSetRecoilState(commonAlertState)

  const handleAlertConfirm = () => {
    const callBack = addAlertState?.callback;
    setAddAlertState(prev => {
      return {
        active: false,
        text: "",
        callback: null,
      }
    });
    if (addAlertState.callback) {

      callBack();
    }

  }
  return (
    <CommonAlertWrapper>
      <CommonAlertContainer>
        <CommonAlertText>
          {addAlertState.text}
        </CommonAlertText>
        <CommonAlertButton
          onClick={handleAlertConfirm}
        >
          확인
        </CommonAlertButton>
      </CommonAlertContainer>
    </CommonAlertWrapper>
  );
}

export default CommonAlert;