import React from "react";
import { NavLink } from "react-router-dom";
import { TabsWrapper } from '../Layout/styled';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ProfileNavBar = (props) => {

  function handleChange(event, value) {
    this.setState({ value });
};

  return (
    <div>
      <TabsWrapper>
        <Paper>
            <Tabs
            value={props.value}
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
        </TabsWrapper>
      {/* <NavLink style={{margin: "10px"}} to="/library/inventory">My books</NavLink> */}
      {/* <NavLink style={{margin: "10px"}} to="/library/add-book">Add to My Library</NavLink> */}
      {/* <NavLink style={{margin: "10px"}} to="/library/checkouts">Checkouts</NavLink> */}
      {/* <NavLink style={{margin: "10px"}} to="/library/my-info">My Info</NavLink> */}
      {/* <NavLink style={{margin: "10px"}} to="/library/requests">Checkout requests</NavLink> */}
    </div>
  );
};

export default ProfileNavBar;
