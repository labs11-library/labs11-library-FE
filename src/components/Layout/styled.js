import styled from 'styled-components';

export const LandingPageWrapper = styled.div`
    text-align: center;
    text-transform: uppercase;
    margin: 20px;
    display: flex;
`

export const MapWrapper = styled.div`
    width: 40vw;
    height: 90vw;
    position: fixed;
    right: 0;

    @media (max-width: 700px) {
        margin-top: 60px;
        width: 100vw;
        display: ${props => (props.value === 0 ? "none" : "block")};
    }
`

export const BooksWrapper = styled.div`
    width: 50vw;
    position: absolute;
    left: 0;

    @media (max-width: 700px) {
        margin-top: 60px;
        width: 100vw;
        display: ${props => (props.value === 1 ? "none" : "block")};
    }
`

export const TabsWrapper = styled.div`
    width: 100%;

    @media (min-width: 700px) {
        display: none;
    }
`