import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  margin: 5vw auto 0;

  h1,
  p {
    padding: 5px;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;
