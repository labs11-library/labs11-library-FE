import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-top: -5vw;
  flex-direction: column;
  margin-left:23%;
//   background:#009EE5;

  h1,
  p {
    padding: 5px;
    margin-left:45%;
    width:400px;
    // color:#FFF;
  }

  h1 {
    font-size: 2rem;
    margin-top:-50%;
  }

  p {
    font-size: 1rem;
  }

  @media (max-width 1050px) {
    justify-content: ;
  }
`;