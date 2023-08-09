"use client"
import styled from "styled-components"
import CommonHeader from "./CommonHeader";
import CommonBottomMenu from "./CommonBottomMenu";
import CommonAlert from "./CommonAlert";
import CommonConfirm from "./CommonConfirm";
import Footer from "./Footer";
import NavigationEvents from '@/utils/NavigationEvent';
import useAlert from "@/utils/useAlert/UseAlert";
import useConfirm from "@/utils/useConfirm/UseConfirm";
import { useEffect } from "react";

const Layout = styled.div`
  position: relative;
  display : flex;
  flex-direction : column;
  min-height:100vh;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
  padding-bottom: 60px;

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
  /* margin-bottom: 90px; */

`


function CommonLayout({ children }) {
  const { alertStateInfo } = useAlert();
  const { confirmStateInfo } = useConfirm();

  useEffect(()=>{
      if('serviceWorker' in navigator){
        const registInit = async ()=>{
          const registration = await navigator.serviceWorker.register("/sw.js");
          registration.waiting?.postMessage("SKIP_WAITING");
        }
        registInit();
        // const registration = 
      }
  },[])

  return (
    <Layout>
      {alertStateInfo.active === true &&
        <CommonAlert></CommonAlert>
      }
      {confirmStateInfo.active === true &&
        <CommonConfirm></CommonConfirm>
      }
      <CommonHeader></CommonHeader>
      <NavigationEvents>
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
        <Footer></Footer>
      </NavigationEvents>
      <CommonBottomMenu></CommonBottomMenu>
    </Layout>
  );
}

export default CommonLayout;