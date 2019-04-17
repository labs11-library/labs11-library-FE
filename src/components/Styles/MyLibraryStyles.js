import styled from "styled-components";

export const MyLibraryTabsWrapper = styled.div`
  width: 89%;
  margin: 20px auto;
`;

// export const ProfileWrapper = styled.div`
// margin-left:10%;
// display:flex;

// `
export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin-top: 5vw;
  flex-direction: column;

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

  @media (max-width 1050px) {
    justify-content: ;
  }
`;

