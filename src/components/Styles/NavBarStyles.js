import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavBarWrapper = styled.div`
  height: 3.5rem;
  box-shadow: 0 4px 2px -2px gray;
  z-index: 1000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  a {
    text-decoration: none;
  }
`;

export const NavContentWrapper = styled.div`
  // max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuLinks = styled(NavLink)`
  text-decoration: none;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
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

export const NavLinkWrapper = styled(NavLink)`
  font-size: 1.2rem;
  color: #757582;
  margin: 0 0.5rem;
  transition: all 0.2s ease;
  &.active {
    color: #009ee5;
  }
  &:hover {
    color: #009ee5;
  }
  @media screen and (max-width: 750px) {
    &.active {
      border-bottom: none;
    }
  }
  @media screen and (min-width: 750px) {
    border-bottom: none;
  }
`;

export const BurgerDiv = styled.div`
  @media screen and (min-width: 750px) {
    display: none;
  }
`;

export const NoFocus = styled(NavLink)`
  outline: none;
`;
