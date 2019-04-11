import React, { Component } from "react";
import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Avatar from "@material-ui/core/Avatar";
import {
  NavBarWrapper,
  BookMapsLogo,
  NavLinks,
  NavLinksShow,
  NavLinkWrapper,
} from "../Styles/NavBarStyles.js";
import BurgerMenu from "./BurgerMenu"

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menuClassName: "nav-links nav-links-none"
    };
  }

  componentDidMount() {
    this.props.getLoggedInUser();
  }

  render() {
    const loggedIn = localStorage.getItem("jwt") ? true : false;
    return (
      <div>
        {loggedIn && (
          <NavBarWrapper>
            <BookMapsLogo to="/">
              <span role="img" aria-label="books">
                📚
              </span>
            </BookMapsLogo>
            <BurgerMenu />
            <NavLinks>
              <NavLinkWrapper to="/my-library">
                <span role="img" aria-label="books">
                  📚
                </span>{" "}
                My Library
              </NavLinkWrapper>
              <NavLinkWrapper to="/add-book">
                <span role="img" aria-label="plus">
                  📖
                </span>{" "}
                Add book
              </NavLinkWrapper>
              <NavLinkWrapper to="/notifications">
                <span role="img" aria-label="bell">
                  🔔
                </span>{" "}
                Notifications
              </NavLinkWrapper>
              <NavLinkWrapper to="/profile">
                <Avatar
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
                  }}
                  src={this.props.loggedInUser.picture}
                />
              </NavLinkWrapper>
            </NavLinks>
          </NavBarWrapper>
        )}
        {!loggedIn && (
          <NavBarWrapper>
            <BookMapsLogo to="/">
              {/* Book maps{" "} */}
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
