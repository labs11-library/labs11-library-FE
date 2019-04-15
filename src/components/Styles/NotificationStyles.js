import styled from "styled-components";

export const NoRequests = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  max-width: 90%;
  margin: 20px auto;

  a {
    color: blue;
  }

  span {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
  }
`;

export const BookDetailsWrapper = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 10px auto;
  width: 480px;
  border-radius: 7px;

  h2 {
    font-size: 18px;
    color: #009ee5;
  }

  p {
    font-size: 14px;
    margin: 12px 0px 6px;
    width: 90%;
    color: #838281;
  }
  @media (max-width: 500px) {
    width: 90%;
    margin: 10px auto;
  }
`;
export const BookImgWrapper = styled.div`
  min-width: 120px;
  max-width: 120px;
  min-height: 180px;
  max-height: 180px;
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

export const BookDetailsContainer = styled.div`
  display: flex;
  border-radius: 7px;
`;
