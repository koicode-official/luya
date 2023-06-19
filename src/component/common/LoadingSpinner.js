"use client"
import styled from 'styled-components'
import { Oval } from 'react-loader-spinner'

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  opacity: .9;
  position: absolute;
  top:0;
  left:0;
  height: 100vh;
  width: 100vw;
  background-color: #fcfcfc;
  z-index: 99999;
`;
const LoadingContainer = styled.div`
    margin-top: 60%;

`;

function LoadingSpinner() {
    return (
        <LoadingWrapper>
            <LoadingContainer>
                <Oval
                    height="80"
                    width="80"
                    radius="9"
                    color="#e2a26a"
                    secondaryColor="#a9a9a8"
                    ariaLabel="loading"
                    strokeWidth="2"
                    strokeWidthSecondary="4"
                />
            </LoadingContainer>
        </LoadingWrapper>
    );
}

export default LoadingSpinner;