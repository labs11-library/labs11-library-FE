import React, { Component } from "react";
import { Link } from "react-router-dom";
import './layout.css';
import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Avatar from '@material-ui/core/Avatar';

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

handleToggleMenu = () => {
  if (this.state.menuClassName === "nav-links nav-links-none") {
    this.setState({
      menuClassName: "nav-links nav-links-none"
    });
  }
};


render() {
    const loggedIn = localStorage.getItem("jwt") ? true : false;
    return (
      <div>
        {loggedIn && (
          <div className="navbar">
            <Link to="/" className="bookmaps-logo">
              <span role="img" aria-label="books">
                📚
              </span>
            </Link>
            <div className="nav-links">
              <Link className="nav-link" to="/my-library"><span role="img" aria-label="books">📚</span> My Library</Link>
              <Link className="nav-link" to="/add-book"><span role="img" aria-label="plus">➕</span> Add book</Link>
              <Link className="nav-link" to="/notifications"><span role="img" aria-label="bell">🔔</span> Notifications</Link>
              <Link className="nav-link" to="/profile"><Avatar style={{boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"}} src={this.props.loggedInUser.picture} /></Link>
            </div>
          </div>
        )}
        {!loggedIn && (
          <div className="navbar">
            <Link to="/" className="bookmaps-logo">
              {/* Book maps{" "} */}
              <span role="img" aria-label="books">
                📚
              </span>
              <span role="img" aria-label="map">
                🗺
              </span>
            </Link>
            <div className={this.state.menuClassName}>
              <div>
                <Link className="nav-link" to="/signup">
                  <span role="img" aria-label="wave">
                    👋
                  </span>{" "}
                  Sign up
                </Link>
              </div>
            </div>
            <div>
              <button className="burger" onClick={this.handleToggleMenu}>
                <div className="burger-div" />
                <div className="burger-div" />
                <div className="burger-div" />
              </button>
            </div>
          </div>
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
