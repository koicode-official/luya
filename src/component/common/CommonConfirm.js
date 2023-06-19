"use client"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { commonConfirmState } from "@/state/common"
import { CommonButton } from "./CommonComponent"

const CommonConfirmWrapper = styled.div`
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
const CommonConfirmContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 280px;
    min-height: 150px;
    background-color: #fefefe;
    border: 1px solid #e2a26a;
    border-radius: 5px;
    padding: 30px 10px;
  
`
const CommonConfirmText = styled.p`
  white-space: pre-wrap;
  padding: 30px 0;
`

const CommonConfirmButtonGroup = styled.div`
  display:flex;
  justify-content: flex-end;
  width: 100%;
`

const CommonConfirmButton = styled(CommonButton)`
  width: fit-content;
  margin-left: 16px;
  height: 40px;

`
const CommonConfirmCancelButton = styled(CommonConfirmButton)`
  width: fit-content;
  background-color: #fefefe;
  border:  1px  solid #e5e5e5;
  color:#a9a9a9;
`

function CommonConfirm() {
  const confirmState = useRecoilValue(commonConfirmState)
  const setConfirmState = useSetRecoilState(commonConfirmState)

  const handleConfirmConfirm = () => {
    const callBack = confirmState.callback;
    setConfirmState(prev => {
      return {
        active: false,
        text: "",
        callback: null,
      }
    });
    callBack();
  }
  const handleCancelConfirm = () => {
    setConfirmState(prev => {
      return {
        active: false,
        text: "",
        callback: null,
      }
    });
  }
  return (
    <CommonConfirmWrapper>
      <CommonConfirmContainer>
        <CommonConfirmText>
          {confirmState.text}
        </CommonConfirmText>
        <CommonConfirmButtonGroup>
          <CommonConfirmCancelButton
            onClick={handleCancelConfirm}
          >
            {confirmState.cancelText && confirmState.cancelText.length !== 0 ? confirmState.cancelText : "취소"}
          </CommonConfirmCancelButton>
          <CommonConfirmButton
            onClick={handleConfirmConfirm}
          >
            {confirmState.confirmText && confirmState.confirmText.length !== 0 ? confirmState.confirmText : "확인"}
          </CommonConfirmButton>

        </CommonConfirmButtonGroup>
      </CommonConfirmContainer>
    </CommonConfirmWrapper>
  );
}

export default CommonConfirm;