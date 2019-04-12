import styled from "styled-components";

export const InventoryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 2rem;
  }
  @media (max-width: 750px) {
    width: 92%;
  }
`;

export const Search = styled.input`
  text-align: center;
  padding: 5px 3px;
  width: 250px;
  margin-bottom: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const NoBooks = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  max-width: 90%;
  margin: 20px auto;
`;
// copied from /books/styles.js ==========================================================

export const BookDetailsWrapper = styled.div`
  width: 45%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  margin: 20px;
  @media (max-width: 800px) {
    width: 80%;
    margin: 10px auto;
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
  border-radius:7px 0 0 7px ;
`;
export const BookTextContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-right: 5px;
  h2,
  p {
    margin-bottom: 7px;
  }
  h2 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
`;
export const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;

export const DueDate = styled.p`
  color: red;
`;
