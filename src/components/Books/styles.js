import styled from "styled-components";

export const BookDetailsWrapper = styled.div`
  width: 60vw;
  border-bottom: 2px solid grey;
  display: flex;
  justify-content: space-evenly;
  margin: 20px auto;
  padding-bottom: 10px;
  min-height: 250px;
  h2 {
    font-size: 18px;
  }
  p {
    font-size: 14px;
  }
  @media (max-width: 700px) {
    width: 90vw;
  }
`;
export const BookImgWrapper = styled.div`
  width: 120px;
  height: 180px;
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
