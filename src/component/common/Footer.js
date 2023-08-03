"use client"

import styled from "styled-components"

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 20px 60px;
`
const FooterContainer = styled.div`
  width: 100%;

`


const ContentList = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
`
const Content = styled.li`
  margin: 0 20px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
  text-decoration: underline;
 
`

const InformationContainer = styled.div`
`
const Information = styled.p`
font-size: 14px;
font-weight: 300;
line-height: 21px;

`

const ReCAPTCAHTerms = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-top: 24px;
  text-align: center;
  a{
    text-decoration: underline;
  }

`


function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <ContentList>
          <Content>
            <a href="https://seed-bergamot-577.notion.site/f99dc9755aa049e2a152e69f9cce38e4?pvs=4">
              이용약관
            </a>
          </Content>
          <Content>
            <a href="https://seed-bergamot-577.notion.site/132efd5c0f1e4dbda987dbaea79bc391?pvs=4">
              개인정보처리방침
            </a>
          </Content>
        </ContentList>
        <InformationContainer>
          <Information>
            법인명 : 주식회사 코이코드
          </Information>
          <Information>
            대표이사 : 정규인 | 이메일 : koicode@koicode.co.kr
          </Information>
          <Information>
            사업자등록번호 : 259-86-00867
          </Information>
          <Information>
            개인정보보호책임자: 홍의현
          </Information>
          <Information>
            주소 : 서울특별시 서초구 강남대로 51길 10 (강남효성해링턴타워 지하 1층 109-28호)
          </Information>
          
          {/* (<a href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2598600867">사업자정보 확인</a>) */}
        </InformationContainer>
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;