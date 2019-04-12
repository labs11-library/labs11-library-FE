import styled from "styled-components";

export const ChatWrapper = styled.div`
    @media (min-width: 800px) {
        width: 40%
        margin: 0.5rem auto; 
    }

    width: 50%
    margin: 0.5rem auto;
    height: 70vh;

    @media (max-width: 800px) {
        width: 60%
        margin: 0.5rem auto; 
    }

    @media (max-width: 500px) {
        width: 90%;
        margin: 0.5rem auto;
    }

    h2 {
        font-size: 1.5rem;
        margin: 10px auto;
    }

    p {
        font-size: 1rem;
    }
`

export const BackButtonWrapper = styled.div`
    margin-left: 20px;

    @media (max-width: 800px) {
        display: none;
    }
`

export const ChatButtonWrapper = styled.div`
    @media (min-width: 800px) {
        display: none;
    }
`