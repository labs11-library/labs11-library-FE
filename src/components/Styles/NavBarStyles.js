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
  background: white;
  // background-image: linear-gradient(to right, #5386ca, #aadaff);
  // background-image: linear-gradient(to left, #4f9a4b, #c0ecae);

  a {
    color: #325c6c;
    text-decoration: none;
  }
`;

export const Button = styled.div` {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: 12px 24px;
  // border: 1px solid #325C6C;
  border-radius: 8px;
  // background: -webkit-gradient(linear, left top, left bottom, from(#57ad53), to(#25a84e));
  // background: -moz-linear-gradient(top, #57ad53, #25a84e);
  // background: linear-gradient(to bottom, #57ad53, #25a84e);
  -webkit-box-shadow: #ff5959 0px 0px 0px 0px;
  -moz-box-shadow: #ff5959 0px 0px 0px 0px;
  // box-shadow: #ff5959 0px 0px 0px 0px;
  // text-shadow: #325C6C 1px 1px 1px;
  font: normal normal bold 20px trebuchet ms;
  color: #325C6C;
  text-decoration: none;
}
&:hover${Button},
&:focus${Button} {
  border: 1px solid #325C6C;
background: #325C6C;
  background: -webkit-gradient(linear, left top, left bottom, from(#68d064), to(#325C6C));
  background: -moz-linear-gradient(top, #325C6C, #325C6C);
  background: linear-gradient(to bottom, #325C6C, #325C6C);
  color: white;
  text-decoration: none;
}
&:active${Button} {
 background: #325C6C;
  background: -webkit-gradient(linear, left top, left bottom, from(#325C6C), to(#325C6C));
  background: -moz-linear-gradient(top, #325C6C, #325C6C);
  background: linear-gradient(to bottom, #325C6C, #325C6C);
}
`

export const NavContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BookMapsLogo = styled(Link)`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  span {
    font-size: 2.5rem;
    padding: 0 10px;
    margin-top: 5px;
  }
`;

export const MenuLinks = styled(NavLink)`
  text-decoration: none;

  &:focus,
  &:hover,
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
