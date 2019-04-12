import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavBarWrapper = styled.div`
  height: 3.5rem;
  box-shadow: 0 4px 2px -2px gray;
  z-index: 1000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background-image:
    linear-gradient(
      to right, 
      #88b875, #b3d48f
    );

  a {
    color: black;
    text-decoration: none;
  }
`;
export const NavContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BookMapsLogo = styled(Link)`
  span {
    font-size: 2.5rem;
    padding-left: 10px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2rem;
  height: 3.5rem;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

export const NavLinksShow = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  height: 3.5rem;
`;

export const NavLinkWrapper = styled(Link)`
  margin: 0 0.5rem;
`;

export const BurgerDiv = styled.div`
  @media screen and (min-width: 750px) {
    display: none;
  }
`;

export const NoFocus = styled(NavLink)`
  outline: none;
`;
