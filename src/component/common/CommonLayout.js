"use client"
import styled from "styled-components"
import CommonHeader from "./CommonHeader";
import CommonFooter from "./CommonFooter";
import CommonAlert from "./CommonAlert";
import CommonConfirm from "./CommonConfirm";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { commonAlertState } from "@/state/common"
import { commonConfirmState } from "@/state/common";

const Layout = styled.div`
  display : flex;
  flex-direction : column;
  /* min-height:100vh; */

`
const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 146px);
  min-height: calc(100vh - 146px);
  padding-bottom: 80px;

`


function CommonLayout({ children }) {
  const alertState = useRecoilValue(commonAlertState)
  const confirmState = useRecoilValue(commonConfirmState)
  return (
    <Layout>
      {alertState.active === true &&
        <CommonAlert></CommonAlert>
      }
      {confirmState.active === true &&
        <CommonConfirm></CommonConfirm>
      }
      <CommonHeader></CommonHeader>
      <ChildrenContainer>
        {children}
      </ChildrenContainer>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}

export default CommonLayout;