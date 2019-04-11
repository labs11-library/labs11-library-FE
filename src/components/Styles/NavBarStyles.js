import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

/* Header styles */

export const NavBarWrapper = styled.div`
  height: 3.5rem;
  box-shadow: 0 4px 2px -2px gray;
  z-index: 1000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;

  a {
    color: black;
    text-decoration: none;
  }
`;

export const BookMapsLogo = styled(Link)`
  position: absolute;
  top: 12px;
  z-index: 100;

  span {
    font-size: 2.5rem;
    padding-left: 10px;
  }

  @media screen and (max-width: 750px) {
    display: none;
}
`;

export const NavLinks = styled.div`
  position: absolute;
  /* top: 18px; */
  right: 12px;
  font-family: Lato, Helvetica, Arial, Lucida, sans-serif;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2rem;
  height: 3.5rem;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

export const NavLinkWrapper = styled(Link)`
  margin: 0 0.5rem;
`;

export const BurgerDiv = styled.div`
  :focus {
    outline: 0;
  }

  @media screen and (min-width: 750px) {
    display: none;
  }
`;

export const NoFocus = styled(NavLink)`
  outline: none
`