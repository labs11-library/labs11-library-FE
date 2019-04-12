import styled from "styled-components";

export const BookDetailsWrapper = styled.div`
  // border: 1px solid red;
  width: 60vw;
  // border-bottom: 2px solid grey;
  display: flex;
  justify-content: space-evenly;
  margin: 20px auto 20px;
  min-height: 250px;
  position: relative;
  top: 40px;
  h2 {
    font-size: 18px;
  }
  p {
    font-size: 14px;
  }
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    width: 90vw;
    align-items: center;
  }
`;
export const BookWrapper = styled.div`
  // border: 1px solid black;
  // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  width: 35vw;

  @media (max-width: 750px) {
    width: 80vw;
  }
`;
export const BookCardWrapper = styled.div`
  // border: 1px solid cyan
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  padding: 10px;

  @media (max-width: 750px) {
    margin-top: 10px;
    width: 80vw;
    display: ${props => (props.value === 1 ? "none" : "block")};
  }
`;
export const BookImgWrapper = styled.div`
  // border: 1px dashed purple;
  width: 120px;
  height: 180px;
  min-width: 120px;
  min-height: 180px;
`;
export const BookInfoWrapper = styled.div`
  // border: 1px solid pink;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const BookButtonsWrapper = styled.div`
  // border: 1px solid green;
  // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0 0 0;
  width: 35vw;
  height: 180px;
  // padding: 10px;

  @media (max-width: 750px) {
    width: 70vw;
  }
`;
export const MapWrapper = styled.div`
  width: 100%;
  height: 360px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  // position: fixed;
  // right: 0;
  @media (max-width: 750px) {
    display: ${props => (props.value === 0 ? "none" : "block")};
    margin-top: 10px;
  }
`;
// export const Ratings = styled.div`
//   display: hidden;
// `;
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

export const TabsWrapper = styled.div`
  // border: 1px solid orange;
  width: 100%;

  @media (min-width: 750px) {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
