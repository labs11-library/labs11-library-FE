import styled from "styled-components";

export const NoRequests = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  max-width: 90%;
  margin: 20px auto;
`;

export const BookDetailsWrapper = styled.div`
  width: 60vw;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px auto;
  padding-bottom: 10px;
  min-height: 250px;

  h2 {
    font-size: 18px;
  }

  p {
    font-size: 14px;
    margin: 12px 0px 6px;
    width: 90%;
  }

  @media (max-width: 700px) {
    width: 90vw;
  }
`;
export const BookImgWrapper = styled.div`
  max-width: 120px;
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-right: 20px;
`;
export const BookImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;

export const DueDate = styled.p`
  color: red;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 100%;
`;

export const RequestDescription = styled.div`
  max-width: 266px;
  width: 100%;
  font-size: 14px;
  word-wrap: break-word;
`;
