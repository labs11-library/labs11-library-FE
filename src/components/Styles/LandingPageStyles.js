import styled from "styled-components";
import { Link } from "react-router-dom";
export const BookListContainer = styled.div`
  // max-width: 1000px;
  text-align: center;
  z-index: 0;
  h1 {
    font-size: 2rem;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
// copied from /books/styles.js ==========================================================

export const BookDetailsWrapper = styled.div`
  width: 85%;
  border-radius: 7px;
  max-width: 510px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  @media (max-width: 750px) {
    width: 96%;
    margin: auto;
    margin-bottom: 20px;
    word-break: break-word;
  }
`;

export const BookImgWrapper = styled.div`
  min-width: 120px;
  max-width: 120px;
  min-height: 180px;
  max-height: 180px;
  margin-right: 20px;
  @media (max-width: 750px) {
    margin-right: 10px;
  }
`;
export const BookImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px 0 0 7px;
`;
export const BookTextContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 10px;
  @media (max-width: 750px) {
    padding-right: 5px
  }
  width: 100%;
  h2,
  p {
    margin-bottom: 7px;
  }
  h2 {
    font-size: 1.5rem;
    padding-right: 6px;
    color: #009EE5;
  }
  }
  p {
    font-size: 1rem;
    color: #838281;
  }
`;
export const Availability = styled.p`
  color: ${props =>
    props.available ? "#00d369 !important" : "#ff5454 !important"};
`;

export const DueDate = styled.p`
  color: red;
`;

// copied from /layout/styled.js

export const LandingPageWrapper = styled.div`
  text-align: center;
  display: flex;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const AvatarContainer = styled.div`
  @media (max-width: 1050px) and (min-width: 750px) {
    display: none !important;
  }

  @media (max-width: 500px) {
    display: none !important;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  @media (max-width: 750px) {
    justify-content: center;
  }
`;
export const MapWrapper = styled.div`
  width: 50%;
  position: fixed;
  right: 0;
  top: 3.6rem;
  @media (max-width: 750px) {
    margin-top: -10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    position: static;
    width: 90%;
    // height: 100vh;
    display: ${props => (props.value === 0 ? "none" : "block")};
  }
`;

export const BooksWrapper = styled.div`
  width: 50%;
  height: 100%;
  margin-top: -1.1rem;

  @media (max-width: 750px) {
    margin-top: 60px auto 0;
    width: 92%;
    display: ${props => (props.value === 1 ? "none" : "block")};
  }
`;
export const NoBooks = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  max-width: 90%;
  margin: 20px auto;
`;

export const NoBooksLink = styled(Link)`
  font-size: 1.2rem;
  color: #009ee5;
`;
export const TabsWrapper = styled.div`
  width: 100%;

  @media (max-width: 750px) {
    width: 90%;
    margin: 0 auto 24px;
    padding: 6px 0;
  }

  @media (min-width: 750px) {
    display: none;
  }
`;
