import React, { Component } from "react";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Avatar from "@material-ui/core/Avatar";
import {
  NavBarWrapper,
  NavContentWrapper,
  NavLinks,
  NavLinksShow,
  NavLinkWrapper,
  MenuLinks,
  NavLogoWrapper
} from "../Styles/NavBarStyles.js";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import BookMaps_combo from "../../images/BookMapsLogos/BookMaps_combo.png";
import BookMaps_combo_grey from "../../images/BookMapsLogos/BookMaps_combo_grey.png";

import BurgerMenu from "./BurgerMenu";
import { toast } from "react-toastify";

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
    this.props.history.push("/")
    toast.info('Thanks for visiting BookMaps. We\'re sad to see you go 😭. See you again soon.');
  };

  render() {
    const loggedIn = localStorage.getItem("jwt") ? true : false;
    const { anchorEl } = this.state;
    return (
      <div>
        {loggedIn && (
          <NavBarWrapper>
            <NavContentWrapper>
              <NavLinkWrapper exact to="/browse">
                <NavLogoWrapper src={BookMaps_combo} alt="bookmaps logo" />
              </NavLinkWrapper>
              <BurgerMenu />
              <NavLinks>
                <NavLinkWrapper to="/my-library">My Library</NavLinkWrapper>
                <NavLinkWrapper to="/add-book">Add book</NavLinkWrapper>
                <NavLinkWrapper to="/notifications">
                  Notifications
                </NavLinkWrapper>

                <NavLinkWrapper style={{ borderBottom: "none" }}>
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
              <NavLinkWrapper to="/browse"><NavLogoWrapper src={BookMaps_combo} /></NavLinkWrapper>
              <div style={{ display: "flex" }}>
                <NavLinksShow>
                  <NavLinkWrapper to="/login">Login</NavLinkWrapper>
                </NavLinksShow>
                <NavLinksShow>
                  <NavLinkWrapper to="/signup">Sign up</NavLinkWrapper>
                </NavLinksShow>
              </div>
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

const NavBarRedux = connect(
  mapStateToProps,
  { getLoggedInUser }
)(NavBar);

export default withRouter(NavBarRedux);