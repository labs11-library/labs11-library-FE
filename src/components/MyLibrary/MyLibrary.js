import React, { Component } from "react";
import { MyLibraryTabsWrapper } from "../Styles/MyLibraryStyles.js";
import InventoryList from "../Inventory/InventoryList.js";
import CheckedOutList from "../CheckedOut/CheckedOutList.js";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserProfileCard from "../Profile/UserProfileCard";
import { ProfileWrapper } from "../Styles/UserProfileStyles";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Auth from "../Auth/Auth";
import { connect } from "react-redux";


// import ProfileNavBar from "./ProfileNavBar.js";

class MyLibrary extends Component {
  state = {
    value: 0
  };
  componentDidMount() {
    this.props.getLoggedInUser();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  goToMyLibrary = () => {
    this.setState({
      value: 0
    });
  };
  render() {
    const { loggedInUser } = this.props;
    return (
      <div>
        <React.Fragment>
        <ProfileWrapper>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <UserProfileCard loggedInUser={loggedInUser} />
          </div>
        </ProfileWrapper>
          <MyLibraryTabsWrapper>
            <Paper>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
              >
                <Tab label="My books" />
                <Tab label="Checkouts" />
              </Tabs>
            </Paper>
          </MyLibraryTabsWrapper>
          {this.state.value === 0 && <InventoryList />}
          {this.state.value === 1 && (
            <CheckedOutList goToMyLibrary={this.goToMyLibrary} />
          )}
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.authReducer.loggedInUser,
  loading: state.authReducer.fetchingUser
});

// export default MyLibrary;
export default connect(
  mapStateToProps,
  { getLoggedInUser }
)(Auth(MyLibrary));
