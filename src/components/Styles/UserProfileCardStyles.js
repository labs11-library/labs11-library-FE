import styled from "styled-components";

export const UserProfileCardShadow = styled.div`
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: auto;
  width: 95%;
  max-width: 600px;
`;
export const OtherUserCard = styled.div`
  width: 95%;
  max-width: 600px;
  margin: 0 auto;
`;
export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
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

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
  text-align: center;
`;
