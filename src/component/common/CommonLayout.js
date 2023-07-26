"use client"
import styled from "styled-components"
import CommonHeader from "./CommonHeader";
import CommonFooter from "./CommonFooter";
import CommonAlert from "./CommonAlert";
import CommonConfirm from "./CommonConfirm";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { commonConfirmState } from "@/state/common";
import { Suspense } from "react";
import LoadingSpinner from '@/component/common/LoadingSpinner';
import NavigationEvents from '@/utils/NavigationEvent';
import useAlert from "@/utils/useAlert/UseAlert";
import useConfirm from "@/utils/useConfirm/UseConfirm";

const Layout = styled.div`
  position: relative;
  display : flex;
  flex-direction : column;
  /* min-height:100vh; */
  max-width: 750px;
  margin: 0 auto;
  height: 100%;

`
const ChildrenContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  height: calc(100% - 159px);
  min-height: calc(100vh - 159px);
  margin-bottom: 90px;

`


function CommonLayout({ children }) {
  const { alertStateInfo } = useAlert();
  const { confirmStateInfo } = useConfirm();
  return (
    <Layout>
      {alertStateInfo.active === true &&
        <CommonAlert></CommonAlert>
      }
      {confirmStateInfo.active === true &&
        <CommonConfirm></CommonConfirm>
      }
      <CommonHeader></CommonHeader>
      <Suspense fallback={<LoadingSpinner />}>
        <NavigationEvents>
          <ChildrenContainer>
            {children}
          </ChildrenContainer>
        </NavigationEvents>
      </Suspense>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}

export default CommonLayout;