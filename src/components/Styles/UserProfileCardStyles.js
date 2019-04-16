import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
  padding: 10px;
  margin: auto;
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
`;
export const Bio = styled.p`
  text-align: left;
`;
