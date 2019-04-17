import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const Html = styled.html`
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
`;

export const AppContainer = styled.div`
  // max-width: 1200px;
  width: 100%;
  margin: 5rem auto 0;
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background: #F3F2F2;
  }
  * {
    box-sizing: border-box;
  }
`;
