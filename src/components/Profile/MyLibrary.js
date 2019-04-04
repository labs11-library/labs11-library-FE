import React, { Component } from "react";
import { MyLibraryTabsWrapper } from './styled';
import InventoryList from "../Inventory/InventoryList.js";
import CheckedOutList from "../CheckedOut/CheckedOutList.js";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import ProfileNavBar from "./ProfileNavBar.js";

class MyLibrary extends Component {
  state = {
    value: 0
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    return (
      <div>
        <React.Fragment>
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
          {
            this.state.value === 0 && <InventoryList />
          }
          {
            this.state.value === 1 && <CheckedOutList />
          }
        </React.Fragment>
      </div>
    );
  }
};

export default MyLibrary;
