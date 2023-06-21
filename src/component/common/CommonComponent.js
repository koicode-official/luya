"use client"

import styled from "styled-components"


export const CommonWrapper = styled.div`
  display:flex;
  justify-content : center;
  align-items : center;
  flex-direction: column;
  width:100%;
  height:100%;
`

export const CommonInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  font-size : 16px;
  padding: 10px 10px;
  ::placeholder{
    font-size: 14px;
    color:#777777;
  }
  `

export const CommonButton = styled.button`
    width: 230px;
    height: 45px;
    background-color :  #e2a26a;
    border: none;
    border-radius : 10px;
    outline:none;
    padding: 10px 20px;
    font-size: 16px;
    color:#fefefe;
    cursor : pointer;
  `