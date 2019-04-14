import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Avatar from "@material-ui/core/Avatar";
import {
  NavBarWrapper,
  NavContentWrapper,
  BookMapsLogo,
  NavLinks,
  NavLinksShow,
  NavLinkWrapper,
<<<<<<< HEAD
  Button
=======
  MenuLinks
>>>>>>> 06f63cc1d7a0ef33824d95f4c491252caeead8c4
} from "../Styles/NavBarStyles.js";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import BurgerMenu from "./BurgerMenu";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menuClassName: "nav-links nav-links-none",
      anchorEl: null,
      open: false
    };
  }

  componentDidMount() {
    this.props.getLoggedInUser();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget, open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, open: !this.state.open });
  };

  logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const loggedIn = localStorage.getItem("jwt") ? true : false;
    const { anchorEl } = this.state;
    return (
      <div>
        {loggedIn && (
          <NavBarWrapper>
            <NavContentWrapper>
              <BookMapsLogo to="/">
                {/* <span role="img" aria-label="books">
                  📚
                </span> */}
                <Button>
                  Home
                </Button>
              </BookMapsLogo>
              <BurgerMenu />
              <NavLinks>
                <NavLinkWrapper to="/my-library">
                  {/* <span role="img" aria-label="books">
                    📚
                  </span>{" "} */}
                  <Button>
                    My Library
                  </Button>
                  
                </NavLinkWrapper>
                <NavLinkWrapper to="/add-book">
                  {/* <span role="img" aria-label="plus">
                    📖
                  </span>{" "} */}
                   <Button>
                     Add book 
                  </Button>
                </NavLinkWrapper>
                <NavLinkWrapper to="/notifications">
                  {/* <span role="img" aria-label="bell">
                    🔔
                  </span>{" "} */}
                  <Button>
                    Notifications
                  </Button>
                </NavLinkWrapper>
                <NavLinkWrapper>
                  <Avatar
                    style={{
                      boxShadow:
                        "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
                    }}
                    src={this.props.loggedInUser.picture}
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  />
                  {this.state.open && (
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                      style={{ marginTop: "3rem" }}
                    >
                      <MenuLinks to="/profile" style={{ outline: "none" }}>
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      </MenuLinks>
                      <MenuLinks to="/history" style={{ outline: "none" }}>
                        <MenuItem onClick={this.handleClose}>History</MenuItem>
                      </MenuLinks>
                      <MenuLinks style={{ outline: "none" }}>
                        <MenuItem onClick={(this.handleClose, this.logOut)}>
                          Logout
                        </MenuItem>
                      </MenuLinks>
                    </Menu>
                  )}
                </NavLinkWrapper>
              </NavLinks>
            </NavContentWrapper>
          </NavBarWrapper>
        )}
        {!loggedIn && (
          <NavBarWrapper>
            <NavContentWrapper>
              <BookMapsLogo to="/">
                <span role="img" aria-label="books">
                  📚
                </span>
              </BookMapsLogo>
              <NavLinksShow>
                <NavLinkWrapper to="/signup">
                  <span role="img" aria-label="wave">
                    👋
                  </span>{" "}
                  Sign up
                </NavLinkWrapper>
              </NavLinksShow>
            </NavContentWrapper>
          </NavBarWrapper>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.authReducer.loggedInUser,
  loading: state.authReducer.fetchingUser
});

export default connect(
  mapStateToProps,
  { getLoggedInUser }
)(NavBar);
