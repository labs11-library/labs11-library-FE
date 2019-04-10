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
// copied from /books/styles.js ==========================================================

export const BookDetailsWrapper = styled.div`
  width: 46%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 46%;
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 750px) {
    width: 96%;
    margin: auto;
    margin-bottom: 20px;
  }
`;
export const BookImgWrapper = styled.div`
  width: 100%;
  max-width: 120px
  height: 180px;
  margin-right: 20px;
`;
export const BookImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const BookTextContainer = styled.div`
  text-align: left;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

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
