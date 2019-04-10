import styled from "styled-components";
import { Link } from "react-router-dom";

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
`

export const BookMapsLogo = styled(Link)`
  position: absolute;
  top: 12px;
  z-index: 100;

  span {
    font-size: 2.5rem;
    padding-left: 10px;
  }
` 


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
`

export const NavLinkWrapper = styled(Link)`
  margin: 0 0.5rem;
`


export const Burger = styled.button`
  display: none;
  color: black;
  border: none;
  z-index: 150;

  :focus {
    outline: 0;
  }
`

export const BurgerDiv = styled.div`
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
  border-radius: 2px;
`

{/* @media screen and (max-width: 850px) {
  .burger {
      display: inline;
  }
}

@media screen and (max-width: 850px) {
  .nav-links-none {
      display: none;
  }
}

@media screen and (max-width: 850px) {
  .nav-links {
      position: relative;
      top: 0;
      right: 0;
      background-color: white;
      height: 300px;
      flex-direction: column;
      justify-content: space-evenly;
      box-shadow: 0 4px 2px -2px gray;
      z-index: 50;
  }
}

@media screen and (max-width: 850px) {
  .burger {
      display: block;
      position: absolute;
      top: 10px;
      right: 25px;
  }
} */}