import styled from "styled-components";

export const TransactionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
  padding: 10px;
  margin: 5vw 25% 0;
  flex-direction: column;

  h2,
  p {
    padding: 5px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
  }
`;

export const TransDetailsWrapper = styled.div`
  display: flex;
  width: 100%;

  margin-bottom: 20px;

  p {
    width: 100%;
    text-wrap: none;
  }
  @media (max-width: 750px) {
    width: 96%;
    margin: auto;
    margin-bottom: 20px;
  }
`;
