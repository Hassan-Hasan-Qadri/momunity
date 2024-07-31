import React from "react";
import styled from "styled-components";
import AccountBox from "../components/accountBox/index"
import { AccountBackGround } from "../components/common/accountBG";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Account() {
  return <AppContainer>
    <AccountBackGround/>
    <AccountBox />
  </AppContainer>
}
